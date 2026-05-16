import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// The HoneticHero subtree pulls `@/i18n/routing`, which transitively imports
// `next/navigation` — unresolvable under vitest+jsdom. The honetic-hero unit
// suite uses the same stub; we keep the contract identical here so the link
// surfaces with a fake locale prefix.
vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={`/en${href}`} {...rest}>
      {children}
    </a>
  ),
}));

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
  typeof import("@/components/portfolio/PortfolioSection").PortfolioSection
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

  const mod = await import("@/components/portfolio/PortfolioSection");
  return mod.PortfolioSection;
}

afterEach(() => {
  vi.doUnmock("@/lib/config/feature-flags");
  vi.resetModules();
  cleanup();
});

describe("<PortfolioSection> — wrapper structure (flag off, default)", () => {
  it("renders the H2 heading from portfolio.title", async () => {
    const PortfolioSection = await loadFreshSection();
    renderWithIntl(<PortfolioSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe(enMessages.portfolio.title);
  });

  it("renders the intro paragraph from portfolio.intro", async () => {
    const PortfolioSection = await loadFreshSection();
    renderWithIntl(<PortfolioSection />);
    expect(
      screen.getByText(enMessages.portfolio.intro),
    ).toBeInTheDocument();
  });

  it("uses the default id='portfolio' for the anchor target", async () => {
    const PortfolioSection = await loadFreshSection();
    const { container } = renderWithIntl(<PortfolioSection />);
    const section = container.querySelector("section#portfolio");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe("portfolio-heading");
  });

  it("allows the consumer to override the anchor id", async () => {
    const PortfolioSection = await loadFreshSection();
    const { container } = renderWithIntl(
      <PortfolioSection id="custom-anchor" />,
    );
    expect(container.querySelector("section#custom-anchor")).not.toBeNull();
    expect(container.querySelector("section#portfolio")).toBeNull();
  });

  it("renders the HoneticHero subsection (4.1) inside", async () => {
    const PortfolioSection = await loadFreshSection();
    const { container } = renderWithIntl(<PortfolioSection />);
    expect(
      container.querySelector("section#portfolio-honeti"),
    ).not.toBeNull();
  });

  it("renders the WarsztatGrid subsection (4.3) inside", async () => {
    const PortfolioSection = await loadFreshSection();
    const { container } = renderWithIntl(<PortfolioSection />);
    expect(
      container.querySelector("section#portfolio-warsztat"),
    ).not.toBeNull();
  });

  it("does NOT render the gated AgentPortfolioSection (4.2) when the flag is false", async () => {
    const PortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: false,
    });
    renderWithIntl(<PortfolioSection />);
    expect(screen.queryByTestId("agent-portfolio-section")).toBeNull();
  });

  it("subsections render in the documented order: 4.1 (honeti) before 4.3 (warsztat)", async () => {
    const PortfolioSection = await loadFreshSection();
    const { container } = renderWithIntl(<PortfolioSection />);
    const honeti = container.querySelector("section#portfolio-honeti");
    const warsztat = container.querySelector("section#portfolio-warsztat");
    expect(honeti).not.toBeNull();
    expect(warsztat).not.toBeNull();
    // DOCUMENT_POSITION_FOLLOWING (bit 4) — honeti is followed by warsztat.
    expect(
      honeti!.compareDocumentPosition(warsztat!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("merges a user-supplied className on the wrapper section", async () => {
    const PortfolioSection = await loadFreshSection();
    const { container } = renderWithIntl(
      <PortfolioSection className="custom-portfolio-wrapper" />,
    );
    const section = container.querySelector("section#portfolio");
    expect(section?.className).toContain("custom-portfolio-wrapper");
  });
});

describe("<PortfolioSection> — wrapper structure (flag on)", () => {
  it("renders all three subsections in order when AGENT_PORTFOLIO_SECTION_LIVE is true", async () => {
    const PortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    const { container } = renderWithIntl(<PortfolioSection />);
    const honeti = container.querySelector("section#portfolio-honeti");
    const agent = container.querySelector("section#portfolio-agent");
    const warsztat = container.querySelector("section#portfolio-warsztat");

    expect(honeti).not.toBeNull();
    expect(agent).not.toBeNull();
    expect(warsztat).not.toBeNull();

    expect(
      honeti!.compareDocumentPosition(agent!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      agent!.compareDocumentPosition(warsztat!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders the agent-portfolio-section test-id when the flag is on", async () => {
    const PortfolioSection = await loadFreshSection({
      AGENT_PORTFOLIO_SECTION_LIVE: true,
    });
    renderWithIntl(<PortfolioSection />);
    expect(
      screen.getByTestId("agent-portfolio-section"),
    ).toBeInTheDocument();
  });
});
