import { cn } from "@/lib/utils";

export type EducationCardVariant = "primary" | "secondary";

export type EducationField = {
  label: string;
  value: string;
};

export type EducationCardProps = {
  variant?: EducationCardVariant;
  eyebrow: string;
  title: string;
  fields: EducationField[];
  className?: string;
};

const VARIANT_CLASSES: Record<EducationCardVariant, string> = {
  primary: "rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-9",
  secondary:
    "rounded-2xl border border-border/70 bg-surface/40 p-6 sm:p-7",
};

export function EducationCard({
  variant = "primary",
  eyebrow,
  title,
  fields,
  className,
}: EducationCardProps) {
  const eyebrowToneClass =
    variant === "primary" ? "text-brand" : "text-text-subtle";

  const titleClass =
    variant === "primary"
      ? "mt-3 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      : "mt-3 font-heading text-lg font-semibold tracking-tight text-foreground/90 sm:text-xl";

  return (
    <article className={cn(VARIANT_CLASSES[variant], className)}>
      <span
        className={cn(
          "font-mono text-[11px] font-medium tracking-[0.2em] uppercase",
          eyebrowToneClass,
        )}
      >
        {eyebrow}
      </span>
      <h3 className={titleClass}>{title}</h3>
      <dl className="mt-6 flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-wrap gap-x-2">
            <dt className="font-semibold text-foreground">{field.label}:</dt>
            <dd>{field.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
