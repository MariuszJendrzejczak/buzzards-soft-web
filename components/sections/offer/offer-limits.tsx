import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";

const LIMIT_KEYS = ["seo", "commerce"] as const;

export async function OfferLimits() {
  const t = await getTranslations("offer.limits");

  return (
    <section
      id="offer-limits"
      aria-labelledby="offer-limits-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="offer-limits-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <StaggerGroup as="ul" className="mt-10 flex flex-col gap-4">
          {LIMIT_KEYS.map((key) => (
            <StaggerItem as="li" key={key}>
              <p className="rounded-2xl border-l-2 border-border bg-card/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <span className="font-medium text-foreground">
                  {t(`items.${key}.lead`)}
                </span>{" "}
                {t(`items.${key}.body`)}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
