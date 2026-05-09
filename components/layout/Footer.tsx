import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { Link } from "@/i18n/routing";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.356V9h3.414v1.561h.046c.476-.9 1.637-1.852 3.37-1.852 3.601 0 4.266 2.37 4.266 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.381 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

type SocialLink = {
  href: string;
  label: string;
  icon: IconComponent;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/mariusz-jendrzejczak/",
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: "https://github.com/MariuszJendrzejczak",
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    href: "mailto:dev.buzzardssoft@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

const COMPANY_REGISTRY = [
  { label: "NIP", value: "955-210-53-74" },
  { label: "REGON", value: "302197078" },
  { label: "DUNS", value: "427603771" },
];

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand-mark.png"
              alt=""
              width={28}
              height={28}
              aria-hidden
              className="size-7"
            />
            <span className="font-heading text-sm font-semibold text-foreground">
              Buzzards Soft
            </span>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("tagline")}
          </p>

          <address className="mt-6 text-sm not-italic leading-relaxed text-muted-foreground">
            Buzzards Soft Mariusz Jendrzejczak
            <br />
            Pomorska 14/8
            <br />
            74-300 Myślibórz
          </address>
        </div>

        <nav aria-label={tNav("footerAria")} className="md:col-span-3">
          <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
            {t("linksHeading")}
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/privacy-policy"
                className="text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {t("links.privacy")}
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                className="text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {t("links.contact")}
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="font-mono text-xs font-medium tracking-[0.18em] text-text-subtle uppercase">
            {t("registryHeading")}
          </h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-xs text-text-subtle">
            {COMPANY_REGISTRY.map((row) => (
              <div key={row.label} className="contents">
                <dt className="font-medium tracking-wide text-muted-foreground uppercase">
                  {row.label}
                </dt>
                <dd className="text-muted-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-text-subtle">
            {t("copyright", { year: 2026 })}
          </p>

          <ul className="flex items-center gap-1">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <link.icon className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
