import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";

const ITEM_KEYS = [
  "mobile",
  "contact",
  "seo",
  "hosting",
  "gdpr",
  "content",
] as const;

export async function OfferStandard() {
  const t = await getTranslations("offer.standard");

  return (
    <section
      id="offer-standard"
      aria-labelledby="offer-standard-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="offer-standard-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <StaggerGroup
          as="ul"
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {ITEM_KEYS.map((key) => (
            <StaggerItem as="li" key={key}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                <Check
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-brand"
                />
                <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t(`items.${key}`)}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
