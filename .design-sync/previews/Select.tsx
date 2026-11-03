import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "buzzards-soft-ui";

const SOURCES = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Polecenie" },
  { value: "google", label: "Google" },
  { value: "other", label: "Inne" },
];

export function Placeholder() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Label>Skąd o mnie wiesz?</Label>
      <Select>
        <SelectTrigger aria-label="Skąd o mnie wiesz?" className="h-11 w-full justify-between">
          <SelectValue placeholder="Wybierz (opcjonalnie)" />
        </SelectTrigger>
        <SelectContent>
          {SOURCES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function Selected() {
  return (
    <div className="flex w-80 flex-col gap-2 p-6">
      <Label>Skąd o mnie wiesz?</Label>
      <Select defaultValue="referral" items={SOURCES}>
        <SelectTrigger aria-label="Skąd o mnie wiesz?" className="h-11 w-full justify-between">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SOURCES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function Open() {
  return (
    <div className="flex h-72 w-80 flex-col gap-2 p-6">
      <Label>Skąd o mnie wiesz?</Label>
      <Select defaultOpen defaultValue="google" items={SOURCES}>
        <SelectTrigger aria-label="Skąd o mnie wiesz?" className="h-11 w-full justify-between">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          {SOURCES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
