import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { type HoneticApp } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

export type AppCardGroupProps = {
  // i18n key under the `portfolio.honeti.group` namespace (full dotted key
  // accepted by `useTranslations()`), e.g. `portfolio.honeti.group.flutter-od-zera`.
  titleKey: string;
  // Stable section id — drives anchor-link targeting from the home page mini-cards.
  groupId: string;
  // Optional list of apps; Session 4 will populate <AppCard> children via this.
  // When omitted or empty AND `placeholder` is true, the group renders a stub
  // `<div data-group-placeholder>` instead of real cards.
  apps?: readonly HoneticApp[];
  // Children take precedence over `apps` (Session 4 escape hatch).
  children?: ReactNode;
  placeholder?: boolean;
  className?: string;
};

export function AppCardGroup({
  titleKey,
  groupId,
  apps,
  children,
  placeholder = false,
  className,
}: AppCardGroupProps) {
  const t = useTranslations();
  const headingId = `${groupId}-heading`;

  return (
    <section
      id={groupId}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24", className)}
    >
      <h2
        id={headingId}
        className="font-heading text-xl leading-tight font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl"
      >
        {t(titleKey)}
      </h2>

      {children ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      ) : placeholder ? (
        <div
          data-group-placeholder={groupId}
          aria-hidden
          className="mt-6 rounded-2xl border border-dashed border-border/60 bg-surface/20 px-5 py-10 text-center font-mono text-xs tracking-wider text-text-subtle uppercase"
        >
          {apps && apps.length > 0
            ? `${apps.length} app${apps.length === 1 ? "" : "s"} — TODO (sprint-002 Session 4)`
            : "TODO (sprint-002 Session 4)"}
        </div>
      ) : null}
    </section>
  );
}
