import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/routing";

export async function OfferGuide() {
  const t = await getTranslations("offer.guide");

  return (
    <section
      id="offer-guide"
      aria-labelledby="offer-guide-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal as="header">
          <h2
            id="offer-guide-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-6 flex flex-col gap-5">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("body1")}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("body2")}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("proofPrefix")}{" "}
            <Link
              href="/#warsztat"
              className="font-medium text-brand underline underline-offset-4 hover:text-foreground"
            >
              {t("proofLink")}
            </Link>{" "}
            {t("proofSuffix")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
