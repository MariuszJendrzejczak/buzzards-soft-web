import { Workflow } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

// Hero chips render as plain-text labels in this sprint. Anchor hrefs land
// after the Polilocale repo goes public — keys + labels are frozen, the
// link wrapping is the only TODO remaining for the post-public pass.
// TODO(post-polilocale-public): wrap each chip in <a href=...> to the artifact.
const HERO_CHIP_KEYS = [
  "portfolio.warsztat.hero.chip.brief",
  "portfolio.warsztat.hero.chip.sprintFile",
  "portfolio.warsztat.hero.chip.rules",
] as const;

export type WarsztatHeroTileProps = {
  className?: string;
};

export function WarsztatHeroTile({ className }: WarsztatHeroTileProps) {
  const t = useTranslations();

  return (
    <article
      data-warsztat-hero
      className={cn(
        "flex h-full flex-col gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-sm",
        "lg:col-span-2",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
        >
          <Workflow className="size-6" aria-hidden />
        </span>
        <h4 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl lg:text-2xl">
          {t("portfolio.warsztat.hero.title")}
        </h4>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t("portfolio.warsztat.hero.description")}
      </p>

      <ul
        aria-label={t("portfolio.warsztat.hero.chipsAria")}
        className="mt-auto flex flex-wrap items-center gap-2 pt-2"
      >
        {HERO_CHIP_KEYS.map((key) => (
          <li key={key}>
            <span
              data-warsztat-hero-chip
              className="inline-flex items-center rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs leading-none whitespace-nowrap text-emerald-300"
            >
              {t(key)}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
