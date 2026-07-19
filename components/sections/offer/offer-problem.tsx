import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

const PATHS = [
  { key: "agency", highlight: false },
  { key: "generator", highlight: false },
  { key: "mine", highlight: true },
] as const;

export async function OfferProblem() {
  const t = await getTranslations("offer.problem");

  return (
    <section
      id="offer-problem"
      aria-labelledby="offer-problem-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="offer-problem-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <StaggerGroup
          as="ul"
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {PATHS.map((path) => (
            <StaggerItem as="li" key={path.key}>
              <div
                className={cn(
                  "flex h-full flex-col gap-3 rounded-2xl p-6",
                  path.highlight
                    ? "border border-brand/40 bg-brand/5"
                    : "border border-border/60 bg-card/40",
                )}
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {t(`${path.key}Title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t(`${path.key}Body`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
