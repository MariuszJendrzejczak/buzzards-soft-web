import { AGENT_PROJECTS, AgentProjectCard } from "buzzards-soft-ui";

const byId = (id: string) => AGENT_PROJECTS.find((p) => p.id === id) ?? AGENT_PROJECTS[0];

export function MobileApp() {
  return (
    <div className="w-[420px] p-6">
      <AgentProjectCard project={byId("home-storage")} />
    </div>
  );
}

export function WebApp() {
  return (
    <div className="w-[420px] p-6">
      <AgentProjectCard project={byId("neatu-dashboard")} />
    </div>
  );
}

export function OpenSource() {
  return (
    <div className="w-[420px] p-6">
      <AgentProjectCard project={byId("polilocale")} />
    </div>
  );
}

export function WithoutLinks() {
  return (
    <div className="w-[420px] p-6">
      <AgentProjectCard project={byId("buzzards-soft")} />
    </div>
  );
}

export function Grid() {
  return (
    <div className="grid w-[560px] grid-cols-2 gap-4 p-6">
      {AGENT_PROJECTS.slice(0, 2).map((project) => (
        <AgentProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
