import { CardDeviceLink, HONETI_APPS, StoreLink } from "buzzards-soft-ui";

const bySlug = (slug: string) => HONETI_APPS.find((a) => a.slug === slug) ?? HONETI_APPS[0];

// CardDeviceLink is the title anchor of a HONETi app card: it resolves the
// device-appropriate store URL and its ::after overlay covers the whole card.
function CardShell({ slug }: { slug: string }) {
  const app = bySlug(slug);
  return (
    <article className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-brand/40">
      <h4 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
        <CardDeviceLink app={app}>{app.name}</CardDeviceLink>
      </h4>
      <div className="relative z-10">
        <StoreLink googleLink={app.googleLink} appleLink={app.appleLink} external={app.external} />
      </div>
    </article>
  );
}

export function BothStores() {
  return (
    <div className="w-[420px] p-6">
      <CardShell slug="infoshare" />
    </div>
  );
}

export function GooglePlayOnly() {
  return (
    <div className="w-[420px] p-6">
      <CardShell slug="gastro-ninja-kelner" />
    </div>
  );
}

export function ExternalSite() {
  return (
    <div className="w-[420px] p-6">
      <CardShell slug="gen-oczami-dziecka" />
    </div>
  );
}
