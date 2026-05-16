import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const V2_REACT = path.resolve(__dirname, "..", "..");

describe("Sprint 3 Session 2 cleanup — temporary routes / scaffolding", () => {
  it("/dev/portfolio-atoms route does NOT exist in the working tree (task d)", () => {
    const p = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "dev",
      "portfolio-atoms",
      "page.tsx",
    );
    expect(existsSync(p), `${p} should NOT exist`).toBe(false);
  });

  it("empty /portfolio/[slug] scaffolding has been retired (folded-in MINOR concern, option b)", () => {
    const slugDir = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "portfolio",
      "[slug]",
    );
    expect(
      existsSync(slugDir),
      `${slugDir} should NOT exist after retirement`,
    ).toBe(false);
  });

  it("cases/index.ts is gone (no longer imported by sitemap.ts)", () => {
    const p = path.join(
      V2_REACT,
      "app",
      "[locale]",
      "portfolio",
      "[slug]",
      "cases",
      "index.ts",
    );
    expect(existsSync(p)).toBe(false);
  });
});
