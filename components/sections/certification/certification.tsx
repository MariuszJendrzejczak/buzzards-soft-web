import Image from "next/image";
import {
  BadgeCheck,
  GitMerge,
  Layers,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CertificateLightbox } from "@/components/shared/certificate-lightbox";
import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";

type BadgeKey = "builder" | "architect" | "champion" | "bestProject";

const BADGE_META: Array<{ key: BadgeKey; src: string }> = [
  { key: "builder", src: "/images/badge-10xbuilder.webp" },
  { key: "architect", src: "/images/badge-10xarchitect.webp" },
  { key: "champion", src: "/images/badge-10xchampion.webp" },
  { key: "bestProject", src: "/images/badge-best-project.webp" },
];

type AreaKey = "1" | "2" | "3" | "4" | "5";

const AREA_META: Array<{ key: AreaKey; number: string; icon: LucideIcon }> = [
  { key: "1", number: "01", icon: Wrench },
  { key: "2", number: "02", icon: GitMerge },
  { key: "3", number: "03", icon: ShieldCheck },
  { key: "4", number: "04", icon: Sparkles },
  { key: "5", number: "05", icon: Layers },
];

export async function Certification() {
  const t = await getTranslations("certification");

  const badges = BADGE_META.map((meta) => ({
    ...meta,
    name: t(`badges.${meta.key}.name`),
    caption: t(`badges.${meta.key}.caption`),
  }));

  const areas = AREA_META.map((meta) => ({
    ...meta,
    title: t(`areas.${meta.key}.title`),
    desc: t(`areas.${meta.key}.desc`),
  }));

  return (
    <section
      id="certification"
      aria-labelledby="certification-heading"
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
            id="certification-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <ScrollReveal className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                <BadgeCheck className="size-5" aria-hidden />
              </span>
              <h3 className="font-heading text-xl leading-snug font-semibold text-foreground sm:text-2xl">
                {t("credential.courseName")}
              </h3>
            </div>

            <div className="flex flex-col gap-2 text-sm leading-relaxed sm:text-base">
              <p className="text-foreground">{t("credential.issuer")}</p>
              <p className="text-muted-foreground">{t("credential.date")}</p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("credential.facts")}
            </p>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {badges.map((badge) => (
                <li
                  key={badge.key}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Image
                    src={badge.src}
                    alt={badge.name}
                    width={96}
                    height={96}
                    className="size-16 sm:size-20"
                  />
                  <span className="font-heading text-sm font-semibold text-foreground">
                    {badge.name}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">
                    {badge.caption}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="flex flex-col gap-4">
            <CertificateLightbox
              thumbSrc="/images/certificate-10xdevs-thumb.webp"
              fullSrc="/images/certificate-10xdevs.webp"
              alt={t("thumbnail.alt")}
              openLabel={t("thumbnail.openLabel")}
              closeLabel={t("lightbox.closeLabel")}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("thumbnail.openLabel")}
            </p>
          </ScrollReveal>
        </div>

        <StaggerGroup
          as="ul"
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {areas.map((area) => (
            <StaggerItem as="li" key={area.key}>
              <AreaCard area={area} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

type Area = {
  number: string;
  icon: LucideIcon;
  title: string;
  desc: string;
};

function AreaCard({ area }: { area: Area }) {
  const Icon = area.icon;

  return (
    <div className="group/area relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-brand/40 hover:shadow-md sm:p-8">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/0 via-brand/0 to-brand/0 opacity-0 transition-opacity duration-300 group-hover/area:from-brand/8 group-hover/area:to-brand/0 group-hover/area:opacity-100"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute top-4 right-5 font-mono text-5xl font-bold tracking-tight text-brand/15 sm:text-6xl"
      >
        {area.number}
      </span>

      <div className="relative flex size-11 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
        <Icon className="size-5" aria-hidden />
      </div>

      <h3 className="relative font-heading text-xl leading-snug font-semibold text-foreground sm:text-2xl">
        {area.title}
      </h3>

      <p className="relative text-sm leading-relaxed text-muted-foreground sm:text-base">
        {area.desc}
      </p>
    </div>
  );
}
