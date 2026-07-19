import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppCard } from "@/components/portfolio/AppCard";
import { getHoneticApp } from "@/lib/portfolio/honeti-apps";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

// Representative apps covering all link variants encoded in the dataset:
//   - googleLink + appleLink  -> Infoshare
//   - googleLink only          -> Gastro Ninja Kelner
//   - external (no stores)     -> Gen / Oczami Dziecka
//   - Unity stack variant      -> Gastro Ninja Klient
//   - rozwoj-i-serwis role     -> Soildata
const infoshare = getHoneticApp("infoshare");
const kelner = getHoneticApp("gastro-ninja-kelner");
const gen = getHoneticApp("gen-oczami-dziecka");
const gastro = getHoneticApp("gastro-ninja-klient");
const soildata = getHoneticApp("soildata");

if (!infoshare || !kelner || !gen || !gastro || !soildata) {
  throw new Error(
    "test fixture: representative apps must exist in HONETI_APPS",
  );
}

describe("<AppCard>", () => {
  it("renders the app name as a heading", () => {
    renderWithIntl(<AppCard app={infoshare} />);
    expect(
      screen.getByRole("heading", { name: infoshare.name }),
    ).toBeInTheDocument();
  });

  it("renders the description text from the dataset", () => {
    renderWithIntl(<AppCard app={infoshare} />);
    expect(screen.getByText(infoshare.description)).toBeInTheDocument();
  });

  it("sets id={app.slug} on the outer wrapper so #slug anchors land here", () => {
    const { container } = renderWithIntl(<AppCard app={infoshare} />);
    const wrapper = container.querySelector(`#${infoshare.slug}`);
    expect(wrapper).not.toBeNull();
    expect(wrapper?.tagName).toBe("ARTICLE");
  });

  it("wrapper has scroll-mt-24 so anchor jumps clear the sticky header", () => {
    const { container } = renderWithIntl(<AppCard app={infoshare} />);
    const wrapper = container.querySelector(`#${infoshare.slug}`);
    expect(wrapper?.className).toContain("scroll-mt-24");
  });

  it("renders <StackChip> with the app's stack", () => {
    renderWithIntl(<AppCard app={infoshare} />);
    const stack = document.querySelector(`[data-stack='${infoshare.stack}']`);
    expect(stack).not.toBeNull();
    expect(stack?.textContent).toBe(infoshare.stack);
  });

  it("renders <RoleBadge> with the app's role", () => {
    renderWithIntl(<AppCard app={infoshare} />);
    const role = document.querySelector(`[data-role='${infoshare.role}']`);
    expect(role).not.toBeNull();
  });

  it("renders the Unity stack variant for Unity apps", () => {
    renderWithIntl(<AppCard app={gastro} />);
    const stack = document.querySelector(`[data-stack='Unity']`);
    expect(stack).not.toBeNull();
    expect(stack?.className).toContain("purple");
  });

  it("renders the rozwoj-i-serwis role variant for Soildata", () => {
    renderWithIntl(<AppCard app={soildata} />);
    const role = document.querySelector(`[data-role='rozwoj-i-serwis']`);
    expect(role).not.toBeNull();
    // Neutral role → semantic foreground token (was raw `gray-*`; moved for
    // light-theme legibility — see pilot-portfolio-badges.md).
    expect(role?.className).toContain("text-foreground/70");
    expect(role?.className).not.toContain("emerald");
  });

  it("renders every contribution item as a list element under a <ul>", () => {
    const { container } = renderWithIntl(<AppCard app={infoshare} />);
    const list = container.querySelector("ul");
    expect(list).not.toBeNull();
    expect(list?.className).toContain("list-disc");
    expect(list?.className).toContain("list-inside");
    const items = list?.querySelectorAll("li") ?? [];
    expect(items).toHaveLength(infoshare.contribution.length);
    const itemTexts = Array.from(items).map((li) => li.textContent);
    for (const c of infoshare.contribution) {
      expect(itemTexts).toContain(c);
    }
  });

  it("renders both Google Play and App Store icons for an app with both links", () => {
    renderWithIntl(<AppCard app={infoshare} />);
    expect(
      screen.getByLabelText(enMessages.portfolio.storeLink.googlePlay),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(enMessages.portfolio.storeLink.appStore),
    ).toBeInTheDocument();
  });

  it("renders only the Google Play icon when appleLink is absent", () => {
    renderWithIntl(<AppCard app={kelner} />);
    expect(
      screen.getByLabelText(enMessages.portfolio.storeLink.googlePlay),
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(enMessages.portfolio.storeLink.appStore),
    ).toBeNull();
  });

  it("renders only the external link for an app distributed outside stores (Gen)", () => {
    renderWithIntl(<AppCard app={gen} />);
    expect(gen.external).toBeDefined();
    const externalLabel = gen.external?.label ?? "";
    expect(screen.getByLabelText(externalLabel)).toBeInTheDocument();
    expect(
      screen.queryByLabelText(enMessages.portfolio.storeLink.googlePlay),
    ).toBeNull();
    expect(
      screen.queryByLabelText(enMessages.portfolio.storeLink.appStore),
    ).toBeNull();
  });

  it("external link points at the external.url and opens in a new tab", () => {
    renderWithIntl(<AppCard app={gen} />);
    const link = screen.getByLabelText(gen.external?.label ?? "") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe(gen.external?.url);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("Google Play link points at the app's googleLink and opens in a new tab", () => {
    renderWithIntl(<AppCard app={infoshare} />);
    const link = screen.getByLabelText(
      enMessages.portfolio.storeLink.googlePlay,
    ) as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe(infoshare.googleLink);
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("merges a user-supplied className on the outer wrapper", () => {
    const { container } = renderWithIntl(
      <AppCard app={infoshare} className="custom-card-class" />,
    );
    const wrapper = container.querySelector(`#${infoshare.slug}`);
    expect(wrapper?.className).toContain("custom-card-class");
  });

  it("renders the app icon when iconSrc is set", () => {
    const { container } = renderWithIntl(<AppCard app={infoshare} />);
    const icon = container.querySelector("img[aria-hidden]");
    expect(icon).not.toBeNull();
    const src = decodeURIComponent(icon?.getAttribute("src") ?? "");
    expect(src).toContain(infoshare.iconSrc ?? "");
  });

  it("does not produce nested <a> elements (HTML validity)", () => {
    const { container } = renderWithIntl(<AppCard app={gen} />);
    const anchors = container.querySelectorAll("a");
    for (const a of anchors) {
      let parent = a.parentElement;
      while (parent && parent !== container) {
        expect(parent.tagName).not.toBe("A");
        parent = parent.parentElement;
      }
    }
  });
});
