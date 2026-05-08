import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative isolate flex flex-1 items-center overflow-hidden"
    >
      <BackdropPattern />

      <div className="mx-auto w-full max-w-3xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col items-start gap-7 text-left">
          <span
            aria-hidden
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.18em] text-text-subtle uppercase"
          >
            <span className="size-1.5 rounded-full bg-brand" />
            {t("badge")}
          </span>

          <h1 id="not-found-heading" className="flex flex-col gap-3">
            <span
              aria-hidden
              className="font-heading text-7xl leading-none font-semibold tracking-tight text-foreground sm:text-8xl lg:text-9xl"
            >
              {t("code")}
            </span>
            <span className="font-heading text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("title")}
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("bodyPart1")}
            <span className="text-foreground">{t("bodyHighlight")}</span>
            {t("bodyPart2")}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              size="lg"
              render={<Link href="/" />}
              className="h-12 gap-2 px-5 text-base"
            >
              <ArrowLeft aria-hidden className="size-4" />
              {t("back")}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              render={<Link href="/#contact" />}
              className="h-12 gap-2 px-3 text-base text-foreground hover:bg-surface"
            >
              {t("contactCta")}
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackdropPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute -top-40 -right-32 size-[28rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(16 185 129 / 0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-44 -left-32 size-[32rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(245 158 11 / 0.10) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
    </div>
  );
}
