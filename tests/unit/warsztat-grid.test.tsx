import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WarsztatGrid } from "@/components/portfolio/WarsztatGrid";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

describe("<WarsztatGrid>", () => {
  it("renders the H3 heading from portfolio.warsztat.title", () => {
    renderWithIntl(<WarsztatGrid />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).toBe(enMessages.portfolio.warsztat.title);
  });

  it("renders the intro sentence from portfolio.warsztat.intro", () => {
    renderWithIntl(<WarsztatGrid />);
    expect(
      screen.getByText(enMessages.portfolio.warsztat.intro),
    ).toBeInTheDocument();
  });

  it("section has a stable id and aria-labelledby for anchor / a11y wiring", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    const section = container.querySelector("section#portfolio-warsztat");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe(
      "portfolio-warsztat-heading",
    );
  });

  it("renders exactly 1 hero tile + 6 standard tiles = 7 tiles total", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    const heroes = container.querySelectorAll("[data-warsztat-hero]");
    const tiles = container.querySelectorAll("[data-warsztat-tile]");
    expect(heroes).toHaveLength(1);
    expect(tiles).toHaveLength(6);
  });

  it("renders all 6 standard tile titles in the configured order", () => {
    renderWithIntl(<WarsztatGrid />);
    for (let i = 1; i <= 6; i += 1) {
      const key = String(i) as "1" | "2" | "3" | "4" | "5" | "6";
      const title = enMessages.portfolio.warsztat.tile[key].title;
      expect(
        screen.getByText(title),
        `tile ${i} title should appear`,
      ).toBeInTheDocument();
    }
  });

  it("uses a responsive grid (1 col mobile / 2 col sm / 3 col lg) on the tile container", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    const grid = container.querySelector("[data-warsztat-grid]");
    expect(grid).not.toBeNull();
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("renders 7 Lucide SVG icons (1 hero + 6 tile icons)", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    // Each tile contributes exactly one lucide svg; hero contributes one too.
    const svgs = container.querySelectorAll("svg.lucide");
    expect(svgs.length).toBeGreaterThanOrEqual(7);
  });

  it("merges a user-supplied className on the wrapper section", () => {
    const { container } = renderWithIntl(
      <WarsztatGrid className="custom-grid-class" />,
    );
    const section = container.querySelector("section#portfolio-warsztat");
    expect(section?.className).toContain("custom-grid-class");
  });

  it("hero tile is the first child of the grid (hero comes before the 6 tiles)", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    const grid = container.querySelector("[data-warsztat-grid]");
    expect(grid).not.toBeNull();
    const firstChild = grid?.firstElementChild;
    expect(firstChild?.getAttribute("data-warsztat-hero")).not.toBeNull();
  });
});
