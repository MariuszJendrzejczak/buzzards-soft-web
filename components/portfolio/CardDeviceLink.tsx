"use client";

import { useEffect, useState, type ReactNode } from "react";

import { type HoneticApp } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

type Platform = "ios" | "android" | "macos" | "windows" | "linux" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/macintosh|mac os x/.test(ua)) return "macos";
  if (/windows/.test(ua)) return "windows";
  if (/linux/.test(ua)) return "linux";
  return "unknown";
}

function pickUrl(app: HoneticApp, platform: Platform): string | undefined {
  if (app.external) return app.external.url;
  if (platform === "ios" || platform === "macos") {
    return app.appleLink ?? app.googleLink;
  }
  if (platform === "android") {
    return app.googleLink ?? app.appleLink;
  }
  return app.googleLink ?? app.appleLink;
}

function fallbackUrl(app: HoneticApp): string | undefined {
  if (app.external) return app.external.url;
  return app.googleLink ?? app.appleLink;
}

export type CardDeviceLinkProps = {
  app: HoneticApp;
  children: ReactNode;
  className?: string;
};

export function CardDeviceLink({ app, children, className }: CardDeviceLinkProps) {
  const initial = fallbackUrl(app);
  const [url, setUrl] = useState<string | undefined>(initial);

  useEffect(() => {
    const next = pickUrl(app, detectPlatform());
    if (next) setUrl(next);
  }, [app]);

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
