import { type HoneticApp } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

import { RoleBadge } from "./role-badge";
import { StackChip } from "./stack-chip";
import { StoreLink } from "./store-link";

export type AppCardProps = {
  app: HoneticApp;
  className?: string;
};

// Wrapper id={app.slug} drives anchor scrolling from /portfolio/honeti#<slug>.
// scroll-mt-24 clears the sticky header on hash navigation.
export function AppCard({ app, className }: AppCardProps) {
  return (
    <article
      id={app.slug}
      data-slug={app.slug}
      className={cn(
        "flex h-full scroll-mt-24 flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors",
        "hover:border-brand/40",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-brand/60 focus-within:ring-offset-2 focus-within:ring-offset-background",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon placeholder — public/icons/honeti/<slug>.{png,svg,webp} not shipped yet. */}
        <div
          aria-hidden
          className="size-12 shrink-0 rounded-xl border border-border/70 bg-surface/60"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="font-heading text-lg leading-tight font-semibold tracking-tight text-foreground sm:text-xl">
            {app.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <StackChip stack={app.stack} />
            <RoleBadge role={app.role} />
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {app.description}
      </p>

      {app.contribution.length > 0 ? (
        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed text-muted-foreground marker:text-text-subtle">
          {app.contribution.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-2">
        <StoreLink
          googleLink={app.googleLink}
          appleLink={app.appleLink}
          external={app.external}
        />
      </div>
    </article>
  );
}
