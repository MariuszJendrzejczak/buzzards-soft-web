import { Icons, ScrollReveal } from "buzzards-soft-ui";

// ScrollReveal fades + lifts its content in once it enters the viewport
// (whileInView, margin -100px). Stories keep the revealed content tall enough
// to cross that margin, so the static capture shows the settled state.

export function SectionHeader() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <ScrollReveal as="header" className="max-w-3xl">
        <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
          Sekcja 02 · Warsztat
        </span>
        <h2 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground">
          Warsztat AI, potwierdzony certyfikatem 10xDevs
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Ukończyłem kohortowy kurs 10xDevs prowadzony przez Przemka Smyrdka i Marcina Czarkowskiego —
          intensywny program o inżynierii oprogramowania z agentami AI w całym cyklu wytwórczym, od
          pomysłu i planu po testy i wdrożenie.
        </p>
      </ScrollReveal>
    </div>
  );
}

export function RevealedCard() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <ScrollReveal className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
            <Icons.BadgeCheck className="size-5" aria-hidden />
          </span>
          <h3 className="font-heading text-xl leading-snug font-semibold text-foreground">10xDevs</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Kurs stawiał na praktykę: każdy moduł domykał konkretny, działający efekt zbudowany na
          realnym projekcie. Certyfikat, cztery zdobyte odznaki i pięć obszarów, które kurs objął,
          masz poniżej.
        </p>
      </ScrollReveal>
    </div>
  );
}

export function AboutCard() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <ScrollReveal className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
        <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
          Sekcja 06 · O mnie
        </span>
        <h2 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground">
          O mnie
        </h2>
        <p className="mt-6 border-l-2 border-brand bg-surface py-2 pl-5 font-heading text-lg leading-relaxed text-foreground italic">
          Jestem programistą, który świadomie prowadzi agenty AI — i dzięki temu dostarczam więcej
          jakości, szybciej, na całym cyklu projektu.
        </p>
      </ScrollReveal>
    </div>
  );
}
