"use client";

import { type ReactNode } from "react";

import type { AgentProjectLink } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

import { type Platform, usePlatform } from "./use-platform";

function urlOfKind(
  links: readonly AgentProjectLink[],
  kind: AgentProjectLink["kind"],
): string | undefined {
  return links.find((l) => l.kind === kind)?.url;
}

// Whole-card primary link — mirrors CardDeviceLink: a device-appropriate store
// when the project ships apps, otherwise the first available link (homepage / repo).
// For `"unknown"` (build time / hydration) this is Google → Apple → first link.
function pickUrl(
  links: readonly AgentProjectLink[],
  platform: Platform,
): string | undefined {
  const google = urlOfKind(links, "google");
  const apple = urlOfKind(links, "apple");
  if (google || apple) {
    if (platform === "ios" || platform === "macos") return apple ?? google;
    return google ?? apple;
  }
  return links[0]?.url;
}

export type AgentCardLinkProps = {
  links: readonly AgentProjectLink[];
  children: ReactNode;
  className?: string;
};

export function AgentCardLink({ links, children, className }: AgentCardLinkProps) {
  const url = pickUrl(links, usePlatform());

  if (!url) {
    return <>{children}</>;
  }

  const isInternal = url.startsWith("/") || url.startsWith("#");

  return (
    <a
      href={url}
      target={isInternal ? undefined : "_blank"}
      rel={isInternal ? undefined : "noopener noreferrer"}
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
