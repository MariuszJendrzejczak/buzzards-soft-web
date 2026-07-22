import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// <Certification> is a Server Component reading `getTranslations`; stub
// next-intl/server to walk the PL bundle (PL is the source of truth, mirroring
// the offer-* section tests). The oracle for the proof elements — the four
// badge names and the five competency-area titles — is the certificate PDF's
// hard facts, captured verbatim in pl.json's `certification` namespace.
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

import { Certification } from "@/components/sections/certification/certification";

const cert = plMessages.certification;

// Independent oracle: the four earned distinctions from the certificate PDF.
const EXPECTED_BADGE_NAMES = [
  cert.badges.builder.name,
  cert.badges.architect.name,
  cert.badges.champion.name,
  cert.badges.bestProject.name,
] as const;

// Independent oracle: the five competency modules on the certificate.
const EXPECTED_AREA_TITLES = [
  cert.areas["1"].title,
  cert.areas["2"].title,
  cert.areas["3"].title,
  cert.areas["4"].title,
  cert.areas["5"].title,
] as const;

afterEach(() => {
  cleanup();
});

async function renderSection() {
  const tree = await Certification();
  return render(tree);
}

describe("<Certification>", () => {
  it("exposes the section under the #certification anchor with an accessible heading", async () => {
    const { container } = await renderSection();
    const section = container.querySelector("section#certification");
    expect(section).not.toBeNull();
    expect(section?.getAttribute("aria-labelledby")).toBe(
      "certification-heading",
    );
  });

  it("renders all four earned badges as images labelled by their names", async () => {
    await renderSection();
    for (const name of EXPECTED_BADGE_NAMES) {
      expect(
        screen.getByRole("img", { name }),
        `missing badge image: ${name}`,
      ).toBeInTheDocument();
    }
  });

  it("renders all five competency-area headings", async () => {
    await renderSection();
    for (const title of EXPECTED_AREA_TITLES) {
      expect(
        screen.getByRole("heading", { name: title }),
        `missing area heading: ${title}`,
      ).toBeInTheDocument();
    }
  });

  it("renders a thumbnail trigger with its accessible open-label name", async () => {
    await renderSection();
    expect(
      screen.getByRole("button", { name: cert.thumbnail.openLabel }),
    ).toBeInTheDocument();
  });

  it("opens a dialog containing the full certificate image when the thumbnail trigger is activated", async () => {
    await renderSection();
    const trigger = screen.getByRole("button", {
      name: cert.thumbnail.openLabel,
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog");
    // Both thumbnail and full image share the same alt; the full image is the
    // one now inside the opened dialog.
    expect(
      within(dialog).getByRole("img", { name: cert.thumbnail.alt }),
    ).toBeInTheDocument();
  });
});
