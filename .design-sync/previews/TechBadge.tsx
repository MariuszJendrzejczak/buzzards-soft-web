import { AGENT_PROJECTS, TechBadge } from "buzzards-soft-ui";

const KNOWN = ["Flutter", "Firebase", "CI/CD", "TypeScript", "AGPL-3.0", "Web", "Next.js", "React", "i18n"];

export function KnownLabels() {
  return (
    <div className="flex flex-wrap gap-2 p-6" style={{ maxWidth: 520 }}>
      {KNOWN.map((label) => (
        <TechBadge key={label} label={label} />
      ))}
    </div>
  );
}

export function E2EPill() {
  return (
    <div className="flex items-center gap-2 p-6">
      <TechBadge label="E2E" />
      <TechBadge label="Flutter" />
    </div>
  );
}

export function UnknownFallback() {
  return (
    <div className="flex flex-wrap items-center gap-2 p-6">
      <TechBadge label="Supabase" />
      <TechBadge label="Riverpod" />
      <TechBadge label="Playwright" />
    </div>
  );
}

export function ProjectBadgeRows() {
  return (
    <div className="flex flex-col gap-3 p-6">
      {AGENT_PROJECTS.map((p) => (
        <ul key={p.id} className="flex flex-wrap gap-2">
          {p.badges.map((badge) => (
            <li key={badge}>
              <TechBadge label={badge} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
