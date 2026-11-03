import { HONETI_APPS, HeroAppMiniCard } from "buzzards-soft-ui";

const bySlug = (slug: string) => HONETI_APPS.find((a) => a.slug === slug) ?? HONETI_APPS[0];

export function Flutter() {
  return (
    <div className="w-[400px] p-6">
      <HeroAppMiniCard app={bySlug("infoshare")} />
    </div>
  );
}

export function Unity() {
  return (
    <div className="w-[400px] p-6">
      <HeroAppMiniCard app={bySlug("gastro-ninja-klient")} />
    </div>
  );
}

export function ExternalLink() {
  return (
    <div className="w-[400px] p-6">
      <HeroAppMiniCard app={bySlug("gen-oczami-dziecka")} />
    </div>
  );
}

export function HeroRow() {
  return (
    <div className="grid w-[560px] grid-cols-2 gap-4 p-6">
      {["infoshare", "uprawnienia-budowlane"].map((slug) => (
        <HeroAppMiniCard key={slug} app={bySlug(slug)} />
      ))}
    </div>
  );
}
