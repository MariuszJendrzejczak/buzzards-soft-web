import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Server Component reading `getTranslations`; stub next-intl/server to walk the
// PL bundle. Oracle for the FAQ set = offer-page.md §10 + the locked
// "no logo / photos" decision, both captured in pl.json.
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

import { OfferFaq, OFFER_FAQ_KEYS } from "@/components/sections/offer/offer-faq";

const faq = plMessages.offer.faq;

// The expected FAQ set from offer-page.md §10 (7 questions incl. the locked
// "no logo / photos" answer). This list is the independent oracle — if a
// component drops or duplicates a question, the count assertion goes red.
const EXPECTED_FAQ_KEYS = [
  "duration",
  "texts",
  "logo",
  "selfEdit",
  "monthly",
  "domain",
  "gdpr",
] as const;

afterEach(() => {
  cleanup();
});

async function renderFaq() {
  const tree = await OfferFaq();
  return render(tree);
}

describe("<OfferFaq>", () => {
  it("renders exactly the expected number of Q&A entries (7 from §10)", async () => {
    const { container } = await renderFaq();
    const items = container.querySelectorAll("[data-slot='accordion-item']");
    expect(items).toHaveLength(EXPECTED_FAQ_KEYS.length);
  });

  it("the component's key set matches the offer-page.md §10 FAQ set", () => {
    expect([...OFFER_FAQ_KEYS]).toEqual([...EXPECTED_FAQ_KEYS]);
  });

  it("renders every expected question text", async () => {
    const { container } = await renderFaq();
    for (const key of EXPECTED_FAQ_KEYS) {
      const question = faq.items[key as keyof typeof faq.items].question;
      expect(
        container.textContent,
        `missing FAQ question: ${key}`,
      ).toContain(question);
    }
  });

  it("includes the locked 'no logo / photos' answer (client provides; simple options; branding = quote)", async () => {
    const { container } = await renderFaq();
    const logoAnswer = faq.items.logo.answer;
    expect(container.textContent).toContain(logoAnswer);
    // Guard the load-bearing content of the locked decision.
    expect(logoAnswer).toContain("dostarczasz Ty");
    expect(logoAnswer).toContain("wycena indywidualna");
  });
});
