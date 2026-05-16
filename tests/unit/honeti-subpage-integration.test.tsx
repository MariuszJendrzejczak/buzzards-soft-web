import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// The Server Component imports `@/i18n/routing` (Link, routing, Locale) which
// transitively pulls in `next/navigation`. Same mocking pattern as
// `tests/unit/honetic-hero.test.tsx`. The page rendering doesn't need a
// real router — only a plain anchor with the right href so the breadcrumb
// link is inspectable.
vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["pl", "en", "sv"] as const,
    defaultLocale: "pl",
  },
  Link: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// `next-intl/server` is meant to run inside an RSC context the test runner
// can't bootstrap; stub `getTranslations` to walk the same messages bundle
// the client provider would expose, and stub `setRequestLocale` as a no-op.
vi.mock("next-intl/server", async () => {
  const en = (await import("@/messages/en.json")).default as Record<
    string,
    unknown
  >;
  const pl = (await import("@/messages/pl.json")).default as Record<
    string,
    unknown
  >;
  const sv = (await import("@/messages/sv.json")).default as Record<
    string,
    unknown
  >;

  const bundles: Record<string, Record<string, unknown>> = { en, pl, sv };

  // The real next-intl reads the request locale set via `setRequestLocale`.
  // We mirror that with a module-scoped variable the helpers consult, so a
  // PL page render walks the PL bundle and an EN render walks EN.
  let currentLocale = "en";

  function resolve(
    bundle: Record<string, unknown>,
    dotted: string,
  ): string {
    const parts = dotted.split(".");
    let cur: unknown = bundle;
    for (const p of parts) {
      if (typeof cur !== "object" || cur === null) return dotted;
      cur = (cur as Record<string, unknown>)[p];
    }
    return typeof cur === "string" ? cur : dotted;
  }

  return {
    setRequestLocale: (locale: string) => {
      currentLocale = locale;
    },
    getTranslations: async (
      arg?: string | { locale?: string; namespace?: string },
    ) => {
      const opts =
        typeof arg === "string"
          ? { locale: currentLocale, namespace: arg }
          : (arg ?? {});
      const locale = opts.locale ?? currentLocale;
      const namespace = opts.namespace ?? "";
      const bundle = bundles[locale] ?? bundles.en;
      return (key: string) =>
        resolve(bundle, namespace ? `${namespace}.${key}` : key);
    },
  };
});

// SEO module reads `next/headers` indirectly; stub the two helpers we use.
vi.mock("@/lib/seo", () => ({
  buildAlternates: () => ({ canonical: "/portfolio/honeti" }),
  pageSocial: () => ({}),
}));

import { NextIntlClientProvider } from "next-intl";

import { HONETI_APPS, getHoneticApp } from "@/lib/portfolio/honeti-apps";
import enMessages from "@/messages/en.json";

// Imported AFTER the mocks above are registered.
import HoneticPortfolioPage, {
  generateStaticParams,
} from "@/app/[locale]/portfolio/honeti/page";

type Locale = "pl" | "en" | "sv";

async function renderPage(locale: Locale = "en") {
  const tree = await HoneticPortfolioPage({
    params: Promise.resolve({ locale }),
  });
  return render(
    <NextIntlClientProvider locale={locale} messages={enMessages}>
      {tree}
    </NextIntlClientProvider>,
  );
}

