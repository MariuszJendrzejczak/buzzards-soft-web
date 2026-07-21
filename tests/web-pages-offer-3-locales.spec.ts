import { expect, test } from "@playwright/test";

import enMessages from "../messages/en.json";
import plMessages from "../messages/pl.json";
import svMessages from "../messages/sv.json";

const LOCALE_DATA = [
  { locale: "pl", messages: plMessages },
  { locale: "en", messages: enMessages },
  { locale: "sv", messages: svMessages },
] as const;

for (const { locale, messages } of LOCALE_DATA) {
  test.describe(`/web-pages-offer (${locale})`, () => {
    test("page responds 200", async ({ page }) => {
      const response = await page.goto(`/${locale}/web-pages-offer`);
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);
    });

    test("renders the localized H1 from offer.hero.heading", async ({ page }) => {
      await page.goto(`/${locale}/web-pages-offer`);
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText(messages.offer.hero.heading);

      // Anti-regression: an unresolved next-intl key surfaces the dotted path
      // verbatim, so the rendered H1 must never equal the key itself.
      expect(messages.offer.hero.heading).not.toBe("offer.hero.heading");
    });
  });
}
