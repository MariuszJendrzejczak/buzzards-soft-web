import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { HONETI_APPS } from "@/lib/portfolio/honeti-apps";
import plMessages from "@/messages/pl.json";
import enMessages from "@/messages/en.json";
import svMessages from "@/messages/sv.json";

// Integration test against the static export under `out/` produced by
// `npm run build` (Next.js `output: "export"`). The orchestrator ran the
// build before dispatching this session — these tests fail fast if the
// build has not been refreshed, so the next runner re-runs `npm run build`
// before re-dispatching.

const OUT_DIR = path.resolve(__dirname, "..", "..", "out");
const LOCALES = ["pl", "en", "sv"] as const;
type Locale = (typeof LOCALES)[number];

const honetiHtmlPath = (locale: Locale) =>
  path.join(OUT_DIR, locale, "portfolio", "honeti.html");

function loadHtml(locale: Locale): string {
  const p = honetiHtmlPath(locale);
  if (!existsSync(p)) {
    throw new Error(
      `Missing SSG output: ${p}. Run \`npm run build\` from the repo root before this test.`,
    );
  }
  return readFileSync(p, "utf8");
}

describe("SSG output — /portfolio/honeti per locale", () => {
  it.each(LOCALES)(
    "out/%s/portfolio/honeti.html exists",
    (locale) => {
      expect(
        existsSync(honetiHtmlPath(locale)),
        `expected ${honetiHtmlPath(locale)} to exist`,
      ).toBe(true);
    },
  );

  it("pl/portfolio/honeti.html renders the localized PL H1 ('Portfolio dla Honeti')", () => {
    const html = loadHtml("pl");
    expect(html).toContain(plMessages.portfolio.honeti["subpage-title"]);
    expect(html).toMatch(/Portfolio dla Honeti/);
  });

  it("en/portfolio/honeti.html renders the EN H1 ('Portfolio for Honeti')", () => {
    const html = loadHtml("en");
    expect(html).toContain(enMessages.portfolio.honeti["subpage-title"]);
  });

  it("sv/portfolio/honeti.html renders the SV H1", () => {
    const html = loadHtml("sv");
    expect(html).toContain(svMessages.portfolio.honeti["subpage-title"]);
  });

  it.each(LOCALES)(
    "%s output contains the names of all 15 apps from HONETI_APPS",
    (locale) => {
      const html = loadHtml(locale);
      const missing = HONETI_APPS.filter((app) => !html.includes(app.name)).map(
        (a) => a.name,
      );
      expect(
        missing,
        `${locale}: missing app names in SSG output: ${missing.join(", ") || "(none)"}`,
      ).toEqual([]);
    },
  );

  it("pl output exposes id=\"infoshare\" so /portfolio/honeti#infoshare anchor lands on a real element", () => {
    const html = loadHtml("pl");
    expect(html).toContain('id="infoshare"');
  });

  it.each(LOCALES)(
    "%s output exposes id anchors for ALL 15 app slugs",
    (locale) => {
      const html = loadHtml(locale);
      const missingAnchors = HONETI_APPS.filter(
        (app) => !html.includes(`id="${app.slug}"`),
      ).map((a) => a.slug);
      expect(
        missingAnchors,
        `${locale}: missing anchor ids: ${missingAnchors.join(", ") || "(none)"}`,
      ).toEqual([]);
    },
  );

  it.each(LOCALES)(
    "%s output exposes id anchors for the 2 group sections (flutter, unity)",
    (locale) => {
      const html = loadHtml(locale);
      for (const groupId of ["flutter", "unity"]) {
        expect(
          html.includes(`id="${groupId}"`),
          `${locale}: missing group anchor id="${groupId}"`,
        ).toBe(true);
      }
    },
  );

  // Note: Session 3 deleted `app/[locale]/portfolio/[slug]/page.tsx` because
  // Next.js 16 + `output: "export"` rejects dynamic routes with empty
  // `generateStaticParams`. So `/portfolio/honeti` is currently the ONLY
  // static route under `/portfolio/*`. Future Sprint 3+ may reintroduce
  // others — this test then becomes a "must include honeti.html" check.
  it("pl/portfolio currently exposes exactly the honeti.html route (no orphan dynamic routes)", () => {
    const dir = path.join(OUT_DIR, "pl", "portfolio");
    const htmls = readdirSync(dir).filter((f) => f.endsWith(".html"));
    expect(htmls).toContain("honeti.html");
    // Re-scope per orchestrator note: only honeti.html is expected today.
    expect(htmls).toEqual(["honeti.html"]);
  });

  it.each(LOCALES)(
    "%s/portfolio exposes the honeti.html route",
    (locale) => {
      const dir = path.join(OUT_DIR, locale, "portfolio");
      const htmls = readdirSync(dir).filter((f) => f.endsWith(".html"));
      expect(htmls).toContain("honeti.html");
    },
  );

  it.each(LOCALES)(
    "%s output contains the Gen / Oczami Dziecka external-link URL (no googleLink path)",
    (locale) => {
      const html = loadHtml(locale);
      // Gen is the only external-only app; verifies <StoreLink external> branch
      // actually emitted markup, not just app name.
      expect(html).toContain("https://gen.edu.pl/");
    },
  );

  it.each(LOCALES)(
    "%s output contains the Infoshare appleLink (only app with one)",
    (locale) => {
      const html = loadHtml(locale);
      expect(html).toContain("https://apps.apple.com/app/id6443543236");
    },
  );

  it("HONETI_APPS still ships exactly 15 apps (sanity guard for SSG assertions above)", () => {
    expect(HONETI_APPS).toHaveLength(15);
  });
});
