import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WarsztatHeroTile } from "@/components/portfolio/WarsztatHeroTile";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

describe("<WarsztatHeroTile>", () => {
  it("renders the hero title from portfolio.warsztat.hero.title", () => {
    renderWithIntl(<WarsztatHeroTile />);
    expect(
      screen.getByText(enMessages.portfolio.warsztat.hero.title),
    ).toBeInTheDocument();
  });

  it("renders the hero description from portfolio.warsztat.hero.description", () => {
    renderWithIntl(<WarsztatHeroTile />);
    expect(
      screen.getByText(enMessages.portfolio.warsztat.hero.description),
    ).toBeInTheDocument();
  });

  it("renders all three artifact chips", () => {
    const { container } = renderWithIntl(<WarsztatHeroTile />);
    const chips = container.querySelectorAll("[data-warsztat-hero-chip]");
    expect(chips).toHaveLength(3);
  });

  it("chips contain BRIEF.md, CLAUDE.md and SPRINT_RULES.md labels from i18n", () => {
    const { container } = renderWithIntl(<WarsztatHeroTile />);
    const labels = Array.from(
      container.querySelectorAll("[data-warsztat-hero-chip]"),
    ).map((el) => el.textContent);
    expect(labels).toContain(enMessages.portfolio.warsztat.hero.chip.brief);
    expect(labels).toContain(
      enMessages.portfolio.warsztat.hero.chip.claudeMd,
    );
    expect(labels).toContain(enMessages.portfolio.warsztat.hero.chip.rules);
  });

  it("renders a Lucide SVG icon for the hero tile", () => {
    const { container } = renderWithIntl(<WarsztatHeroTile />);
    const svg = container.querySelector("svg.lucide");
    expect(svg).not.toBeNull();
  });

  it("applies the emerald accent classes to satisfy hero visual treatment", () => {
    const { container } = renderWithIntl(<WarsztatHeroTile />);
    const article = container.querySelector("article[data-warsztat-hero]");
    expect(article).not.toBeNull();
    expect(article?.className).toContain("bg-emerald-500/5");
    expect(article?.className).toContain("border-emerald-500/30");
  });

  it("spans 2 columns on desktop (lg:col-span-2)", () => {
    const { container } = renderWithIntl(<WarsztatHeroTile />);
    const article = container.querySelector("article[data-warsztat-hero]");
    expect(article?.className).toContain("lg:col-span-2");
  });

  it("the chip list has an accessible label", () => {
    const { container } = renderWithIntl(<WarsztatHeroTile />);
    const list = container.querySelector("ul[aria-label]");
    expect(list).not.toBeNull();
    expect(list?.getAttribute("aria-label")).toBe(
      enMessages.portfolio.warsztat.hero.chipsAria,
    );
  });

  it("merges a user-supplied className on the wrapper article", () => {
    const { container } = renderWithIntl(
      <WarsztatHeroTile className="custom-hero-class" />,
    );
    const article = container.querySelector("article[data-warsztat-hero]");
    expect(article?.className).toContain("custom-hero-class");
  });
});
