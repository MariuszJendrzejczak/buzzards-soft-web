// Closed-by-default per ADR 0001 — explicit string "true" required.
function readFlag(raw: string | undefined): boolean {
  return raw === "true";
}

export const HOME_STORAGE_MVP_LIVE: boolean = readFlag(
  process.env.NEXT_PUBLIC_HOME_STORAGE_MVP_LIVE,
);

export const POLILOCALE_REPO_PUBLIC: boolean = readFlag(
  process.env.NEXT_PUBLIC_POLILOCALE_REPO_PUBLIC,
);

export const AGENT_PORTFOLIO_SECTION_LIVE: boolean =
  HOME_STORAGE_MVP_LIVE && POLILOCALE_REPO_PUBLIC;

export type FeatureFlags = {
  HOME_STORAGE_MVP_LIVE: boolean;
  POLILOCALE_REPO_PUBLIC: boolean;
  AGENT_PORTFOLIO_SECTION_LIVE: boolean;
};

export const FEATURE_FLAGS: FeatureFlags = {
  HOME_STORAGE_MVP_LIVE,
  POLILOCALE_REPO_PUBLIC,
  AGENT_PORTFOLIO_SECTION_LIVE,
};
