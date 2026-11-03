"use client";

import { type ReactNode } from "react";

import { type HoneticApp } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

import { type Platform, usePlatform } from "./use-platform";

// For `"unknown"` (build time / hydration) this is external → Google → Apple.
function pickUrl(app: HoneticApp, platform: Platform): string | undefined {
  if (app.external) return app.external.url;
  if (platform === "ios" || platform === "macos") {
    return app.appleLink ?? app.googleLink;
  }
  return app.googleLink ?? app.appleLink;
}

export type CardDeviceLinkProps = {
  app: HoneticApp;
  children: ReactNode;
  className?: string;
};

export function CardDeviceLink({ app, children, className }: CardDeviceLinkProps) {
  const url = pickUrl(app, usePlatform());

  if (!url) {
    return <>{children}</>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-card-link
      className={cn(
        "rounded-md outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:underline",
        className,
      )}
    >
      {children}
    </a>
  );
}
