import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";
import { Callout } from "@/components/sections/work/callout";
import { Link } from "@/i18n/routing";

const STEP_KEYS = [
  "talk",
  "content",
  "design",
  "publish",
  "revisions",
] as const;

export async function OfferProcess() {
  const t = await getTranslations("offer.process");

  return (
    <section
      id="offer-process"
      aria-labelledby="offer-process-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="offer-process-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <StaggerGroup as="ol" className="mt-10 flex flex-col gap-5">
          {STEP_KEYS.map((key, index) => (
            <StaggerItem as="li" key={key}>
              <div className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:gap-5 sm:p-6">
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 font-mono text-sm font-medium text-brand"
                >
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t(`steps.${key}.body`)}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <ScrollReveal className="mt-8">
          <Callout>
            {t("proofPrefix")}{" "}
            <Link
              href="/#warsztat"
              className="font-medium text-brand underline underline-offset-4 not-italic hover:text-foreground"
            >
              {t("proofLink")}
            </Link>{" "}
            {t("proofSuffix")}
          </Callout>
        </ScrollReveal>
      </div>
    </section>
  );
}
