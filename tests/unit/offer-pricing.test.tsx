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

  it("renders both fixed-price tier names (Basic + Full)", async () => {
    const { container } = await renderPricing();
    expect(container.textContent).toContain(pricing.basic.name);
    expect(container.textContent).toContain(pricing.full.name);
  });

  it("renders the target price in each fixed-price tier", async () => {
    const { container } = await renderPricing();
    const basic = container.querySelector('[data-pricing-tier="basic"]');
    const full = container.querySelector('[data-pricing-tier="full"]');
    expect(pricing.basic.price).toBe("1999 zł");
    expect(pricing.full.price).toBe("2999 zł");
    expect(basic?.textContent).toContain(pricing.basic.price);
    expect(full?.textContent).toContain(pricing.full.price);
  });

  it("shows no expired promotion: no struck-through price, no dated promo copy", async () => {
    const { container } = await renderPricing();
    expect(container.querySelector(".line-through")).toBeNull();
    expect(container.textContent).not.toMatch(/sierp|promocyj/i);
    expect(pricing).not.toHaveProperty("promoNote");
  });

  it("renders the individual-quote price for the custom tier", async () => {
    const { container } = await renderPricing();
    const custom = container.querySelector('[data-pricing-tier="custom"]');
    expect(custom?.textContent).toContain(pricing.custom.price);
  });
});
