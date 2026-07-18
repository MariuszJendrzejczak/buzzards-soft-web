import { describe, expect, it, vi } from "vitest";

// Mirror the minimal `@/i18n/routing` stub used elsewhere — the sitemap
// imports `routing.locales` and `hreflangFor` only, so a flat object is
// enough.
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["pl", "en", "sv"] as const,
    defaultLocale: "pl",
  },
}));

import sitemap from "@/app/sitemap";

describe("app/sitemap.ts — route set", () => {
  it("emits exactly N routes × 3 locales (home + /portfolio/honeti + /web-pages-offer + /privacy-policy = 12 entries)", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(12);
  });

  it("advertises /portfolio/honeti in all 3 locales (folded-in sprint-002 reviewer MAJOR concern)", () => {
    const entries = sitemap();
    const honetiUrls = entries
      .filter((e) => e.url.endsWith("/portfolio/honeti"))
      .map((e) => e.url)
      .sort();

    expect(honetiUrls).toEqual([
      "https://buzzards-soft.com/en/portfolio/honeti",
      "https://buzzards-soft.com/pl/portfolio/honeti",
      "https://buzzards-soft.com/sv/portfolio/honeti",
    ]);
  });

  it("/portfolio/honeti entries ship at priority 0.9 (matching the upgraded SEO surface)", () => {
    const entries = sitemap();
    const honetiEntries = entries.filter((e) =>
      e.url.endsWith("/portfolio/honeti"),
    );
    expect(honetiEntries).toHaveLength(3);
    for (const entry of honetiEntries) {
      expect(entry.priority).toBe(0.9);
    }
  });

  it("/portfolio/honeti entries have a monthly changeFrequency", () => {
    const entries = sitemap();
    const honetiEntries = entries.filter((e) =>
      e.url.endsWith("/portfolio/honeti"),
    );
    for (const entry of honetiEntries) {
      expect(entry.changeFrequency).toBe("monthly");
    }
  });

  it("includes the home route at priority 1 across all 3 locales", () => {
    const entries = sitemap();
    const homeEntries = entries.filter(
      (e) => e.url.match(/\/(pl|en|sv)$/) !== null,
    );
    expect(homeEntries).toHaveLength(3);
    for (const entry of homeEntries) {
      expect(entry.priority).toBe(1);
    }
  });

  it("includes /privacy-policy at priority 0.3 in all 3 locales", () => {
    const entries = sitemap();
    const ppEntries = entries.filter((e) =>
      e.url.endsWith("/privacy-policy"),
    );
    expect(ppEntries).toHaveLength(3);
    for (const entry of ppEntries) {
      expect(entry.priority).toBe(0.3);
    }
  });

  it("every entry exposes hreflang alternates covering all 3 locales", () => {
    const entries = sitemap();
    for (const entry of entries) {
      const languages = entry.alternates?.languages ?? {};
      const keys = Object.keys(languages).sort();
      expect(keys).toEqual(["en-US", "pl-PL", "sv-SE"]);
    }
  });

  it("each /portfolio/honeti entry exposes its 3 hreflang alternates pointing to /portfolio/honeti per locale", () => {
    const entries = sitemap();
    const honetiEntries = entries.filter((e) =>
      e.url.endsWith("/portfolio/honeti"),
    );
    for (const entry of honetiEntries) {
      const languages = entry.alternates?.languages ?? {};
      expect(languages["pl-PL"]).toBe(
        "https://buzzards-soft.com/pl/portfolio/honeti",
      );
      expect(languages["en-US"]).toBe(
        "https://buzzards-soft.com/en/portfolio/honeti",
      );
      expect(languages["sv-SE"]).toBe(
        "https://buzzards-soft.com/sv/portfolio/honeti",
      );
    }
  });

  it("no entry references the deleted dynamic /portfolio/[slug] surface (cases scaffolding retired)", () => {
    const entries = sitemap();
    // CASE_SLUGS was the previous source for `/portfolio/<slug>` entries;
    // after Sprint 3 Session 2 we publish the static /portfolio/honeti URL
    // directly without going through the empty cases registry.
    const dynamicLikeUrls = entries
      .map((e) => e.url)
      .filter((url) => /\/portfolio\/[^/]+/.test(url))
      .filter((url) => !url.endsWith("/portfolio/honeti"));
    expect(dynamicLikeUrls).toEqual([]);
  });
});
