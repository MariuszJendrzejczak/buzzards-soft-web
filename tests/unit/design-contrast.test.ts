import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * WCAG 2.2 contrast machine gate for BOTH themes.
 *
 * Oracle = the WCAG 2.2 AA thresholds (`_core/a11y-floors.md` §1): normal text
 * ≥ 4.5:1, large text / non-text (UI, focus ring) ≥ 3:1. These numbers are the
 * acceptance target — NOT the current token output. The token VALUES are parsed
 * live from `app/globals.css` so the test measures what actually shipped; if a
 * future tweak drops a pair below floor, this goes red.
 *
 * We compute the ratio over the actual `oklch()` token values by converting
 * oklch → linear sRGB → relative luminance → WCAG contrast ratio.
 */

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const GLOBALS = readFileSync(path.join(ROOT, "app", "globals.css"), "utf8");

// --- oklch → sRGB → relative luminance (WCAG) --------------------------------

function oklchToLinearSrgb(
  L: number,
  C: number,
  hDeg: number,
): [number, number, number] {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function relativeLuminance(L: number, C: number, hDeg: number): number {
  // Luminance (Y) is computed directly from the *linear* sRGB channels, which
  // is exactly the WCAG relative-luminance definition (0.2126 R + 0.7152 G +
  // 0.0722 B on linear-light values). No gamma round-trip needed.
  const [r, g, b] = oklchToLinearSrgb(L, C, hDeg);
  const clamp = (x: number) => Math.min(1, Math.max(0, x));
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b);
}

function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(...parseOklch(a));
  const lb = relativeLuminance(...parseOklch(b));
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseOklch(value: string): [number, number, number] {
  const m = value.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i,
  );
  if (!m) throw new Error(`not an oklch() value: ${value}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

// --- token extraction from globals.css ---------------------------------------

/**
 * Reads the token block for a theme selector (`:root` = light, `.dark` = dark)
 * and returns a name→oklch map for the `--foo: oklch(...)` declarations in it.
 */
function readTokens(selector: string): Record<string, string> {
  // Match the first `<selector> { ... }` block. `.dark` and `:root` each occur
  // once as a top-level token block in globals.css.
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = GLOBALS.match(
    new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`),
  );
  if (!block) throw new Error(`token block not found for ${selector}`);
  const tokens: Record<string, string> = {};
  const re = /(--[\w-]+)\s*:\s*(oklch\([^)]*\))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block[1])) !== null) {
    tokens[m[1]] = m[2];
  }
  return tokens;
}

const THEMES = {
  light: readTokens(":root"),
  dark: readTokens(".dark"),
} as const;

// Critical pairs the contract (§5) and a11y-floors (§1) require the gate to
// cover. `floor` is the WCAG 2.2 threshold for that pair's role.
const TEXT_FLOOR = 4.5;
const NON_TEXT_FLOOR = 3;

type Pair = {
  name: string;
  fg: string;
  bg: string;
  floor: number;
};

const PAIRS: readonly Pair[] = [
  { name: "foreground on background", fg: "--foreground", bg: "--background", floor: TEXT_FLOOR },
  { name: "foreground on surface/card", fg: "--card-foreground", bg: "--card", floor: TEXT_FLOOR },
  { name: "muted-foreground on background", fg: "--muted-foreground", bg: "--background", floor: TEXT_FLOOR },
  { name: "text-subtle on background", fg: "--text-subtle", bg: "--background", floor: TEXT_FLOOR },
  { name: "primary-foreground on primary (CTA label)", fg: "--primary-foreground", bg: "--primary", floor: TEXT_FLOOR },
  { name: "accent-foreground on accent (brand fill label)", fg: "--accent-foreground", bg: "--accent", floor: TEXT_FLOOR },
  { name: "brand as text/icon on background", fg: "--brand", bg: "--background", floor: NON_TEXT_FLOOR },
  { name: "ring vs background (focus indicator)", fg: "--ring", bg: "--background", floor: NON_TEXT_FLOOR },
];

// NOTE: `border`/`surface` is intentionally NOT asserted. The token-contract §5
// critical-pair list does not include it, and the DNA (§6) uses subtle hairline
// rings as decorative delineation — not WCAG 1.4.11 control boundaries that
// carry a 3:1 requirement. Asserting it would impose a floor the design
// deliberately omits.

describe("design token contrast — WCAG 2.2 (both themes)", () => {
  for (const [themeName, tokens] of Object.entries(THEMES)) {
    describe(`theme: ${themeName}`, () => {
      it("every token block value is a parseable oklch() color", () => {
        const bad = Object.entries(tokens).filter(([, v]) => {
          try {
            parseOklch(v);
            return false;
          } catch {
            return true;
          }
        });
        expect(bad.map(([k]) => k)).toEqual([]);
      });

      for (const pair of PAIRS) {
        it(`${pair.name} meets ≥ ${pair.floor}:1`, () => {
          const fg = tokens[pair.fg];
          const bg = tokens[pair.bg];
          expect(fg, `${themeName}: ${pair.fg} missing`).toBeDefined();
          expect(bg, `${themeName}: ${pair.bg} missing`).toBeDefined();
          const ratio = contrastRatio(fg, bg);
          expect(
            ratio,
            `${themeName}: ${pair.name} = ${ratio.toFixed(2)}:1 (floor ${pair.floor}:1)`,
          ).toBeGreaterThanOrEqual(pair.floor);
        });
      }
    });
  }

  it("sanity: the converter reproduces known WCAG anchors (white vs black ≈ 21:1)", () => {
    const ratio = contrastRatio("oklch(1 0 0)", "oklch(0 0 0)");
    expect(ratio).toBeGreaterThan(20.9);
    expect(ratio).toBeLessThanOrEqual(21.001);
  });
});
