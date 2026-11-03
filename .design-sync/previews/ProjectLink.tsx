import { AGENT_PROJECTS, ProjectLink } from "buzzards-soft-ui";

const byId = (id: string) => AGENT_PROJECTS.find((p) => p.id === id) ?? AGENT_PROJECTS[0];

export function StoreLinks() {
  return (
    <div className="p-6">
      <ProjectLink links={byId("home-storage").links} />
    </div>
  );
}

export function Homepage() {
  return (
    <div className="p-6">
      <ProjectLink links={byId("neatu-dashboard").links} />
    </div>
  );
}

export function GitHub() {
  return (
    <div className="p-6">
      <ProjectLink links={byId("polilocale").links} />
    </div>
  );
}

export function AllKinds() {
  return (
    <div className="p-6">
      <ProjectLink
        links={[
          ...byId("home-storage").links,
          ...byId("polilocale").links,
          ...byId("neatu-dashboard").links,
        ]}
      />
    </div>
  );
}
