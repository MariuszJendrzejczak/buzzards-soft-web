import { Icons, Separator } from "buzzards-soft-ui";

export function Horizontal() {
  return (
    <div className="w-[420px] p-6">
      <div className="flex flex-col gap-1">
        <h4 className="font-heading text-base font-semibold text-foreground">
          Mobile development — Flutter / Dart
        </h4>
        <p className="text-sm text-muted-foreground">
          Aplikacje mobilne Android + iOS od zera i rozwój istniejących.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-1">
        <h4 className="font-heading text-base font-semibold text-foreground">Aplikacje w Unity / C#</h4>
        <p className="text-sm text-muted-foreground">
          Aplikacje mobilne i interaktywne budowane w Unity / C#.
        </p>
      </div>
    </div>
  );
}

export function Vertical() {
  return (
    <div className="p-6">
      <div className="flex h-5 items-center gap-4 text-sm text-muted-foreground">
        <span>Flutter (Dart)</span>
        <Separator orientation="vertical" />
        <span>Unity (C#)</span>
        <Separator orientation="vertical" />
        <span>Next.js</span>
        <Separator orientation="vertical" />
        <span>Firebase</span>
      </div>
    </div>
  );
}

export function InContactList() {
  const rows = [
    { icon: Icons.Mail, label: "Email", value: "dev.buzzardssoft@gmail.com" },
    { icon: Icons.Users, label: "LinkedIn", value: "linkedin.com/in/mariusz-jendrzejczak" },
    { icon: Icons.GitBranch, label: "GitHub", value: "github.com/MariuszJendrzejczak" },
  ];
  return (
    <div className="w-[420px] p-6">
      <div className="rounded-xl border border-border/60 bg-card">
        {rows.map((row, i) => (
          <div key={row.label}>
            {i > 0 && <Separator />}
            <div className="flex items-center gap-3 px-4 py-3">
              <row.icon className="size-4 text-brand" aria-hidden />
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[11px] tracking-[0.18em] text-text-subtle uppercase">
                  {row.label}
                </span>
                <span className="text-sm text-foreground">{row.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
