import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { OrderButton } from "@/components/sections/offer/order-button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

type FeatureRow = {
  labelKey: string;
  basic: string;
  full: string;
  custom: string;
};

const TIERS = ["basic", "full", "custom"] as const;

export async function OfferPricing() {
  const t = await getTranslations("offer.pricing");

  // Cards show only what DIFFERS between packages (scope + revision rounds).
  // The shared base is one reference line ("+ cała baza z…"); Full's bundled
  // extras get their own highlighted line. Modules live in the modules section.
  const rows: FeatureRow[] = [
    {
      labelKey: "pages",
      basic: t("basic.pages"),
      full: t("full.pages"),
      custom: t("custom.pages"),
    },
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
        <ScrollReveal
          as="header"
          className="max-w-3xl rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
        >
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
                  ? "border border-brand/40 bg-card"
                  : "border border-border/60 bg-card",
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

              {tier === "full" ? (
                <div className="flex flex-col gap-2 border-t border-border/50 pt-4">
                  <p className="text-sm font-semibold text-foreground">
                    {t("extrasLabel")}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {t("full.extras")
                      .split(", ")
                      .map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <Check
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-brand"
                          />
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null}

              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("baseReference")}
              </p>

              <div className="mt-auto pt-2">
                <OrderButton
                  pkg={t(`${tier}.name`)}
                  label={t(`${tier}.cta`)}
                  variant={tier === "full" ? "primary" : "secondary"}
                />
              </div>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal className="mt-6 max-w-3xl rounded-xl border border-border/60 bg-card px-5 py-4 shadow-sm">
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
