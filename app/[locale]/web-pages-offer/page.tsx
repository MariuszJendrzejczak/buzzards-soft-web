import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link, routing, type Locale } from "@/i18n/routing";
import { buildAlternates, pageSocial } from "@/lib/seo";

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
      <div className="mx-auto w-full max-w-7xl px-6 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-32">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t("breadcrumbBack")}
          </Link>
        </nav>

        <header className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10">
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-brand uppercase">
            {t("documentBadge")}
          </span>
          <h1 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("hero.heading")}
          </h1>
        </header>

        {/* Section slots filled in Phase 2:
            Hero → ThreePaths → Process → Standard → Pricing → Modules →
            WhyAi → Limits → Ownership → FAQ → Quote/form (Phase 3). */}
      </div>
    </article>
  );
}
