import { Icons, Input, Label } from "buzzards-soft-ui";

export function Default() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Label htmlFor="in-name">Imię i nazwisko</Label>
      <Input id="in-name" autoComplete="name" placeholder="Jan Kowalski" className="h-11" />
    </div>
  );
}

export function Filled() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Label htmlFor="in-email">Email</Label>
      <Input
        id="in-email"
        type="email"
        inputMode="email"
        defaultValue="anna.nowak@pracownia-nowak.pl"
        className="h-11"
      />
    </div>
  );
}

export function Invalid() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Label htmlFor="in-invalid" className="text-destructive">
        Email
      </Label>
      <Input id="in-invalid" type="email" aria-invalid defaultValue="jan@firma" className="h-11" />
      <p className="text-sm text-destructive">Nieprawidłowy adres e-mail</p>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Label htmlFor="in-disabled">Firma</Label>
      <Input id="in-disabled" disabled placeholder="Nazwa firmy" className="h-11" />
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex w-80 flex-col gap-3 p-6">
      <Input placeholder="Domyślny (h-8)" />
      <Input placeholder="Formularz kontaktowy (h-11)" className="h-11" />
      <div className="relative">
        <Icons.Mail
          className="pointer-events-none absolute size-4 text-muted-foreground"
          style={{ left: 12, top: "50%", transform: "translateY(-50%)" }}
        />
        <Input type="email" placeholder="jan@firma.pl" className="h-11 pl-10" />
      </div>
    </div>
  );
}
