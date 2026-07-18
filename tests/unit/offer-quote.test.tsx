import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// OfferQuote is a Server Component reading `getTranslations` from
// `next-intl/server`. Stub it to walk the PL messages bundle (PL is the copy
// source of truth for this slice — the oracle for the assertions below is
// offer-page.md §11, which lives in pl.json under `offer.quote`).
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

// Stub the reused form to a probe that echoes the props OfferQuote passes it.
// The form's own rendering is covered by contact-form.test.tsx; here we assert
// the wiring — that the offer variant sources its intro + placeholder from the
// `offer.quote` keys and marks the payload context.
vi.mock("@/components/sections/contact/contact-form", () => ({
  ContactForm: ({
    intro,
    messagePlaceholder,
    context,
  }: {
    intro?: string;
    messagePlaceholder?: string;
    context?: string;
  }) => (
    <div
      data-testid="contact-form-probe"
      data-intro={intro}
      data-message-placeholder={messagePlaceholder}
      data-context={context}
    />
  ),
}));

import plMessages from "@/messages/pl.json";

import { OfferQuote } from "@/components/sections/offer/offer-quote";

const quote = plMessages.offer.quote;

afterEach(() => {
  cleanup();
});

async function renderQuote() {
  const tree = await OfferQuote();
  return render(tree);
}

describe("<OfferQuote>", () => {
  it("anchors the section at #offer-quote so the Hero/pricing CTAs resolve", async () => {
    const { container } = await renderQuote();
    expect(container.querySelector("#offer-quote")).not.toBeNull();
  });

  it("renders the offer-page.md §11 heading", async () => {
    const { container } = await renderQuote();
    expect(container.textContent).toContain(quote.heading);
  });

  it("feeds the reused form the offer-specific intro + message placeholder", async () => {
    const { getByTestId } = await renderQuote();
    const probe = getByTestId("contact-form-probe");
    expect(probe.getAttribute("data-intro")).toBe(quote.intro);
    expect(probe.getAttribute("data-message-placeholder")).toBe(
      quote.messagePlaceholder,
    );
  });

  it("tags the lead with an offer context marker for the Cloud Function", async () => {
    const { getByTestId } = await renderQuote();
    expect(getByTestId("contact-form-probe").getAttribute("data-context")).toBe(
      "web-pages-offer",
    );
  });
});
