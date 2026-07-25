import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";

const COST_KEYS = ["apple", "google", "backend"] as const;
const LIMIT_KEYS = ["graphics", "maintenance", "scope"] as const;

export async function MobileOwnership() {
  const t = await getTranslations("mobileOffer.ownership");

  return (
    <section
      id="mobile-offer-ownership"
      aria-labelledby="mobile-offer-ownership-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal as="header">
          <h2
            id="mobile-offer-ownership-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("body")}
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
            {t("costsHeading")}
          </h3>
        </ScrollReveal>

        <StaggerGroup
          as="ul"
          className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {COST_KEYS.map((key) => (
            <StaggerItem as="li" key={key}>
              <div className="flex h-full flex-col gap-1 rounded-2xl border border-border/60 bg-card/40 p-5">
                <span className="font-mono text-[11px] tracking-[0.12em] text-text-subtle uppercase">
                  {t(`costs.${key}.label`)}
                </span>
                <span className="font-heading text-lg font-semibold text-foreground">
                  {t(`costs.${key}.value`)}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal className="mt-12">
          <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
            {t("limitsHeading")}
          </h3>
        </ScrollReveal>

        <StaggerGroup as="ul" className="mt-5 flex flex-col gap-4">
          {LIMIT_KEYS.map((key) => (
            <StaggerItem as="li" key={key}>
              <p className="rounded-2xl border-l-2 border-border bg-card/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <span className="font-medium text-foreground">
                  {t(`limits.${key}.lead`)}
                </span>{" "}
                {t(`limits.${key}.body`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
