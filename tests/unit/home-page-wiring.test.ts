import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const HOME_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "app",
  "[locale]",
  "page.tsx",
);

describe("app/[locale]/page.tsx — Sprint 3 Session 2 refactor", () => {
  it("imports <PortfolioSection> as the new section-4 wrapper", () => {
    const src = readFileSync(HOME_PATH, "utf8");
    expect(src).toMatch(
      /import\s+\{\s*PortfolioSection\s*\}\s+from\s+["']@\/components\/portfolio\/PortfolioSection["']/,
    );
  });

  it("renders <PortfolioSection id='portfolio'> in the home tree", () => {
    const src = readFileSync(HOME_PATH, "utf8");
    expect(src).toMatch(/<PortfolioSection\s+id=["']portfolio["']/);
  });

  it("no longer renders the three individual section components on the home page", () => {
    const src = readFileSync(HOME_PATH, "utf8");
    // Direct insertions are gone — they live inside <PortfolioSection> now.
    expect(src).not.toMatch(/<HoneticHero\s*\/>/);
    expect(src).not.toMatch(/<AgentPortfolioSection\s*\/>/);
    expect(src).not.toMatch(/<WarsztatGrid\s*\/>/);
  });

  it("no longer imports the three sub-components directly (they come via PortfolioSection)", () => {
    const src = readFileSync(HOME_PATH, "utf8");
    expect(src).not.toMatch(/from\s+["']@\/components\/portfolio\/HoneticHero["']/);
    expect(src).not.toMatch(
      /from\s+["']@\/components\/portfolio\/AgentPortfolioSection["']/,
    );
    expect(src).not.toMatch(
      /from\s+["']@\/components\/portfolio\/WarsztatGrid["']/,
    );
  });

  it("no longer renders the legacy <Experience /> section (retired in Sprint 3 Session 3.5)", () => {
    const src = readFileSync(HOME_PATH, "utf8");
    expect(src).not.toMatch(/<Experience\s*\/>/);
  });

  it("no longer imports the legacy Experience component (retired in Sprint 3 Session 3.5)", () => {
    const src = readFileSync(HOME_PATH, "utf8");
    expect(src).not.toMatch(
      /from\s+["']@\/components\/sections\/experience\/experience["']/,
    );
    // Defensive: nothing on the home should pull from the deleted file path.
    expect(src).not.toMatch(/experience\/experience-card/);
  });
});
