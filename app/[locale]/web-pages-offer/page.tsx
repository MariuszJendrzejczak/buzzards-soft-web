import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link, routing, type Locale } from "@/i18n/routing";
import { buildAlternates, pageSocial } from "@/lib/seo";
import { OfferHero } from "@/components/sections/offer/offer-hero";
import { OfferProblem } from "@/components/sections/offer/offer-problem";
import { OfferGuide } from "@/components/sections/offer/offer-guide";
import { OfferIncludes } from "@/components/sections/offer/offer-includes";
import { OfferPricing } from "@/components/sections/offer/offer-pricing";
import { OfferModules } from "@/components/sections/offer/offer-modules";
import { OfferOwnership } from "@/components/sections/offer/offer-ownership";
import { OfferFaq } from "@/components/sections/offer/offer-faq";
import { OfferQuote } from "@/components/sections/offer/offer-quote";

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
  const t = await getTranslations({ locale, namespace: "offer" });
  const typedLocale = locale as Locale;
  const alternates = buildAlternates(typedLocale, "/web-pages-offer");
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

export default async function WebPagesOfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("offer");

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

      {/* Ordered top→bottom on the SB7 spine per the locked slice plan. */}
      <OfferHero />
      <OfferProblem />
      <OfferGuide />
      <OfferIncludes />
      <OfferPricing />
      <OfferModules />
      <OfferOwnership />
      <OfferFaq />
      <OfferQuote />
    </article>
  );
}
