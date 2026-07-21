import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { routing, type Locale } from "@/i18n/routing";
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  TITLE_DEFAULT,
  TITLE_TEMPLATE,
  alternateOgLocales,
  buildAlternates,
  ogLocaleFor,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display voice for headings (--font-heading → --font-display), distinct from
// the body Geist — token-contract §4.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "rootMetadata" });
  const description = t("description");
  const alternates = buildAlternates(typedLocale, "");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: TITLE_DEFAULT,
      template: TITLE_TEMPLATE,
    },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: "Mariusz Jendrzejczak", url: SITE_URL }],
    creator: "Mariusz Jendrzejczak",
    publisher: SITE_NAME,
    alternates,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: TITLE_DEFAULT,
      description,
      url: alternates.canonical,
      locale: ogLocaleFor(typedLocale),
      alternateLocale: alternateOgLocales(typedLocale),
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
      title: TITLE_DEFAULT,
      description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main id="main" className="flex flex-1 flex-col">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" richColors closeButton />
          </NextIntlClientProvider>
        </ThemeProvider>
        <JsonLd locale={locale as Locale} />
      </body>
    </html>
  );
}
