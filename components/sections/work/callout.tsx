import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type CalloutProps = {
  className?: string;
  children: ReactNode;
};

export function Callout({ className, children }: CalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-lg border-l-2 border-brand/50 bg-surface/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground italic",
        className,
      )}
    >
      {children}
    </aside>
  );
}
