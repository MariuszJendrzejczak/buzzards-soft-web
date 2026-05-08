import type { Metadata } from "next";

import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://buzzards-soft.com";
export const SITE_NAME = "Buzzards Soft";
export const TITLE_TEMPLATE = "%s | Buzzards Soft";
export const TITLE_DEFAULT = "Buzzards Soft — AI-Augmented Developer";
export const OG_IMAGE = "/og-default.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  "Buzzards Soft — AI-Augmented Developer · Flutter, Unity, AI tooling";

const HREFLANG: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-US",
  sv: "sv-SE",
};

const OG_LOCALE: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_US",
  sv: "sv_SE",
};

export function hreflangFor(locale: Locale): string {
  return HREFLANG[locale];
}

export function ogLocaleFor(locale: Locale): string {
  return OG_LOCALE[locale];
}

export function alternateOgLocales(locale: Locale): string[] {
  return routing.locales
    .filter((l): l is Locale => l !== locale)
    .map((l) => OG_LOCALE[l]);
}

/**
 * Builds canonical + hreflang alternates for a given locale-prefixed path
 * (e.g. "/portfolio/honeti"). Pass an empty string for the home route.
 */
export function buildAlternates(
  locale: Locale,
  pathname: string,
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const safe = normalizePath(pathname);
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[HREFLANG[l]] = `/${l}${safe}`;
  }
  languages["x-default"] = `/${routing.defaultLocale}${safe}`;
  return {
    canonical: `/${locale}${safe}`,
    languages,
  };
}

export function absoluteUrl(path: string): string {
  const safe = normalizePath(path);
  return `${SITE_URL}${safe}`;
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/**
 * Builds a full openGraph + twitter pair for a sub-page. Next.js does not
 * deep-merge these fields with the layout, so any page that overrides title
 * or description must re-specify the image, card type, and site metadata.
 */
export function pageSocial({
  locale,
  title,
  description,
  canonical,
  type = "website",
}: {
  locale: Locale;
  title: string;
  description: string;
  canonical: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: ogLocaleFor(locale),
      alternateLocale: alternateOgLocales(locale),
      images: [
        {
          url: OG_IMAGE,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
