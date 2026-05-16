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

import { HoneticHero } from "@/components/portfolio/HoneticHero";
import { getHoneticApp } from "@/lib/portfolio/honeti-apps";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

const HERO_SLUGS = [
  "infoshare",
  "uprawnienia-budowlane",
  "gastro-ninja-klient",
] as const;

describe("<HoneticHero>", () => {
  it("renders the H3 heading from the i18n key portfolio.honeti.title", () => {
    renderWithIntl(<HoneticHero />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).toBe(enMessages.portfolio.honeti.title);
  });

  it("renders the role-line under the heading", () => {
    renderWithIntl(<HoneticHero />);
    expect(
      screen.getByText(enMessages.portfolio.honeti["role-line"]),
    ).toBeInTheDocument();
  });

  it("renders all 3 hero mini-cards (Infoshare / Uprawnienia Budowlane / Gastro Ninja Klient)", () => {
    const { container } = renderWithIntl(<HoneticHero />);
    for (const slug of HERO_SLUGS) {
      const card = container.querySelector(`[data-slug='${slug}']`);
      expect(card, `mini-card for ${slug} should render`).not.toBeNull();
      const app = getHoneticApp(slug);
      expect(app).toBeDefined();
      expect(screen.getByText(app!.name)).toBeInTheDocument();
    }
  });

  it("renders both stack chips — Flutter (primary) and Unity (legacy)", () => {
    const { container } = renderWithIntl(<HoneticHero />);
    const flutterChips = container.querySelectorAll("[data-stack='Flutter']");
    const unityChips = container.querySelectorAll("[data-stack='Unity']");
    // At least one of each in the section (header + cards count too — we
    // only assert presence here, not exact count).
    expect(flutterChips.length).toBeGreaterThanOrEqual(1);
    expect(unityChips.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the inline technology tags Dart, Riverpod, REST API, Firebase, Clean Architecture, CI/CD", () => {
    renderWithIntl(<HoneticHero />);
    for (const tag of [
      "Dart",
      "Riverpod",
      "REST API",
      "Firebase",
      "Clean Architecture",
      "CI/CD",
    ]) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("does not render a 'Unity (legacy)' tag", () => {
    renderWithIntl(<HoneticHero />);
    expect(screen.queryByText(/Unity \(legacy\)/i)).toBeNull();
  });

  it("renders the CTA link pointing to /portfolio/honeti", () => {
    renderWithIntl(<HoneticHero />);
    const cta = screen.getByRole("link", {
      name: new RegExp(enMessages.portfolio.honeti["cta-full-list"], "i"),
    });
    expect(cta).toBeInTheDocument();
    // The IntlLink prepends the locale prefix; for the "en" test locale we
    // expect /en/portfolio/honeti.
    expect(cta.getAttribute("href")).toBe("/en/portfolio/honeti");
  });

  it("pulls hero card data from getHoneticApp() — does not hardcode app content", () => {
    renderWithIntl(<HoneticHero />);
    // Smoke check: the Infoshare description from the dataset must appear,
    // not a synthetic component-internal string.
    const app = getHoneticApp("infoshare");
    expect(app).toBeDefined();
    expect(screen.getByText(app!.description)).toBeInTheDocument();
  });

  it("section has a stable id for anchor-link / a11y wiring", () => {
    const { container } = renderWithIntl(<HoneticHero />);
    const section = container.querySelector("section#portfolio-honeti");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe(
      "portfolio-honeti-heading",
    );
  });
});
