import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const OFFER_FAQ_KEYS = [
  "duration",
  "texts",
  "logo",
  "selfEdit",
  "monthly",
  "domain",
  "gdpr",
] as const;

export async function OfferFaq() {
  const t = await getTranslations("offer.faq");

  return (
    <section
      id="offer-faq"
      aria-labelledby="offer-faq-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal as="header">
          <h2
            id="offer-faq-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <Accordion className="flex w-full flex-col">
            {OFFER_FAQ_KEYS.map((key) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger className="px-1 py-4 font-heading text-base font-medium text-foreground hover:no-underline">
                  {t(`items.${key}.question`)}
                </AccordionTrigger>
                <AccordionContent
                  keepMounted
                  className="px-1 text-sm leading-relaxed text-muted-foreground sm:text-base"
                >
                  {t(`items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
