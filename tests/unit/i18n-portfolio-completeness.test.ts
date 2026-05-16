import { describe, expect, it } from "vitest";

import enMessages from "@/messages/en.json";
import plMessages from "@/messages/pl.json";
import svMessages from "@/messages/sv.json";

// Catches stale translation drafts that ship with placeholder copy. Any leaf
// under `portfolio.*` in any of pl/en/sv must be (a) non-empty and (b) not a
// placeholder marker. `nav.items.portfolio` is the home-page link label and
// gets the same gate.
const PLACEHOLDER_PATTERN = /\[(PL|EN|SV)\]|\bTODO\b|\bTBD\b/i;
const LOCALE_BUNDLES = {
  pl: plMessages,
  en: enMessages,
  sv: svMessages,
} as const;

type Locale = keyof typeof LOCALE_BUNDLES;

function walkLeaves(
  obj: unknown,
  prefix: string,
  acc: Array<{ key: string; value: string }>,
): void {
  if (obj === null || obj === undefined) return;
  if (typeof obj === "string") {
    acc.push({ key: prefix, value: obj });
    return;
  }
  if (typeof obj !== "object") return;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    walkLeaves(v, prefix ? `${prefix}.${k}` : k, acc);
  }
}

function leavesUnder(
  bundle: Record<string, unknown>,
  namespace: string,
): Array<{ key: string; value: string }> {
  const parts = namespace.split(".");
  let cur: unknown = bundle;
  for (const p of parts) {
    if (typeof cur !== "object" || cur === null) return [];
    cur = (cur as Record<string, unknown>)[p];
  }
  const acc: Array<{ key: string; value: string }> = [];
  walkLeaves(cur, namespace, acc);
  return acc;
}

describe("i18n completeness — portfolio.* (3 locales)", () => {
  for (const locale of Object.keys(LOCALE_BUNDLES) as Locale[]) {
    describe(`locale: ${locale}`, () => {
      const leaves = leavesUnder(
        LOCALE_BUNDLES[locale] as unknown as Record<string, unknown>,
        "portfolio",
      );

      it(`exposes at least one portfolio.* key (sanity guard against silent dataset deletion)`, () => {
        expect(leaves.length).toBeGreaterThan(0);
      });

      it(`every portfolio.* leaf is a non-empty string`, () => {
        const empty = leaves.filter((l) => l.value.trim().length === 0);
        expect(
          empty.map((l) => l.key),
          `${locale}: empty portfolio.* leaves: ${empty.map((l) => l.key).join(", ") || "(none)"}`,
        ).toEqual([]);
      });

      it(`no portfolio.* leaf matches the placeholder pattern (TODO / TBD / [PL] / [EN] / [SV])`, () => {
        const offenders = leaves.filter((l) => PLACEHOLDER_PATTERN.test(l.value));
        expect(
          offenders.map((l) => `${l.key} = ${JSON.stringify(l.value)}`),
          `${locale}: portfolio.* leaves still contain placeholders`,
        ).toEqual([]);
      });
    });
  }
});

describe("i18n completeness — nav.items.portfolio (3 locales)", () => {
  it.each(Object.keys(LOCALE_BUNDLES) as Locale[])(
    "%s: nav.items.portfolio is a non-empty, non-placeholder string",
    (locale) => {
      const bundle = LOCALE_BUNDLES[locale] as unknown as {
        nav?: { items?: { portfolio?: unknown } };
      };
      const value = bundle.nav?.items?.portfolio;
      expect(typeof value, `${locale}: nav.items.portfolio is missing`).toBe(
        "string",
      );
      expect((value as string).trim().length).toBeGreaterThan(0);
      expect(PLACEHOLDER_PATTERN.test(value as string)).toBe(false);
    },
  );
});

describe("i18n completeness — portfolio.* key parity across locales", () => {
  it("the set of leaf keys under portfolio.* is identical in pl / en / sv", () => {
    const keysFor = (locale: Locale): string[] => {
      return leavesUnder(
        LOCALE_BUNDLES[locale] as unknown as Record<string, unknown>,
        "portfolio",
      )
        .map((l) => l.key)
        .sort();
    };
    const pl = keysFor("pl");
    const en = keysFor("en");
    const sv = keysFor("sv");

    expect(en, "EN keys diverge from PL").toEqual(pl);
    expect(sv, "SV keys diverge from PL").toEqual(pl);
  });
});
