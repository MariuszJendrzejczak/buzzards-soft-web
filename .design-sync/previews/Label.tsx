import { Input, Label } from "buzzards-soft-ui";

export function Default() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Label htmlFor="lbl-name">Imię i nazwisko</Label>
      <Input id="lbl-name" placeholder="Jan Kowalski" className="h-11" />
    </div>
  );
}

export function RequiredAndOptional() {
  return (
    <div className="flex w-80 flex-col gap-5 p-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="lbl-email">
          Email
          <span aria-hidden className="ml-0.5 text-destructive">
            *
          </span>
        </Label>
        <Input id="lbl-email" type="email" placeholder="jan@firma.pl" className="h-11" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lbl-company">
          Firma
          <span className="font-mono text-[10px] tracking-wider text-text-subtle uppercase">
            opcjonalne
          </span>
        </Label>
        <Input id="lbl-company" placeholder="Nazwa firmy" className="h-11" />
      </div>
    </div>
  );
}

export function DisabledPeer() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Input id="lbl-disabled" disabled defaultValue="Jan Kowalski" className="peer order-2 h-11" />
      <Label htmlFor="lbl-disabled" className="order-1">
        Imię i nazwisko
      </Label>
    </div>
  );
}
