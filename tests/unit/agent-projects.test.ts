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
  it("contains exactly 3 projects per A1/B1/C2 release-gating decisions", () => {
    expect(AGENT_PROJECTS).toHaveLength(3);
  });

  it("every entry satisfies the AgentProject type guard", () => {
    for (const project of AGENT_PROJECTS) {
      expect(
        isAgentProject(project),
        `project ${(project as { id?: string }).id} failed isAgentProject`,
      ).toBe(true);
    }
  });

  it("includes the three expected project ids", () => {
    const ids = AGENT_PROJECTS.map((p) => p.id);
    expect(ids).toEqual(["home-storage", "polilocale", "buzzards-soft"]);
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

  it("home-storage has no links — anonymous placeholder until MVP ships", () => {
    const homeStorage = getAgentProject("home-storage");
    expect(homeStorage).toBeDefined();
    expect(homeStorage!.links).toHaveLength(0);
  });

  it("polilocale has no links — anonymous placeholder until repo is public", () => {
    const polilocale = getAgentProject("polilocale");
    expect(polilocale).toBeDefined();
    expect(polilocale!.links).toHaveLength(0);
  });

  it("buzzards-soft ships with no links (no /process subpage yet)", () => {
    const site = getAgentProject("buzzards-soft");
    expect(site).toBeDefined();
    expect(site!.links).toHaveLength(0);
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
