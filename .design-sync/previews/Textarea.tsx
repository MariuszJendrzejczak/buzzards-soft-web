import { Label, Textarea } from "buzzards-soft-ui";

export function Default() {
  return (
    <div className="flex w-[420px] flex-col gap-2 p-6">
      <Label htmlFor="ta-msg">Czego dotyczy kontakt?</Label>
      <Textarea
        id="ta-msg"
        rows={5}
        placeholder="rola / kontrakt / projekt / inne — krótko, czym mogę pomóc"
        className="min-h-32"
      />
    </div>
  );
}

export function Prefilled() {
  return (
    <div className="flex w-[420px] flex-col gap-2 p-6">
      <Label htmlFor="ta-prefill">Czego dotyczy kontakt?</Label>
      <Textarea
        id="ta-prefill"
        rows={5}
        defaultValue="Dzień dobry, jestem zainteresowany pakietem Full. Proszę o kontakt w sprawie szczegółów i wyceny."
        className="min-h-32"
      />
    </div>
  );
}

export function Invalid() {
  return (
    <div className="flex w-[420px] flex-col gap-2 p-6">
      <Label htmlFor="ta-invalid" className="text-destructive">
        Czego dotyczy kontakt?
      </Label>
      <Textarea id="ta-invalid" aria-invalid rows={5} defaultValue="Strona dla firmy" className="min-h-32" />
      <p className="text-sm text-destructive">Min. 20 znaków — opisz krótko, czego dotyczy kontakt</p>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex w-[420px] flex-col gap-2 p-6">
      <Label htmlFor="ta-disabled">Czego dotyczy kontakt?</Label>
      <Textarea
        id="ta-disabled"
        disabled
        rows={5}
        defaultValue="Szukam developera Flutter do rozwoju aplikacji mobilnej — kontrakt B2B na 6 miesięcy."
        className="min-h-32"
      />
    </div>
  );
}
