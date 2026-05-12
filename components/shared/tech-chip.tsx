import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "core" | "growing";

export type TechChipProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function TechChip({
  variant = "core",
  className,
  children,
}: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs leading-none whitespace-nowrap",
        variant === "core"
          ? "border-brand/40 bg-brand/10 text-brand"
          : "border-dashed border-text-subtle/50 bg-surface/40 text-muted-foreground opacity-90",
        className,
      )}
    >
      {children}
    </span>
  );
}
