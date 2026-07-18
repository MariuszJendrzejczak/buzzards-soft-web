import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { WarsztatFlow } from "./WarsztatFlow";
import { WarsztatToolkit } from "./WarsztatToolkit";

export type WarsztatGridProps = {
  className?: string;
};

export function WarsztatGrid({ className }: WarsztatGridProps) {
  const t = useTranslations("portfolio.warsztat");

  return (
    <section
      id="portfolio-warsztat"
      aria-labelledby="portfolio-warsztat-heading"
      className={cn(
        "relative isolate border-t border-emerald-500/20 py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            <span aria-hidden className="inline-block h-px w-5 bg-brand" />
            {t("eyebrow")}
          </div>
          <h3
            id="portfolio-warsztat-heading"
            className="mt-3 font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("title")}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </header>

        <WarsztatFlow />

        <WarsztatToolkit />
      </div>
    </section>
  );
}
