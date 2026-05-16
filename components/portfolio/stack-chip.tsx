import Image from "next/image";

import { type Stack } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const STACK_VARIANT: Record<Stack, string> = {
  Flutter: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  Unity: "border-purple-500/30 bg-purple-500/10 text-purple-300",
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
        className="size-4 shrink-0 object-contain"
      />
      {stack}
    </span>
  );
}
