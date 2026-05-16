import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

type FeatureFlagsShape = {
  HOME_STORAGE_MVP_LIVE: boolean;
  POLILOCALE_REPO_PUBLIC: boolean;
  AGENT_PORTFOLIO_SECTION_LIVE: boolean;
};

async function loadFreshSection(
  flags: Partial<FeatureFlagsShape> = {},
): Promise<
  typeof import("@/components/portfolio/AgentPortfolioSection").AgentPortfolioSection
> {
  const merged: FeatureFlagsShape = {
    HOME_STORAGE_MVP_LIVE: false,
    POLILOCALE_REPO_PUBLIC: false,
    AGENT_PORTFOLIO_SECTION_LIVE: false,
    ...flags,
  };

  vi.resetModules();
  vi.doMock("@/lib/config/feature-flags", () => ({
    HOME_STORAGE_MVP_LIVE: merged.HOME_STORAGE_MVP_LIVE,
    POLILOCALE_REPO_PUBLIC: merged.POLILOCALE_REPO_PUBLIC,
    AGENT_PORTFOLIO_SECTION_LIVE: merged.AGENT_PORTFOLIO_SECTION_LIVE,
    FEATURE_FLAGS: merged,
  }));

  const mod = await import("@/components/portfolio/AgentPortfolioSection");
  return mod.AgentPortfolioSection;
}

afterEach(() => {
  vi.doUnmock("@/lib/config/feature-flags");
  vi.resetModules();
  cleanup();
});

describe("<AgentPortfolioSection> — gating behavior", () => {
  it("renders nothing in the DOM when AGENT_PORTFOLIO_SECTION_LIVE is false (default)", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: false,
    });
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    // Gate must produce null — not just hidden via CSS, not just empty section.
    expect(container.firstChild).toBeNull();
    expect(screen.queryByTestId("agent-portfolio-section")).toBeNull();
  });

  it("renders the section when AGENT_PORTFOLIO_SECTION_LIVE is true", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    renderWithIntl(<AgentPortfolioSection />);
    expect(screen.getByTestId("agent-portfolio-section")).toBeInTheDocument();
  });

  it("stays hidden when only HOME_STORAGE_MVP_LIVE is true (computed flag still false)", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      HOME_STORAGE_MVP_LIVE: true,
      POLILOCALE_REPO_PUBLIC: false,
      AGENT_PORTFOLIO_SECTION_LIVE: false,
    });
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    expect(container.firstChild).toBeNull();
  });

  it("stays hidden when only POLILOCALE_REPO_PUBLIC is true (computed flag still false)", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      HOME_STORAGE_MVP_LIVE: false,
      POLILOCALE_REPO_PUBLIC: true,
      AGENT_PORTFOLIO_SECTION_LIVE: false,
    });
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    expect(container.firstChild).toBeNull();
  });
});

describe("<AgentPortfolioSection> — content (flag on)", () => {
  it("renders the H3 heading from portfolio.agent.title", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    renderWithIntl(<AgentPortfolioSection />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).toBe(enMessages.portfolio.agent.title);
  });

  it("renders the intro sentence from portfolio.agent.intro", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    renderWithIntl(<AgentPortfolioSection />);
    expect(
      screen.getByText(enMessages.portfolio.agent.intro),
    ).toBeInTheDocument();
  });

  it("section has a stable id and aria-labelledby for anchor / a11y wiring", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const section = container.querySelector("section#portfolio-agent");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe(
      "portfolio-agent-heading",
    );
  });

  it("renders exactly 3 agent-project cards", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const cards = container.querySelectorAll("[data-agent-project]");
    expect(cards).toHaveLength(3);
  });

  it("renders the 3 cards in expected order (home-storage / polilocale / buzzards-soft)", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const cards = container.querySelectorAll("[data-agent-project]");
    expect(cards[0]?.getAttribute("data-agent-project")).toBe("home-storage");
    expect(cards[1]?.getAttribute("data-agent-project")).toBe("polilocale");
    expect(cards[2]?.getAttribute("data-agent-project")).toBe("buzzards-soft");
  });

  it("uses a responsive grid (1 col mobile / 2 col sm / 3 col lg) on the card container", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    const { container } = renderWithIntl(<AgentPortfolioSection />);
    const grid = container.querySelector("[data-agent-projects-grid]");
    expect(grid).not.toBeNull();
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("sm:grid-cols-2");
    expect(grid?.className).toContain("lg:grid-cols-3");
  });

  it("merges a user-supplied className on the wrapper section", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    const { container } = renderWithIntl(
      <AgentPortfolioSection className="custom-agent-section" />,
    );
    const section = container.querySelector("section#portfolio-agent");
    expect(section?.className).toContain("custom-agent-section");
  });

  it("renders the Home Storage card title (anonymous placeholder)", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    renderWithIntl(<AgentPortfolioSection />);
    expect(
      screen.getByText(enMessages.portfolio.agent.homeStorage.title),
    ).toBeInTheDocument();
  });

  it("renders the Polilocale card title (anonymous placeholder)", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    renderWithIntl(<AgentPortfolioSection />);
    expect(
      screen.getByText(enMessages.portfolio.agent.polilocale.title),
    ).toBeInTheDocument();
  });

  it("renders the buzzards-soft.com card title (final content)", async () => {
    const AgentPortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    renderWithIntl(<AgentPortfolioSection />);
    expect(
      screen.getByText(enMessages.portfolio.agent.buzzards.title),
    ).toBeInTheDocument();
  });
});
