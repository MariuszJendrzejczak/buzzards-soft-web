import { describe, expect, it } from "vitest";

import {
  AGENT_PROJECTS,
  getAgentProject,
} from "@/lib/portfolio/agent-projects";
import {
  AGENT_PROJECT_LINK_KINDS,
  isAgentProject,
  isAgentProjectLink,
  isAgentProjectLinkKind,
} from "@/lib/portfolio/types";

describe("AGENT_PROJECTS — dataset shape", () => {
  it("contains exactly 4 live projects", () => {
    expect(AGENT_PROJECTS).toHaveLength(4);
  });

  it("every entry satisfies the AgentProject type guard", () => {
    for (const project of AGENT_PROJECTS) {
      expect(
        isAgentProject(project),
        `project ${(project as { id?: string }).id} failed isAgentProject`,
      ).toBe(true);
    }
  });

  it("includes the four expected project ids in order", () => {
    const ids = AGENT_PROJECTS.map((p) => p.id);
    expect(ids).toEqual([
      "home-storage",
      "neatu-dashboard",
      "polilocale",
      "buzzards-soft",
    ]);
  });

  it("every titleKey points under portfolio.agent.* namespace", () => {
    for (const project of AGENT_PROJECTS) {
      expect(project.titleKey.startsWith("portfolio.agent.")).toBe(true);
      expect(project.descriptionKey.startsWith("portfolio.agent.")).toBe(true);
    }
  });

  it("every badge is a non-empty string", () => {
    for (const project of AGENT_PROJECTS) {
      expect(project.badges.length).toBeGreaterThan(0);
      for (const badge of project.badges) {
        expect(typeof badge).toBe("string");
        expect(badge.length).toBeGreaterThan(0);
      }
    }
  });

  it("home-storage links to both app stores (Google Play + App Store)", () => {
    const homeStorage = getAgentProject("home-storage");
    expect(homeStorage).toBeDefined();
    expect(homeStorage!.links.map((l) => l.kind)).toEqual(["google", "apple"]);
  });

  it("neatu-dashboard links to its homepage (neatu.app)", () => {
    const dashboard = getAgentProject("neatu-dashboard");
    expect(dashboard).toBeDefined();
    expect(dashboard!.links.map((l) => l.kind)).toEqual(["homepage"]);
  });

  it("polilocale links to its public GitHub repo", () => {
    const polilocale = getAgentProject("polilocale");
    expect(polilocale).toBeDefined();
    expect(polilocale!.links.map((l) => l.kind)).toEqual(["github"]);
  });

  it("buzzards-soft ships with no links (no /process subpage yet)", () => {
    const site = getAgentProject("buzzards-soft");
    expect(site).toBeDefined();
    expect(site!.links).toHaveLength(0);
  });

  it("mobile + dashboard projects carry an iconSrc asset", () => {
    expect(getAgentProject("home-storage")!.iconSrc).toBeTruthy();
    expect(getAgentProject("neatu-dashboard")!.iconSrc).toBeTruthy();
  });

  it("every link.kind is one of the 4 allowed literals", () => {
    for (const project of AGENT_PROJECTS) {
      for (const link of project.links) {
        expect(isAgentProjectLinkKind(link.kind)).toBe(true);
        expect(AGENT_PROJECT_LINK_KINDS).toContain(link.kind);
      }
    }
  });

  it("every link.url is a non-empty string", () => {
    for (const project of AGENT_PROJECTS) {
      for (const link of project.links) {
        expect(typeof link.url).toBe("string");
        expect(link.url.length).toBeGreaterThan(0);
      }
    }
  });

  it("project ids are unique", () => {
    const ids = AGENT_PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("getAgentProject()", () => {
  it("returns the project by id", () => {
    const home = getAgentProject("home-storage");
    expect(home).toBeDefined();
    expect(home!.id).toBe("home-storage");
  });

  it("returns undefined for an unknown id", () => {
    expect(getAgentProject("nonexistent")).toBeUndefined();
  });
});

describe("AgentProject type guards — edge cases", () => {
  it("isAgentProjectLinkKind rejects unknown strings", () => {
    expect(isAgentProjectLinkKind("twitter")).toBe(false);
    expect(isAgentProjectLinkKind("")).toBe(false);
    expect(isAgentProjectLinkKind(null)).toBe(false);
    expect(isAgentProjectLinkKind(undefined)).toBe(false);
  });

  it("isAgentProjectLink rejects malformed objects", () => {
    expect(isAgentProjectLink(null)).toBe(false);
    expect(isAgentProjectLink({})).toBe(false);
    expect(isAgentProjectLink({ kind: "google" })).toBe(false);
    expect(isAgentProjectLink({ kind: "google", url: "" })).toBe(false);
    expect(isAgentProjectLink({ kind: "twitter", url: "x" })).toBe(false);
  });

  it("isAgentProjectLink accepts a well-formed link", () => {
    expect(
      isAgentProjectLink({ kind: "github", url: "https://github.com/x" }),
    ).toBe(true);
  });

  it("isAgentProject rejects malformed values", () => {
    expect(isAgentProject(null)).toBe(false);
    expect(isAgentProject({})).toBe(false);
    expect(
      isAgentProject({
        id: "x",
        titleKey: "t",
        descriptionKey: "d",
        badges: ["", "ok"],
        links: [],
      }),
    ).toBe(false);
    expect(
      isAgentProject({
        id: "x",
        titleKey: "t",
        descriptionKey: "d",
        badges: ["ok"],
        links: [{ kind: "bogus", url: "u" }],
      }),
    ).toBe(false);
  });

  it("isAgentProject accepts a well-formed minimal project", () => {
    expect(
      isAgentProject({
        id: "x",
        titleKey: "portfolio.agent.x.title",
        descriptionKey: "portfolio.agent.x.description",
        badges: ["A"],
        links: [],
      }),
    ).toBe(true);
  });
});
