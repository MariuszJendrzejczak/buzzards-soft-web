import { expect, test } from "@playwright/test";

import enMessages from "../messages/en.json";
import plMessages from "../messages/pl.json";
import svMessages from "../messages/sv.json";

// Task (d) of Sprint 3 Session 4. Routes outside the portfolio surface area
// must keep working after Sprint 3 landed `<PortfolioSection>` and the home
// nav-link rename. We probe the routes that exist under app/[locale]/
// (only the home and privacy-policy at the time of writing — the legacy
// `[slug]` route was deleted in Sprint 3 session 1 per ssg-output test
// comment) and assert no console errors and no raw i18n keys leaking.

const LOCALE_DATA = [
  { locale: "pl", messages: plMessages },
  { locale: "en", messages: enMessages },
  { locale: "sv", messages: svMessages },
] as const;

const ROUTE_PATHS = ["/", "/privacy-policy"] as const;

for (const { locale, messages } of LOCALE_DATA) {
  test.describe(`regression routes (${locale})`, () => {
    for (const routePath of ROUTE_PATHS) {
      test(`/${locale}${routePath === "/" ? "" : routePath} loads with no console errors`, async ({
        page,
      }) => {
        const errors: string[] = [];
        page.on("pageerror", (err) => errors.push(err.message));
        page.on("console", (msg) => {
          if (msg.type() === "error") errors.push(msg.text());
        });

        const url = `/${locale}${routePath === "/" ? "" : routePath}`;
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);

        // Wait briefly for any client-side JS to throw if it would.
        await page.waitForLoadState("domcontentloaded");

        expect(
          errors.filter((e) => !e.includes("favicon")),
          `console / page errors on ${url}: ${errors.join(" | ")}`,
        ).toEqual([]);
      });
    }

    test("home renders the hero section (#hero) — sanity that section 1 still mounts", async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("#hero")).toBeVisible();
    });

    test("home contains every expected anchor section in source order", async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      const expectedAnchors = [
        "hero",
        "how-i-work",
        "what-i-can-deliver",
        "portfolio",
        "currently-learning",
        "about",
        "education",
        "contact",
      ];
      const found = await page.evaluate((ids) =>
        ids.filter((id) => document.getElementById(id) !== null),
        expectedAnchors,
      );
      expect(found).toEqual(expectedAnchors);
    });

    test("privacy-policy page renders its localized H1", async ({ page }) => {
      await page.goto(`/${locale}/privacy-policy`);
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText(messages.privacyPolicy.title);
    });

    test("home does not leak raw i18n keys in the visible body", async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      const body = await page.locator("body").innerText();
      // If next-intl fails to resolve a key it surfaces the dotted path.
      expect(body).not.toMatch(/\bportfolio\.[a-z][a-zA-Z0-9_.-]*\b/);
      expect(body).not.toMatch(/\bnav\.items\.portfolio\b/);
    });
  });
}
