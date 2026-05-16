import { screen } from "@testing-library/react";
import { Settings, Wrench } from "lucide-react";
import { describe, expect, it } from "vitest";

import { WarsztatTile } from "@/components/portfolio/WarsztatTile";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

describe("<WarsztatTile>", () => {
  it("renders the title from the supplied i18n key", () => {
    renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
      />,
    );
    expect(
      screen.getByText(enMessages.portfolio.warsztat.tile["1"].title),
    ).toBeInTheDocument();
  });

  it("renders the description from the supplied i18n key", () => {
    renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
      />,
    );
    expect(
      screen.getByText(enMessages.portfolio.warsztat.tile["1"].description),
    ).toBeInTheDocument();
  });

  it("renders the supplied Lucide icon component", () => {
    const { container } = renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
      />,
    );
    // Lucide forwards an `svg.lucide` element — assert one is in the DOM.
    const svg = container.querySelector("svg.lucide");
    expect(svg).not.toBeNull();
  });

  it("swapping the icon prop renders a different icon component", () => {
    const { container, rerender } = renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
      />,
    );
    const firstClass = container.querySelector("svg.lucide")?.getAttribute("class");

    rerender(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Wrench}
      />,
    );
    const secondClass = container.querySelector("svg.lucide")?.getAttribute("class");

    expect(firstClass).toBeDefined();
    expect(secondClass).toBeDefined();
    // Lucide adds a per-icon class like `lucide-settings` / `lucide-wrench`.
    expect(firstClass).not.toBe(secondClass);
  });

  it("does NOT render the example chip when the `example` prop is absent", () => {
    const { container } = renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
      />,
    );
    expect(
      container.querySelector("[data-warsztat-example]"),
    ).toBeNull();
  });

  it("renders the example chip only when the `example` prop is set", () => {
    const { container } = renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
        example="hookify rule"
      />,
    );
    const chip = container.querySelector("[data-warsztat-example]");
    expect(chip).not.toBeNull();
    expect(chip?.textContent).toBe("hookify rule");
  });

  it("merges a user-supplied className on the wrapper article", () => {
    const { container } = renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
        className="custom-tile-class"
      />,
    );
    const article = container.querySelector("article[data-warsztat-tile]");
    expect(article?.className).toContain("custom-tile-class");
  });

  it("renders an empty example chip when `example` is an empty string (falsy — chip omitted)", () => {
    const { container } = renderWithIntl(
      <WarsztatTile
        titleKey="portfolio.warsztat.tile.1.title"
        descriptionKey="portfolio.warsztat.tile.1.description"
        icon={Settings}
        example=""
      />,
    );
    // Empty string is falsy — chip should not render.
    expect(
      container.querySelector("[data-warsztat-example]"),
    ).toBeNull();
  });
});
