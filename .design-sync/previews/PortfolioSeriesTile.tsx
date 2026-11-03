import { HONETI_APPS, HONETI_APPS_BY_STACK_ROLE, PortfolioSeriesTile } from "buzzards-soft-ui";

const FLUTTER_CONTRIBUTION_KEYS = ["cleanArch", "riverpod", "firebase"];

const EDUCATIONAL_SLUGS = new Set(["words-en", "irregular-verbs", "der-die-das"]);

const EDUCATIONAL_CONTRIBUTION_KEYS = ["engine", "iap", "analytics"];

export function FlutterSeries() {
  return (
    <div className="w-[560px] p-6">
      <PortfolioSeriesTile
        stack="Flutter"
        i18nKey="portfolio.honeti.flutterSeries"
        contributionKeys={FLUTTER_CONTRIBUTION_KEYS}
        apps={HONETI_APPS_BY_STACK_ROLE.Flutter["od-zera"].slice(0, 3)}
      />
    </div>
  );
}

export function EducationalSeries() {
  return (
    <div className="w-[560px] p-6">
      <PortfolioSeriesTile
        stack="Unity"
        i18nKey="portfolio.honeti.educationalSeries"
        contributionKeys={EDUCATIONAL_CONTRIBUTION_KEYS}
        apps={HONETI_APPS.filter((a) => EDUCATIONAL_SLUGS.has(a.slug))}
      />
    </div>
  );
}
