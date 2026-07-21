import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// The section is a Server Component reading `getTranslations` from
// `next-intl/server`, which needs an RSC context the test runner can't
// bootstrap. Stub it to walk the PL messages bundle (PL is the copy source of
// truth for this slice — the oracle for the assertions below is offer-page.md
// §5 + the locked promo decision, which live in pl.json).
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
}));

import plMessages from "@/messages/pl.json";

import { OfferPricing } from "@/components/sections/offer/offer-pricing";

const pricing = plMessages.offer.pricing;

afterEach(() => {
  cleanup();
});

async function renderPricing() {
  const tree = await OfferPricing();
  return render(tree);
}

describe("<OfferPricing>", () => {
  it("renders all three tier columns (Basic / Full / custom)", async () => {
    const { container } = await renderPricing();
    for (const tier of ["basic", "full", "custom"]) {
      expect(
        container.querySelector(`[data-pricing-tier="${tier}"]`),
        `missing tier column: ${tier}`,
      ).not.toBeNull();
    }
  });

  it("renders both promo tier names (Basic + Full)", async () => {
    const { container } = await renderPricing();
    expect(container.textContent).toContain(pricing.basic.name);
    expect(container.textContent).toContain(pricing.full.name);
  });

  it("renders the struck-through base prices for both promo tiers", async () => {
    const { container } = await renderPricing();
    const struck = Array.from(container.querySelectorAll(".line-through")).map(
      (el) => el.textContent,
    );
    expect(struck).toContain(pricing.basic.basePrice); // 1299 zł
    expect(struck).toContain(pricing.full.basePrice); // 2499 zł
  });

  it("renders the promo prices on top for both tiers", async () => {
    const { container } = await renderPricing();
    expect(container.textContent).toContain(pricing.basic.promoPrice); // 999 zł
    expect(container.textContent).toContain(pricing.full.promoPrice); // 1999 zł
  });

  it("renders the promo validity note (cena ważna do końca sierpnia) for each promo tier", async () => {
    const { container } = await renderPricing();
    const notes = Array.from(container.querySelectorAll("*")).filter(
      (el) => el.childElementCount === 0 && el.textContent === pricing.promoNote,
    );
    // one note under Basic, one under Full — custom tier has no promo note.
    expect(notes.length).toBe(2);
    expect(pricing.promoNote).toContain("końca sierpnia");
  });

  it("renders the individual-quote price for the custom tier (no promo)", async () => {
    const { container } = await renderPricing();
    const custom = container.querySelector('[data-pricing-tier="custom"]');
    expect(custom?.textContent).toContain(pricing.custom.price);
    expect(custom?.querySelector(".line-through")).toBeNull();
  });
});
