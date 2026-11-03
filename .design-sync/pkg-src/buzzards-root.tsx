"use client";

import { useEffect, type ReactNode } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { IntlProvider, type AbstractIntlMessages } from "use-intl";

import { cn } from "@/lib/utils";
import en from "@/messages/en.json";
import pl from "@/messages/pl.json";
import sv from "@/messages/sv.json";

export type BuzzardsLocale = "pl" | "en" | "sv";

const MESSAGES: Record<BuzzardsLocale, AbstractIntlMessages> = { pl, en, sv };

export type BuzzardsRootProps = {
  /** Colour theme. The site ships dark-by-default; light is the fallback theme. */
  theme?: "dark" | "light";
  /** UI language for every component that reads translations (PL is the source of truth). */
  locale?: BuzzardsLocale;
  className?: string;
  children?: ReactNode;
};

function ApplyTheme({ theme }: { theme: "dark" | "light" }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(theme);
  }, [setTheme, theme]);
  return null;
}

/**
 * Root wrapper for every Buzzards Soft screen. It sets the theme class on
 * `<html>` (so portalled popups such as Select and Sheet are themed as well),
 * provides the site's real translation messages to `useTranslations`, and
 * paints the page background, text colour and body font. Components that read
 * translations (RoleBadge, StoreLink, AgentProjectCard, Warsztat tiles…) throw
 * outside it.
 */
export function BuzzardsRoot({
  theme = "dark",
  locale = "pl",
  className,
  children,
}: BuzzardsRootProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem={false}
      storageKey="buzzards-ds-theme"
      disableTransitionOnChange
    >
      <ApplyTheme theme={theme} />
      <IntlProvider
        locale={locale}
        messages={MESSAGES[locale]}
        timeZone="Europe/Warsaw"
      >
        <div
          className={cn(
            "bg-background text-foreground font-sans antialiased",
            className,
          )}
        >
          {children}
        </div>
      </IntlProvider>
    </ThemeProvider>
  );
}
