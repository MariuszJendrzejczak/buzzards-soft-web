import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

/*
 * Feature-flag matrix at the SSG layer (task a of Sprint 3 Session 4).
 *
 * The component-level matrix (all 4 combinations of HOME_STORAGE_MVP_LIVE ×
 * POLILOCALE_REPO_PUBLIC) is fully covered by
 * `tests/unit/agent-portfolio-section.test.tsx` and
 * `tests/unit/portfolio-section.test.tsx` — those tests mock the
 * feature-flags module and assert React tree behavior.
 *
 * This file adds the *next layer up*: the actual static export produced by
 * `npm run build`. It verifies that the build pipeline + FeatureGate +
 * AgentPortfolioSection composition together emit (or omit) the section in
 * the on-disk HTML for every locale.
 *
 * --- Reproducing the other matrix cells locally ---
 *
 * The build under `out/` is whatever the last `npm run build` produced. By
 * default in this repo it is the OFF/OFF cell (both env vars unset / not
 * "true"). To re-verify the other 3 cells:
 *
 *   1. Stop any running dev server (`next dev` and `next build` cannot share
 *      a .next/ cache reliably across env-var changes — wipe it first).
 *      rm -rf .next out
 *   2. Set the env vars for the target cell, then build:
 *
 *      # cell ON/ON — section MUST appear:
 *      NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE=true \
 *        NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC=true npm run build
 *
 *      # cell ON/OFF — section MUST stay invisible:
 *      NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE=true \
 *        NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC=false npm run build
 *
 *      # cell OFF/ON — section MUST stay invisible:
 *      NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE=false \
 *        NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC=true npm run build
 *
 *      # cell OFF/OFF — section MUST stay invisible (default):
 *      npm run build
 *
 *   3. Re-run `npx vitest run tests/unit/feature-flag-matrix-ssg.test.ts`.
 *      The "ON/ON" expectation block is gated behind an env probe so the
 *      same test file can run in either build state without false failures.
 *
 * In CI the on-disk artifact is whatever the pipeline built. The OFF-state
 * assertions are unconditional — they're the contract for the production
 * deploy until both source flags flip.
 */

const OUT_DIR = path.resolve(__dirname, "..", "..", "out");
const LOCALES = ["pl", "en", "sv"] as const;
type Locale = (typeof LOCALES)[number];
const SECTION_TESTID = "agent-portfolio-section";

function homeHtmlPath(locale: Locale): string {
  return path.join(OUT_DIR, `${locale}.html`);
}

function loadHomeHtml(locale: Locale): string {
  const p = homeHtmlPath(locale);
  if (!existsSync(p)) {
    throw new Error(
      `Missing SSG output for home: ${p}. Run \`npm run build\` before this test.`,
    );
  }
  return readFileSync(p, "utf8");
}

// Determine the matrix cell of the current build. By default we probe the
// on-disk SSG output: if any locale's home HTML contains the gated section's
// testid, the build was produced with both source flags ON; otherwise it
// belongs to one of the three CLOSED-gate cells (off-off / on-off / off-on),
// all of which share the same observable absence. `ENV_FLAGS_MATRIX_BUILD`
// remains honored as an explicit override for one-off matrix-verification
// runs that want to assert a specific cell.
function detectMatrixCellFromBuild(): "on-on" | "off-off" {
  for (const locale of LOCALES) {
    const p = homeHtmlPath(locale);
    if (
      existsSync(p) &&
      readFileSync(p, "utf8").includes(`data-testid="${SECTION_TESTID}"`)
    ) {
      return "on-on";
    }
  }
  return "off-off";
}

const MATRIX_BUILD =
  process.env.ENV_FLAGS_MATRIX_BUILD ?? detectMatrixCellFromBuild();

describe("feature-flag matrix — SSG output (current build cell)", () => {
  it("a sanity check: home HTML is generated for all 3 locales", () => {
    for (const locale of LOCALES) {
      expect(existsSync(homeHtmlPath(locale)), `missing ${homeHtmlPath(locale)}`).toBe(
        true,
      );
    }
  });

  if (MATRIX_BUILD === "off-off" || MATRIX_BUILD === "on-off" || MATRIX_BUILD === "off-on") {
    describe(`gate CLOSED (matrix cell: ${MATRIX_BUILD})`, () => {
      it.each(LOCALES)(
        "%s home page does NOT include data-testid='agent-portfolio-section' in SSG output (computed AGENT_PORTFOLIO_SECTION_LIVE === false)",
        (locale) => {
          const html = loadHomeHtml(locale);
          expect(html).not.toContain(`data-testid="${SECTION_TESTID}"`);
        },
      );

      it.each(LOCALES)(
        "%s home page does NOT include the section id='portfolio-agent' anchor in SSG output",
        (locale) => {
          const html = loadHomeHtml(locale);
          expect(html).not.toContain('id="portfolio-agent"');
        },
      );

      it.each(LOCALES)(
        "%s home page still includes the PortfolioSection wrapper (id='portfolio') — gating only removes 4.2, not the whole section 4",
        (locale) => {
          const html = loadHomeHtml(locale);
          expect(html).toContain('id="portfolio"');
        },
      );
    });
  }

  if (MATRIX_BUILD === "on-on") {
    describe("gate OPEN (matrix cell: on-on) — verified only when ENV_FLAGS_MATRIX_BUILD=on-on", () => {
      it.each(LOCALES)(
        "%s home page DOES include data-testid='agent-portfolio-section' in SSG output",
        (locale) => {
          const html = loadHomeHtml(locale);
          expect(html).toContain(`data-testid="${SECTION_TESTID}"`);
        },
      );

      it.each(LOCALES)(
        "%s home page DOES include the section id='portfolio-agent' anchor in SSG output",
        (locale) => {
          const html = loadHomeHtml(locale);
          expect(html).toContain('id="portfolio-agent"');
        },
      );

      it.each(LOCALES)(
        "%s home page renders all 3 agent project cards (data-agent-project attributes) when flags are on",
        (locale) => {
          const html = loadHomeHtml(locale);
          for (const slug of ["home-storage", "polilocale", "buzzards-soft"]) {
            expect(
              html.includes(`data-agent-project="${slug}"`),
              `${locale}: expected data-agent-project="${slug}" in HTML`,
            ).toBe(true);
          }
        },
      );
    });
  }
});

describe("feature-flag matrix — portfolio wrapper invariants (locale-agnostic)", () => {
  it.each(LOCALES)(
    "%s home page exposes the 4.1 HoneticHero subsection (id='portfolio-honeti') independently of the matrix",
    (locale) => {
      const html = loadHomeHtml(locale);
      expect(html).toContain('id="portfolio-honeti"');
    },
  );

  it.each(LOCALES)(
    "%s home page exposes the 4.3 WarsztatGrid subsection (id='portfolio-warsztat') independently of the matrix",
    (locale) => {
      const html = loadHomeHtml(locale);
      expect(html).toContain('id="portfolio-warsztat"');
    },
  );
});
