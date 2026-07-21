import Image from "next/image";

import { type Stack } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

// Theme-aware: light-theme ink darkens (`light dark:` pairs) so the chip label
// clears WCAG 4.5:1 on the off-white surface; hue identity kept (Flutter=blue,
// Unity=purple). See `context/slices/web-design-generation/pilot-portfolio-badges.md`.
const STACK_VARIANT: Record<Stack, string> = {
  Flutter: "border-blue-600/40 bg-blue-500/10 text-blue-700 dark:border-blue-500/30 dark:text-blue-300",
  Unity: "border-purple-600/40 bg-purple-500/10 text-purple-700 dark:border-purple-500/30 dark:text-purple-300",
};

const STACK_ICON: Record<Stack, string> = {
  Flutter: "/portfolio/icons/flutter.png",
  Unity: "/portfolio/icons/unity.png",
};

export type StackChipProps = {
  stack: Stack;
  className?: string;
};

export function StackChip({ stack, className }: StackChipProps) {
  return (
    <span
      data-stack={stack}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs leading-none whitespace-nowrap",
        STACK_VARIANT[stack],
        className,
      )}
    >
      <Image
        src={STACK_ICON[stack]}
        alt=""
        aria-hidden
        width={16}
        height={16}
        // Unity's logo asset is a white monochrome PNG — invisible on the light
        // chip. Ink it black in light, keep white in dark. Flutter's icon is
        // full-colour, so it's left untouched.
        className={cn(
          "size-4 shrink-0 object-contain",
          stack === "Unity" && "brightness-0 dark:brightness-100",
        )}
      />
      {stack}
    </span>
  );
}
