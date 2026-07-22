import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

export async function About() {
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">
        <ScrollReveal className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm sm:p-10 lg:p-12">
          <header>
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
              {t("eyebrow")}
            </span>
            <h2
              id="about-heading"
              className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {t("title")}
            </h2>
          </header>

          <p className="mt-6 font-heading text-lg leading-relaxed text-foreground/90 italic sm:text-xl">
            {t("short")}
          </p>

          <div className="mt-10 flex flex-col gap-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{t("para1")}</p>
            <p>{t("para2")}</p>

            {/* Highlighted "spine" of the section — key positioning sentence. */}
            <div className="flex flex-col gap-4">
              <p>{t("notSpecialist")}</p>
              <p className="border-l-2 border-brand bg-surface py-2 pl-5 font-heading text-lg leading-relaxed text-foreground italic sm:text-xl">
                {t("selfDefinition")}
              </p>
              <p>{t("difference")}</p>
            </div>

            <p>{t("para4")}</p>
            <p>{t("para5")}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
