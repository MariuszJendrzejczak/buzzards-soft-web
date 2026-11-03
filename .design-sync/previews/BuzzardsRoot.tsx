import { BuzzardsRoot, Button, Icons, RoleBadge } from "buzzards-soft-ui";

// BuzzardsRoot is the provider every card is auto-wrapped in. These stories
// stay dark (the site default): every cell shares <html>, so a theme="light"
// story would flip all neighbouring cells. Light is the fallback theme and is
// selected with <BuzzardsRoot theme="light"> in a real screen.

export function SectionHeader() {
  return (
    <BuzzardsRoot className="rounded-2xl p-6" style={{ width: 560 }}>
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
          Sekcja 03 · Umiejętności
        </span>
        <h2 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-foreground">
          Moje umiejętności i zalety
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Zestaw umiejętności, na których stoi moja praca — pogrupowany tak, żeby od razu było
          widać, gdzie mam mocne, udokumentowane doświadczenie.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<a href="#contact" />}
          className="mt-6 h-12 bg-cta px-6 text-base text-white hover:bg-cta-hover"
        >
          Porozmawiajmy
        </Button>
      </div>
    </BuzzardsRoot>
  );
}

export function OfferHero() {
  return (
    <BuzzardsRoot className="p-6" style={{ width: 560 }}>
      <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Strony internetowe dla małych firm i freelancerów
      </span>
      <h1 className="mt-3 font-heading text-4xl leading-tight font-semibold tracking-tight text-foreground">
        Profesjonalna strona zaprojektowana dla Twojej firmy
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Tworzę dla Ciebie profesjonalną stronę, która będzie Twoją wizytówką. Wszystko zaczyna się
        od rozmowy i pomysłu.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button size="lg" className="h-12 bg-cta px-6 text-base text-white hover:bg-cta-hover">
          Wyceń swoją stronę
        </Button>
        <Button variant="ghost" size="lg" className="h-12 gap-2 px-3 text-base text-foreground hover:bg-surface">
          Zobacz, jak pracuję
          <Icons.ArrowRight className="size-4" />
        </Button>
      </div>
    </BuzzardsRoot>
  );
}

export function Locales() {
  return (
    <div className="flex flex-col gap-4 p-6" style={{ width: 560 }}>
      <span className="font-mono text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Ten sam komponent, trzy języki
      </span>
      {(["pl", "en", "sv"] as const).map((locale) => (
        <BuzzardsRoot key={locale} locale={locale} className="flex items-center gap-3">
          <span className="w-8 font-mono text-xs text-text-subtle uppercase">{locale}</span>
          <RoleBadge role="od-zera" />
          <RoleBadge role="rozwoj-i-serwis" />
        </BuzzardsRoot>
      ))}
    </div>
  );
}
