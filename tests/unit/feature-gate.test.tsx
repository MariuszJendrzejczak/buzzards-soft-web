import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type FeatureFlagsShape = {
  HOME_STORAGE_MVP_LIVE: boolean;
  POLILOCALE_REPO_PUBLIC: boolean;
  AGENT_PORTFOLIO_SECTION_LIVE: boolean;
};

const MARKER = "feature-gate-visible-marker";

async function loadFreshFeatureGate(
  flags: Partial<FeatureFlagsShape> = {},
): Promise<typeof import("@/components/FeatureGate").FeatureGate> {
  const merged: FeatureFlagsShape = {
    HOME_STORAGE_MVP_LIVE: false,
    POLILOCALE_REPO_PUBLIC: false,
    AGENT_PORTFOLIO_SECTION_LIVE: false,
    ...flags,
  };

  vi.resetModules();
  vi.doMock("@/lib/config/feature-flags", () => ({
    HOME_STORAGE_MVP_LIVE: merged.HOME_STORAGE_MVP_LIVE,
    POLILOCALE_REPO_PUBLIC: merged.POLILOCALE_REPO_PUBLIC,
    AGENT_PORTFOLIO_SECTION_LIVE: merged.AGENT_PORTFOLIO_SECTION_LIVE,
    FEATURE_FLAGS: merged,
  }));

  const mod = await import("@/components/FeatureGate");
  return mod.FeatureGate;
}

afterEach(() => {
  vi.doUnmock("@/lib/config/feature-flags");
  vi.resetModules();
  cleanup();
});

describe("<FeatureGate> — explicit per-flag rendering", () => {
  it("renders children when the specified flag is true", async () => {
    const FeatureGate = await loadFreshFeatureGate({ HOME_STORAGE_MVP_LIVE: true });
    render(
      <FeatureGate flag="HOME_STORAGE_MVP_LIVE">
        <span>{MARKER}</span>
      </FeatureGate>,
    );
    expect(screen.getByText(MARKER)).toBeInTheDocument();
  });

  it("renders null when the specified flag is false (children not in DOM)", async () => {
    const FeatureGate = await loadFreshFeatureGate({ HOME_STORAGE_MVP_LIVE: false });
    const { container } = render(
      <FeatureGate flag="HOME_STORAGE_MVP_LIVE">
        <span data-testid="hidden">{MARKER}</span>
      </FeatureGate>,
    );
    expect(screen.queryByTestId("hidden")).toBeNull();
    expect(screen.queryByText(MARKER)).toBeNull();
    expect(container.querySelector("[data-testid='hidden']")).toBeNull();
    // gate must produce nothing in the DOM, not just hidden via CSS
    expect(container.firstChild).toBeNull();
  });

  it("renders children for POLILOCALE_REPO_PUBLIC=true", async () => {
    const FeatureGate = await loadFreshFeatureGate({ POLILOCALE_REPO_PUBLIC: true });
    render(
      <FeatureGate flag="POLILOCALE_REPO_PUBLIC">
        <span>{MARKER}</span>
      </FeatureGate>,
    );
    expect(screen.getByText(MARKER)).toBeInTheDocument();
  });

  it("hides children for POLILOCALE_REPO_PUBLIC=false", async () => {
    const FeatureGate = await loadFreshFeatureGate({ POLILOCALE_REPO_PUBLIC: false });
    const { container } = render(
      <FeatureGate flag="POLILOCALE_REPO_PUBLIC">
        <span>{MARKER}</span>
      </FeatureGate>,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe("<FeatureGate> — all 4 combinations of the computed AGENT_PORTFOLIO_SECTION_LIVE flag", () => {
  type Case = {
    storage: boolean;
    polilocale: boolean;
    expectedComputed: boolean;
  };

  const cases: Case[] = [
    { storage: false, polilocale: false, expectedComputed: false },
    { storage: true, polilocale: false, expectedComputed: false },
    { storage: false, polilocale: true, expectedComputed: false },
    { storage: true, polilocale: true, expectedComputed: true },
  ];

  it.each(cases)(
    "HOME_STORAGE_MVP_LIVE=$storage & POLILOCALE_REPO_PUBLIC=$polilocale -> AGENT_PORTFOLIO_SECTION_LIVE=$expectedComputed",
    async ({ storage, polilocale, expectedComputed }) => {
      const FeatureGate = await loadFreshFeatureGate({
        HOME_STORAGE_MVP_LIVE: storage,
        POLILOCALE_REPO_PUBLIC: polilocale,
        AGENT_PORTFOLIO_SECTION_LIVE: storage && polilocale,
      });

      const { container } = render(
        <FeatureGate flag="AGENT_PORTFOLIO_SECTION_LIVE">
          <span>{MARKER}</span>
        </FeatureGate>,
      );

      if (expectedComputed) {
        expect(screen.getByText(MARKER)).toBeInTheDocument();
      } else {
        expect(container.firstChild).toBeNull();
        expect(screen.queryByText(MARKER)).toBeNull();
      }
    },
  );
});

describe("feature-flags module — env-var parsing", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE;
    delete process.env.NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC;
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.resetModules();
  });

  it("defaults both source flags to false when env vars are absent", async () => {
    const mod = await import("@/lib/config/feature-flags");
    expect(mod.HOME_STORAGE_MVP_LIVE).toBe(false);
    expect(mod.POLILOCALE_REPO_PUBLIC).toBe(false);
    expect(mod.AGENT_PORTFOLIO_SECTION_LIVE).toBe(false);
  });

  it("only the literal string 'true' flips a flag — case-sensitive and exact", async () => {
    process.env.NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE = "True";
    process.env.NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC = "1";
    const mod = await import("@/lib/config/feature-flags");
    expect(mod.HOME_STORAGE_MVP_LIVE).toBe(false);
    expect(mod.POLILOCALE_REPO_PUBLIC).toBe(false);
    expect(mod.AGENT_PORTFOLIO_SECTION_LIVE).toBe(false);
  });

  it("computed flag is the conjunction of the two source flags", async () => {
    process.env.NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE = "true";
    process.env.NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC = "true";
    const mod = await import("@/lib/config/feature-flags");
    expect(mod.HOME_STORAGE_MVP_LIVE).toBe(true);
    expect(mod.POLILOCALE_REPO_PUBLIC).toBe(true);
    expect(mod.AGENT_PORTFOLIO_SECTION_LIVE).toBe(true);
    expect(mod.FEATURE_FLAGS.AGENT_PORTFOLIO_SECTION_LIVE).toBe(true);
  });

  it("computed flag stays false when only one source flag is true", async () => {
    process.env.NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE = "true";
    process.env.NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC = "false";
    const mod = await import("@/lib/config/feature-flags");
    expect(mod.HOME_STORAGE_MVP_LIVE).toBe(true);
    expect(mod.POLILOCALE_REPO_PUBLIC).toBe(false);
    expect(mod.AGENT_PORTFOLIO_SECTION_LIVE).toBe(false);
  });
});
