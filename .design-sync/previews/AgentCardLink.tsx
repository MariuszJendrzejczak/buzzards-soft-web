import { AGENT_PROJECTS, AgentCardLink, ProjectLink } from "buzzards-soft-ui";

const byId = (id: string) => AGENT_PROJECTS.find((p) => p.id === id) ?? AGENT_PROJECTS[0];

// AgentCardLink is the title anchor of an agent-project card: its ::after
// overlay stretches the hit area over the whole (relative) card.
function CardShell({ id, title }: { id: string; title: string }) {
  const project = byId(id);
  return (
    <article className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-brand/40">
      <h4 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
        <AgentCardLink links={project.links}>{title}</AgentCardLink>
      </h4>
      {project.links.length > 0 ? (
        <div className="relative z-10">
          <ProjectLink links={project.links} />
        </div>
      ) : null}
    </article>
  );
}

export function StoreLinked() {
  return (
    <div className="w-[420px] p-6">
      <CardShell id="home-storage" title="Neatu Storage" />
    </div>
  );
}

export function HomepageLinked() {
  return (
    <div className="w-[420px] p-6">
      <CardShell id="neatu-dashboard" title="Neatu Dashboard" />
    </div>
  );
}

export function RepoLinked() {
  return (
    <div className="w-[420px] p-6">
      <CardShell id="polilocale" title="Polylocale" />
    </div>
  );
}

export function NoLinks() {
  return (
    <div className="w-[420px] p-6">
      <CardShell id="buzzards-soft" title="buzzards-soft.com" />
    </div>
  );
}
