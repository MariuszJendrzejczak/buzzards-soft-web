import type { AgentProject } from "@/lib/portfolio/types";

// Three positions per `doc/agent_portfolio_context.md` (A1/B1/C2 release-gating
// decisions). Position 1 (Home Storage) and 2 (Polilocale) ship as anonymous
// placeholders while their respective gates are closed; position 3
// (buzzards-soft.com) ships with final content. The entire section is gated
// by AGENT_PORTFOLIO_SECTION_LIVE, so this data only renders once both
// HOME_STORAGE_MVP_LIVE && POLILOCALE_REPO_PUBLIC are true.

const AGENT_PROJECTS_RAW = [
  // Neatu Storage — public mobile app (Google Play + App Store). Icon from Play.
  {
    id: "home-storage",
    titleKey: "portfolio.agent.homeStorage.title",
    descriptionKey: "portfolio.agent.homeStorage.description",
    iconSrc: "/portfolio/icons/neatu-storage.png",
    badges: ["Flutter", "Firebase", "CI/CD", "E2E"],
    links: [
      {
        kind: "google",
        url: "https://play.google.com/store/apps/details?id=com.buzzards_soft.home_storage",
      },
      { kind: "apple", url: "https://apps.apple.com/app/id6769555021" },
    ],
  },
  // Neatu Dashboard — public web companion (neatu.app). Icon: Neatu "U" brand
  // mark with a 2x2 dot grid (dashboard motif), rendered full-bleed to match Storage.
  {
    id: "neatu-dashboard",
    titleKey: "portfolio.agent.neatuDashboard.title",
    descriptionKey: "portfolio.agent.neatuDashboard.description",
    iconSrc: "/portfolio/icons/neatu-dashboard.png",
    badges: ["Web", "E2E"],
    links: [{ kind: "homepage", url: "https://neatu.app" }],
  },
  // Polylocale — public OSS (AGPL-3.0). Note: internal id/keys keep the older
  // "polilocale" spelling; the product name is "Polylocale" (with a y).
  {
    id: "polilocale",
    titleKey: "portfolio.agent.polilocale.title",
    descriptionKey: "portfolio.agent.polilocale.description",
    badges: ["TypeScript", "AGPL-3.0", "Web", "E2E"],
    links: [
      { kind: "github", url: "https://github.com/MariuszJendrzejczak/polylocale" },
    ],
  },
  {
    id: "buzzards-soft",
    titleKey: "portfolio.agent.buzzards.title",
    descriptionKey: "portfolio.agent.buzzards.description",
    badges: ["Next.js", "React", "i18n", "E2E"],
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
