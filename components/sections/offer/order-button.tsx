"use client";

import { cn } from "@/lib/utils";

/**
 * OrderButton — the pricing-card CTA. Scrolls to the offer contact form
 * (`#offer-quote` via the anchor) and, on the same click, dispatches an
 * `offer:order` window event carrying the package name. The ContactForm listens
 * for it and prefills the message field with a ready lead-in. Client-only so it
 * works in the static export (no server round-trip, no page reload).
 */
export function OrderButton({
  pkg,
  label,
  variant = "secondary",
}: {
  pkg: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href="#offer-quote"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("offer:order", { detail: { pkg } }));
      }}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/80"
          : "border border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      {label}
    </a>
  );
}
