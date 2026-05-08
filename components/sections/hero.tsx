import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <HeroBackdrop />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pt-24 pb-20 sm:px-8 md:pt-32 md:pb-28 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:pt-40 lg:pb-36">
        <div className="flex flex-col justify-center">
          <RoleBadge badge={t("badge")} sub={t("badgeSub")} />

          <h1
            id="hero-heading"
            className="mt-6 font-heading text-5xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {t("headingLead")}
            <span className="text-brand">{t("headingHighlight")}</span>
            {t("headingTrail")}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("sub")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href="#contact" />}
              className="h-12 px-6 text-base bg-cta text-primary-foreground hover:bg-cta-hover"
            >
              {t("ctaPrimary")}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              nativeButton={false}
              render={<a href="#how-i-work" />}
              className="h-12 gap-2 px-3 text-base text-foreground hover:bg-surface"
            >
              {t("ctaSecondary")}
              <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </div>

          <TrustStrip
            ariaLabel={t("trustAria")}
            items={[
              t("trust.yearsCode"),
              t("trust.claudeDaily"),
              t("trust.engineerEnglish"),
            ]}
          />
        </div>

        <div className="hidden lg:block">
          <HeroGraphic />
        </div>
      </div>
    </section>
  );
}

function RoleBadge({ badge, sub }: { badge: string; sub: string }) {
  return (
    <div className="inline-flex w-fit flex-col gap-1.5">
      <span
        className="inline-flex w-fit items-center gap-2 rounded-md border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs font-medium tracking-wide text-brand uppercase"
      >
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]"
        />
        {badge}
      </span>
      <span className="text-sm text-text-subtle">{sub}</span>
    </div>
  );
}

function TrustStrip({
  items,
  ariaLabel,
}: {
  items: string[];
  ariaLabel: string;
}) {
  return (
    <ul
      aria-label={ariaLabel}
      className="mt-12 grid gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:grid-cols-3 sm:gap-6"
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 leading-snug">
          <span
            aria-hidden
            className="mt-1.5 size-1 shrink-0 rounded-full bg-brand"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Page-wide hero backdrop — soft emerald glow + subtle grain.
 * Pure CSS, no JS, no external assets.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-x-0 top-0 h-[42rem] opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 18% 12%, color-mix(in oklab, var(--brand) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[42rem] opacity-40"
        style={{
          background:
            "radial-gradient(45% 40% at 85% 18%, color-mix(in oklab, var(--cta) 16%, transparent) 0%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

/**
 * Right-column abstract graphic — placeholder per D3 (no portrait, designer
 * delivers final art). Subtle PCB-ish grid with an emerald accent so the
 * column is not empty during MVP.
 */
function HeroGraphic() {
  return (
    <div
      aria-hidden
      className="relative h-full min-h-[28rem] w-full overflow-hidden rounded-2xl border border-border bg-surface/60"
    >
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M32 0H0V32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border"
            />
          </pattern>
          <radialGradient id="hero-glow" cx="70%" cy="30%" r="55%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="500" fill="url(#hero-grid)" />
        <rect width="400" height="500" fill="url(#hero-glow)" />

        {/* PCB-ish traces */}
        <g
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.25"
          strokeLinecap="round"
        >
          <path d="M40 80 H180 L220 120 H320" opacity="0.7" />
          <path d="M40 160 H100 L140 200 H260 L300 240 H360" opacity="0.55" />
          <path d="M60 320 H200 L240 360 H340" opacity="0.5" />
          <path d="M40 420 H160 L200 380 H300" opacity="0.4" />
        </g>

        {/* Nodes */}
        <g fill="var(--brand)">
          <circle cx="180" cy="80" r="3" />
          <circle cx="320" cy="120" r="3" />
          <circle cx="260" cy="200" r="3" />
          <circle cx="200" cy="320" r="3" />
          <circle cx="340" cy="360" r="3" />
        </g>

        <g
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.75"
          opacity="0.35"
        >
          <rect x="40" y="60" width="80" height="40" rx="4" />
          <rect x="240" y="180" width="100" height="60" rx="4" />
          <rect x="60" y="380" width="120" height="60" rx="4" />
        </g>
      </svg>
    </div>
  );
}
