import { describe, expect, it } from "vitest";

import enMessages from "@/messages/en.json";
import plMessages from "@/messages/pl.json";
import svMessages from "@/messages/sv.json";

// Catches stale translation drafts that ship with placeholder copy. Any leaf
// under `certification.*` in any of pl/en/sv must be (a) non-empty and (b) not
// a placeholder marker. `nav.items.certification` is the home-page link label
// and gets the same gate. The real completeness gate is `npm run build` (every
// locale is statically generated); this scoped test mirrors the offer/portfolio
// ones and fails fast on a divergent key tree.
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

describe("i18n completeness — certification.* (3 locales)", () => {
  for (const locale of Object.keys(LOCALE_BUNDLES) as Locale[]) {
    describe(`locale: ${locale}`, () => {
      const leaves = leavesUnder(
        LOCALE_BUNDLES[locale] as unknown as Record<string, unknown>,
        "certification",
      );

      it(`exposes at least one certification.* key (sanity guard against silent namespace deletion)`, () => {
        expect(leaves.length).toBeGreaterThan(0);
      });

      it(`every certification.* leaf is a non-empty string`, () => {
        const empty = leaves.filter((l) => l.value.trim().length === 0);
        expect(
          empty.map((l) => l.key),
          `${locale}: empty certification.* leaves: ${empty.map((l) => l.key).join(", ") || "(none)"}`,
        ).toEqual([]);
      });

      it(`no certification.* leaf matches the placeholder pattern (TODO / TBD / [PL] / [EN] / [SV])`, () => {
        const offenders = leaves.filter((l) => PLACEHOLDER_PATTERN.test(l.value));
        expect(
          offenders.map((l) => `${l.key} = ${JSON.stringify(l.value)}`),
          `${locale}: certification.* leaves still contain placeholders`,
        ).toEqual([]);
      });
    });
  }
});

describe("i18n completeness — nav.items.certification (3 locales)", () => {
  it.each(Object.keys(LOCALE_BUNDLES) as Locale[])(
    "%s: nav.items.certification is a non-empty, non-placeholder string",
    (locale) => {
      const bundle = LOCALE_BUNDLES[locale] as unknown as {
        nav?: { items?: { certification?: unknown } };
      };
      const value = bundle.nav?.items?.certification;
      expect(typeof value, `${locale}: nav.items.certification is missing`).toBe(
        "string",
      );
      expect((value as string).trim().length).toBeGreaterThan(0);
      expect(PLACEHOLDER_PATTERN.test(value as string)).toBe(false);
    },
  );
});

describe("i18n completeness — certification.* key parity across locales", () => {
  it("the set of leaf keys under certification.* is identical in pl / en / sv", () => {
    const keysFor = (locale: Locale): string[] => {
      return leavesUnder(
        LOCALE_BUNDLES[locale] as unknown as Record<string, unknown>,
        "certification",
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
