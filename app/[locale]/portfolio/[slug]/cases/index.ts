import { getTranslations } from "next-intl/server";

import type { CaseStudy, CaseStudyMeta } from "./types";

export type { CaseStudy, CaseStudyMeta };

// The dynamic [slug] route stays in place for future flagship case studies
// (per ADR 0002), but currently has no registered slugs — `/portfolio/honeti`
// is served by the dedicated static route under `app/[locale]/portfolio/honeti/`.
export const CASE_META: Record<string, CaseStudyMeta> = {};

export const CASE_SLUGS = Object.keys(CASE_META);

export function getCaseStudyMeta(slug: string): CaseStudyMeta | undefined {
  return CASE_META[slug];
}

export async function getCaseStudy(
  slug: string,
  locale: string,
): Promise<CaseStudy | undefined> {
  const meta = CASE_META[slug];
  if (!meta) return undefined;

  const t = await getTranslations({
    locale,
    namespace: `portfolio.cases.${slug}`,
  });

  return {
    slug: meta.slug,
    title: t("title"),
    role: t("role"),
    period: t("period"),
    stack: meta.stack,
    scope: meta.scopeKeys.map((k) => t(`scope.${k}`)),
    apps: meta.apps,
  };
}
