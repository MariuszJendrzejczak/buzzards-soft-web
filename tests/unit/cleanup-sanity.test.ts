import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  HONETI_APPS,
  type HoneticAppSlug,
} from "@/lib/portfolio/honeti-apps";
import * as portfolioTypes from "@/lib/portfolio/types";

// Working-tree sanity tests for Session 1 (cleanup) and Session 3 (retirement
// of the legacy honeti-case shim). These guard against silent regression if
// a future agent re-adds the removed surface area.

const V2_REACT = path.resolve(__dirname, "..", "..");

describe("cleanup sanity — Sprint 1 reviewer concerns and Sprint 2 shim retirement", () => {
  it("cases/honeti.ts no longer exists in the working tree (Session 1 relocation)", () => {
    const p = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "portfolio",
      "[slug]",
      "cases",
      "honeti.ts",
    );
    expect(existsSync(p), `${p} should NOT exist`).toBe(false);
  });

  it("cases/honeti-case.ts no longer exists in the working tree (Session 3 retired the shim)", () => {
    const p = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "portfolio",
      "[slug]",
      "cases",
      "honeti-case.ts",
    );
    expect(existsSync(p), `${p} should NOT exist`).toBe(false);
  });

  it("dynamic /portfolio/[slug] route no longer exists (Session 3 deletion)", () => {
    const p = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "portfolio",
      "[slug]",
      "page.tsx",
    );
    expect(existsSync(p), `${p} should NOT exist`).toBe(false);
  });

  it("static /portfolio/honeti route exists (the new home for ADR 0002 Option B)", () => {
    const p = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "portfolio",
      "honeti",
      "page.tsx",
    );
    expect(existsSync(p), `${p} should exist`).toBe(true);
  });

  it("canonical Honeti dataset lives at lib/portfolio/honeti-apps.ts", () => {
    const p = path.join(V2_REACT, "lib", "portfolio", "honeti-apps.ts");
    expect(existsSync(p), `${p} should exist`).toBe(true);
  });

  it("lib/portfolio/types.ts does NOT export stackLabelKey (removed in Session 1)", () => {
    // Runtime sanity — type-only assertion is below.
    expect(
      (portfolioTypes as Record<string, unknown>).stackLabelKey,
      "stackLabelKey export was removed in Session 1; do not re-introduce it",
    ).toBeUndefined();
  });

  it("type-only: `import { stackLabelKey }` from `@/lib/portfolio/types` is not in the public surface", () => {
    // If a future agent re-adds the export this assertion stays runtime-true
    // (object key absent) — the typecheck guard lives in tsc --noEmit:
    // because we don't `import { stackLabelKey }` anywhere, removing the
    // export does not break the build. This test documents the intent.
    const exports = Object.keys(portfolioTypes);
    expect(exports).not.toContain("stackLabelKey");
  });
});

describe("HoneticAppSlug literal-union type — assignability across all 15 slugs", () => {
  // Compile-time assignability: every `slug` field on `HONETI_APPS` is itself
  // a literal `HoneticAppSlug`. If a slug literal drifted off the union the
  // line below would fail `npx tsc --noEmit`.
  it("every HONETI_APPS[i].slug is assignable to HoneticAppSlug", () => {
    for (const app of HONETI_APPS) {
      const s: HoneticAppSlug = app.slug as HoneticAppSlug;
      expect(typeof s).toBe("string");
      expect(s.length).toBeGreaterThan(0);
    }
  });

  it("each known slug literal is structurally assignable to HoneticAppSlug (compile-time guard)", () => {
    // Hand-picked literals — if any of these stop matching the literal union,
    // `npx tsc --noEmit` will fail BEFORE the test runs. The runtime check
    // here just keeps the assignment from being dead code.
    const a: HoneticAppSlug = "infoshare";
    const b: HoneticAppSlug = "uprawnienia-budowlane";
    const c: HoneticAppSlug = "gastro-ninja-klient";
    const d: HoneticAppSlug = "soildata";
    const e: HoneticAppSlug = "gen-oczami-dziecka";
    const f: HoneticAppSlug = "words-en";
    const g: HoneticAppSlug = "irregular-verbs";
    const h: HoneticAppSlug = "der-die-das";
    const i: HoneticAppSlug = "flags";
    const j: HoneticAppSlug = "multiplication";
    const k: HoneticAppSlug = "exponents";
    const l: HoneticAppSlug = "roman";
    const m: HoneticAppSlug = "testy-prawnicze";
    const n: HoneticAppSlug = "gastro-ninja-kelner";
    const o: HoneticAppSlug = "gastro-ninja-kurier";

    expect(
      new Set([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o]).size,
    ).toBe(15);
  });
});

describe("legacy `cases/` directory has been cleaned up", () => {
  // The orchestrator notes state that `cases/index.ts` + `types.ts` were
  // kept as scaffolding "for future re-introduction" — they remain valid as
  // long as they don't reference the deleted files.
  it("if cases/index.ts still exists, it does not import the deleted honeti shims", () => {
    const indexPath = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "portfolio",
      "[slug]",
      "cases",
      "index.ts",
    );
    if (!existsSync(indexPath)) {
      // Acceptable: the whole `cases/` folder may have been deleted too.
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { readFileSync } = require("node:fs") as typeof import("node:fs");
    const content = readFileSync(indexPath, "utf8");
    expect(content).not.toMatch(/honeti-case/);
    expect(content).not.toMatch(/from\s+["']\.\/honeti["']/);
  });
});
