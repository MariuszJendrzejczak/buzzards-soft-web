import type { AgentProject } from "@/lib/portfolio/types";

// Three positions per `doc/agent_portfolio_context.md` (A1/B1/C2 release-gating
// decisions). Position 1 (Home Storage) and 2 (Polilocale) ship as anonymous
// placeholders while their respective gates are closed; position 3
// (buzzards-soft.com) ships with final content. The entire section is gated
// by AGENT_PORTFOLIO_SECTION_LIVE, so this data only renders once both
// HOME_STORAGE_MVP_LIVE && POLILOCALE_REPO_PUBLIC are true.

const AGENT_PROJECTS_RAW = [
  // TODO(user): replace after gate release — swap to real Home Storage data
  // (name, Play link, App Store link, App icon) once HOME_STORAGE_MVP_LIVE
  // is the gate trigger and the MVP has shipped.
  {
    id: "home-storage",
    titleKey: "portfolio.agent.homeStorage.title",
    descriptionKey: "portfolio.agent.homeStorage.description",
    badges: ["Flutter", "Firebase", "CI/CD"],
    links: [],
  },
  // TODO(user): replace after gate release — swap to "Polilocale" name +
  // GitHub link once POLILOCALE_REPO_PUBLIC is the gate trigger and the
  // repository has been opened (AGPL-3.0).
  {
    id: "polilocale",
    titleKey: "portfolio.agent.polilocale.title",
    descriptionKey: "portfolio.agent.polilocale.description",
    badges: ["TypeScript", "AGPL-3.0", "Web"],
    links: [],
  },
  {
    id: "buzzards-soft",
    titleKey: "portfolio.agent.buzzards.title",
    descriptionKey: "portfolio.agent.buzzards.description",
    badges: ["Next.js", "React", "i18n"],
    links: [],
  },
] as const satisfies readonly AgentProject[];

export const AGENT_PROJECTS: readonly AgentProject[] = AGENT_PROJECTS_RAW;

export type AgentProjectId = (typeof AGENT_PROJECTS_RAW)[number]["id"];

export function getAgentProject(
  id: AgentProjectId | string,
): AgentProject | undefined {
  return AGENT_PROJECTS.find((p) => p.id === id);
}
