import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { PhotoBand } from "@/components/shared/photo-band";

import { AgentPortfolioSection } from "./AgentPortfolioSection";
import { HoneticHero } from "./HoneticHero";
import { WarsztatGrid } from "./WarsztatGrid";

export type PortfolioSectionProps = {
  // Stable anchor id — drives the header-nav `/#portfolio` link.
  id?: string;
  className?: string;
  // Ambient-backdrop prototype (web-visual-elevation): when set, the HONETi +
  // agent sub-sections REVEAL this photo behind their content, while the intro
  // header and the AI-Native workflow stay opaque and COVER it.
  backdropSrc?: string;
};

export function PortfolioSection({
  id = "portfolio",
  className,
  backdropSrc,
}: PortfolioSectionProps) {
  const t = useTranslations("portfolio");

  return (
    <section
      id={id}
      aria-labelledby="portfolio-heading"
      data-testid="portfolio-section"
      className={cn(
        "relative isolate border-t border-emerald-500/20 bg-emerald-500/5 pt-32 pb-24 sm:pt-40 sm:pb-32",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 sm:pb-32">
        <header className="max-w-3xl">
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-brand uppercase">
            {t("eyebrow")}
          </span>
          <h2
            id="portfolio-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </header>
      </div>

      {backdropSrc ? (
        <PhotoBand
          src={backdropSrc}
          scrimClassName="bg-white/45 dark:bg-black/42"
          photoClassName="bg-center dark:brightness-120"
        >
          <HoneticHero />
          <AgentPortfolioSection />
        </PhotoBand>
      ) : (
        <>
          <HoneticHero />
          <AgentPortfolioSection />
        </>
      )}
      <WarsztatGrid />
    </section>
  );
}
