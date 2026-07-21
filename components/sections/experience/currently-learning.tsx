import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const ITEM_KEYS = ["agents", "rag", "automation"] as const;

export async function CurrentlyLearning() {
  const t = await getTranslations("currentlyLearning");

  const items = ITEM_KEYS.map((key) => ({
    lead: t(`items.${key}.lead`),
    rest: t(`items.${key}.rest`),
  }));

  return (
    <section
      id="currently-learning"
      aria-labelledby="currently-learning-heading"
      className="relative isolate border-t border-border/60 bg-surface/40 py-20 sm:py-24"
    >
      <ScrollReveal className="mx-auto w-full max-w-2xl px-6 sm:px-8">
        <header>
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
            {t("eyebrow")}
          </span>
          <h2
            id="currently-learning-heading"
            className="mt-3 font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>
        </header>

        <ul className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
          {items.map((item) => (
            <li key={item.lead} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2.5 size-1 shrink-0 rounded-full bg-brand-soft/70"
              />
              <span>
                <span className="font-medium text-foreground">{item.lead}</span>
                <span> — {item.rest}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-base leading-relaxed text-muted-foreground italic">
          {t("closing")}
        </p>
      </ScrollReveal>
    </section>
  );
}
