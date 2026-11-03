import { HONETI_APPS, StoreLink } from "buzzards-soft-ui";

const bySlug = (slug: string) => HONETI_APPS.find((a) => a.slug === slug) ?? HONETI_APPS[0];

export function BothStores() {
  const app = bySlug("infoshare");
  return (
    <div className="p-6">
      <StoreLink googleLink={app.googleLink} appleLink={app.appleLink} />
    </div>
  );
}

export function GooglePlayOnly() {
  const app = bySlug("soildata");
  return (
    <div className="p-6">
      <StoreLink googleLink={app.googleLink} />
    </div>
  );
}

export function AppStoreOnly() {
  const app = bySlug("infoshare");
  return (
    <div className="p-6">
      <StoreLink appleLink={app.appleLink} />
    </div>
  );
}

export function ExternalSite() {
  const app = bySlug("gen-oczami-dziecka");
  return (
    <div className="p-6">
      <StoreLink external={app.external} />
    </div>
  );
}

export function InCardFooter() {
  const app = bySlug("gastro-ninja-klient");
  return (
    <div className="p-6">
      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3" style={{ width: 320 }}>
        <span className="font-heading text-sm font-semibold text-foreground">{app.name}</span>
        <StoreLink googleLink={app.googleLink} appleLink={app.appleLink} />
      </div>
    </div>
  );
}
