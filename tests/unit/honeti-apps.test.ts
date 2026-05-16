import { describe, expect, it } from "vitest";

import {
  HONETI_APPS,
  HONETI_APPS_BY_STACK_ROLE,
  HONETI_APP_SLUGS,
  type HoneticAppSlug,
  getHoneticApp,
} from "@/lib/portfolio/honeti-apps";
import {
  ROLES,
  STACKS,
  isHoneticApp,
  isRole,
  isStack,
  roleLabelKey,
} from "@/lib/portfolio/types";

const HTTPS_REGEX = /^https:\/\//;

describe("HONETI_APPS — type & shape", () => {
  it("every entry satisfies the HoneticApp type guard", () => {
    for (const app of HONETI_APPS) {
      expect(isHoneticApp(app), `app ${(app as { slug?: string }).slug} failed isHoneticApp`).toBe(true);
    }
  });

  it("every role is one of the three allowed literals", () => {
    for (const app of HONETI_APPS) {
      expect(isRole(app.role), `app ${app.slug} has invalid role ${app.role}`).toBe(true);
      expect(["od-zera", "rozwoj-i-serwis", "przejety-w-trakcie"]).toContain(app.role);
    }
  });

  it("every stack is one of the two allowed literals", () => {
    for (const app of HONETI_APPS) {
      expect(isStack(app.stack), `app ${app.slug} has invalid stack ${app.stack}`).toBe(true);
      expect(["Flutter", "Unity"]).toContain(app.stack);
    }
  });

  it("every present link starts with https://", () => {
    for (const app of HONETI_APPS) {
      if (app.googleLink) expect(app.googleLink).toMatch(HTTPS_REGEX);
      if (app.appleLink) expect(app.appleLink).toMatch(HTTPS_REGEX);
      if (app.external) expect(app.external.url).toMatch(HTTPS_REGEX);
    }
  });

  it("every slug is unique", () => {
    const seen = new Set<string>();
    for (const app of HONETI_APPS) {
      expect(seen.has(app.slug), `duplicate slug ${app.slug}`).toBe(false);
      seen.add(app.slug);
    }
  });

  it("every contribution list is non-empty and every bullet is a non-empty string", () => {
    for (const app of HONETI_APPS) {
      expect(app.contribution.length).toBeGreaterThan(0);
      for (const bullet of app.contribution) {
        expect(typeof bullet).toBe("string");
        expect(bullet.length).toBeGreaterThan(0);
      }
    }
  });

  it("every app has either a googleLink or an external link (rendering invariant)", () => {
    for (const app of HONETI_APPS) {
      const hasStoreOrExternal = Boolean(app.googleLink) || Boolean(app.appleLink) || Boolean(app.external);
      expect(hasStoreOrExternal, `${app.slug} has no link of any kind`).toBe(true);
    }
  });
});

describe("HONETI_APPS — counts per orchestrator override (15 = 5 Flutter + 10 Unity)", () => {
  it("contains exactly 5 Flutter apps", () => {
    const flutter = HONETI_APPS.filter((a) => a.stack === "Flutter");
    expect(flutter).toHaveLength(5);
  });

  it("contains exactly 10 Unity apps", () => {
    const unity = HONETI_APPS.filter((a) => a.stack === "Unity");
    expect(unity).toHaveLength(10);
  });

  it("contains 15 apps in total", () => {
    expect(HONETI_APPS).toHaveLength(15);
  });
});

describe("HONETI_APPS — specific role assignments per planning doc", () => {
  it("Soildata is taken over mid-way", () => {
    const app = getHoneticApp("soildata");
    expect(app).toBeDefined();
    expect(app?.role).toBe("przejety-w-trakcie");
    expect(app?.stack).toBe("Unity");
  });

  it.each(["words-en", "irregular-verbs", "der-die-das", "flags"])(
    "Unity own app %s is built from scratch (od-zera)",
    (slug) => {
      const app = getHoneticApp(slug);
      expect(app, `slug ${slug} should exist`).toBeDefined();
      expect(app?.stack).toBe("Unity");
      expect(app?.role).toBe("od-zera");
    },
  );

  it("Gastro Ninja Klient is maintenance (rozwoj-i-serwis)", () => {
    const app = getHoneticApp("gastro-ninja-klient");
    expect(app).toBeDefined();
    expect(app?.role).toBe("rozwoj-i-serwis");
    expect(app?.stack).toBe("Unity");
  });

  it("Gen / Oczami Dziecka is maintenance and uses external link, not googleLink", () => {
    const app = getHoneticApp("gen-oczami-dziecka");
    expect(app).toBeDefined();
    expect(app?.role).toBe("rozwoj-i-serwis");
    expect(app?.stack).toBe("Unity");
    expect(app?.googleLink).toBeUndefined();
    expect(app?.external).toBeDefined();
    expect(app?.external?.url).toBe("https://gen.edu.pl/");
  });

  it.each(["multiplication", "exponents", "roman"])(
    "extra educational app %s is maintenance (rozwoj-i-serwis)",
    (slug) => {
      const app = getHoneticApp(slug);
      expect(app, `slug ${slug} should exist`).toBeDefined();
      expect(app?.role).toBe("rozwoj-i-serwis");
      expect(app?.stack).toBe("Unity");
    },
  );

  it("Infoshare is the only app with appleLink", () => {
    const withApple = HONETI_APPS.filter((a) => a.appleLink !== undefined);
    expect(withApple).toHaveLength(1);
    expect(withApple[0].slug).toBe("infoshare");
  });
});

