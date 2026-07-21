import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";

const MODULE_KEYS = [
  "localVisibility",
  "animations",
  "themeToggle",
  "extraLanguage",
  "selfEdit",
  "leads",
  "booking",
  "extraPage",
  "blog",
  "conversionTracking",
  "domainEmail",
] as const;

export async function OfferModules() {
  const t = await getTranslations("offer.modules");

  return (
    <section
      id="offer-modules"
      aria-labelledby="offer-modules-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="offer-modules-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-10 overflow-hidden rounded-2xl border border-border/60">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface/40">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[11px] tracking-[0.14em] text-text-subtle uppercase"
                >
                  {t("colModule")}
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 text-right font-mono text-[11px] tracking-[0.14em] text-text-subtle uppercase"
                >
                  {t("colPrice")}
                </th>
              </tr>
            </thead>
            <tbody>
              {MODULE_KEYS.map((key) => (
                <tr
                  key={key}
                  className="border-t border-border/50 last:border-b-0"
                >
                  <td className="px-5 py-3.5 text-sm leading-relaxed text-foreground">
                    {t(`items.${key}.name`)}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-sm whitespace-nowrap text-brand">
                    {t(`items.${key}.price`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>
      </div>
    </section>
  );
}
