import Image from "next/image";
import { useTranslations } from "next-intl";

import { type HoneticApp, type Stack } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

import { RoleBadge } from "./role-badge";
import { StackChip } from "./stack-chip";
import { StoreLink } from "./store-link";

export type PortfolioSeriesTileProps = {
  stack: Stack;
  // Dotted i18n key prefix, e.g. "portfolio.honeti.flutterSeries". The tile
  // reads `${i18nKey}.title`, `${i18nKey}.description`, `${i18nKey}.appsLabel`,
  // and `${i18nKey}.contribution.<key>` for each `contributionKeys` entry.
  i18nKey: string;
  // Ordered sub-keys under `${i18nKey}.contribution`. The tile renders them
  // as a bullet list in the order provided.
  contributionKeys: readonly string[];
  apps: readonly HoneticApp[];
  className?: string;
};

export function PortfolioSeriesTile({
  stack,
  i18nKey,
  contributionKeys,
  apps,
  className,
}: PortfolioSeriesTileProps) {
  const t = useTranslations(i18nKey);

  return (
    <article
      data-testid="portfolio-series-tile"
      data-stack={stack}
      className={cn(
        "scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-3">
          <h3 className="font-heading text-lg leading-tight font-semibold tracking-tight text-foreground sm:text-xl">
            {t("title")}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StackChip stack={stack} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("description")}
          </p>
          <ul className="mt-4 list-disc list-inside space-y-1 text-sm leading-relaxed text-muted-foreground marker:text-text-subtle">
            {contributionKeys.map((key) => (
              <li key={key}>{t(`contribution.${key}`)}</li>
            ))}
          </ul>
        </div>

        <ul
          aria-label={t("appsLabel")}
          className="flex flex-col gap-3 lg:col-span-2"
        >
          {apps.map((app) => (
            <li
              key={app.slug}
              id={app.slug}
              data-slug={app.slug}
              className="scroll-mt-24 flex items-center gap-3 rounded-xl border border-border/60 bg-surface/30 p-3"
            >
              {app.iconSrc ? (
                <Image
                  src={app.iconSrc}
                  alt=""
                  aria-hidden
                  width={40}
                  height={40}
                  className={cn(
                    "size-10 shrink-0 rounded-lg border border-border/70 object-contain",
                    app.iconBackground === "white" ? "bg-white" : "bg-surface/60",
                  )}
                />
              ) : (
                <div
                  aria-hidden
                  className="size-10 shrink-0 rounded-lg border border-border/70 bg-surface/60"
                />
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate font-heading text-sm font-semibold text-foreground sm:text-base">
                  {app.name}
                </span>
                <RoleBadge role={app.role} />
              </div>
              <div className="shrink-0">
                <StoreLink
                  googleLink={app.googleLink}
                  appleLink={app.appleLink}
                  external={app.external}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
