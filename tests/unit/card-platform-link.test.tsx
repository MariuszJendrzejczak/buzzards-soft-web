import { cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AgentCardLink } from "@/components/portfolio/AgentCardLink";
import { CardDeviceLink } from "@/components/portfolio/CardDeviceLink";
import type { AgentProjectLink, HoneticApp } from "@/lib/portfolio/types";

const GOOGLE = "https://play.google.com/store/apps/details?id=x";
const APPLE = "https://apps.apple.com/app/id1";

const app: HoneticApp = {
  slug: "x",
  name: "X",
  stack: "Flutter",
  role: "od-zera",
  googleLink: GOOGLE,
  appleLink: APPLE,
  description: "",
  contribution: [],
};

const links: readonly AgentProjectLink[] = [
  { kind: "homepage", url: "https://example.com" },
  { kind: "google", url: GOOGLE },
  { kind: "apple", url: APPLE },
];

const UA = {
  ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
  android: "Mozilla/5.0 (Linux; Android 14; Pixel 8)",
  macos: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)",
  windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

function withUserAgent(ua: string) {
  vi.spyOn(window.navigator, "userAgent", "get").mockReturnValue(ua);
}

function hrefOf(container: HTMLElement) {
  return container.querySelector("[data-card-link]")?.getAttribute("href");
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe.each([
  ["CardDeviceLink", () => <CardDeviceLink app={app}>X</CardDeviceLink>],
  ["AgentCardLink", () => <AgentCardLink links={links}>X</AgentCardLink>],
])("<%s> platform-aware link", (_name, element) => {
  it.each([
    ["ios", APPLE],
    ["macos", APPLE],
    ["android", GOOGLE],
    ["windows", GOOGLE],
  ] as const)("on %s points at %s", (platform, expected) => {
    withUserAgent(UA[platform]);
    const { container } = render(element());
    expect(hrefOf(container)).toBe(expected);
  });

  it("server render (static export) uses the Google-first fallback", () => {
    withUserAgent(UA.ios);
    const html = renderToString(element());
    expect(html).toContain(`href="${GOOGLE.replace(/&/g, "&amp;")}"`);
  });
});
