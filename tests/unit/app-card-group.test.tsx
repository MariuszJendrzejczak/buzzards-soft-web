import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppCardGroup } from "@/components/portfolio/AppCardGroup";
import {
  HONETI_APPS_BY_STACK_ROLE,
  getHoneticApp,
} from "@/lib/portfolio/honeti-apps";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

describe("<AppCardGroup>", () => {
  it("renders the H2 from the supplied i18n key", () => {
    renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
      />,
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe(
      enMessages.portfolio.honeti.group["flutter"],
    );
  });

  it("wires aria-labelledby to the heading id", () => {
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
      />,
    );
    const section = container.querySelector("section");
    const heading = container.querySelector("h2");
    expect(section).not.toBeNull();
    expect(heading).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe(
      heading?.getAttribute("id"),
    );
  });

  it("uses `groupId` as a stable section anchor target", () => {
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="unity"
        titleKey="portfolio.honeti.group.unity"
      />,
    );
    const section = container.querySelector("section");
    expect(section?.getAttribute("id")).toBe("unity");
  });

  it("renders a placeholder stub when `placeholder` is true and no children given", () => {
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
        placeholder
      />,
    );
    const stub = container.querySelector(
      "[data-group-placeholder='flutter-od-zera']",
    );
    expect(stub).not.toBeNull();
  });

  it("placeholder stub references the app count when an `apps` list is passed", () => {
    const flutterOdZera = HONETI_APPS_BY_STACK_ROLE.Flutter["od-zera"];
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
        apps={flutterOdZera}
        placeholder
      />,
    );
    const stub = container.querySelector(
      "[data-group-placeholder='flutter-od-zera']",
    );
    expect(stub).not.toBeNull();
    expect(stub?.textContent).toMatch(new RegExp(String(flutterOdZera.length)));
  });

  it("renders children inside a grid when provided (Session 4 escape hatch)", () => {
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
      >
        <div data-testid="child-card" />
        <div data-testid="child-card" />
      </AppCardGroup>,
    );
    // No placeholder stub when children are present.
    expect(
      container.querySelector("[data-group-placeholder]"),
    ).toBeNull();
    expect(screen.getAllByTestId("child-card")).toHaveLength(2);
  });

  it("section has `scroll-mt-24` so anchor jumps clear the sticky header", () => {
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
      />,
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("scroll-mt-24");
  });

  it("renders nothing in the body when no children, no apps, and placeholder is false", () => {
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
      />,
    );
    // Heading is still present, but no placeholder stub.
    expect(container.querySelector("h2")).not.toBeNull();
    expect(
      container.querySelector("[data-group-placeholder]"),
    ).toBeNull();
  });

  it("merges a user-supplied className on the section", () => {
    const { container } = renderWithIntl(
      <AppCardGroup
        groupId="flutter-od-zera"
        titleKey="portfolio.honeti.group.flutter"
        className="custom-group-class"
      />,
    );
    const section = container.querySelector("section");
    expect(section?.className).toContain("custom-group-class");
  });

  // Sanity check: the apps the page composes for each group are still in the
  // canonical dataset (guards against silent dataset drift between sessions).
  it("Flutter od-zera group covers exactly 5 apps from the canonical dataset", () => {
    const apps = HONETI_APPS_BY_STACK_ROLE.Flutter["od-zera"];
    expect(apps).toHaveLength(5);
    expect(apps.map((a) => a.slug)).toEqual([
      "infoshare",
      "uprawnienia-budowlane",
      "testy-prawnicze",
      "gastro-ninja-kelner",
      "gastro-ninja-kurier",
    ]);
  });

  it("Unity od-zera group covers exactly the 4 educational series apps", () => {
    const apps = HONETI_APPS_BY_STACK_ROLE.Unity["od-zera"];
    expect(apps).toHaveLength(4);
    expect(apps.map((a) => a.slug).sort()).toEqual(
      ["der-die-das", "flags", "irregular-verbs", "words-en"].sort(),
    );
  });

  it("Unity rozwoj-i-serwis group covers exactly 6 maintenance apps", () => {
    const apps = HONETI_APPS_BY_STACK_ROLE.Unity["rozwoj-i-serwis"];
    expect(apps).toHaveLength(6);
    expect(apps.map((a) => a.slug).sort()).toEqual(
      [
        "gastro-ninja-klient",
        "gen-oczami-dziecka",
        "multiplication",
        "exponents",
        "roman",
        "soildata",
      ].sort(),
    );
  });
});
