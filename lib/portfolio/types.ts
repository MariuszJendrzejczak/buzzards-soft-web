export type Stack = "Flutter" | "Unity";

export type Role = "od-zera" | "rozwoj-i-serwis";

export type ExternalLink = {
  label: string;
  url: string;
};

export type HoneticApp = {
  slug: string;
  name: string;
  stack: Stack;
  role: Role;
  packageName?: string;
  googleLink?: string;
  appleLink?: string;
  iconSrc?: string;
  iconBackground?: "white";
  description: string;
  contribution: readonly string[];
  external?: ExternalLink;
};

export const STACKS: readonly Stack[] = ["Flutter", "Unity"] as const;

export const ROLES: readonly Role[] = [
  "od-zera",
  "rozwoj-i-serwis",
] as const;

export function isStack(value: unknown): value is Stack {
  return value === "Flutter" || value === "Unity";
}

export function isRole(value: unknown): value is Role {
  return value === "od-zera" || value === "rozwoj-i-serwis";
}

export function isHoneticApp(value: unknown): value is HoneticApp {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;

  if (typeof v.slug !== "string" || v.slug.length === 0) return false;
  if (typeof v.name !== "string" || v.name.length === 0) return false;
  if (!isStack(v.stack)) return false;
  if (!isRole(v.role)) return false;
  if (typeof v.description !== "string" || v.description.length === 0)
    return false;
  if (!Array.isArray(v.contribution)) return false;
  if (!v.contribution.every((b) => typeof b === "string" && b.length > 0))
    return false;

  if (v.packageName !== undefined && typeof v.packageName !== "string")
    return false;
  if (v.googleLink !== undefined && typeof v.googleLink !== "string")
    return false;
  if (v.appleLink !== undefined && typeof v.appleLink !== "string")
    return false;
  if (v.iconSrc !== undefined && typeof v.iconSrc !== "string")
    return false;
  if (v.iconBackground !== undefined && v.iconBackground !== "white")
    return false;

  if (v.external !== undefined) {
    if (typeof v.external !== "object" || v.external === null) return false;
    const e = v.external as Record<string, unknown>;
    if (typeof e.label !== "string" || e.label.length === 0) return false;
    if (typeof e.url !== "string" || e.url.length === 0) return false;
  }

  return true;
}

export function roleLabelKey(role: Role): string {
  return `portfolio.role.${role}`;
}

export type AgentProjectLinkKind =
  | "google"
  | "apple"
  | "github"
  | "homepage";

export type AgentProjectLink = {
  kind: AgentProjectLinkKind;
  url: string;
};

export type AgentProject = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  iconSrc?: string;
  badges: readonly string[];
  links: readonly AgentProjectLink[];
};

export const AGENT_PROJECT_LINK_KINDS: readonly AgentProjectLinkKind[] = [
  "google",
  "apple",
  "github",
  "homepage",
] as const;

export function isAgentProjectLinkKind(
  value: unknown,
): value is AgentProjectLinkKind {
  return (
    value === "google" ||
    value === "apple" ||
    value === "github" ||
    value === "homepage"
  );
}

export function isAgentProjectLink(value: unknown): value is AgentProjectLink {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  if (!isAgentProjectLinkKind(v.kind)) return false;
  if (typeof v.url !== "string" || v.url.length === 0) return false;
  return true;
}

export function isAgentProject(value: unknown): value is AgentProject {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;

  if (typeof v.id !== "string" || v.id.length === 0) return false;
  if (typeof v.titleKey !== "string" || v.titleKey.length === 0) return false;
  if (typeof v.descriptionKey !== "string" || v.descriptionKey.length === 0)
    return false;

  if (v.iconSrc !== undefined && typeof v.iconSrc !== "string") return false;

  if (!Array.isArray(v.badges)) return false;
  if (!v.badges.every((b) => typeof b === "string" && b.length > 0))
    return false;

  if (!Array.isArray(v.links)) return false;
  if (!v.links.every(isAgentProjectLink)) return false;

  return true;
}
