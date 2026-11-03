import { StackChip, TechTag } from "buzzards-soft-ui";

export function Flutter() {
  return (
    <div className="p-6">
      <StackChip stack="Flutter" />
    </div>
  );
}

export function Unity() {
  return (
    <div className="p-6">
      <StackChip stack="Unity" />
    </div>
  );
}

export function BothStacks() {
  return (
    <div className="flex items-center gap-2 p-6">
      <StackChip stack="Flutter" />
      <StackChip stack="Unity" />
    </div>
  );
}

const STACK_TAGS = ["Dart", "Riverpod", "REST API", "Firebase", "Clean Architecture", "CI/CD"];

export function HonetiStackRow() {
  return (
    <ul aria-label="Stack technologiczny" className="flex flex-wrap items-center gap-2 p-6" style={{ maxWidth: 520 }}>
      <li>
        <StackChip stack="Flutter" />
      </li>
      {STACK_TAGS.map((tag) => (
        <li key={tag}>
          <TechTag>{tag}</TechTag>
        </li>
      ))}
      <li>
        <StackChip stack="Unity" />
      </li>
    </ul>
  );
}
