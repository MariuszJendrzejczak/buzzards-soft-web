import { Icons, StaggerGroup, StaggerItem, TechChip } from "buzzards-soft-ui";

// StaggerGroup reveals its StaggerItem children one after another once the
// group enters the viewport (whileInView, margin -100px). Real content from
// components/sections/certification/certification.tsx.

const BADGES = [
  { name: "10xBuilder", src: "/images/badge-10xbuilder.webp" },
  { name: "10xArchitect", src: "/images/badge-10xarchitect.webp" },
  { name: "10xChampion", src: "/images/badge-10xchampion.webp" },
  { name: "Best Project", src: "/images/badge-best-project.webp" },
];

const AREAS = [
  {
    number: "01",
    icon: Icons.Wrench,
    title: "Agentic Environment",
    desc: "Konfiguracja środowiska pod pracę z agentami AI: własny zestaw narzędzi, pamięć projektu i reguły, które utrzymują agenta w granicach zadania.",
  },
  {
    number: "02",
    icon: Icons.GitMerge,
    title: "10xDevs Workflow",
    desc: "Powtarzalny tor od briefu do działającego kodu: plan, review i implementacja jako osobne etapy, z jasnym podziałem na to, co robi agent, a gdzie decyduje człowiek.",
  },
];

export function BadgeRow() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <StaggerGroup as="ul" className="grid grid-cols-4 gap-4">
        {BADGES.map((b) => (
          <StaggerItem as="li" key={b.name} className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-24 items-end justify-center">
              <img src={`https://buzzards-soft.com${b.src}`} alt={b.name} className="size-20" />
            </div>
            <span className="font-heading text-sm font-semibold text-foreground">{b.name}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export function AreaCards() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <StaggerGroup as="ul" className="grid grid-cols-2 gap-4">
        {AREAS.map((area) => (
          <StaggerItem as="li" key={area.number}>
            <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 right-5 font-mono text-5xl font-bold tracking-tight text-brand/15"
              >
                {area.number}
              </span>
              <div className="relative flex size-11 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                <area.icon className="size-5" aria-hidden />
              </div>
              <h3 className="relative font-heading text-lg leading-snug font-semibold text-foreground">
                {area.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">{area.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export function ChipList() {
  return (
    <div className="p-6" style={{ width: 560 }}>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-heading text-base font-semibold text-foreground">Programowanie Agentowe</h3>
        <StaggerGroup as="ul" className="mt-4 flex flex-wrap gap-1.5" ariaLabel="Stack — Programowanie Agentowe">
          {["Claude Code", "MCP", "OpenAI API", "Anthropic API", "context engineering", "prompt caching", "tool use", "structured output"].map((c) => (
            <StaggerItem as="li" key={c}>
              <TechChip>{c}</TechChip>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Claude Code jest moim daily driverem, skonfigurowanym pod konkretne projekty: własne
          subagenty, hooki, serwery MCP i skille pod powtarzalne zadania.
        </p>
      </div>
    </div>
  );
}
