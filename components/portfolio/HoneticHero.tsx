import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import {
  getHoneticApp,
  type HoneticAppSlug,
} from "@/lib/portfolio/honeti-apps";
import { type HoneticApp } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

import { HeroAppMiniCard } from "./HeroAppMiniCard";
import { StackChip } from "./stack-chip";

const HERO_SLUGS = [
  "infoshare",
  "uprawnienia-budowlane",
  "gastro-ninja-klient",
] as const satisfies readonly HoneticAppSlug[];

const STACK_TAGS = [
  "Dart",
  "Riverpod",
  "REST API",
  "Firebase",
  "Clean Architecture",
] as const;

export type HoneticHeroProps = {
  className?: string;
};

export function HoneticHero({ className }: HoneticHeroProps) {
  const t = useTranslations("portfolio.honeti");

  const heroApps: HoneticApp[] = HERO_SLUGS.map((slug) => {
    const app = getHoneticApp(slug);
    if (!app) {
      throw new Error(
        `<HoneticHero>: hero app "${slug}" missing from HONETI_APPS — dataset drift.`,
      );
    }
    return app;
  });

  return (
    <section
      id="portfolio-honeti"
      aria-labelledby="portfolio-honeti-heading"
      className={cn(
        "relative isolate border-t border-border/60 py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <header className="max-w-3xl">
          <h3
            id="portfolio-honeti-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("role-line")}
          </p>

          <ul
            aria-label={t("stack-aria")}
            className="mt-6 flex flex-wrap items-center gap-2"
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
              <TechTag muted>{t("unity-legacy-tag")}</TechTag>
            </li>
          </ul>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {heroApps.map((app) => (
            <HeroAppMiniCard key={app.slug} app={app} />
          ))}
        </div>

        <div className="mt-10 flex">
          <Link
            href="/portfolio/honeti"
            className="inline-flex items-center gap-2 rounded-md font-mono text-sm font-medium text-brand outline-none transition-colors hover:text-brand-soft focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {t("cta-full-list")}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TechTag({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs leading-none whitespace-nowrap",
        muted
          ? "border-border/60 bg-surface/30 text-text-subtle"
          : "border-border bg-surface/60 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
