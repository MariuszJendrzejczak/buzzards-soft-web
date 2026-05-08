export type CaseStudyMeta = {
  slug: string;
  scopeKeys: readonly string[];
  stack: readonly string[];
  apps?: readonly string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  role: string;
  period: string;
  stack: readonly string[];
  scope: string[];
  apps?: readonly string[];
};
