import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Server Component reading `getTranslations`; stub next-intl/server to walk the
// PL bundle. Oracle for the merged section = offer-rewrite-pl.md `offer.ownership`
// (the SB7 "stakes + success + honest limits" beat, merged from the former
// `ownership` + `limits` groups), captured in pl.json.
vi.mock("next-intl/server", async () => {
  const pl = (await import("@/messages/pl.json")).default as Record<
    string,
    unknown
  >;

  function resolve(dotted: string): string {
    const parts = dotted.split(".");
    let cur: unknown = pl;
    for (const p of parts) {
      if (typeof cur !== "object" || cur === null) return dotted;
      cur = (cur as Record<string, unknown>)[p];
    }
    return typeof cur === "string" ? cur : dotted;
  }

  return {
    getTranslations: async (namespace?: string) => {
      const ns = typeof namespace === "string" ? namespace : "";
      return (key: string) => resolve(ns ? `${ns}.${key}` : key);
    },
  };
});

vi.mock("@/components/shared/scroll-reveal", () => ({
  ScrollReveal: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  StaggerGroup: ({ children }: { children: React.ReactNode }) => (
    <ul>{children}</ul>
  ),
  StaggerItem: ({ children }: { children: React.ReactNode }) => (
    <li>{children}</li>
  ),
}));

import plMessages from "@/messages/pl.json";

import { OfferOwnership } from "@/components/sections/offer/offer-ownership";

const ownership = plMessages.offer.ownership;

afterEach(() => {
  cleanup();
});

async function renderOwnership() {
  const tree = await OfferOwnership();
  return render(tree);
}

describe("<OfferOwnership>", () => {
  it("anchors the section at #offer-ownership", async () => {
    const { container } = await renderOwnership();
    expect(container.querySelector("#offer-ownership")).not.toBeNull();
  });

  it("renders the ownership heading and body from offer.ownership", async () => {
    const { container } = await renderOwnership();
    expect(container.textContent).toContain(ownership.heading);
    expect(container.textContent).toContain(ownership.body);
  });

  it("renders the merged honest-limits block (limitsHeading + both limit items)", async () => {
    // The Phase-3 map merges the former `offer.limits` group into `ownership`,
    // so both the seo + commerce limits must now surface in this one section.
    const { container } = await renderOwnership();
    expect(container.textContent).toContain(ownership.limitsHeading);
    expect(container.textContent).toContain(ownership.limits.seo.lead);
    expect(container.textContent).toContain(ownership.limits.seo.body);
    expect(container.textContent).toContain(ownership.limits.commerce.lead);
    expect(container.textContent).toContain(ownership.limits.commerce.body);
  });
});
