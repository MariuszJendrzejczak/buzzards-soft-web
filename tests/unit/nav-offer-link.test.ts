import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import enMessages from "@/messages/en.json";
import plMessages from "@/messages/pl.json";
import svMessages from "@/messages/sv.json";

const HEADER_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "components",
  "layout",
  "header.tsx",
);

describe("header nav — offer route link wiring", () => {
  it("NAV_KEYS declares the offer entry pointing at the /web-pages-offer route", () => {
    const src = readFileSync(HEADER_PATH, "utf8");
    expect(src).toMatch(/href:\s*["']\/web-pages-offer["']/);
    expect(src).toMatch(/key:\s*["']offer["']/);
  });

  it("renders route hrefs (leading '/') via the locale-aware Link, not a plain <a>", () => {
    const src = readFileSync(HEADER_PATH, "utf8");
    // The route-vs-hash discriminator: entries whose href starts with "/"
    // must go through next-intl's Link so they resolve to /{locale}/...
    expect(src).toMatch(/item\.href\.startsWith\(["']\/["']\)/);
    expect(src).toMatch(/from ["']@\/i18n\/routing["']/);
  });

  it("all 3 locales expose a non-empty nav.items.offer label", () => {
    expect(plMessages.nav.items.offer.length).toBeGreaterThan(0);
    expect(enMessages.nav.items.offer.length).toBeGreaterThan(0);
    expect(svMessages.nav.items.offer.length).toBeGreaterThan(0);
  });
});
