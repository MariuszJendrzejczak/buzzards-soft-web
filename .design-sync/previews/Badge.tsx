import { Badge, Icons } from "buzzards-soft-ui";

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-2 p-6">
      <Badge>AI-Native Developer</Badge>
      <Badge variant="secondary">Mobile Developer</Badge>
      <Badge variant="outline">Fullstack Developer</Badge>
      <Badge variant="destructive">Pole wymagane</Badge>
      <Badge variant="ghost">opcjonalne</Badge>
      <Badge variant="link">Polityka prywatności</Badge>
    </div>
  );
}

export function WithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2 p-6">
      <Badge>
        <Icons.BadgeCheck data-icon="inline-start" />
        Certyfikat
      </Badge>
      <Badge variant="secondary">
        <Icons.Smartphone data-icon="inline-start" />
        Flutter
      </Badge>
      <Badge variant="outline">
        <Icons.Globe data-icon="inline-start" />
        Next.js
      </Badge>
      <Badge variant="destructive">
        <Icons.TriangleAlert data-icon="inline-start" />
        Błąd formularza
      </Badge>
    </div>
  );
}

export function PricingTags() {
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center gap-3">
        <span className="font-heading text-lg font-semibold text-foreground">Basic</span>
        <Badge className="bg-cta text-white">cena promocyjna</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-heading text-lg font-semibold text-foreground">Full</span>
        <Badge className="bg-cta text-white">cena promocyjna</Badge>
        <Badge variant="outline">moduł</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-heading text-lg font-semibold text-foreground">Większy projekt</span>
        <Badge variant="secondary">Wycena indywidualna</Badge>
      </div>
    </div>
  );
}

export function AsLink() {
  return (
    <div className="flex flex-wrap items-center gap-2 p-6">
      <Badge render={<a href="#portfolio" />}>
        Portfolio
        <Icons.ArrowRight data-icon="inline-end" />
      </Badge>
      <Badge variant="secondary" render={<a href="#contact" />}>
        Kontakt
        <Icons.ArrowRight data-icon="inline-end" />
      </Badge>
    </div>
  );
}
