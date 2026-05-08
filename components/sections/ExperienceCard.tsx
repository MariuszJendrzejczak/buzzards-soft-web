import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type ExperienceCardVariant = "default" | "artifact" | "meta";

export type ExperienceCardProps = {
  variant?: ExperienceCardVariant;
  href?: string;
  ctaLabel?: string;
  className?: string;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<ExperienceCardVariant, string> = {
  default:
    "rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9",
  artifact:
    "rounded-2xl border border-brand/40 bg-emerald-950/30 p-7 shadow-sm sm:p-9",
  meta: "rounded-xl border border-border/70 bg-surface/40 p-5 sm:p-6",
};

const HOVER_CLASSES =
  "transition-all duration-300 hover:border-brand/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ExperienceCard({
  variant = "default",
  href,
  ctaLabel,
  className,
  children,
}: ExperienceCardProps) {
  const baseClass = cn(VARIANT_CLASSES[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClass, HOVER_CLASSES, "group/card relative block")}
      >
        {children}
        {ctaLabel ? (
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm font-medium text-brand">
            {ctaLabel}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover/card:translate-x-0.5"
            />
          </span>
        ) : null}
      </Link>
    );
  }

  return <div className={baseClass}>{children}</div>;
}
