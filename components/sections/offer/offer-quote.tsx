import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/sections/contact/contact-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function OfferQuote() {
  const t = await getTranslations("offer.quote");

  return (
    <section
      id="offer-quote"
      aria-labelledby="offer-quote-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal
          as="header"
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
        >
          <h2
            id="offer-quote-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <ContactForm
            intro={t("intro")}
            messagePlaceholder={t("messagePlaceholder")}
            context="web-pages-offer"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
