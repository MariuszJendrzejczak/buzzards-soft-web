import { Link } from "@/i18n/routing";
import { type HoneticApp } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

import { RoleBadge } from "./role-badge";
import { StackChip } from "./stack-chip";
import { StoreLink } from "./store-link";

export type HeroAppMiniCardProps = {
  app: HoneticApp;
  className?: string;
};

export function HeroAppMiniCard({ app, className }: HeroAppMiniCardProps) {
  const anchorHref = `/portfolio/honeti#${app.slug}`;

  return (
    // Outer is a div, not an <a>, because store-link icons inside must also
    // be anchors; nested <a> is invalid HTML. The whole card is still
    // clickable via the absolute-inset overlay link wrapping the title.
    <article
      data-slug={app.slug}
      className={cn(
        "group/mini relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200",
        "hover:scale-[1.02] hover:border-brand/40 hover:shadow-md",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-brand/60 focus-within:ring-offset-2 focus-within:ring-offset-background",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden
          className="size-12 shrink-0 rounded-xl border border-border/70 bg-surface/60"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h4 className="font-heading text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {/* The real anchor — focus target for keyboard users and the
                element screen readers announce. The ::after overlay extends
                its hit-area to the whole card. */}
            <Link
              href={anchorHref}
              data-card-link
              className="rounded-md outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:underline"
            >
              {app.name}
            </Link>
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <StackChip stack={app.stack} />
            <RoleBadge role={app.role} />
          </div>
        </div>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {app.description}
      </p>

      {/* relative + z-10 lifts the store-link row above the ::after overlay
          so its inner <a>s receive clicks instead of the card link. */}
      <div className="relative z-10 mt-auto pt-2">
        <StoreLink
          googleLink={app.googleLink}
          appleLink={app.appleLink}
          external={app.external}
        />
      </div>
    </article>
  );
}
