import { Button, Icons } from "buzzards-soft-ui";

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button>Porozmawiajmy</Button>
      <Button variant="secondary">Pobierz CV</Button>
      <Button variant="outline">Zobacz portfolio</Button>
      <Button variant="ghost">Anuluj</Button>
      <Button variant="destructive">Usuń</Button>
      <Button variant="link">Polityka prywatności</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button size="xs">Mały</Button>
      <Button size="sm">Kompaktowy</Button>
      <Button>Domyślny</Button>
      <Button size="lg">Duży</Button>
      <Button size="icon" variant="outline" aria-label="Menu">
        <Icons.Menu />
      </Button>
    </div>
  );
}

export function HeroCtaPair() {
  return (
    <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:gap-4">
      <Button
        size="lg"
        nativeButton={false}
        render={<a href="#contact" />}
        className="h-12 bg-cta px-6 text-base text-white hover:bg-cta-hover"
      >
        Porozmawiajmy
      </Button>
      <Button
        variant="ghost"
        size="lg"
        nativeButton={false}
        render={<a href="#portfolio" />}
        className="h-12 gap-2 px-3 text-base text-foreground hover:bg-surface"
      >
        Zobacz, jak pracuję
        <Icons.ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
      </Button>
    </div>
  );
}

export function SubmitStates() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button
        size="lg"
        className="h-12 gap-2 bg-cta px-6 text-base text-white hover:bg-cta-hover"
      >
        <Icons.Send className="size-4" aria-hidden />
        Wyślij wiadomość
      </Button>
      <Button
        size="lg"
        disabled
        aria-busy
        className="h-12 gap-2 bg-cta px-6 text-base text-white"
      >
        <Icons.Loader2 className="size-4 animate-spin" aria-hidden />
        Wysyłam…
      </Button>
    </div>
  );
}
