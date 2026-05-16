import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AppCard } from "@/components/portfolio/AppCard";
import { AppCardGroup } from "@/components/portfolio/AppCardGroup";
import { StackChip } from "@/components/portfolio/stack-chip";
import { Link, routing, type Locale } from "@/i18n/routing";
import { HONETI_APPS_BY_STACK_ROLE } from "@/lib/portfolio/honeti-apps";
import { buildAlternates, pageSocial } from "@/lib/seo";

type Params = { locale: string };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "portfolio.honeti" });

  const title = t("subpage-title");
  const description = t("subpage-lead");
  const alternates = buildAlternates(typedLocale, "/portfolio/honeti");

  return {
    title,
    description,
    alternates,
    ...pageSocial({
      locale: typedLocale,
      title,
      description,
      canonical: alternates.canonical,
      type: "article",
    }),
  };
}

const STACK_TAGS = [
  "Dart",
  "Riverpod",
  "REST API",
  "Firebase",
  "Clean Architecture",
] as const;

export default async function HoneticPortfolioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolio");
  const tHoneti = await getTranslations("portfolio.honeti");

  const flutterOdZera = HONETI_APPS_BY_STACK_ROLE.Flutter["od-zera"];
  const unityOdZera = HONETI_APPS_BY_STACK_ROLE.Unity["od-zera"];
  const unityRozwoj = HONETI_APPS_BY_STACK_ROLE.Unity["rozwoj-i-serwis"];
  const unityPrzejety = HONETI_APPS_BY_STACK_ROLE.Unity["przejety-w-trakcie"];

  return (
    <article className="relative isolate">
      <div className="mx-auto w-full max-w-6xl px-6 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-32">
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
          <h1 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {tHoneti("subpage-title")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {tHoneti("subpage-lead")}
          </p>

          <ul
            aria-label={tHoneti("stack-aria")}
            className="mt-7 flex flex-wrap items-center gap-2"
          >
            <li>
              <StackChip stack="Flutter" />
            </li>
            {STACK_TAGS.map((tag) => (
              <li key={tag}>
                <TechTag>{tag}</TechTag>
              </li>
            ))}
            <li>
              <StackChip stack="Unity" />
            </li>
            <li>
              <TechTag muted>{tHoneti("unity-legacy-tag")}</TechTag>
            </li>
          </ul>
        </header>

        <div className="mt-16 flex flex-col gap-14">
          <AppCardGroup
            groupId="flutter-od-zera"
            titleKey="portfolio.honeti.group.flutter-od-zera"
          >
            {flutterOdZera.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </AppCardGroup>
          <AppCardGroup
            groupId="unity-od-zera"
            titleKey="portfolio.honeti.group.unity-od-zera"
          >
            {unityOdZera.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </AppCardGroup>
          <AppCardGroup
            groupId="unity-rozwoj"
            titleKey="portfolio.honeti.group.unity-rozwoj"
          >
            {unityRozwoj.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </AppCardGroup>
          <AppCardGroup
            groupId="unity-przejety"
            titleKey="portfolio.honeti.group.unity-przejety"
          >
            {unityPrzejety.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </AppCardGroup>
        </div>
      </div>
    </article>
  );
}

function TechTag({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  const base =
    "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs leading-none whitespace-nowrap";
  const tone = muted
    ? "border-border/60 bg-surface/30 text-text-subtle"
    : "border-border bg-surface/60 text-muted-foreground";
  return <span className={`${base} ${tone}`}>{children}</span>;
}
