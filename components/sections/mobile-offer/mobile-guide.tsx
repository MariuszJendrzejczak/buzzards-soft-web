import {
  Blocks,
  LifeBuoy,
  type LucideIcon,
  MessageSquare,
  PenTool,
  Rocket,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

const STEPS: { key: string; icon: LucideIcon }[] = [
  { key: "conversation", icon: MessageSquare },
  { key: "design", icon: PenTool },
  { key: "build", icon: Blocks },
  { key: "publish", icon: Rocket },
  { key: "support", icon: LifeBuoy },
];

export async function MobileGuide() {
  const t = await getTranslations("mobileOffer.guide");

  return (
    <section
      id="mobile-offer-guide"
      aria-labelledby="mobile-offer-guide-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal as="header">
          <h2
            id="mobile-offer-guide-heading"
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
                <div className="flex flex-col items-center" aria-hidden>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 font-mono text-sm font-semibold text-brand">
                    {i + 1}
                  </span>
                  {!last && (
                    <span className="mt-2 w-px grow bg-gradient-to-b from-brand/30 to-border/40" />
                  )}
                </div>

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

        <ScrollReveal className="mt-10">
          <Link
            href="/#warsztat"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-[0.08em] text-brand uppercase transition-colors hover:text-brand/80"
          >
            {t("processNote")}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
