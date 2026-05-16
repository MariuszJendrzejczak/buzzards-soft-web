import { Apple, ExternalLink as ExternalIcon, Play } from "lucide-react";
import { useTranslations } from "next-intl";

import { type ExternalLink } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

export type StoreLinkProps = {
  googleLink?: string;
  appleLink?: string;
  external?: ExternalLink;
  className?: string;
};

export function StoreLink({
  googleLink,
  appleLink,
  external,
  className,
}: StoreLinkProps) {
  const t = useTranslations("portfolio.storeLink");

  if (!googleLink && !appleLink && !external) {
    return null;
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {googleLink ? (
        <IconLink
          href={googleLink}
          ariaLabel={t("googlePlay")}
          icon={<Play aria-hidden className="size-4" />}
        />
      ) : null}
      {appleLink ? (
        <IconLink
          href={appleLink}
          ariaLabel={t("appStore")}
          icon={<Apple aria-hidden className="size-4" />}
        />
      ) : null}
      {external ? (
        <IconLink
          href={external.url}
          ariaLabel={external.label}
          icon={<ExternalIcon aria-hidden className="size-4" />}
        />
      ) : null}
    </span>
  );
}

function IconLink({
  href,
  ariaLabel,
  icon,
}: {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 bg-surface/40 text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {icon}
    </a>
  );
}
