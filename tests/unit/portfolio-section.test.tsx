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

import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

afterEach(() => {
  cleanup();
});

describe("<PortfolioSection> — wrapper structure", () => {
  it("renders the H2 heading from portfolio.title", () => {
    renderWithIntl(<PortfolioSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe(enMessages.portfolio.title);
  });

  it("renders the intro paragraph from portfolio.intro", () => {
    renderWithIntl(<PortfolioSection />);
    expect(screen.getByText(enMessages.portfolio.intro)).toBeInTheDocument();
  });

  it("uses the default id='portfolio' for the anchor target", () => {
    const { container } = renderWithIntl(<PortfolioSection />);
    const section = container.querySelector("section#portfolio");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe("portfolio-heading");
  });

  it("allows the consumer to override the anchor id", () => {
    const { container } = renderWithIntl(
      <PortfolioSection id="custom-anchor" />,
    );
    expect(container.querySelector("section#custom-anchor")).not.toBeNull();
    expect(container.querySelector("section#portfolio")).toBeNull();
  });

  it("renders all three subsections (honeti 4.1 / agent 4.2 / warsztat 4.3)", () => {
    const { container } = renderWithIntl(<PortfolioSection />);
    expect(container.querySelector("section#portfolio-honeti")).not.toBeNull();
    expect(container.querySelector("section#portfolio-agent")).not.toBeNull();
    expect(
      container.querySelector("section#portfolio-warsztat"),
    ).not.toBeNull();
  });

  it("renders the agent-portfolio-section — gate retired, always present", () => {
    renderWithIntl(<PortfolioSection />);
    expect(screen.getByTestId("agent-portfolio-section")).toBeInTheDocument();
  });

  it("renders subsections in documented order: honeti → agent → warsztat", () => {
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

  it("merges a user-supplied className on the wrapper section", () => {
    const { container } = renderWithIntl(
      <PortfolioSection className="custom-portfolio-wrapper" />,
    );
    const section = container.querySelector("section#portfolio");
    expect(section?.className).toContain("custom-portfolio-wrapper");
  });
});
