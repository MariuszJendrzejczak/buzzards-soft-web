import { useTranslations } from "next-intl";

import { type Role, roleLabelKey } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const ROLE_VARIANT: Record<Role, string> = {
  "od-zera":
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  "rozwoj-i-serwis":
    "border-gray-500/30 bg-gray-500/10 text-gray-300",
  "przejety-w-trakcie":
    "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

export type RoleBadgeProps = {
  role: Role;
  className?: string;
};

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const t = useTranslations();
  const label = t(roleLabelKey(role));

  return (
    <span
      data-role={role}
      className={cn(
        "inline-flex h-5 w-fit shrink-0 items-center rounded-4xl border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        ROLE_VARIANT[role],
        className,
      )}
    >
      {label}
    </span>
  );
}
