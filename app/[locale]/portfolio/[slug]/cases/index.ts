import { getTranslations } from "next-intl/server";

import { honetiCaseMeta } from "./honeti";
import type { CaseStudy, CaseStudyMeta } from "./types";

export type { CaseStudy, CaseStudyMeta };

export const CASE_META: Record<string, CaseStudyMeta> = {
  [honetiCaseMeta.slug]: honetiCaseMeta,
};

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