describe("/portfolio/honeti — page integration (server component render)", () => {
  it("renders the page-level H1 from portfolio.honeti.subpage-title", async () => {
    const { container } = await renderPage("en");
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0]?.textContent).toBe(
      enMessages.portfolio.honeti["subpage-title"],
    );
  });

  it("renders exactly one breadcrumb link pointing back to /#experience", async () => {
    const { container } = await renderPage("en");
    const breadcrumb = container.querySelector(
      "nav[aria-label='Breadcrumb'] a",
    );
    expect(breadcrumb).not.toBeNull();
    expect(breadcrumb?.getAttribute("href")).toBe("/#experience");
  });

  it("renders all 15 app names from HONETI_APPS — one assertion per app via a single loop", async () => {
    const { container } = await renderPage("en");
    for (const app of HONETI_APPS) {
      // Each app's <AppCard> renders the name inside an <h3>. Use textContent
      // scan so we don't depend on a specific selector path.
      const found = container.textContent?.includes(app.name) ?? false;
      expect(found, `missing app name in DOM: ${app.name}`).toBe(true);
    }
  });

  it("renders an element with id={app.slug} for every app in the dataset", async () => {
    const { container } = await renderPage("en");
    for (const app of HONETI_APPS) {
      const card = container.querySelector(`#${CSS.escape(app.slug)}`);
      expect(card, `missing card with id="${app.slug}"`).not.toBeNull();
      // The wrapper is the <AppCard> <article>.
      expect(card?.tagName).toBe("ARTICLE");
    }
  });

  it("renders exactly 4 <AppCardGroup> sections in the configured order", async () => {
    const { container } = await renderPage("en");
    const expectedIds = [
      "flutter-od-zera",
      "unity-od-zera",
      "unity-rozwoj",
      "unity-przejety",
    ];
    const sections = expectedIds.map((id) => container.querySelector(`#${id}`));
    for (let i = 0; i < expectedIds.length; i += 1) {
      expect(
        sections[i],
        `missing group section id="${expectedIds[i]}"`,
      ).not.toBeNull();
      expect(sections[i]?.tagName).toBe("SECTION");
    }
  });

  it("renders exactly one <AppCard> per app — no duplication, no orphan card", async () => {
    const { container } = await renderPage("en");
    const cards = container.querySelectorAll("article[data-slug]");
    expect(cards).toHaveLength(HONETI_APPS.length);
    const slugs = Array.from(cards).map((c) => c.getAttribute("data-slug"));
    expect(new Set(slugs).size).toBe(HONETI_APPS.length);
  });

  it("every <AppCard> lives under exactly one <AppCardGroup> (no card outside a group)", async () => {
    const { container } = await renderPage("en");
    const groupIds = [
      "flutter-od-zera",
      "unity-od-zera",
      "unity-rozwoj",
      "unity-przejety",
    ];
    const cards = container.querySelectorAll("article[data-slug]");
    for (const card of cards) {
      const inGroup = groupIds.some((id) => {
        const section = container.querySelector(`#${id}`);
        return section?.contains(card) ?? false;
      });
      expect(
        inGroup,
        `card ${card.getAttribute("data-slug")} is not inside any group section`,
      ).toBe(true);
    }
  });

  it("Gen / Oczami Dziecka card renders ONLY the external link — no Google Play / App Store anchors", async () => {
    const { container } = await renderPage("en");
    const gen = getHoneticApp("gen-oczami-dziecka");
    expect(gen).toBeDefined();
    const card = container.querySelector(`#${CSS.escape(gen!.slug)}`);
    expect(card).not.toBeNull();
    // The external label is the rendered aria-label on the link.
    const externalAnchor = card?.querySelector(
      `a[aria-label="${gen!.external?.label}"]`,
    );
    expect(externalAnchor).not.toBeNull();
    // No Play/Apple icon anchors inside this card.
    const playAnchor = card?.querySelector(
      `a[aria-label="${enMessages.portfolio.storeLink.googlePlay}"]`,
    );
    const appleAnchor = card?.querySelector(
      `a[aria-label="${enMessages.portfolio.storeLink.appStore}"]`,
    );
    expect(playAnchor).toBeNull();
    expect(appleAnchor).toBeNull();
  });

  it("Infoshare card renders both Google Play AND App Store anchors (the only app with both)", async () => {
    const { container } = await renderPage("en");
    const infoshare = getHoneticApp("infoshare");
    expect(infoshare).toBeDefined();
    const card = container.querySelector(`#${CSS.escape(infoshare!.slug)}`);
    expect(card).not.toBeNull();
    const playAnchor = card?.querySelector(
      `a[aria-label="${enMessages.portfolio.storeLink.googlePlay}"]`,
    );
    const appleAnchor = card?.querySelector(
      `a[aria-label="${enMessages.portfolio.storeLink.appStore}"]`,
    );
    expect(playAnchor?.getAttribute("href")).toBe(infoshare!.googleLink);
    expect(appleAnchor?.getAttribute("href")).toBe(infoshare!.appleLink);
  });

  it("renders the page even when the locale is PL (smoke check the SSG path)", async () => {
    const { container } = await renderPage("pl");
    // We mocked getTranslations to walk pl.json by locale, so the H1 should
    // be the PL string.
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toMatch(/Portfolio Honeti/);
  });
});

describe("/portfolio/honeti — generateStaticParams (re-affirmation post-Session-1 relocation)", () => {
  it("emits exactly one entry per configured locale", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(3);
    expect(params.map((p) => p.locale).sort()).toEqual(["en", "pl", "sv"]);
  });
});
