import { cn } from "@/lib/utils";

export type TechTagProps = {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
};

export function TechTag({ children, muted = false, className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs leading-none whitespace-nowrap",
        muted
          ? "border-border/60 bg-surface/30 text-text-subtle"
          : "border-border bg-surface/60 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
