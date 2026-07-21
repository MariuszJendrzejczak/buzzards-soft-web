import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AppCard } from "@/components/portfolio/AppCard";
import { AppCardGroup } from "@/components/portfolio/AppCardGroup";
import { PortfolioSeriesTile } from "@/components/portfolio/PortfolioSeriesTile";
import { StackChip } from "@/components/portfolio/stack-chip";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Link, routing, type Locale } from "@/i18n/routing";
import { HONETI_APPS, HONETI_APPS_BY_STACK_ROLE } from "@/lib/portfolio/honeti-apps";
import { buildAlternates, pageSocial } from "@/lib/seo";

type Params = { locale: string };

const EDUCATIONAL_SERIES_SLUGS = new Set([
  "words-en",
  "irregular-verbs",
  "der-die-das",
  "flags",
  "multiplication",
  "exponents",
  "roman",
]);

const FLUTTER_CONTRIBUTION_KEYS = [
  "cleanArch",
  "mvc",
  "riverpod",
  "freezed",
  "restApi",
  "firebase",
  "offline",
  "qr",
  "signIn",
  "pdf",
  "pos",
  "maps",
] as const;

const EDUCATIONAL_CONTRIBUTION_KEYS = [
  "engine",
  "iap",
  "ads",
  "pooling",
  "firebaseDb",
  "analytics",
] as const;

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

export default async function HoneticPortfolioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolio");
  const tHoneti = await getTranslations("portfolio.honeti");

  const flutterApps = HONETI_APPS_BY_STACK_ROLE.Flutter["od-zera"];
  const educationalApps = HONETI_APPS.filter((app) =>
    EDUCATIONAL_SERIES_SLUGS.has(app.slug),
  );
  const otherUnityApps = HONETI_APPS.filter(
    (app) => app.stack === "Unity" && !EDUCATIONAL_SERIES_SLUGS.has(app.slug),
  );

  return (
    <article className="relative isolate border-t border-emerald-500/20 bg-emerald-500/5">
      <div className="mx-auto w-full max-w-6xl px-6 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-32">
        <div className="mb-10 flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 rounded-md font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <ArrowLeft aria-hidden className="size-4" />
              {t("breadcrumbBack")}
            </Link>
          </nav>
          <ThemeToggle />
        </div>

        <header className="rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10">
          <h1 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="block">{tHoneti("h1Main")}</span>
            <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-medium tracking-normal sm:text-3xl lg:text-4xl">
              <span>{tHoneti("h1Connector")}</span>
              <a
                href="https://honeti.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tHoneti("honetiLinkAria")}
                className="inline-flex items-center rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <Image
                  src="/portfolio/honeti-logo.png"
                  alt="HONETi"
                  width={220}
                  height={68}
                  // White monochrome logo asset — ink it black in light, white in dark.
                  className="h-7 w-auto object-contain brightness-0 sm:h-8 lg:h-9 dark:brightness-100"
                />
              </a>
            </span>
          </h1>

          <ul
            aria-label={tHoneti("stack-aria")}
            className="mt-5 flex flex-wrap items-center gap-2"
          >
            <li>
              <StackChip stack="Flutter" />
            </li>
            <li>
              <StackChip stack="Unity" />
            </li>
          </ul>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {tHoneti("subpage-lead")}
          </p>
        </header>

        <div className="mt-16 flex flex-col gap-14">
          <AppCardGroup
            groupId="flutter"
            titleKey="portfolio.honeti.group.flutter"
            stackIcon="Flutter"
          >
            <PortfolioSeriesTile
              stack="Flutter"
              i18nKey="portfolio.honeti.flutterSeries"
              contributionKeys={FLUTTER_CONTRIBUTION_KEYS}
              apps={flutterApps}
              className="sm:col-span-2 lg:col-span-3"
            />
          </AppCardGroup>

          <AppCardGroup
            groupId="unity"
            titleKey="portfolio.honeti.group.unity"
            stackIcon="Unity"
          >
            <PortfolioSeriesTile
              stack="Unity"
              i18nKey="portfolio.honeti.educationalSeries"
              contributionKeys={EDUCATIONAL_CONTRIBUTION_KEYS}
              apps={educationalApps}
              className="sm:col-span-2 lg:col-span-3"
            />
            {otherUnityApps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </AppCardGroup>
        </div>
      </div>
    </article>
  );
}
