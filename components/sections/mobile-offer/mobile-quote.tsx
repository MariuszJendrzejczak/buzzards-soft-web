import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/sections/contact/contact-form";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function MobileQuote() {
  const t = await getTranslations("mobileOffer.quote");

  return (
    <section
      id="mobile-offer-quote"
      aria-labelledby="mobile-offer-quote-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal as="header">
          <h2
            id="mobile-offer-quote-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-10">
          <ContactForm
            intro={t("intro")}
            messagePlaceholder={t("messagePlaceholder")}
            context="mobile-apps-offer"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
