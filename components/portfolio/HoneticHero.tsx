import { ArrowRight } from "lucide-react";
import Image from "next/image";
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
import { TechTag } from "./tech-tag";

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
  "CI/CD",
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
        "relative isolate border-t border-emerald-500/20 py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <header className="max-w-3xl rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
          <h3
            id="portfolio-honeti-heading"
            className="flex flex-wrap items-center gap-x-3 gap-y-2 font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            <span>{t("title")}</span>
            <a
              href="https://honeti.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("honetiLinkAria")}
              className="inline-flex items-center rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src="/portfolio/honeti-logo.png"
                alt="HONETi"
                width={220}
                height={68}
                priority
                // White monochrome logo asset — ink it black in light, white in dark.
                className="h-7 w-auto object-contain brightness-0 sm:h-8 lg:h-9 dark:brightness-100"
              />
            </a>
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
            className="inline-flex items-center gap-2 rounded-md font-mono text-sm font-medium text-brand outline-none transition-colors hover:text-brand-soft focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("cta-full-list")}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
