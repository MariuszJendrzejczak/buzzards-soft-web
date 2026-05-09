"use client";

import { useLocale, useTranslations } from "next-intl";
import { Fragment, useTransition } from "react";

import { routing, usePathname, useRouter, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
};

const ARIA_KEY: Record<Locale, "polishAria" | "englishAria" | "swedishAria"> = {
  pl: "polishAria",
  en: "englishAria",
  sv: "swedishAria",
};

export function LanguageToggle({ className }: LanguageToggleProps) {
  const t = useTranslations("language");
  const router = useRouter();
  const pathname = usePathname();
  const active = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === active || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("groupAria")}
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-surface/60 p-0.5 font-mono text-[11px] font-medium tracking-wide uppercase",
        className,
      )}
    >
      {routing.locales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 ? (
            <span aria-hidden className="px-0.5 text-text-subtle">
              |
            </span>
          ) : null}
          <LocaleButton
            locale={locale}
            active={active === locale}
            ariaLabel={`${locale.toUpperCase()} — ${t(ARIA_KEY[locale])}`}
            onSelect={switchTo}
            disabled={isPending}
          />
        </Fragment>
      ))}
    </div>
  );
}

function LocaleButton({
  locale,
  active,
  ariaLabel,
  onSelect,
  disabled,
}: {
  locale: Locale;
  active: boolean;
  ariaLabel: string;
  onSelect: (locale: Locale) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={ariaLabel}
      onClick={() => onSelect(locale)}
      disabled={disabled}
      className={cn(
        "rounded-full px-2.5 py-1 outline-none transition-colors disabled:opacity-60",
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        active
          ? "bg-brand/15 text-brand"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {locale.toUpperCase()}
    </button>
  );
}
