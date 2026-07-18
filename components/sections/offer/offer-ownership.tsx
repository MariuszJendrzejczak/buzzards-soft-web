import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

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
      </div>
    </section>
  );
}
