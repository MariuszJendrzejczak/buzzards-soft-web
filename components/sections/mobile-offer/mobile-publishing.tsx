import {
  CalendarDays,
  FileBadge,
  type LucideIcon,
  TimerReset,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";

const POINTS: { key: string; icon: LucideIcon }[] = [
  { key: "twoTracks", icon: CalendarDays },
  { key: "duns", icon: FileBadge },
  { key: "googleTest", icon: Users },
  { key: "review", icon: TimerReset },
];

export async function MobilePublishing() {
  const t = await getTranslations("mobileOffer.publishing");

  return (
    <section
      id="mobile-offer-publishing"
      aria-labelledby="mobile-offer-publishing-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="mobile-offer-publishing-heading"
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
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {POINTS.map(({ key, icon: Icon }) => (
            <StaggerItem as="li" key={key}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-6">
                <h3 className="flex items-center gap-2.5 font-heading text-base font-semibold text-foreground">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10">
                    <Icon className="size-4 text-brand" aria-hidden />
                  </span>
                  {t(`points.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(`points.${key}.body`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
