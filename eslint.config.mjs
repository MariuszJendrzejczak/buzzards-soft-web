import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local-only / generated trees (gitignored, not part of the web app):
    "coverage/**",
    "v1_flutter/**",
    "doc-local/**",
    "sprint-portfolio-integration/**",
    "ds-bundle/**",
    ".ds-sync/**",
    ".design-sync/**",
    "scripts/_tmp/**",
    // Vendored framework toolchain (managed by /canon-update, not app code):
    ".claude/**",
  ]),
]);

export default eslintConfig;
