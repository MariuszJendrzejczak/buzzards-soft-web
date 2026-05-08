import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ChipCloudProps = {
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export function ChipCloud({ className, ariaLabel, children }: ChipCloudProps) {
  return (
    <ul
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {Array.isArray(children)
        ? children.map((child, i) => <li key={i}>{child}</li>)
        : <li>{children}</li>}
    </ul>
  );
}
