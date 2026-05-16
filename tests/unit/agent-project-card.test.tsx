import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AgentProjectCard } from "@/components/portfolio/AgentProjectCard";
import { getAgentProject } from "@/lib/portfolio/agent-projects";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

const homeStorage = getAgentProject("home-storage");
const polilocale = getAgentProject("polilocale");
const buzzards = getAgentProject("buzzards-soft");

if (!homeStorage || !polilocale || !buzzards) {
  throw new Error(
    "test fixture: all three agent projects must exist in AGENT_PROJECTS",
  );
}

describe("<AgentProjectCard>", () => {
  it("renders the project title via the i18n key", () => {
    renderWithIntl(<AgentProjectCard project={homeStorage} />);
    expect(
      screen.getByText(enMessages.portfolio.agent.homeStorage.title),
    ).toBeInTheDocument();
  });

  it("renders the project description via the i18n key", () => {
    renderWithIntl(<AgentProjectCard project={homeStorage} />);
    expect(
      screen.getByText(enMessages.portfolio.agent.homeStorage.description),
    ).toBeInTheDocument();
  });

  it("renders the title as a heading (level 4 — H3 is the section header)", () => {
    renderWithIntl(<AgentProjectCard project={polilocale} />);
    const heading = screen.getByRole("heading", { level: 4 });
    expect(heading.textContent).toBe(enMessages.portfolio.agent.polilocale.title);
  });

  it("sets a data-agent-project attribute equal to the project id", () => {
    const { container } = renderWithIntl(
      <AgentProjectCard project={buzzards} />,
    );
    const wrapper = container.querySelector("[data-agent-project]");
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute("data-agent-project")).toBe("buzzards-soft");
    expect(wrapper?.tagName).toBe("ARTICLE");
  });

  it("renders one badge chip per project.badges entry", () => {
    const { container } = renderWithIntl(
      <AgentProjectCard project={homeStorage} />,
    );
    const badges = container.querySelectorAll("[data-agent-badge]");
    expect(badges).toHaveLength(homeStorage.badges.length);
    for (let i = 0; i < homeStorage.badges.length; i += 1) {
      expect(badges[i]?.textContent).toBe(homeStorage.badges[i]);
    }
  });

  it("renders Home Storage badges (Flutter / Firebase / CI/CD)", () => {
    renderWithIntl(<AgentProjectCard project={homeStorage} />);
    expect(screen.getByText("Flutter")).toBeInTheDocument();
    expect(screen.getByText("Firebase")).toBeInTheDocument();
    expect(screen.getByText("CI/CD")).toBeInTheDocument();
  });

  it("renders Polilocale badges (TypeScript / AGPL-3.0 / Web)", () => {
    renderWithIntl(<AgentProjectCard project={polilocale} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("AGPL-3.0")).toBeInTheDocument();
    expect(screen.getByText("Web")).toBeInTheDocument();
  });

  it("renders no <ProjectLink> when project.links is empty (Home Storage placeholder)", () => {
    const { container } = renderWithIntl(
      <AgentProjectCard project={homeStorage} />,
    );
    // No anchors should be present — the placeholder card has no links.
    const anchors = container.querySelectorAll("a");
    expect(anchors).toHaveLength(0);
  });

  it("renders no <ProjectLink> when project.links is empty (buzzards-soft)", () => {
    const { container } = renderWithIntl(
      <AgentProjectCard project={buzzards} />,
    );
    const anchors = container.querySelectorAll("a");
    expect(anchors).toHaveLength(0);
  });

  it("merges a user-supplied className on the outer wrapper", () => {
    const { container } = renderWithIntl(
      <AgentProjectCard project={polilocale} className="custom-card" />,
    );
    const wrapper = container.querySelector("[data-agent-project]");
    expect(wrapper?.className).toContain("custom-card");
  });
});
