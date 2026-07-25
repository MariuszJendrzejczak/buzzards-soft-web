"use client";

import { cn } from "@/lib/utils";

/**
 * MobileOrderButton — pricing-card CTA for the mobile-apps offer. Scrolls to the
 * offer contact form (`#mobile-offer-quote`) and dispatches the shared
 * `offer:order` event so the ContactForm prefills the message with the package
 * name. Mirrors components/sections/offer/order-button.tsx (different anchor).
 */
export function MobileOrderButton({
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
      href="#mobile-offer-quote"
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