describe("HONETI_APPS_BY_STACK_ROLE — grouping integrity", () => {
  it("partitions every app into exactly one (stack, role) bucket", () => {
    let counted = 0;
    for (const stack of STACKS) {
      for (const role of ROLES) {
        counted += HONETI_APPS_BY_STACK_ROLE[stack][role].length;
      }
    }
    expect(counted).toBe(HONETI_APPS.length);
  });

  it("each bucket contains only apps with that stack and role", () => {
    for (const stack of STACKS) {
      for (const role of ROLES) {
        for (const app of HONETI_APPS_BY_STACK_ROLE[stack][role]) {
          expect(app.stack).toBe(stack);
          expect(app.role).toBe(role);
        }
      }
    }
  });

  it("Flutter has no maintenance bucket entries (all five Flutter apps are od-zera)", () => {
    expect(HONETI_APPS_BY_STACK_ROLE.Flutter["od-zera"]).toHaveLength(5);
    expect(HONETI_APPS_BY_STACK_ROLE.Flutter["rozwoj-i-serwis"]).toHaveLength(0);
    expect(HONETI_APPS_BY_STACK_ROLE.Flutter["przejety-w-trakcie"]).toHaveLength(0);
  });

  it("Unity has the expected per-role split: 4 / 5 / 1", () => {
    expect(HONETI_APPS_BY_STACK_ROLE.Unity["od-zera"]).toHaveLength(4);
    expect(HONETI_APPS_BY_STACK_ROLE.Unity["rozwoj-i-serwis"]).toHaveLength(5);
    expect(HONETI_APPS_BY_STACK_ROLE.Unity["przejety-w-trakcie"]).toHaveLength(1);
  });
});

describe("HoneticAppSlug literal-union type", () => {
  it("HONETI_APP_SLUGS is typed as readonly HoneticAppSlug[]", () => {
    // Type-only assertion: assigning HONETI_APP_SLUGS to a readonly
    // HoneticAppSlug[] proves the exported slug list carries the narrow
    // literal-union type (not just `string[]`).
    const typed: readonly HoneticAppSlug[] = HONETI_APP_SLUGS;
    expect(typed).toHaveLength(15);
  });

  it("each known slug literal is assignable to HoneticAppSlug", () => {
    // Hand-picked literals chosen to exercise both Flutter (`infoshare`)
    // and Unity (`gen-oczami-dziecka`, `roman`) ends of the union.
    const a: HoneticAppSlug = "infoshare";
    const b: HoneticAppSlug = "gen-oczami-dziecka";
    const c: HoneticAppSlug = "roman";
    expect([a, b, c]).toEqual(["infoshare", "gen-oczami-dziecka", "roman"]);
  });

  it("getHoneticApp returns undefined for an unknown slug (runtime sanity)", () => {
    expect(getHoneticApp("definitely-not-an-app")).toBeUndefined();
  });
});

describe("getHoneticApp + HONETI_APP_SLUGS", () => {
  it("returns the matching app for every known slug", () => {
    for (const slug of HONETI_APP_SLUGS) {
      const app = getHoneticApp(slug);
      expect(app).toBeDefined();
      expect(app?.slug).toBe(slug);
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(getHoneticApp("definitely-not-an-app")).toBeUndefined();
  });

  it("HONETI_APP_SLUGS is the projection of HONETI_APPS' slug field", () => {
    expect(HONETI_APP_SLUGS).toEqual(HONETI_APPS.map((a) => a.slug));
  });
});

describe("type-level helpers in lib/portfolio/types", () => {
  it("isStack rejects non-stack values", () => {
    expect(isStack("React")).toBe(false);
    expect(isStack("flutter")).toBe(false);
    expect(isStack(undefined)).toBe(false);
    expect(isStack(null)).toBe(false);
    expect(isStack(42)).toBe(false);
  });

  it("isRole rejects non-role values", () => {
    expect(isRole("OD-ZERA")).toBe(false);
    expect(isRole("maintenance")).toBe(false);
    expect(isRole(undefined)).toBe(false);
    expect(isRole(0)).toBe(false);
  });

  it("isHoneticApp rejects malformed input", () => {
    expect(isHoneticApp(null)).toBe(false);
    expect(isHoneticApp(undefined)).toBe(false);
    expect(isHoneticApp("a string")).toBe(false);
    expect(isHoneticApp({})).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: [],
      }),
    ).toBe(true);
    expect(
      isHoneticApp({
        slug: "",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: ["c"],
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Java",
        role: "od-zera",
        description: "d",
        contribution: ["c"],
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "maintainer",
        description: "d",
        contribution: ["c"],
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: ["c"],
        external: { label: "", url: "https://x" },
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: ["c", 7],
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: ["c"],
        packageName: 123,
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: ["c"],
        googleLink: 5,
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: ["c"],
        appleLink: false,
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "d",
        contribution: ["c"],
        external: "https://x",
      }),
    ).toBe(false);
    expect(
      isHoneticApp({
        slug: "x",
        name: "X",
        stack: "Flutter",
        role: "od-zera",
        description: "",
        contribution: ["c"],
      }),
    ).toBe(false);
  });

  it("roleLabelKey returns the expected i18n key shape", () => {
    expect(roleLabelKey("od-zera")).toBe("portfolio.role.od-zera");
    expect(roleLabelKey("rozwoj-i-serwis")).toBe("portfolio.role.rozwoj-i-serwis");
    expect(roleLabelKey("przejety-w-trakcie")).toBe("portfolio.role.przejety-w-trakcie");
  });
});
