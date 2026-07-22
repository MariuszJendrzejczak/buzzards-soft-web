"use client";

import {
  Briefcase,
  Check,
  Code,
  Copy,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ItemKey = "email" | "phone" | "linkedin" | "github";

type ContactItem = {
  id: ItemKey;
  value: string;
  copyValue: string;
  href?: string;
  external?: boolean;
  Icon: typeof Mail;
};

const ITEMS: ContactItem[] = [
  {
    id: "email",
    value: "dev.buzzardssoft@gmail.com",
    copyValue: "dev.buzzardssoft@gmail.com",
    href: "mailto:dev.buzzardssoft@gmail.com",
    Icon: Mail,
  },
  {
    id: "phone",
    value: "+48 739 979 116",
    copyValue: "+48739979116",
    href: "tel:+48739979116",
    Icon: Phone,
  },
  {
    id: "linkedin",
    value: "linkedin.com/in/mariusz-jendrzejczak",
    copyValue: "https://www.linkedin.com/in/mariusz-jendrzejczak/",
    href: "https://www.linkedin.com/in/mariusz-jendrzejczak/",
    external: true,
    Icon: Briefcase,
  },
  {
    id: "github",
    value: "github.com/MariuszJendrzejczak",
    copyValue: "https://github.com/MariuszJendrzejczak",
    href: "https://github.com/MariuszJendrzejczak",
    external: true,
    Icon: Code,
  },
];

export function ContactInfo() {
  return (
    <ul className="flex flex-col gap-2">
      {ITEMS.map((item) => (
        <li key={item.id}>
          <ContactRow item={item} />
        </li>
      ))}
    </ul>
  );
}

function ContactRow({ item }: { item: ContactItem }) {
  const t = useTranslations("contactInfo");
  const { Icon } = item;
  const label = t(`labels.${item.id}`);

  return (
    <div className="group/row flex items-center gap-2 rounded-xl border border-border/60 bg-surface/40 px-3 py-2.5 transition-colors hover:border-brand/40 hover:bg-surface/70">
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-brand"
      >
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] tracking-[0.18em] text-text-subtle uppercase">
          {label}
        </div>
        {item.href ? (
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="mt-0.5 inline-flex max-w-full items-center gap-1.5 truncate rounded-sm text-sm font-medium text-foreground outline-none hover:text-brand focus-visible:ring-2 focus-visible:ring-ring sm:text-base"
          >
            <span className="truncate">{item.value}</span>
            {item.external ? (
              <ExternalLink
                aria-hidden
                className="size-3 shrink-0 text-text-subtle"
              />
            ) : null}
          </a>
        ) : (
          <div className="mt-0.5 truncate text-sm font-medium text-foreground sm:text-base">
            {item.value}
          </div>
        )}
      </div>

      <CopyButton value={item.copyValue} label={label} />
    </div>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const t = useTranslations("contactInfo");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast.error(t("copyUnsupported"));
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(t("copyToast", { label }));
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error(t("copyFailed"));
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      type="button"
      onClick={handleCopy}
      aria-label={
        copied ? t("copiedAria", { label }) : t("copyAria", { label })
      }
      className="shrink-0 text-muted-foreground hover:text-foreground"
    >
      {copied ? (
        <Check className={cn("size-4 text-brand")} aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
    </Button>
  );
}
