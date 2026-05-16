import { expect, test } from "@playwright/test";

import enMessages from "../messages/en.json";
import plMessages from "../messages/pl.json";
import svMessages from "../messages/sv.json";

// HONETI_APPS slugs and names hard-pinned here so the e2e suite doesn't
// transitively pull `@/lib/portfolio/honeti-apps` (which would drag a TS
// path resolver into the Playwright runner). Sprint file says "All 14 apps
// visible" but the dataset ships 15 (5 Flutter + 10 Unity) — the session
// brief's drift caveat clarifies to assert 15.
const HONETI_APP_NAMES = [
  // Flutter — od-zera (5)
  "Infoshare",
  "Uprawnienia Budowlane",
  "Testy Prawnicze",
  "Gastro Ninja Kelner",
  "Gastro Ninja Kurier",
  // Unity — rozwoj-i-serwis (5)
  "Gastro Ninja Klient",
  "Gen / Oczami Dziecka",
  "Tabliczka Mnożenia",
  "Potęgi i Pierwiastki",
  "Cyfry Rzymskie",
  // Unity — od-zera (4)
  "Angielski — słówka i obrazki",
  "Czasowniki nieregularne IQ",
  "Der Die Das",
  "Flagi",
  // Unity — rozwoj-i-serwis includes Soildata after the role merge
  "Soildata",
] as const;

const LOCALE_DATA = [
  { locale: "pl", messages: plMessages },
  { locale: "en", messages: enMessages },
  { locale: "sv", messages: svMessages },
] as const;

for (const { locale, messages } of LOCALE_DATA) {
  test.describe(`/portfolio/honeti (${locale})`, () => {
    test("page responds 200", async ({ page }) => {
      const response = await page.goto(`/${locale}/portfolio/honeti`);
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);
    });

    test("renders the localized H1 from portfolio.honeti.subpage-title", async ({
      page,
    }) => {
      await page.goto(`/${locale}/portfolio/honeti`);
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText(messages.portfolio.honeti["subpage-title"]);
    });

    test("renders the localized lead from portfolio.honeti.subpage-lead", async ({
      page,
    }) => {
      await page.goto(`/${locale}/portfolio/honeti`);
      await expect(
        page.getByText(messages.portfolio.honeti["subpage-lead"], { exact: false }),
      ).toBeVisible();
    });

    test("shows all 3 group title headings localized (not raw i18n keys)", async ({
      page,
    }) => {
      await page.goto(`/${locale}/portfolio/honeti`);
      const groupTitles = [
        messages.portfolio.honeti.group["flutter-od-zera"],
        messages.portfolio.honeti.group["unity-od-zera"],
        messages.portfolio.honeti.group["unity-rozwoj"],
      ];

      for (const title of groupTitles) {
        const heading = page.getByRole("heading", { level: 2, name: title });
        await expect(heading).toBeVisible();
        // Anti-regression: raw key strings must not appear in DOM. If next-intl
        // failed to resolve a key, it surfaces the dotted path verbatim.
        expect(title).not.toMatch(
          /^portfolio\.honeti\.group\.(flutter-od-zera|unity-od-zera|unity-rozwoj)$/,
        );
      }

      // Cross-check: the dotted key itself never leaks into the rendered body.
      const body = await page.locator("body").innerText();
      expect(body).not.toContain("portfolio.honeti.group.");
    });

    test("renders all 15 apps (5 Flutter + 10 Unity) — sprint brief says '14' but dataset is 15", async ({
      page,
    }) => {
      await page.goto(`/${locale}/portfolio/honeti`);
      const articles = page.locator("article[data-slug]");
      await expect(articles).toHaveCount(HONETI_APP_NAMES.length);

      // App names are not locale-translated (they are proper product names),
      // so the same list applies in pl/en/sv.
      for (const name of HONETI_APP_NAMES) {
        await expect(
          page
            .locator("article[data-slug]")
            .filter({ hasText: name })
            .first(),
        ).toBeVisible();
      }
    });

    test("breadcrumb link points to localized back-to-home", async ({ page }) => {
      await page.goto(`/${locale}/portfolio/honeti`);
      const breadcrumb = page.locator("nav[aria-label='Breadcrumb'] a").first();
      await expect(breadcrumb).toBeVisible();
      await expect(breadcrumb).toHaveText(
        new RegExp(messages.portfolio.breadcrumbBack.split(" ")[0], "i"),
      );
    });
  });
}
