import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

type Cell = string;

type FeatureRow = {
  labelKey: string;
  basic: Cell;
  full: Cell;
  custom: Cell;
};

const TIERS = ["basic", "full", "custom"] as const;

export async function OfferPricing() {
  const t = await getTranslations("offer.pricing");

  const included = t("included");
  const moduleLabel = t("module");

  const rows: FeatureRow[] = [
    {
      labelKey: "audience",
      basic: t("basic.audience"),
      full: t("full.audience"),
      custom: t("custom.audience"),
    },
    {
      labelKey: "pages",
      basic: t("basic.pages"),
      full: t("full.pages"),
      custom: t("custom.pages"),
    },
    {
      labelKey: "aiContent",
      basic: included,
      full: included,
      custom: included,
    },
    { labelKey: "base", basic: included, full: included, custom: included },
    {
      labelKey: "googleBusiness",
      basic: moduleLabel,
      full: included,
      custom: included,
    },
    {
      labelKey: "animations",
      basic: moduleLabel,
      full: included,
      custom: included,
    },
    {
      labelKey: "themeToggle",
      basic: moduleLabel,
      full: included,
      custom: included,
    },
    { labelKey: "language", basic: included, full: included, custom: included },
    {
      labelKey: "revisions",
      basic: t("basic.revisions"),
      full: t("full.revisions"),
      custom: t("custom.revisions"),
    },
  ];

  return (
    <section
      id="offer-pricing"
      aria-labelledby="offer-pricing-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="offer-pricing-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier}
              data-pricing-tier={tier}
              className={cn(
                "flex h-full flex-col gap-5 rounded-2xl p-6",
                tier === "full"
                  ? "border border-brand/40 bg-brand/5"
                  : "border border-border/60 bg-card/40",
              )}
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {t(`${tier}.name`)}
                </h3>
                <PriceBlock tier={tier} t={t} />
              </div>

              <dl className="flex flex-col gap-3 border-t border-border/50 pt-4">
                {rows.map((row) => (
                  <div
                    key={row.labelKey}
                    className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <dt className="font-mono text-[11px] tracking-[0.12em] text-text-subtle uppercase">
                      {t(`rowLabels.${row.labelKey}`)}
                    </dt>
                    <dd className="text-sm text-foreground sm:text-right">
                      {row[tier]}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto pt-2">
                <a
                  href="#offer-quote"
                  className={cn(
                    "inline-flex h-10 w-full items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    tier === "full"
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "border border-border bg-background text-foreground hover:bg-muted",
                  )}
                >
                  {t(`${tier}.cta`)}
                </a>
              </div>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <p className="text-xs leading-relaxed text-text-subtle italic">
            {t("footnote")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PriceBlock({
  tier,
  t,
}: {
  tier: (typeof TIERS)[number];
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  if (tier === "custom") {
    return (
      <p className="font-heading text-2xl font-semibold text-foreground">
        {t("custom.price")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2">
        <span className="text-sm text-text-subtle line-through">
          {t(`${tier}.basePrice`)}
        </span>
        <span className="font-heading text-2xl font-semibold text-brand">
          {t(`${tier}.promoPrice`)}
        </span>
        <span className="text-xs text-muted-foreground">
          ({t(`${tier}.priceTag`)})
        </span>
      </div>
      <span className="font-mono text-[11px] tracking-[0.08em] text-text-subtle uppercase">
        {t("promoNote")}
      </span>
    </div>
  );
}
