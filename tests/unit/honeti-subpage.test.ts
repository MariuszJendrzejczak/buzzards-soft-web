import { describe, expect, it, vi } from "vitest";

// The Server Component module transitively imports `@/i18n/routing` which
// pulls in `next/navigation`; vitest+jsdom can't resolve that ESM path. We
// only exercise `generateStaticParams` here — a pure function over the
// locales array — so a minimal stub for the routing module is enough.
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["pl", "en", "sv"] as const,
    defaultLocale: "pl",
  },
  Link: () => null,
}));

// page.tsx also imports `@/lib/seo` and lucide-react; those are tree-shaken
// when only the named export `generateStaticParams` is referenced, but we
// still need lucide-react to load. It's plain ESM and works under jsdom.

describe("/portfolio/honeti static route", () => {
  it("generateStaticParams emits one entry per configured locale", async () => {
    const mod = await import("@/app/[locale]/portfolio/honeti/page");
    const params = mod.generateStaticParams();
    expect(params).toHaveLength(3);
    for (const locale of ["pl", "en", "sv"] as const) {
      expect(params).toContainEqual({ locale });
    }
  });

  it("generateStaticParams covers all three locales (pl, en, sv) in sorted order", async () => {
    const mod = await import("@/app/[locale]/portfolio/honeti/page");
    const locales = mod.generateStaticParams().map((p) => p.locale);
    expect(locales.sort()).toEqual(["en", "pl", "sv"]);
  });
});
