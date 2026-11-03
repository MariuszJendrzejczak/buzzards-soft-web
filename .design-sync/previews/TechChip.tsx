import { TechChip } from "buzzards-soft-ui";

export function Core() {
  return (
    <div className="p-6">
      <TechChip>Flutter</TechChip>
    </div>
  );
}

export function Growing() {
  return (
    <div className="p-6">
      <TechChip variant="growing">Next.js</TechChip>
    </div>
  );
}

export function CoreVsGrowing() {
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex flex-wrap gap-1.5">
        {["Flutter", "Dart", "Riverpod", "Firebase"].map((c) => (
          <TechChip key={c}>{c}</TechChip>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Next.js", "TypeScript", "Tailwind", "Playwright"].map((c) => (
          <TechChip key={c} variant="growing">
            {c}
          </TechChip>
        ))}
      </div>
    </div>
  );
}
