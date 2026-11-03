import { AppCard, HONETI_APPS } from "buzzards-soft-ui";

const bySlug = (slug: string) => HONETI_APPS.find((a) => a.slug === slug) ?? HONETI_APPS[0];

export function Flutter() {
  return (
    <div className="w-[420px] p-6">
      <AppCard app={bySlug("infoshare")} />
    </div>
  );
}

export function Unity() {
  const app = HONETI_APPS.find((a) => a.stack === "Unity") ?? HONETI_APPS[0];
  return (
    <div className="w-[420px] p-6">
      <AppCard app={app} />
    </div>
  );
}

export function Grid() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {HONETI_APPS.slice(0, 2).map((app) => (
        <AppCard key={app.slug} app={app} />
      ))}
    </div>
  );
}
