import { PhotoBand } from "buzzards-soft-ui";

// Real backdrops + scrim/photo tuning from app/[locale]/page.tsx. `src` goes into
// a CSS background-image (not next/image), so the root-relative -> buzzards-soft.com
// rewrite does not apply: previews pass the absolute URL.

export function PortfolioBackdrop() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <PhotoBand
        src="https://buzzards-soft.com/images/portfolio.webp"
        scrimClassName="bg-white/45 dark:bg-black/42"
        photoClassName="bg-center dark:brightness-120"
        className="rounded-2xl"
      >
        <div className="p-8">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
              Sekcja 04 · Portfolio
            </span>
            <h2 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground">
              Portfolio
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Przegląd mojej pracy: komercyjne aplikacje mobilne na Androida i iOS oraz moje własne
              projekty tworzone z agentami AI.
            </p>
          </div>
        </div>
      </PhotoBand>
    </div>
  );
}

export function HeroBackdrop() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <PhotoBand
        src="https://buzzards-soft.com/images/hero.webp"
        scrimClassName="bg-white/35 dark:bg-black/30"
        photoClassName="bg-center dark:brightness-125"
        className="rounded-2xl"
      >
        <div className="flex h-64 flex-col justify-end p-8">
          <h1 className="font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground">
            Samodzielny, kompletny developer{" "}
            <span className="text-brand">z własnym workflow agentowym</span> — dostarczam end-to-end.
          </h1>
        </div>
      </PhotoBand>
    </div>
  );
}

export function DecorativeStrip() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <PhotoBand
        src="https://buzzards-soft.com/images/about.webp"
        decorative
        scrimClassName="bg-white/40 dark:bg-black/40"
        photoClassName="bg-bottom dark:brightness-110"
        className="h-48 rounded-2xl"
      />
    </div>
  );
}
