import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AgentPortfolioSection } from "@/components/portfolio/AgentPortfolioSection";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

// The AGENT_PORTFOLIO_SECTION_LIVE release gate was retired — the section is now
// a permanent part of the portfolio and always renders (no flag mocking needed).

afterEach(() => {
  cleanup();
});

describe("<AgentPortfolioSection>", () => {
  it("always renders the section (the release gate was retired)", () => {
    renderWithIntl(<AgentPortfolioSection />);
    expect(screen.getByTestId("agent-portfolio-section")).toBeInTheDocument();
  });

  it("renders the H3 heading from portfolio.agent.title", () => {
    renderWithIntl(<AgentPortfolioSection />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).toBe(enMessages.portfolio.agent.title);
  });

  it("renders the intro sentence from portfolio.agent.intro", () => {
    renderWithIntl(<AgentPortfolioSection />);
    expect(
      screen.getByText(enMessages.portfolio.agent.intro),
    ).toBeInTheDocument();
  });

  it("section has a stable id and aria-labelledby for anchor / a11y wiring", () => {
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const section = container.querySelector("section#portfolio-agent");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe(
      "portfolio-agent-heading",
    );
  });

  it("renders exactly 4 agent-project cards", () => {
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const cards = container.querySelectorAll("[data-agent-project]");
    expect(cards).toHaveLength(4);
  });

  it("renders the 4 cards in the expected order", () => {
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const cards = container.querySelectorAll("[data-agent-project]");
    expect(
      Array.from(cards).map((c) => c.getAttribute("data-agent-project")),
    ).toEqual([
      "home-storage",
      "neatu-dashboard",
      "polilocale",
      "buzzards-soft",
    ]);
  });

  it("uses a responsive grid (1 col mobile / 2 col sm / 3 col lg) on the card container", () => {
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const grid = container.querySelector("[data-agent-projects-grid]");
    expect(grid).not.toBeNull();
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("merges a user-supplied className on the wrapper section", () => {
    const { container } = renderWithIntl(
      <AgentPortfolioSection className="custom-agent-section" />,
    );
    const section = container.querySelector("section#portfolio-agent");
    expect(section?.className).toContain("custom-agent-section");
  });

  it("renders every project card title", () => {
    renderWithIntl(<AgentPortfolioSection />);
    const agent = enMessages.portfolio.agent;
    for (const title of [
      agent.homeStorage.title,
      agent.neatuDashboard.title,
      agent.polilocale.title,
      agent.buzzards.title,
    ]) {
      expect(screen.getByText(title), `card "${title}"`).toBeInTheDocument();
    }
  });
});
