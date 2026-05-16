import { fileURLToPath } from "node:url";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: [
        "lib/portfolio/types.ts",
        "lib/portfolio/honeti-apps.ts",
        "lib/config/feature-flags.ts",
        "components/portfolio/role-badge.tsx",
        "components/portfolio/stack-chip.tsx",
        "components/portfolio/store-link.tsx",
        "components/portfolio/HoneticHero.tsx",
        "components/portfolio/HeroAppMiniCard.tsx",
        "components/portfolio/AppCard.tsx",
        "components/portfolio/AppCardGroup.tsx",
        "components/portfolio/WarsztatGrid.tsx",
        "components/portfolio/WarsztatHeroTile.tsx",
        "components/portfolio/WarsztatTile.tsx",
        "components/FeatureGate.tsx",
      ],
    },
  },
});
