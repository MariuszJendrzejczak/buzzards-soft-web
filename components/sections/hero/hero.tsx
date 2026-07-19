import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

import { HeroBackdrop } from "./hero-backdrop";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <HeroBackdrop />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pt-24 pb-20 sm:px-8 md:pt-32 md:pb-28 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:pt-40 lg:pb-36">
        <div className="flex flex-col justify-center">
          <RoleBadge badge={t("badge")} sub={t("badgeSub")} />

          <h1
            id="hero-heading"
            className="mt-6 font-heading text-5xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {t("headingLead")}
            <span className="text-brand">{t("headingHighlight")}</span>
            {t("headingTrail")}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("sub")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#contact" />}
              className="h-12 px-6 text-base bg-cta text-primary-foreground hover:bg-cta-hover"
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              render={<a href="#how-i-work" />}
              className="h-12 gap-2 px-3 text-base text-foreground hover:bg-surface"
            >
              {t("ctaSecondary")}
              <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </div>

          <TrustStrip
            ariaLabel={t("trustAria")}
            items={[
              t("trust.yearsCode"),
              t("trust.claudeDaily"),
              t("trust.engineerEnglish"),
            ]}
          />
        </div>

        <div className="hidden lg:block">
          <WorkbenchPanel
            ariaLabel={t("trustAria")}
            rows={[
              t("trust.yearsCode"),
              t("trust.claudeDaily"),
              t("trust.engineerEnglish"),
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function RoleBadge({ badge, sub }: { badge: string; sub: string }) {
  return (
    <div className="inline-flex w-fit flex-col gap-1.5">
      <span
        className="inline-flex w-fit items-center gap-2 rounded-md border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs font-medium tracking-wide text-brand uppercase"
      >
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]"
        />
        {badge}
      </span>
      <span className="text-sm text-text-subtle">{sub}</span>
    </div>
  );
}

function TrustStrip({
  items,
  ariaLabel,
}: {
  items: string[];
  ariaLabel: string;
}) {
  return (
    <ul
      aria-label={ariaLabel}
      className="mt-12 grid gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:grid-cols-3 sm:gap-6 lg:hidden"
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 leading-snug">
          <span
            aria-hidden
            className="mt-1.5 size-1 shrink-0 rounded-full bg-brand"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Right-column proof panel (design-web Phase-3 pilot; see
 * context/slices/web-design-generation/pilot-hero.md). Replaces the former cold
 * placeholder SVG (HeroGraphic) with a warm-neutral surface carrying the real
 * proof triplet as labeled rows — emphasis by size+whitespace+one surface step
 * (design principle 3), the single emerald accent spent only on the status dots
 * (principle 4). On < lg the same triplet is carried by the bottom TrustStrip
 * (which is lg:hidden), so there is exactly one instance per breakpoint. It
 * reuses the existing hero.trust.* i18n keys — no new keys — and derives its
 * accessible name from hero.trustAria.
 */
function WorkbenchPanel({
  rows,
  ariaLabel,
}: {
  rows: string[];
  ariaLabel: string;
}) {
  return (
    <div className="flex h-full min-h-[28rem] flex-col justify-center">
      <ul
        aria-label={ariaLabel}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6"
      >
        {rows.map((row) => (
          <li
            key={row}
            className="flex items-start gap-3 rounded-lg bg-surface-elevated px-4 py-4"
          >
            <span
              aria-hidden
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]"
            />
            <span className="text-sm leading-snug text-foreground">{row}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
