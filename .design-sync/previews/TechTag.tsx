import { TechTag } from "buzzards-soft-ui";

const STACK_TAGS = ["Dart", "Riverpod", "REST API", "Firebase", "Clean Architecture", "CI/CD"];

export function Default() {
  return (
    <div className="p-6">
      <TechTag>Riverpod</TechTag>
    </div>
  );
}

export function Muted() {
  return (
    <div className="p-6">
      <TechTag muted>go_router</TechTag>
    </div>
  );
}

export function DefaultVsMuted() {
  return (
    <div className="flex flex-col gap-3 p-6" style={{ maxWidth: 520 }}>
      <div className="flex flex-wrap gap-2">
        {STACK_TAGS.map((tag) => (
          <TechTag key={tag}>{tag}</TechTag>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Hive", "FCM", "RevenueCat", "AdMob"].map((tag) => (
          <TechTag key={tag} muted>
            {tag}
          </TechTag>
        ))}
      </div>
    </div>
  );
}
