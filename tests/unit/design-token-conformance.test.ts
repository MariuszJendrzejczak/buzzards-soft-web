import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * Token-conformance machine gate.
 *
 * Oracle = `~/.claude/design-standard/web/token-contract.md` §1 + §5: the
 * generated/landed design may reference color ONLY through the approved
 * semantic/brand token utilities (`bg-background`, `text-brand`, `bg-cta`, …,
 * with opacity modifiers like `bg-brand/5` allowed). Any color used OUTSIDE
 * that set — a raw `#hex`, an arbitrary `bg-[#...]` / `text-[oklch(...)]`, an
 * `rgb()/hsl()` literal, or a raw Tailwind palette color (`emerald-500`,
 * `slate-900`, …) — is a conformance failure.
 *
 * Scope note (recorded per the Phase-2 brief): the existing, NOT-yet-redesigned
 * portfolio/section components predate the token system and still carry raw
 * Tailwind palette colors and a couple of arbitrary color literals. Those are
 * cleaned up when their sections are redesigned onto the token surface
 * (Phase 3+/Sprint 005). To avoid red-flagging code this sprint has not
 * touched, the two invariants below run over ALL `components/**` but exempt an
 * explicit ALLOWLIST of the known pre-existing offenders (each a TODO to clear
 * on redesign). Everything not on the allowlist is held to the invariant NOW —
 * so the token substrate landed this phase, and every future/redesigned
 * component, is guarded.
 */

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

// Known pre-existing files that use raw Tailwind palette colors (non-token).
// TODO(web-design-generation Phase 3+/Sprint 005): re-point these onto the
// token surface and remove from the allowlist.
const PALETTE_COLOR_ALLOWLIST = new Set(
  [
    "components/portfolio/tech-badge.tsx",
    "components/portfolio/WarsztatGrid.tsx",
    "components/portfolio/WarsztatFlow.tsx",
    "components/portfolio/AgentPortfolioSection.tsx",
    "components/portfolio/stack-chip.tsx",
    "components/portfolio/role-badge.tsx",
    "components/portfolio/WarsztatHeroTile.tsx",
    "components/portfolio/PortfolioSection.tsx",
    "components/portfolio/HoneticHero.tsx",
  ].map((p) => path.normalize(p)),
);

// Known pre-existing files that use arbitrary color literals inside `[...]`
// (embedded `#hex` / `rgb()` / gradient stops). Same TODO as above.
const ARBITRARY_COLOR_ALLOWLIST = new Set(
  ["components/portfolio/WarsztatFlow.tsx"].map((p) => path.normalize(p)),
);

// Arbitrary color literal in a Tailwind bracket utility, OR a bare `rgb/hsl/
// oklch(...)` / `#hex` string literal in the source. This is the core §5 ban.
const ARBITRARY_COLOR = /\[[^\]]*(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|oklch\()[^\]]*\]|#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/;

// Raw Tailwind palette color utility (`bg-emerald-500`, `text-slate-300/80`,
// `border-amber-400`, …) — a color outside the token set.
const PALETTE_COLOR =
  /\b(?:bg|text|border|ring|from|to|via|fill|stroke|shadow|outline|decoration|divide|placeholder|caret|accent|ring-offset)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/;

function walk(dir: string, acc: string[]): void {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(entry)) acc.push(full);
  }
}

function componentFiles(): string[] {
  const acc: string[] = [];
  walk(path.join(ROOT, "components"), acc);
  return acc.map((f) => path.normalize(path.relative(ROOT, f)));
}

const FILES = componentFiles();

/** Strip line comments so a hex/rgb mention in a comment isn't a false ban. */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

describe("token conformance — components use only approved tokens", () => {
  it("discovers component source files to scan", () => {
    expect(FILES.length).toBeGreaterThan(0);
  });

  describe("no arbitrary color literals (#hex / rgb() / oklch() outside tokens)", () => {
    for (const file of FILES) {
      const exempt = ARBITRARY_COLOR_ALLOWLIST.has(file);
      it(`${file}${exempt ? " (allowlisted — pre-existing)" : ""}`, () => {
        const src = stripComments(
          readFileSync(path.join(ROOT, file), "utf8"),
        );
        const hit = ARBITRARY_COLOR.test(src);
        if (exempt) {
          // Sanity: the allowlist entry must still be an offender, else remove
          // it (keeps the allowlist honest as debt is cleared).
          expect(
            hit,
            `${file} is allowlisted but has no arbitrary color — remove it from ARBITRARY_COLOR_ALLOWLIST`,
          ).toBe(true);
          return;
        }
        expect(
          hit,
          `${file} uses an arbitrary color value — use an approved token utility (token-contract §1)`,
        ).toBe(false);
      });
    }
  });

  describe("no raw Tailwind palette colors (non-token utilities)", () => {
    for (const file of FILES) {
      const exempt = PALETTE_COLOR_ALLOWLIST.has(file);
      it(`${file}${exempt ? " (allowlisted — pre-existing)" : ""}`, () => {
        const src = stripComments(
          readFileSync(path.join(ROOT, file), "utf8"),
        );
        const hit = PALETTE_COLOR.test(src);
        if (exempt) {
          expect(
            hit,
            `${file} is allowlisted but uses no palette color — remove it from PALETTE_COLOR_ALLOWLIST`,
          ).toBe(true);
          return;
        }
        expect(
          hit,
          `${file} uses a raw Tailwind palette color — use an approved token utility (token-contract §1)`,
        ).toBe(false);
      });
    }
  });
});
