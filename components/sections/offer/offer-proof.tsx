import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Link } from "@/i18n/routing";

export async function OfferProof() {
  const t = await getTranslations("offer.proof");

  return (
    <section
      id="offer-proof"
      aria-labelledby="offer-proof-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal as="header">
          <h2
            id="offer-proof-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-6 flex flex-col gap-5">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("body")}
          </p>
          <Link
            href="/#warsztat"
            className="inline-flex w-fit items-center font-medium text-brand underline underline-offset-4 hover:text-foreground"
          >
            {t("link")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
