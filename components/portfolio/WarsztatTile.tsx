import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export type WarsztatTileProps = {
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  example?: string;
  className?: string;
};

export function WarsztatTile({
  titleKey,
  descriptionKey,
  icon: Icon,
  example,
  className,
}: WarsztatTileProps) {
  const t = useTranslations();

  return (
    <article
      data-warsztat-tile
      className={cn(
        "flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors",
        "hover:border-brand/40",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-surface/60 text-brand"
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <h4 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {t(titleKey)}
        </h4>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {t(descriptionKey)}
      </p>

      {example ? (
        <div className="mt-auto pt-2">
          <span
            data-warsztat-example
            className="inline-flex items-center rounded-md border border-border/60 bg-surface/40 px-2.5 py-1 font-mono text-xs leading-none whitespace-nowrap text-muted-foreground"
          >
            {example}
          </span>
        </div>
      ) : null}
    </article>
  );
}
