import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Server Component reading `getTranslations`; stub next-intl/server to walk the
// PL bundle. Oracle for this new SB7 "proof" beat = offer-rewrite-pl.md
// `offer.proof` (BAB site-as-proof: this page + /#warsztat, no client assets),
// captured in pl.json.
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

// The i18n Link renders an <a>; stub to a plain anchor exposing href so we can
// assert the site-as-proof link points at /#warsztat.
vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

import plMessages from "@/messages/pl.json";

import { OfferProof } from "@/components/sections/offer/offer-proof";

const proof = plMessages.offer.proof;

afterEach(() => {
  cleanup();
});

async function renderProof() {
  const tree = await OfferProof();
  return render(tree);
}

describe("<OfferProof>", () => {
  it("anchors the section at #offer-proof", async () => {
    const { container } = await renderProof();
    expect(container.querySelector("#offer-proof")).not.toBeNull();
  });

  it("renders the proof heading and body from offer.proof", async () => {
    const { container } = await renderProof();
    expect(container.textContent).toContain(proof.heading);
    expect(container.textContent).toContain(proof.body);
  });

  it("links the site-as-proof CTA to /#warsztat", async () => {
    const { container } = await renderProof();
    const link = container.querySelector('a[href="/#warsztat"]');
    expect(link).not.toBeNull();
    expect(link?.textContent).toContain(proof.link);
  });
});
