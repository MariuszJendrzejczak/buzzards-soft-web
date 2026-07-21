import { describe, expect, it, vi } from "vitest";

// Mirror the minimal `@/i18n/routing` stub used by sitemap.test.ts — the
// sitemap imports `routing.locales` and `hreflangFor` only.
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["pl", "en", "sv"] as const,
    defaultLocale: "pl",
  },
}));

import sitemap from "@/app/sitemap";

describe("app/sitemap.ts — /web-pages-offer route", () => {
  it("advertises /web-pages-offer in all 3 locales", () => {
    const entries = sitemap();
    const offerUrls = entries
      .filter((e) => e.url.endsWith("/web-pages-offer"))
      .map((e) => e.url)
      .sort();

    expect(offerUrls).toEqual([
      "https://buzzards-soft.com/en/web-pages-offer",
      "https://buzzards-soft.com/pl/web-pages-offer",
      "https://buzzards-soft.com/sv/web-pages-offer",
    ]);
  });

  it("/web-pages-offer entries ship at priority 0.8", () => {
    const entries = sitemap();
    const offerEntries = entries.filter((e) =>
      e.url.endsWith("/web-pages-offer"),
    );
    expect(offerEntries).toHaveLength(3);
    for (const entry of offerEntries) {
      expect(entry.priority).toBe(0.8);
    }
  });

  it("/web-pages-offer entries have a monthly changeFrequency", () => {
    const entries = sitemap();
    const offerEntries = entries.filter((e) =>
      e.url.endsWith("/web-pages-offer"),
    );
    for (const entry of offerEntries) {
      expect(entry.changeFrequency).toBe("monthly");
    }
  });

  it("each /web-pages-offer entry exposes its 3 hreflang alternates pointing to /web-pages-offer per locale", () => {
    const entries = sitemap();
    const offerEntries = entries.filter((e) =>
      e.url.endsWith("/web-pages-offer"),
    );
    for (const entry of offerEntries) {
      const languages = entry.alternates?.languages ?? {};
      expect(languages["pl-PL"]).toBe(
        "https://buzzards-soft.com/pl/web-pages-offer",
      );
      expect(languages["en-US"]).toBe(
        "https://buzzards-soft.com/en/web-pages-offer",
      );
      expect(languages["sv-SE"]).toBe(
        "https://buzzards-soft.com/sv/web-pages-offer",
      );
    }
  });
});
