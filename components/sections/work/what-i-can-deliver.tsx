import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ChipCloud } from "@/components/shared/chip-cloud";
import { TechChip } from "@/components/shared/tech-chip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { Callout } from "./callout";

type Variant = "core" | "growing";

type SubBlockSpec = {
  key: string;
  bulletKeys: readonly string[];
  chips?: readonly string[];
};

type SectionSpec = {
  value: string;
  number: string;
  key: "31" | "32" | "33" | "34" | "35";
  variant: Variant;
  subBlocks?: readonly SubBlockSpec[];
  bulletKeys?: readonly string[];
  chips?: readonly string[];
  hasCallout?: boolean;
};

const SECTION_SPECS: readonly SectionSpec[] = [
  {
    value: "3.1",
    number: "3.1",
    key: "31",
    variant: "core",
    subBlocks: [
      {
        key: "mobile",
        bulletKeys: ["1", "2", "3", "4", "5"],
        chips: [
          "Flutter",
          "Dart",
          "Riverpod",
          "Freezed",
          "REST API",
          "Firebase",
          "Clean Architecture",
          "Android",
          "iOS",
          "Google Play",
          "App Store",
        ],
      },
      {
        key: "unity",
        bulletKeys: ["1", "2", "3", "4", "5"],
        chips: [
          "Unity",
          "C#",
          "UI Toolkit",
          "Firebase",
          "Unity IAP",
          "State Machine",
          "Pooling",
          "Scriptable Object",
        ],
      },
      {
        key: "common",
        bulletKeys: ["1", "2", "3"],
      },
    ],
  },
  {
    value: "3.2",
    number: "3.2",
    key: "32",
    variant: "growing",
    bulletKeys: ["1", "2", "3", "4", "5", "6"],
    chips: [
      "Claude Code",
      "MCP",
      "OpenAI API",
      "Anthropic API",
      "prompt caching",
      "function calling",
      "tool use",
      "structured output",
    ],
    hasCallout: true,
  },
  {
    value: "3.3",
    number: "3.3",
    key: "33",
    variant: "core",
    bulletKeys: ["1", "2", "3", "4", "5"],
  },
  {
    value: "3.4",
    number: "3.4",
    key: "34",
    variant: "growing",
    bulletKeys: ["1", "2", "3"],
    chips: [
      "n8n",
      "Make.com",
      "RAG",
      "vector DB",
      "embeddings",
      "agentic workflows",
    ],
  },
  {
    value: "3.5",
    number: "3.5",
    key: "35",
    variant: "core",
    bulletKeys: ["1", "2", "3"],
    chips: ["SEP E+D", "CCTV", "smart home", "niskoprądowe instalacje"],
  },
] as const;

const ITEM_VARIANT_CLASSES: Record<Variant, string> = {
  // Opaque tiles — fully cover the ambient photo behind this reveal section.
  core: "border border-brand/40 bg-card",
  growing: "border border-dashed border-text-subtle/50 bg-card",
};

export async function WhatICanDeliver() {
  const t = await getTranslations("whatICanDeliver");

  return (
    <section
      id="what-i-can-deliver"
      aria-labelledby="what-i-can-deliver-heading"
      className="relative isolate border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal
          as="header"
          className="max-w-3xl rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
        >
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
            {t("eyebrow")}
          </span>
          <h2
            id="what-i-can-deliver-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
        <Accordion
          defaultValue={["3.1"]}
          className="flex w-full flex-col gap-3"
        >
          {SECTION_SPECS.map((spec) => {
            const title = t(`sections.${spec.key}.title`);
            const variantLabel =
              spec.variant === "core" ? t("variantCore") : t("variantGrowing");

            return (
              <AccordionItem
                key={spec.value}
                value={spec.value}
                className={cn(
                  "rounded-2xl px-2 sm:px-4",
                  ITEM_VARIANT_CLASSES[spec.variant],
                )}
              >
                <AccordionTrigger className="items-center px-3 py-5 sm:px-4 hover:no-underline">
                  <div className="flex flex-1 items-center gap-3 pr-3">
                    <span className="font-mono text-sm text-text-subtle">
                      {spec.number}
                    </span>
                    <span className="font-heading text-base font-semibold text-foreground sm:text-lg">
                      {title}
                    </span>
                    <span
                      className={cn(
                        "ml-auto font-mono text-[10px] font-medium tracking-[0.2em] uppercase",
                        spec.variant === "core"
                          ? "text-brand"
                          : "text-text-subtle",
                      )}
                    >
                      {variantLabel}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-3 pt-2 pb-6 sm:px-4">
                  <SectionBody spec={spec} title={title} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}

async function SectionBody({
  spec,
  title,
}: {
  spec: SectionSpec;
  title: string;
}) {
  const t = await getTranslations("whatICanDeliver");

  const bullets = spec.bulletKeys?.map((b) =>
    t(`sections.${spec.key}.bullets.${b}`),
  );

  return (
    <div className="flex flex-col gap-6">
      {spec.subBlocks?.map((sub) => {
        const subTitle = t(`sections.${spec.key}.subBlocks.${sub.key}.title`);
        const subBullets = sub.bulletKeys.map((b) =>
          t(`sections.${spec.key}.subBlocks.${sub.key}.bullets.${b}`),
        );
        return (
          <SubBlockView
            key={sub.key}
            title={subTitle}
            bullets={subBullets}
            chips={sub.chips}
            variant={spec.variant}
            stackAria={t("stackAria", { section: subTitle })}
          />
        );
      })}

      {bullets ? <BulletList bullets={bullets} /> : null}

      {spec.chips ? (
        <ChipCloud ariaLabel={t("stackAria", { section: title })}>
          {spec.chips.map((chip) => (
            <TechChip key={chip} variant={spec.variant}>
              {chip}
            </TechChip>
          ))}
        </ChipCloud>
      ) : null}

      {spec.hasCallout ? (
        <Callout>{t(`sections.${spec.key}.callout`)}</Callout>
      ) : null}
    </div>
  );
}

function SubBlockView({
  title,
  bullets,
  chips,
  variant,
  stackAria,
}: {
  title: string;
  bullets: string[];
  chips?: readonly string[];
  variant: Variant;
  stackAria: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-surface p-5">
      <h4 className="font-heading text-base font-semibold text-foreground">
        {title}
      </h4>
      <BulletList bullets={bullets} />
      {chips ? (
        <ChipCloud ariaLabel={stackAria} className="mt-1">
          {chips.map((chip) => (
            <TechChip key={chip} variant={variant}>
              {chip}
            </TechChip>
          ))}
        </ChipCloud>
      ) : null}
    </div>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
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
