import {
  Blocks,
  FileText,
  LayoutTemplate,
  ListChecks,
  type LucideIcon,
  MessageSquare,
  Rocket,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

const STEPS: { key: string; icon: LucideIcon }[] = [
  { key: "conversation", icon: MessageSquare },
  { key: "mockup", icon: LayoutTemplate },
  { key: "content", icon: FileText },
  { key: "build", icon: Blocks },
  { key: "review", icon: ListChecks },
  { key: "publish", icon: Rocket },
];

export async function OfferGuide() {
  const t = await getTranslations("offer.guide");

  return (
    <section
      id="offer-guide"
      aria-labelledby="offer-guide-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10">
        <ScrollReveal as="header">
          <h2
            id="offer-guide-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </ScrollReveal>

        <StaggerGroup as="ol" className="mt-12 flex flex-col">
          {STEPS.map(({ key, icon: Icon }, i) => {
            const last = i === STEPS.length - 1;
            return (
              <StaggerItem
                as="li"
                key={key}
                className="relative flex gap-5 sm:gap-6"
              >
                {/* rail: number badge + connector down to the next step */}
                <div className="flex flex-col items-center" aria-hidden>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 font-mono text-sm font-semibold text-brand">
                    {i + 1}
                  </span>
                  {!last && (
                    <span className="mt-2 w-px grow bg-gradient-to-b from-brand/30 to-border/40" />
                  )}
                </div>

                {/* step content */}
                <div className={cn("min-w-0", !last && "pb-10")}>
                  <h3 className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-foreground">
                    <Icon className="size-4 shrink-0 text-brand" aria-hidden />
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t(`steps.${key}.body`)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
