import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  // Vitest unit suites live under `tests/unit/` and import `vitest` directly,
  // which Playwright cannot evaluate. Restrict Playwright to e2e specs at the
  // `tests/` root and skip the unit subtree.
  testMatch: ["*.spec.ts"],
  testIgnore: ["unit/**"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    // App uses `[locale]` segment + Firebase hosting handles `/` → `/pl`
    // redirect at deploy time. Locally there is no middleware, so probe a
    // real locale-prefixed page instead of the bare root.
    url: `${BASE_URL}/pl`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
