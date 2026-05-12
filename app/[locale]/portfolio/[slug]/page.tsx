import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ChipCloud } from "@/components/shared/chip-cloud";
import { TechChip } from "@/components/shared/tech-chip";
import { Link, routing, type Locale } from "@/i18n/routing";
import { buildAlternates, pageSocial } from "@/lib/seo";

import { CASE_SLUGS, getCaseStudy } from "./cases";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CASE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  const study = await getCaseStudy(slug, locale);

  if (!study) {
    return { title: t("metaTitleFallback") };
  }

  const alternates = buildAlternates(typedLocale, `/portfolio/${slug}`);
  const description = t("metaDescription", {
    role: study.role,
    period: study.period,
  });

  return {
    title: study.title,
    description,
    alternates,
    ...pageSocial({
      locale: typedLocale,
      title: study.title,
      description,
      canonical: alternates.canonical,
      type: "article",
    }),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const study = await getCaseStudy(slug, locale);
  if (!study) notFound();

  const t = await getTranslations("portfolio");
  const tCommon = await getTranslations("common");

  return (
    <article className="relative isolate">
      <div className="mx-auto w-full max-w-4xl px-6 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-32">
        <nav aria-label="Breadcrumb" className="mb-10">
          <Link
            href="/#experience"
            className="inline-flex items-center gap-2 rounded-md font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t("breadcrumbBack")}
          </Link>
        </nav>

        <header className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10">
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-brand uppercase">
            {t("eyebrow", { slug: study.slug })}
          </span>
          <h1 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {study.title}
          </h1>
          <dl className="mt-6 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2 sm:text-base">
            <MetaRow label={t("metaRoleLabel")} value={study.role} />
            <MetaRow label={t("metaPeriodLabel")} value={study.period} />
          </dl>
          <ChipCloud
            ariaLabel={t("stackAria", { title: study.title })}
            className="mt-7"
          >
            {study.stack.map((chip) => (
              <TechChip key={chip}>{chip}</TechChip>
            ))}
          </ChipCloud>
        </header>

        <section aria-labelledby="scope-heading" className="mt-14">
          <h2
            id="scope-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {t("scopeHeading")}
          </h2>
          <ul className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {study.scope.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="stack-heading" className="mt-14">
          <h2
            id="stack-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {t("stackHeading")}
          </h2>
          <ChipCloud ariaLabel={t("stackFullAria")} className="mt-6">
            {study.stack.map((chip) => (
              <TechChip key={chip}>{chip}</TechChip>
            ))}
          </ChipCloud>
        </section>

        {study.apps && study.apps.length > 0 ? (
          <section aria-labelledby="apps-heading" className="mt-14">
            <h2
              id="apps-heading"
              className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {t("appsHeading")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-subtle sm:text-base">
              {t("appsIntro")}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {study.apps.map((app) => (
                <li
                  key={app}
                  className="rounded-lg border border-border/70 bg-surface/40 px-4 py-3 text-sm text-foreground sm:text-base"
                >
                  {app}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-10 sm:flex-row sm:items-center sm:gap-4">
          <Button
            size="lg"
            render={<Link href="/" />}
            className="h-12 gap-2 px-5 text-base"
          >
            <ArrowLeft aria-hidden className="size-4" />
            {t("breadcrumbBack")}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            render={<Link href="/#contact" />}
            className="h-12 gap-2 px-3 text-base text-foreground hover:bg-surface"
          >
            {tCommon("contactCta")}
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-mono text-[11px] font-medium tracking-[0.2em] text-text-subtle uppercase">
        {label}
      </dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
