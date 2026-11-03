"use client";

import { useSyncExternalStore } from "react";

export type Platform =
  | "ios"
  | "android"
  | "macos"
  | "windows"
  | "linux"
  | "unknown";

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

// The user agent never changes during a page's life, so there is nothing to
// subscribe to.
const subscribe = () => () => {};

/**
 * The visitor's platform, read from the user agent. The static export and the
 * hydration pass see `"unknown"` (no `navigator` at build time); React then
 * re-renders with the real platform right after hydration — no mismatch, no
 * setState-in-effect.
 */
export function usePlatform(): Platform {
  return useSyncExternalStore(subscribe, detectPlatform, () => "unknown");
}
