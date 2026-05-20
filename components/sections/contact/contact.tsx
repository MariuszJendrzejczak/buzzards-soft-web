import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

import { ContactForm } from "./contact-form";
import { ContactInfo } from "./contact-info";
import { CvDownloads } from "./cv-downloads";

export async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
            {t("eyebrow")}
          </span>
          <h2
            id="contact-heading"
            className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div className="order-2 flex flex-col gap-8 lg:order-1">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("introLead")}
              <span className="text-foreground">{t("introHighlight")}</span>
              {t("introTrail")}
            </p>

            <div>
              <h3 className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
                {t("directLabel")}
              </h3>
              <div className="mt-4">
                <ContactInfo />
              </div>
            </div>

            <CvDownloads />
          </div>

          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
