import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link, routing, type Locale } from "@/i18n/routing";
import { buildAlternates, pageSocial } from "@/lib/seo";
import { MobileHero } from "@/components/sections/mobile-offer/mobile-hero";
import { MobileAudience } from "@/components/sections/mobile-offer/mobile-audience";
import { MobileExamples } from "@/components/sections/mobile-offer/mobile-examples";
import { MobileGuide } from "@/components/sections/mobile-offer/mobile-guide";
import { MobileIncludes } from "@/components/sections/mobile-offer/mobile-includes";
import { MobilePricing } from "@/components/sections/mobile-offer/mobile-pricing";
import { MobileComparison } from "@/components/sections/mobile-offer/mobile-comparison";
import { MobilePublishing } from "@/components/sections/mobile-offer/mobile-publishing";
import { MobileOwnership } from "@/components/sections/mobile-offer/mobile-ownership";
import { MobileFaq } from "@/components/sections/mobile-offer/mobile-faq";
import { MobileQuote } from "@/components/sections/mobile-offer/mobile-quote";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "mobileOffer" });
  const typedLocale = locale as Locale;
  const alternates = buildAlternates(typedLocale, "/mobile-apps-offer");
  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    alternates,
    ...pageSocial({
      locale: typedLocale,
      title,
      description,
      canonical: alternates.canonical,
    }),
  };
}

export default async function MobileAppsOfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("mobileOffer");

  return (
    <article className="relative isolate">
      <div className="mx-auto w-full max-w-7xl px-6 pt-12 sm:px-8 sm:pt-16">
        <nav aria-label="Breadcrumb">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t("breadcrumbBack")}
          </Link>
        </nav>
      </div>

      {/* DRAFT — mobile-apps offer. Sections ordered on the SB7 spine, mirroring
          the web offer (/web-pages-offer) with mobile-specific additions:
          examples, tier comparison, and store-publishing honesty. */}
      <MobileHero />
      <MobileAudience />
      <MobileExamples />
      <MobileGuide />
      <MobileIncludes />
      <MobilePricing />
      <MobileComparison />
      <MobilePublishing />
      <MobileOwnership />
      <MobileFaq />
      <MobileQuote />
    </article>
  );
}
