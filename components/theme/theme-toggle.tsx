"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  Icon: typeof Sun;
};

// Static export forbids SSR; aria-labels are hardcoded English (the i18n
// message bundles are owned by a parallel workstream this phase must not
// touch — localizing these labels is a follow-up).
const THEME_OPTIONS: readonly ThemeOption[] = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
  { value: "system", label: "System theme", Icon: Monitor },
] as const;

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes resolves the active theme only on the client; flipping `mounted`
  // after the first commit keeps `aria-pressed` off the server HTML so there is
  // no hydration mismatch. This mount-gate setState is the intended pattern here
  // (a one-shot client marker, not a render-driving cascade), so the
  // set-state-in-effect guard is deliberately relaxed for this line.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-surface/60 p-0.5",
        className,
      )}
    >
      {THEME_OPTIONS.map((option) => {
        const active = mounted && theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={mounted ? active : undefined}
            aria-label={option.label}
            title={option.label}
            onClick={() => setTheme(option.value)}
            className={cn(
              "inline-flex items-center justify-center rounded-full p-1.5 outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-ring/50",
              active
                ? "bg-brand/15 text-brand"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <option.Icon aria-hidden className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
