import { ChipCloud, TechChip } from "buzzards-soft-ui";

// Real chip sets from components/sections/work/what-i-can-deliver.tsx.
const MOBILE = [
  "Flutter", "Dart", "Riverpod", "Freezed", "DI", "Clean Architecture", "go_router", "REST API",
  "Firebase", "Hive", "FCM", "RevenueCat", "AdMob", "Android", "iOS", "Google Play", "App Store",
];

const AGENTIC = [
  "Claude Code", "MCP", "OpenAI API", "Anthropic API", "context engineering", "prompt caching",
  "function calling", "tool use", "structured output",
];

const UNITY = ["Unity", "C#", "State Machine", "Object Pooling", "Scriptable Object"];

export function MobileStack() {
  return (
    <div className="p-6" style={{ width: 520 }}>
      <ChipCloud ariaLabel="Stack — Mobile development — Flutter / Dart">
        {MOBILE.map((chip) => (
          <TechChip key={chip}>{chip}</TechChip>
        ))}
      </ChipCloud>
    </div>
  );
}

export function AgenticStack() {
  return (
    <div className="p-6" style={{ width: 520 }}>
      <ChipCloud ariaLabel="Stack — Programowanie Agentowe">
        {AGENTIC.map((chip) => (
          <TechChip key={chip}>{chip}</TechChip>
        ))}
      </ChipCloud>
    </div>
  );
}

export function Certificates() {
  return (
    <div className="p-6" style={{ width: 520 }}>
      <h3 className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
        Dodatkowe uprawnienia
      </h3>
      <ChipCloud ariaLabel="Certyfikaty i uprawnienia" className="mt-4">
        {["SEP E + D", "Prawo jazdy kat. B", "Patent żeglarski"].map((chip) => (
          <TechChip key={chip}>{chip}</TechChip>
        ))}
      </ChipCloud>
    </div>
  );
}

export function InSubBlock() {
  return (
    <div className="p-6" style={{ width: 520 }}>
      <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-surface p-5">
        <h4 className="font-heading text-base font-semibold text-foreground">Aplikacje w Unity / C#</h4>
        <ChipCloud ariaLabel="Stack — Aplikacje w Unity / C#" className="mt-1">
          {UNITY.map((chip) => (
            <TechChip key={chip}>{chip}</TechChip>
          ))}
        </ChipCloud>
      </div>
    </div>
  );
}
