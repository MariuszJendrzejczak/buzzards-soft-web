import { Globe } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import type {
  AgentProjectLink,
  AgentProjectLinkKind,
} from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";

const IMAGE_SRC_MAP: Partial<Record<AgentProjectLinkKind, string>> = {
  google: "/portfolio/stores/google-play.png",
  apple: "/portfolio/stores/app-store.png",
  github: "/portfolio/stores/github-mark.png",
};

const ARIA_KEY_MAP: Record<AgentProjectLinkKind, string> = {
  google: "googlePlay",
  apple: "appStore",
  github: "github",
  homepage: "homepage",
};

export type ProjectLinkProps = {
  links: readonly AgentProjectLink[];
  className?: string;
};

export function ProjectLink({ links, className }: ProjectLinkProps) {
  const t = useTranslations("portfolio.projectLink");

  if (links.length === 0) {
    return null;
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {links.map((link) => {
        const ariaLabel = t(ARIA_KEY_MAP[link.kind]);
        const isInternal = link.url.startsWith("/") || link.url.startsWith("#");
        const imageSrc = IMAGE_SRC_MAP[link.kind];
        return (
          <a
            key={`${link.kind}-${link.url}`}
            href={link.url}
            data-link-kind={link.kind}
            target={isInternal ? undefined : "_blank"}
            rel={isInternal ? undefined : "noopener noreferrer"}
            aria-label={ariaLabel}
            className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 bg-surface/40 text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                aria-hidden
                width={20}
                height={20}
                className="size-5 object-contain"
              />
            ) : (
              <Globe aria-hidden className="size-4" />
            )}
          </a>
        );
      })}
    </span>
  );
}
