import {
  Atom,
  Braces,
  Flame,
  Globe,
  Languages,
  type LucideIcon,
  RefreshCw,
  Scale,
  Smartphone,
  Triangle,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";

// `pill` badges mirror the Honeti RoleBadge look (rounded-4xl, font-medium) —
// used for E2E so it matches the "E2E" role badge on the Honeti cards.
type BadgeStyle = { className: string; icon?: LucideIcon; pill?: boolean };

// Per-technology colour + icon, mirroring the Honeti StackChip / RoleBadge
// language (coloured chip with a glyph) instead of a flat monospace tag.
// Lucide icons stand in for tech logos we don't ship as image assets.
// Each coloured chip keeps its hue identity across themes; only the light-theme
// ink darkens so the label clears WCAG 4.5:1 on the warm off-white surface
// (`light dark:` pairs; amber+cyan need -800). Genuinely-neutral chips
// (AGPL/slate, Next.js/zinc) move to `foreground` tokens that flip for free.
// See `context/slices/web-design-generation/pilot-portfolio-badges.md`.
const BADGE_STYLES: Record<string, BadgeStyle> = {
  Flutter: { className: "border-sky-600/40 bg-sky-500/10 text-sky-700 dark:border-sky-500/30 dark:text-sky-300", icon: Smartphone },
  Firebase: { className: "border-amber-600/40 bg-amber-500/10 text-amber-800 dark:border-amber-500/30 dark:text-amber-300", icon: Flame },
  "CI/CD": { className: "border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300", icon: RefreshCw },
  TypeScript: { className: "border-blue-600/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300", icon: Braces },
  "AGPL-3.0": { className: "border-border bg-foreground/[0.06] text-foreground/70", icon: Scale },
  Web: { className: "border-teal-600/40 bg-teal-500/10 text-teal-700 dark:border-teal-500/30 dark:text-teal-300", icon: Globe },
  "Next.js": { className: "border-border bg-foreground/[0.06] text-foreground/70", icon: Triangle },
  React: { className: "border-cyan-600/40 bg-cyan-500/10 text-cyan-800 dark:border-cyan-500/30 dark:text-cyan-300", icon: Atom },
  i18n: { className: "border-violet-600/40 bg-violet-500/10 text-violet-700 dark:border-violet-500/30 dark:text-violet-300", icon: Languages },
  E2E: { className: "border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300", icon: Workflow, pill: true },
};

const FALLBACK: BadgeStyle = {
  className: "border-border bg-surface/60 text-muted-foreground",
};

export type TechBadgeProps = {
  label: string;
  className?: string;
};

export function TechBadge({ label, className }: TechBadgeProps) {
  const style = BADGE_STYLES[label] ?? FALLBACK;
  const Icon = style.icon;
  const pill = style.pill ?? false;

  return (
    <span
      data-agent-badge
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs leading-none whitespace-nowrap",
        pill ? "rounded-4xl font-medium" : "rounded-md font-mono",
        style.className,
        className,
      )}
    >
      {Icon ? (
        <Icon aria-hidden className={cn("shrink-0", pill ? "size-4" : "size-3.5")} />
      ) : null}
      {label}
    </span>
  );
}
