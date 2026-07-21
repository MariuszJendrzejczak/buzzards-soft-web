import { Workflow, Wrench, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { type Role, roleLabelKey } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

// Theme-aware: light-theme ink darkens for legibility on the off-white surface;
// the neutral "rozwoj-i-serwis" role moves to `foreground` tokens (flips for
// free). See `context/slices/web-design-generation/pilot-portfolio-badges.md`.
const ROLE_VARIANT: Record<Role, string> = {
  "od-zera":
    "border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-300",
  "rozwoj-i-serwis":
    "border-border bg-foreground/[0.06] text-foreground/70",
};

const ROLE_ICON: Record<Role, LucideIcon> = {
  "od-zera": Workflow,
  "rozwoj-i-serwis": Wrench,
};

export type RoleBadgeProps = {
  role: Role;
  className?: string;
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const t = useTranslations();
  const label = t(roleLabelKey(role));
  const Icon = ROLE_ICON[role];

  return (
    <span
      data-role={role}
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-4xl border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        ROLE_VARIANT[role],
        className,
      )}
    >
      <Icon aria-hidden className="size-4 shrink-0" />
      {label}
    </span>
  );
}
