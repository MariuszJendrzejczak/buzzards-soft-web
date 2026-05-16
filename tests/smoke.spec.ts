import { test, expect } from "@playwright/test";

const SECTION_IDS = [
  "hero",
  "how-i-work",
  "what-i-can-deliver",
  "portfolio",
  "currently-learning",
  "about",
  "education",
  "contact",
] as const;

test.describe("home page (pl)", () => {
  test("renders every section in order", async ({ page }) => {
    await page.goto("/pl");

    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    const heading = page.getByRole("heading", { level: 1 }).first();
    await expect(heading).toBeVisible();
  });

  test("language toggle switches to /en and /sv", async ({ page }) => {
    await page.goto("/pl");

    await page.getByRole("button", { name: /^EN —/ }).click();
    await page.waitForURL("**/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.getByRole("button", { name: /^SV —/ }).click();
    await page.waitForURL("**/sv");
    await expect(page.locator("html")).toHaveAttribute("lang", "sv");
  });
});

test("portfolio honeti subpage renders", async ({ page }) => {
  // Sprint 2 replaced the single-card case-study page with a collective view
  // listing 15 apps grouped by stack/role. The legacy "zakres / scope /
  // omfattning" section heading no longer exists; the new page has an H1
  // ("Portfolio Honeti — …") and 4 group H2s starting with the Flutter
  // group. We assert the H1 and at least one group heading is visible.
  await page.goto("/pl/portfolio/honeti");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: /Flutter/i }),
  ).toBeVisible();
});

test.describe("contact form", () => {
  test("empty submit surfaces validation messages", async ({ page }) => {
    await page.goto("/pl#contact");

    const submit = page.getByRole("button", { name: /wyślij wiadomość/i });
    await submit.click();

    // RHF/Zod renders FormMessage nodes per invalid field. We assert that at
    // least two errors appear (name + email + message would be three; allowing
    // two keeps the test resilient to copy tweaks).
    const errors = page.locator('[id$="-form-item-message"]:not(:empty), p[role="alert"]');
    await expect(errors.first()).toBeVisible();
  });

  // shadcn FormControl is a <div> wrapping the input, so <FormLabel htmlFor>
  // points at the wrapper rather than the input itself — `getByLabel` does not
  // resolve it. We address inputs by their react-hook-form `name=` attribute,
  // which is the stable contract.
  test("valid submit shows success toast (mocked /api/contact)", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      }),
    );

    await page.goto("/pl#contact");

    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page
      .locator('textarea[name="message"]')
      .fill(
        "To jest testowa wiadomość o długości większej niż 20 znaków, żeby zod schema się ucieszyła.",
      );

    await page.getByRole("button", { name: /wyślij wiadomość/i }).click();

    await expect(page.getByText(/dziękuję, odezwę się wkrótce/i)).toBeVisible({
      timeout: 5_000,
    });
  });

  test("rate-limited backend shows rate-limit toast", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "rate_limited" }),
      }),
    );

    await page.goto("/pl#contact");

    await page.locator('input[name="name"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page
      .locator('textarea[name="message"]')
      .fill("To jest testowa wiadomość o długości większej niż 20 znaków.");

    await page.getByRole("button", { name: /wyślij wiadomość/i }).click();

    await expect(
      page.locator('[data-sonner-toast][data-type="error"]'),
    ).toBeVisible({ timeout: 5_000 });
  });
});
