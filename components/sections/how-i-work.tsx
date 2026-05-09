import {
  Bot,
  Code,
  GitMerge,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/ScrollReveal";

type PracticeKey = "21" | "22" | "23" | "24";

const PRACTICE_META: Array<{
  key: PracticeKey;
  number: string;
  icon: LucideIcon;
}> = [
  { key: "21", number: "2.1", icon: Sparkles },
  { key: "22", number: "2.2", icon: Bot },
  { key: "23", number: "2.3", icon: GitMerge },
  { key: "24", number: "2.4", icon: Code },
];

const BULLET_KEYS = ["1", "2", "3", "4"] as const;

export async function HowIWork() {
  const t = await getTranslations("howIWork");

  const practices = PRACTICE_META.map((meta) => ({
    ...meta,
    title: t(`practices.${meta.key}.title`),
    bullets: BULLET_KEYS.map((b) => ({
      lead: t(`practices.${meta.key}.bullets.${b}.lead`),
      rest: t(`practices.${meta.key}.bullets.${b}.rest`),
    })),
  }));

  return (
    <section
      id="how-i-work"
      aria-labelledby="how-i-work-heading"
      className="relative isolate border-t border-border/60 bg-surface/40 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
            {t("eyebrow")}
          </span>
          <h2
            id="how-i-work-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </ScrollReveal>

        <StaggerGroup
          as="ul"
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {practices.map((practice) => (
            <StaggerItem as="li" key={practice.number}>
              <PracticeCard practice={practice} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

type Practice = {
  number: string;
  icon: LucideIcon;
  title: string;
  bullets: { lead: string; rest: string }[];
};

function PracticeCard({ practice }: { practice: Practice }) {
  const Icon = practice.icon;

  return (
    <div className="group/practice relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-brand/40 hover:shadow-md sm:p-8">
      {/* gradient frame on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/0 via-brand/0 to-brand/0 opacity-0 transition-opacity duration-300 group-hover/practice:from-brand/8 group-hover/practice:to-brand/0 group-hover/practice:opacity-100"
      />

      {/* ornamental section number */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-4 right-5 font-mono text-5xl font-bold tracking-tight text-brand/15 sm:text-6xl"
      >
        {practice.number}
      </span>

      <div className="relative flex size-11 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
        <Icon className="size-5" aria-hidden />
      </div>

      <h3 className="relative font-heading text-xl leading-snug font-semibold text-foreground sm:text-2xl">
        {practice.title}
      </h3>

      <ul className="relative flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {practice.bullets.map((bullet) => (
          <li key={bullet.lead} className="flex gap-3">
            <span
              aria-hidden
              className="mt-2 size-1 shrink-0 rounded-full bg-brand"
            />
            <span>
              <span className="font-medium text-foreground">
                {bullet.lead}
              </span>
              <span>{bullet.rest}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
