import { expect, test } from "@playwright/test";

import enMessages from "../messages/en.json";
import plMessages from "../messages/pl.json";
import svMessages from "../messages/sv.json";

// Task (b) of Sprint 3 Session 4. For each locale we verify the home page
// renders the localized H2, the three sub-sections (4.1 / 4.3 always; 4.2
// only when AGENT_PORTFOLIO_SECTION_LIVE is true at build time), the
// Portfolio nav link is visible, and clicking the nav link scrolls into the
// portfolio section.
//
// Runs against `npm run dev` (see playwright.config.ts). The dev server's
// feature-flag state is whatever the local .env file sets — by default in
// this repo it's OFF/OFF, so the AgentPortfolioSection (4.2) must NOT exist
// in DOM. The matrix-cell-on assertions are gated by an env probe so the
// same spec can re-run against an ON/ON dev server without false failures.

const MATRIX_BUILD = process.env.ENV_FLAGS_MATRIX_BUILD ?? "off-off";

const LOCALE_DATA = [
  { locale: "pl", messages: plMessages, htmlLang: "pl" },
  { locale: "en", messages: enMessages, htmlLang: "en" },
  { locale: "sv", messages: svMessages, htmlLang: "sv" },
] as const;

for (const { locale, messages, htmlLang } of LOCALE_DATA) {
  test.describe(`home page (${locale}) — portfolio section`, () => {
    test(`renders <html lang="${htmlLang}">`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", htmlLang);
    });

    test(`renders the localized H2 "${messages.portfolio.title}"`, async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      const heading = page.locator("section#portfolio h2#portfolio-heading");
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText(messages.portfolio.title);
    });

    test("renders the portfolio intro paragraph", async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("section#portfolio")).toContainText(
        messages.portfolio.intro,
      );
    });

    test("renders the 4.1 HoneticHero subsection inside the portfolio section", async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      const honeti = page.locator("section#portfolio-honeti");
      await expect(honeti).toBeVisible();
      // The Honeti subsection h3 title comes from portfolio.honeti.title.
      await expect(honeti.locator("h3#portfolio-honeti-heading")).toHaveText(
        messages.portfolio.honeti.title,
      );
    });

    test("renders the 4.3 WarsztatGrid subsection inside the portfolio section", async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      const warsztat = page.locator("section#portfolio-warsztat");
      await expect(warsztat).toBeVisible();
      await expect(warsztat).toContainText(messages.portfolio.warsztat.title);
    });

    test("subsections appear in the order: 4.1 (honeti) → (4.2 if flag on) → 4.3 (warsztat)", async ({
      page,
    }) => {
      await page.goto(`/${locale}`);
      const orderedIds = await page
        .locator(
          "section#portfolio section[id^='portfolio-']",
        )
        .evaluateAll((els) => els.map((el) => el.id));
      // Honeti always first, warsztat always last; agent (if present) in between.
      expect(orderedIds[0]).toBe("portfolio-honeti");
      expect(orderedIds[orderedIds.length - 1]).toBe("portfolio-warsztat");
    });

    if (MATRIX_BUILD === "on-on") {
      test("renders the 4.2 AgentPortfolioSection (ENV_FLAGS_MATRIX_BUILD=on-on)", async ({
        page,
      }) => {
        await page.goto(`/${locale}`);
        const agent = page.getByTestId("agent-portfolio-section");
        await expect(agent).toBeVisible();
      });
    } else {
      test("does NOT render the 4.2 AgentPortfolioSection in DOM (default OFF state)", async ({
        page,
      }) => {
        await page.goto(`/${locale}`);
        // Hard assertion: the element must not exist at all (the gate
        // returns null in React, not display:none).
        await expect(page.getByTestId("agent-portfolio-section")).toHaveCount(0);
        await expect(page.locator("section#portfolio-agent")).toHaveCount(0);
      });
    }

    test(`header nav exposes the "Portfolio" link in ${locale} (text: "${messages.nav.items.portfolio}")`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`/${locale}`);
      const nav = page.getByRole("navigation", {
        name: messages.nav.mainAria,
      });
      const link = nav.getByRole("link", {
        name: messages.nav.items.portfolio,
        exact: true,
      });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", "#portfolio");
    });

    test("clicking the header Portfolio link scrolls the portfolio section into view", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`/${locale}`);

      // Start above the section, then click and verify scroll.
      const section = page.locator("section#portfolio");
      await expect(section).toBeAttached();

      const startScrollY = await page.evaluate(() => window.scrollY);

      const nav = page.getByRole("navigation", {
        name: messages.nav.mainAria,
      });
      await nav
        .getByRole("link", { name: messages.nav.items.portfolio, exact: true })
        .click();

      // Wait for the URL hash to update (proxy for navigation handler firing)
      // and for the page to have moved meaningfully.
      await expect.poll(() => page.url()).toMatch(/#portfolio$/);

      // The section's bounding box should now overlap the viewport top
      // (allowing for the sticky header gap). Polling lets the smooth-scroll
      // animation, if any, settle without a flaky fixed sleep.
      await expect
        .poll(
          async () =>
            await section.evaluate((el) => {
              const r = el.getBoundingClientRect();
              return Math.round(r.top);
            }),
          { timeout: 4000 },
        )
        .toBeLessThan(120);

      const endScrollY = await page.evaluate(() => window.scrollY);
      expect(endScrollY).toBeGreaterThan(startScrollY);
    });
  });
}
