import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function OfferHero() {
  const t = await getTranslations("offer.hero");

  return (
    <section
      id="offer-hero"
      aria-labelledby="offer-hero-heading"
      className="relative isolate py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
            {t("eyebrow")}
          </span>
          <h1
            id="offer-hero-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("heading")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t("subheading")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
