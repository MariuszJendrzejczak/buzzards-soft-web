import { getTranslations } from "next-intl/server";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

const ROW_KEYS = [
  "accounts",
  "push",
  "ownerPanel",
  "loyalty",
  "payments",
  "multiLocation",
] as const;

const COLS = ["start", "full", "custom"] as const;

export async function MobileComparison() {
  const t = await getTranslations("mobileOffer.comparison");

  return (
    <section
      id="mobile-offer-comparison"
      aria-labelledby="mobile-offer-comparison-heading"
      className="relative isolate border-t border-border/60 py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <ScrollReveal as="header" className="max-w-3xl">
          <h2
            id="mobile-offer-comparison-heading"
            className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10 overflow-hidden rounded-2xl border border-border/60">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface/40">
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[11px] tracking-[0.14em] text-text-subtle uppercase"
                >
                  {t("colFeature")}
                </th>
                {COLS.map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="px-5 py-3 text-center font-mono text-[11px] tracking-[0.14em] text-text-subtle uppercase"
                  >
                    {t(`col${col.charAt(0).toUpperCase()}${col.slice(1)}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROW_KEYS.map((key) => (
                <tr
                  key={key}
                  className="border-t border-border/50 last:border-b-0"
                >
                  <td className="px-5 py-3.5 text-sm leading-relaxed text-foreground">
                    {t(`items.${key}.label`)}
                  </td>
                  {COLS.map((col) => {
                    const value = t(`items.${key}.${col}`);
                    const yes = value === "✓";
                    return (
                      <td
                        key={col}
                        className={cn(
                          "px-5 py-3.5 text-center text-sm",
                          yes ? "text-brand" : "text-text-subtle",
                        )}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>
      </div>
    </section>
  );
}
