import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ChipCloud } from "./ChipCloud";
import { ExperienceCard } from "./ExperienceCard";
import { TechChip } from "./TechChip";

const HONETI_CHIPS = [
  "Flutter",
  "Dart",
  "Riverpod",
  "REST API",
  "Firebase",
  "Clean Architecture",
];

const HONETI_BULLET_KEYS = ["1", "2", "3", "4", "5", "6", "7"] as const;

const UNITY_CHIPS = ["Unity", "C#", "UI Toolkit", "Firebase", "Unity IAP"];

const ARTIFACT_BULLET_KEYS = ["1", "2", "3", "4", "5"] as const;

export async function Experience() {
  const t = await getTranslations("experience");

  const honetiBullets = HONETI_BULLET_KEYS.map((b) => t(`honeti.bullets.${b}`));
  const artifactBullets = ARTIFACT_BULLET_KEYS.map((b) =>
    t(`artifact.bullets.${b}`),
  );

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative isolate border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <header className="max-w-3xl">
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
            {t("eyebrow")}
          </span>
          <h2
            id="experience-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </header>

        <div className="mt-14 flex flex-col gap-8">
          <ExperienceCard
            href="/portfolio/honeti"
            ctaLabel={t("honeti.ctaLabel")}
          >
            <CardEyebrow label={t("honeti.eyebrow")} />
            <CardTitle>{t("honeti.title")}</CardTitle>
            <ChipCloud
              ariaLabel={t("stackAria", { project: "Honeti" })}
              className="mt-5"
            >
              {HONETI_CHIPS.map((chip) => (
                <TechChip key={chip}>{chip}</TechChip>
              ))}
            </ChipCloud>
            <BulletList bullets={honetiBullets} className="mt-6" />
          </ExperienceCard>

          <ExperienceCard>
            <CardEyebrow label={t("unity.eyebrow")} />
            <CardTitle>{t("unity.title")}</CardTitle>
            <ChipCloud
              ariaLabel={t("stackAria", { project: "Unity" })}
              className="mt-5"
            >
              {UNITY_CHIPS.map((chip) => (
                <TechChip key={chip}>{chip}</TechChip>
              ))}
            </ChipCloud>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("unity.description")}
            </p>
          </ExperienceCard>

          <ExperienceCard variant="artifact">
            <CardEyebrow label={t("artifact.eyebrow")} tone="artifact" />
            <CardTitle>
              <span className="inline-flex items-center gap-2">
                {t("artifact.title")}
                <Sparkles aria-hidden className="size-5 text-brand" />
              </span>
            </CardTitle>
            <BulletList bullets={artifactBullets} className="mt-6" />
            <blockquote className="mt-7 border-l-2 border-brand/60 pl-5 text-base leading-relaxed text-foreground/90 italic sm:text-lg">
              {t("artifact.quote")}
            </blockquote>
          </ExperienceCard>

          <ExperienceCard variant="meta" className="lg:max-w-2xl">
            <CardEyebrow label={t("meta.eyebrow")} tone="muted" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("meta.description")}
            </p>
          </ExperienceCard>
        </div>
      </div>
    </section>
  );
}

function CardEyebrow({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "artifact" | "muted";
}) {
  const toneClass =
    tone === "muted"
      ? "text-text-subtle"
      : tone === "artifact"
        ? "text-brand-soft"
        : "text-brand";

  return (
    <span
      className={`font-mono text-[11px] font-medium tracking-[0.2em] uppercase ${toneClass}`}
    >
      {label}
    </span>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
      {children}
    </h3>
  );
}

function BulletList({
  bullets,
  className,
}: {
  bullets: string[];
  className?: string;
}) {
  return (
    <ul
      className={`flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground sm:text-base ${className ?? ""}`}
    >
      {bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2 size-1 shrink-0 rounded-full bg-brand"
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}
