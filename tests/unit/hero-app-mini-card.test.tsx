import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// `@/i18n/routing` ultimately calls next-intl's `createNavigation`, which
// imports `next/navigation`. Under vitest+jsdom the ESM resolution for
// `next/navigation` breaks; we don't need real next-intl routing here, just
// a plain anchor that surfaces `href`.
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

import { HeroAppMiniCard } from "@/components/portfolio/HeroAppMiniCard";
import { getHoneticApp } from "@/lib/portfolio/honeti-apps";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

const infoshare = getHoneticApp("infoshare");
const uprawnienia = getHoneticApp("uprawnienia-budowlane");
const gastro = getHoneticApp("gastro-ninja-klient");

if (!infoshare || !uprawnienia || !gastro) {
  throw new Error("test fixture: hero apps must exist in HONETI_APPS");
}

describe("<HeroAppMiniCard>", () => {
  it("renders app name, stack, role badge, and description", () => {
    renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    expect(screen.getByText(infoshare.name)).toBeInTheDocument();
    const stack = document.querySelector(`[data-stack='${infoshare.stack}']`);
    const role = document.querySelector(`[data-role='${infoshare.role}']`);
    expect(stack).not.toBeNull();
    expect(role).not.toBeNull();
    expect(screen.getByText(infoshare.description)).toBeInTheDocument();
  });

  it("wraps the card content with a `<article data-slug>` (not <a>, to keep store anchors HTML-valid)", () => {
    const { container } = renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    const wrapper = container.querySelector(`[data-slug='${infoshare.slug}']`);
    expect(wrapper).not.toBeNull();
    // Outer is NOT an <a> — store-link icons inside are <a>s and nested
    // anchors are invalid HTML.
    expect(wrapper?.tagName).toBe("ARTICLE");
  });

  it("title link points to /portfolio/honeti#<slug> (with locale prefix)", () => {
    const { container } = renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    const cardLink = container.querySelector(
      "[data-card-link]",
    ) as HTMLAnchorElement | null;
    expect(cardLink).not.toBeNull();
    expect(cardLink?.tagName).toBe("A");
    expect(cardLink?.getAttribute("href")).toBe(
      `/en/portfolio/honeti#${infoshare.slug}`,
    );
    // The card link is exactly the app name; it's the focus target for
    // keyboard / SR users.
    expect(cardLink?.textContent).toBe(infoshare.name);
  });

  it("uses an `::after` overlay to extend the card's hit-area without nesting anchors", () => {
    const { container } = renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    const cardLink = container.querySelector(
      "[data-card-link]",
    ) as HTMLElement | null;
    expect(cardLink?.className).toContain("after:absolute");
    expect(cardLink?.className).toContain("after:inset-0");
  });

  it("renders both Google Play and App Store icons when both links exist", () => {
    renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    expect(
      screen.getByLabelText(enMessages.portfolio.storeLink.googlePlay),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(enMessages.portfolio.storeLink.appStore),
    ).toBeInTheDocument();
  });

  it("renders only the Google Play icon when appleLink is missing", () => {
    renderWithIntl(<HeroAppMiniCard app={uprawnienia} />);
    expect(
      screen.getByLabelText(enMessages.portfolio.storeLink.googlePlay),
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(enMessages.portfolio.storeLink.appStore),
    ).toBeNull();
  });

  it("truncates the description with line-clamp-2", () => {
    const { container } = renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    const paragraph = container.querySelector("p");
    expect(paragraph?.className).toContain("line-clamp-2");
  });

  it("renders the Unity stack variant for Unity apps (gastro-ninja-klient)", () => {
    renderWithIntl(<HeroAppMiniCard app={gastro} />);
    const stack = document.querySelector(`[data-stack='Unity']`);
    expect(stack).not.toBeNull();
    expect(stack?.className).toContain("purple");
  });

  it("the store-link cluster lives above the ::after overlay (z-10) so icon clicks reach the store anchors", () => {
    renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    const storeAnchor = screen.getByLabelText(
      enMessages.portfolio.storeLink.googlePlay,
    );
    const container = storeAnchor.closest(
      "div[class*='mt-auto']",
    ) as HTMLDivElement | null;
    expect(container).not.toBeNull();
    expect(container?.className).toContain("z-10");
    expect(container?.className).toContain("relative");
  });

  it("does not produce nested <a> elements (HTML validity)", () => {
    const { container } = renderWithIntl(<HeroAppMiniCard app={infoshare} />);
    const anchors = container.querySelectorAll("a");
    for (const a of anchors) {
      // Walk up to confirm no ancestor is also an <a>.
      let parent = a.parentElement;
      while (parent && parent !== container) {
        expect(parent.tagName).not.toBe("A");
        parent = parent.parentElement;
      }
    }
  });

  it("merges a user-supplied className on the outer wrapper", () => {
    const { container } = renderWithIntl(
      <HeroAppMiniCard app={infoshare} className="custom-mini-card-class" />,
    );
    const wrapper = container.querySelector(`[data-slug='${infoshare.slug}']`);
    expect(wrapper?.className).toContain("custom-mini-card-class");
  });
});
