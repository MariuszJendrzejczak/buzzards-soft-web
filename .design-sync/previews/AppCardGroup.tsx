import { AppCard, AppCardGroup, HONETI_APPS } from "buzzards-soft-ui";

const bySlug = (slug: string) => HONETI_APPS.find((a) => a.slug === slug) ?? HONETI_APPS[0];

export function FlutterGroup() {
  return (
    <div className="w-[560px] p-6">
      <AppCardGroup groupId="flutter" titleKey="portfolio.honeti.group.flutter" stackIcon="Flutter">
        <AppCard app={bySlug("infoshare")} />
        <AppCard app={bySlug("uprawnienia-budowlane")} />
      </AppCardGroup>
    </div>
  );
}

export function UnityGroup() {
  return (
    <div className="w-[560px] p-6">
      <AppCardGroup groupId="unity" titleKey="portfolio.honeti.group.unity" stackIcon="Unity">
        <AppCard app={bySlug("gastro-ninja-klient")} />
        <AppCard app={bySlug("soildata")} />
      </AppCardGroup>
    </div>
  );
}

export function HonetiBrand() {
  return (
    <div className="w-[560px] p-6">
      <AppCardGroup
        groupId="flutter-honeti"
        titleKey="portfolio.honeti.group.flutter"
        stackIcon="Flutter"
        honetiBrand
      >
        <AppCard app={bySlug("testy-prawnicze")} />
        <AppCard app={bySlug("gastro-ninja-kelner")} />
      </AppCardGroup>
    </div>
  );
}

export function Placeholder() {
  return (
    <div className="w-[560px] p-6">
      <AppCardGroup
        groupId="unity-pending"
        titleKey="portfolio.honeti.group.unity"
        stackIcon="Unity"
        placeholder
        apps={HONETI_APPS.filter((a) => a.stack === "Unity").slice(0, 3)}
      />
    </div>
  );
}
