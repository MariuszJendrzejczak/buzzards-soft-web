import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { type HoneticApp, type Stack } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const STACK_ICON: Record<Stack, string> = {
  Flutter: "/portfolio/icons/flutter.png",
  Unity: "/portfolio/icons/unity.png",
};

export type AppCardGroupProps = {
  // i18n key under the `portfolio.honeti.group` namespace (full dotted key
  // accepted by `useTranslations()`), e.g. `portfolio.honeti.group.flutter`.
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
  // When set, render the corresponding stack logo before the title text.
  stackIcon?: Stack;
  // When true, append the HONETi logo (linked to honeti.com) after the title text.
  honetiBrand?: boolean;
  className?: string;
};

export function AppCardGroup({
  titleKey,
  groupId,
  apps,
  children,
  placeholder = false,
  stackIcon,
  honetiBrand = false,
  className,
}: AppCardGroupProps) {
  const t = useTranslations();
  const headingId = `${groupId}-heading`;
  const hasInlineBlock = stackIcon !== undefined || honetiBrand;

  return (
    <section
      id={groupId}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24", className)}
    >
      <h2
        id={headingId}
        className={cn(
          "font-heading text-xl leading-tight font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl",
          hasInlineBlock && "flex flex-wrap items-center gap-x-3 gap-y-2",
        )}
      >
        {stackIcon ? (
          <Image
            src={STACK_ICON[stackIcon]}
            alt=""
            aria-hidden
            width={48}
            height={48}
            className="size-7 shrink-0 object-contain sm:size-8 lg:size-9"
          />
        ) : null}
        <span>{t(titleKey)}</span>
        {honetiBrand ? (
          <a
            href="https://honeti.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("portfolio.honeti.honetiLinkAria")}
            className="inline-flex items-center rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Image
              src="/portfolio/honeti-logo.png"
              alt="HONETi"
              width={220}
              height={68}
              className="h-6 w-auto sm:h-7 lg:h-8"
            />
          </a>
        ) : null}
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
            ? `${apps.length} app${apps.length === 1 ? "" : "s"} — pending content`
            : "pending content"}
        </div>
      ) : null}
    </section>
  );
}
