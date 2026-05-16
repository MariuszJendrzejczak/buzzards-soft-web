import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectLink } from "@/components/portfolio/project-link";
import enMessages from "@/messages/en.json";
import type { AgentProjectLink } from "@/lib/portfolio/types";

import { renderWithIntl } from "./test-utils";

const G_PLAY: AgentProjectLink = {
  kind: "google",
  url: "https://play.google.com/store/apps/details?id=com.example.app",
};
const APP_STORE: AgentProjectLink = {
  kind: "apple",
  url: "https://apps.apple.com/app/id123",
};
const GITHUB: AgentProjectLink = {
  kind: "github",
  url: "https://github.com/example/repo",
};
const HOMEPAGE_EXTERNAL: AgentProjectLink = {
  kind: "homepage",
  url: "https://example.com/",
};
const HOMEPAGE_INTERNAL: AgentProjectLink = {
  kind: "homepage",
  url: "/#portfolio",
};

describe("<ProjectLink>", () => {
  it("renders null when the links array is empty", () => {
    const { container } = renderWithIntl(<ProjectLink links={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders one anchor per link, in input order", () => {
    const { container } = renderWithIntl(
      <ProjectLink links={[G_PLAY, APP_STORE, GITHUB, HOMEPAGE_EXTERNAL]} />,
    );
    const anchors = container.querySelectorAll("a");
    expect(anchors).toHaveLength(4);
    expect(anchors[0]?.getAttribute("data-link-kind")).toBe("google");
    expect(anchors[1]?.getAttribute("data-link-kind")).toBe("apple");
    expect(anchors[2]?.getAttribute("data-link-kind")).toBe("github");
    expect(anchors[3]?.getAttribute("data-link-kind")).toBe("homepage");
  });

  it("sets href to each link's url", () => {
    const { container } = renderWithIntl(
      <ProjectLink links={[G_PLAY, GITHUB]} />,
    );
    const anchors = container.querySelectorAll("a");
    expect(anchors[0]?.getAttribute("href")).toBe(G_PLAY.url);
    expect(anchors[1]?.getAttribute("href")).toBe(GITHUB.url);
  });

  it("uses target=_blank + rel=noopener for external (http) urls", () => {
    const { container } = renderWithIntl(
      <ProjectLink links={[HOMEPAGE_EXTERNAL]} />,
    );
    const anchor = container.querySelector("a");
    expect(anchor?.getAttribute("target")).toBe("_blank");
    expect(anchor?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("omits target/rel for internal urls (starts with /)", () => {
    const { container } = renderWithIntl(
      <ProjectLink links={[HOMEPAGE_INTERNAL]} />,
    );
    const anchor = container.querySelector("a");
    expect(anchor?.getAttribute("target")).toBeNull();
    expect(anchor?.getAttribute("rel")).toBeNull();
  });

  it("omits target/rel for hash-only urls (starts with #)", () => {
    const { container } = renderWithIntl(
      <ProjectLink links={[{ kind: "homepage", url: "#section" }]} />,
    );
    const anchor = container.querySelector("a");
    expect(anchor?.getAttribute("target")).toBeNull();
    expect(anchor?.getAttribute("rel")).toBeNull();
  });

  it("uses i18n labels from portfolio.projectLink for aria-label", () => {
    renderWithIntl(
      <ProjectLink links={[G_PLAY, APP_STORE, GITHUB, HOMEPAGE_EXTERNAL]} />,
    );
    expect(
      screen.getByLabelText(enMessages.portfolio.projectLink.googlePlay),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(enMessages.portfolio.projectLink.appStore),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(enMessages.portfolio.projectLink.github),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(enMessages.portfolio.projectLink.homepage),
    ).toBeInTheDocument();
  });

  it("each anchor contains an icon (image for store/github, lucide for homepage)", () => {
    const { container } = renderWithIntl(
      <ProjectLink links={[G_PLAY, APP_STORE, GITHUB, HOMEPAGE_EXTERNAL]} />,
    );
    const images = container.querySelectorAll("img[aria-hidden]");
    expect(images).toHaveLength(3);
    const svgs = container.querySelectorAll("svg.lucide");
    expect(svgs).toHaveLength(1);
  });

  it("merges a user-supplied className on the outer wrapper", () => {
    const { container } = renderWithIntl(
      <ProjectLink links={[G_PLAY]} className="custom-project-link" />,
    );
    expect(
      (container.firstChild as HTMLElement | null)?.className,
    ).toContain("custom-project-link");
  });
});
