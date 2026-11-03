import { RoleBadge, StackChip } from "buzzards-soft-ui";

export function Roles() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <RoleBadge role="od-zera" />
      <RoleBadge role="rozwoj-i-serwis" />
    </div>
  );
}

export function OdZera() {
  return (
    <div className="p-6">
      <RoleBadge role="od-zera" />
    </div>
  );
}

export function RozwojISerwis() {
  return (
    <div className="p-6">
      <RoleBadge role="rozwoj-i-serwis" />
    </div>
  );
}

export function WithStackChip() {
  return (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StackChip stack="Flutter" />
        <RoleBadge role="od-zera" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <StackChip stack="Unity" />
        <RoleBadge role="rozwoj-i-serwis" />
      </div>
    </div>
  );
}
