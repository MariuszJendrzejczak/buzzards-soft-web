import { CalendarClock, ListTodo, Workflow, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";

const EXAMPLES: { key: string; icon: LucideIcon }[] = [
  { key: "booking", icon: CalendarClock },
  { key: "flowchart", icon: Workflow },
  { key: "organizer", icon: ListTodo },
];

export async function MobileExamples() {
  const t = await getTranslations("mobileOffer.examples");

  return (
    <section
      id="mobile-offer-examples"
      aria-labelledby="mobile-offer-examples-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="mobile-offer-examples-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </ScrollReveal>

        <StaggerGroup
          as="ul"
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {EXAMPLES.map(({ key, icon: Icon }) => (
            <StaggerItem as="li" key={key}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-6">
                <span className="flex size-11 items-center justify-center rounded-xl border border-brand/30 bg-brand/10">
                  <Icon className="size-5 text-brand" aria-hidden />
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {t(`items.${key}.name`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${key}.body`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
