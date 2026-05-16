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

describe("header nav — Portfolio link wiring", () => {
  it("PL nav exposes the `portfolio` item (renamed from `experience`)", () => {
    expect(plMessages.nav.items).toHaveProperty("portfolio");
    expect(plMessages.nav.items).not.toHaveProperty("experience");
  });

  it("EN nav exposes the `portfolio` item (renamed from `experience`)", () => {
    expect(enMessages.nav.items).toHaveProperty("portfolio");
    expect(enMessages.nav.items).not.toHaveProperty("experience");
  });

  it("SV nav exposes the `portfolio` item (renamed from `experience`)", () => {
    expect(svMessages.nav.items).toHaveProperty("portfolio");
    expect(svMessages.nav.items).not.toHaveProperty("experience");
  });

  it("all 3 locales display the same string 'Portfolio' for the nav link (Session 3 may re-translate the rest)", () => {
    expect(plMessages.nav.items.portfolio).toBe("Portfolio");
    expect(enMessages.nav.items.portfolio).toBe("Portfolio");
    expect(svMessages.nav.items.portfolio).toBe("Portfolio");
  });

  it("header.tsx references the renamed nav key `portfolio` and the #portfolio anchor", () => {
    const src = readFileSync(HEADER_PATH, "utf8");
    expect(src).toMatch(/href:\s*["']#portfolio["']/);
    expect(src).toMatch(/key:\s*["']portfolio["']/);
  });

  it("header.tsx no longer references the legacy `#experience` anchor or `experience` nav key", () => {
    const src = readFileSync(HEADER_PATH, "utf8");
    expect(src).not.toMatch(/href:\s*["']#experience["']/);
    expect(src).not.toMatch(/key:\s*["']experience["']/);
  });
});

describe("portfolio i18n keys — Sprint 3 Session 2 additions", () => {
  it("PL exposes portfolio.title", () => {
    expect(plMessages.portfolio.title).toBeDefined();
    expect(typeof plMessages.portfolio.title).toBe("string");
    expect(plMessages.portfolio.title.length).toBeGreaterThan(0);
  });

  it("PL exposes portfolio.intro", () => {
    expect(plMessages.portfolio.intro).toBeDefined();
    expect(plMessages.portfolio.intro.length).toBeGreaterThan(20);
  });

  it("EN exposes portfolio.title (PL placeholder until Session 3 translates)", () => {
    expect(enMessages.portfolio.title).toBeDefined();
    expect(enMessages.portfolio.title.length).toBeGreaterThan(0);
  });

  it("EN exposes portfolio.intro (PL placeholder until Session 3 translates)", () => {
    expect(enMessages.portfolio.intro).toBeDefined();
    expect(enMessages.portfolio.intro.length).toBeGreaterThan(20);
  });

  it("SV exposes portfolio.title (PL placeholder until Session 3 translates)", () => {
    expect(svMessages.portfolio.title).toBeDefined();
    expect(svMessages.portfolio.title.length).toBeGreaterThan(0);
  });

  it("SV exposes portfolio.intro (PL placeholder until Session 3 translates)", () => {
    expect(svMessages.portfolio.intro).toBeDefined();
    expect(svMessages.portfolio.intro.length).toBeGreaterThan(20);
  });
});
