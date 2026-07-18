import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WarsztatGrid } from "@/components/portfolio/WarsztatGrid";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

const warsztat = enMessages.portfolio.warsztat;

describe("<WarsztatGrid>", () => {
  it("renders the H3 heading from portfolio.warsztat.title", () => {
    renderWithIntl(<WarsztatGrid />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).toBe(warsztat.title);
  });

  it("renders the eyebrow and intro", () => {
    renderWithIntl(<WarsztatGrid />);
    expect(screen.getByText(warsztat.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(warsztat.intro)).toBeInTheDocument();
  });

  it("section has a stable id and aria-labelledby for anchor / a11y wiring", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    const section = container.querySelector("section#portfolio-warsztat");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe(
      "portfolio-warsztat-heading",
    );
  });

  it("renders the flow panel: label, start and done markers", () => {
    renderWithIntl(<WarsztatGrid />);
    expect(screen.getByText(warsztat.flow.flowLabel)).toBeInTheDocument();
    expect(screen.getByText(warsztat.flow.start)).toBeInTheDocument();
    expect(screen.getByText(warsztat.flow.done)).toBeInTheDocument();
  });

  it("renders all flow stage titles (plan → deploy, incl. the agent zone)", () => {
    renderWithIntl(<WarsztatGrid />);
    const stage = warsztat.flow.stage;
    for (const title of [
      stage.plan.title,
      stage.accept.title,
      stage.agent.build.title,
      stage.agent.test.title,
      stage.agent.review.title,
      stage.humanReview.title,
      stage.live.title,
      stage.deploy.title,
    ]) {
      expect(screen.getByText(title), `stage "${title}"`).toBeInTheDocument();
    }
  });

  it("renders the toolkit band: eyebrow and both methodological pillars", () => {
    renderWithIntl(<WarsztatGrid />);
    expect(screen.getByText(warsztat.toolkit.eyebrow)).toBeInTheDocument();
    expect(
      screen.getByText(warsztat.toolkit.pillar.spec.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(warsztat.toolkit.pillar.context.title),
    ).toBeInTheDocument();
  });

  it("renders exactly 4 enabler tiles", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    const tiles = container.querySelectorAll("[data-warsztat-tile]");
    expect(tiles).toHaveLength(4);
  });

  it("no longer renders the retired hero tile or 6-tile grid container", () => {
    const { container } = renderWithIntl(<WarsztatGrid />);
    expect(container.querySelector("[data-warsztat-hero]")).toBeNull();
    expect(container.querySelector("[data-warsztat-grid]")).toBeNull();
  });

  it("merges a user-supplied className on the wrapper section", () => {
    const { container } = renderWithIntl(
      <WarsztatGrid className="custom-grid-class" />,
    );
    const section = container.querySelector("section#portfolio-warsztat");
    expect(section?.className).toContain("custom-grid-class");
  });
});
