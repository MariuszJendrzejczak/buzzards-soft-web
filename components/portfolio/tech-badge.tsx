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
const BADGE_STYLES: Record<string, BadgeStyle> = {
  Flutter: { className: "border-sky-500/30 bg-sky-500/10 text-sky-300", icon: Smartphone },
  Firebase: { className: "border-amber-500/30 bg-amber-500/10 text-amber-300", icon: Flame },
  "CI/CD": { className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", icon: RefreshCw },
  TypeScript: { className: "border-blue-500/30 bg-blue-500/10 text-blue-300", icon: Braces },
  "AGPL-3.0": { className: "border-slate-500/30 bg-slate-500/10 text-slate-300", icon: Scale },
  Web: { className: "border-teal-500/30 bg-teal-500/10 text-teal-300", icon: Globe },
  "Next.js": { className: "border-zinc-400/30 bg-zinc-400/10 text-zinc-200", icon: Triangle },
  React: { className: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300", icon: Atom },
  i18n: { className: "border-violet-500/30 bg-violet-500/10 text-violet-300", icon: Languages },
  E2E: { className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300", icon: Workflow, pill: true },
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
