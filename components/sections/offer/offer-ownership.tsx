import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";

const LIMIT_KEYS = ["seo", "commerce"] as const;

export async function OfferOwnership() {
  const t = await getTranslations("offer.ownership");

  return (
    <section
      id="offer-ownership"
      aria-labelledby="offer-ownership-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal as="header">
          <h2
            id="offer-ownership-heading"
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
