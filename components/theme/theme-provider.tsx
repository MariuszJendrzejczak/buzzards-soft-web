"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * App-Router theme provider (next-themes). Uses the `class` strategy so the
 * active theme sets `class="dark"` on `<html>` (matching the `.dark` token
 * layer + the `@custom-variant dark` in globals.css). `defaultTheme="dark"`
 * preserves the shipped look; `enableSystem` lets a user opt into their OS
 * preference. The injected inline script applies the class before hydration,
 * so there is no flash under static export (`output: 'export'`).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
