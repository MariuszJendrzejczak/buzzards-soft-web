import { getTranslations } from "next-intl/server";

import {
  ScrollReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/scroll-reveal";
import { ChipCloud } from "@/components/shared/chip-cloud";
import { TechChip } from "@/components/shared/tech-chip";

import { EducationCard, type EducationField } from "./education-card";

const CERTIFICATE_KEYS = ["sep", "drivingLicense", "sailing"] as const;

export async function Education() {
  const t = await getTranslations("education");

  const wsbFields: EducationField[] = [
    { label: t("fields.title"), value: t("wsb.title") },
    { label: t("fields.field"), value: t("wsb.field") },
    { label: t("fields.specialization"), value: t("wsb.specialization") },
  ];

  const zseeFields: EducationField[] = [
    { label: t("fields.title"), value: t("zsee.title") },
    { label: t("fields.field"), value: t("zsee.field") },
    { label: t("fields.specialization"), value: t("zsee.specialization") },
  ];

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative isolate border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
            {t("eyebrow")}
          </span>
          <h2
            id="education-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
        </ScrollReveal>

        <StaggerGroup
          as="div"
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
        >
          <StaggerItem>
            <EducationCard
              variant="primary"
              eyebrow={t("wsb.eyebrow")}
              title={t("wsb.name")}
              fields={wsbFields}
            />
          </StaggerItem>
          <StaggerItem>
            <EducationCard
              variant="secondary"
              eyebrow={t("zsee.eyebrow")}
              title={t("zsee.name")}
              fields={zseeFields}
            />
          </StaggerItem>
        </StaggerGroup>

        <ScrollReveal className="mt-12">
          <h3 className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
            {t("additionalLabel")}
          </h3>
          <ChipCloud
            ariaLabel={t("certificatesAria")}
            className="mt-4"
          >
            {CERTIFICATE_KEYS.map((key) => (
              <TechChip key={key}>{t(`certificates.${key}`)}</TechChip>
            ))}
          </ChipCloud>
        </ScrollReveal>
      </div>
    </section>
  );
}
