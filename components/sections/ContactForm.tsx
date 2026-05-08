"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type SourceValue = "linkedin" | "referral" | "google" | "other";

export type ContactFormValues = {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: SourceValue;
};

const SOURCE_KEYS: SourceValue[] = ["linkedin", "referral", "google", "other"];

// TODO: replace with real Firebase Function call (separate task).
async function submitContactForm(values: ContactFormValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  void values;
}

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [submitting, setSubmitting] = useState(false);

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z
          .string({ error: t("validation.required") })
          .trim()
          .min(2, { error: t("validation.minName") })
          .max(120, { error: t("validation.maxName") }),
        email: z
          .email({ error: t("validation.invalidEmail") })
          .max(160, { error: t("validation.maxEmail") }),
        company: z
          .string()
          .trim()
          .max(160, { error: t("validation.maxCompany") })
          .optional()
          .or(z.literal("")),
        message: z
          .string({ error: t("validation.required") })
          .trim()
          .min(20, { error: t("validation.minMessage") })
          .max(4000, { error: t("validation.maxMessage") }),
        source: z.enum(["linkedin", "referral", "google", "other"]).optional(),
      }),
    [t],
  );

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
      source: undefined,
    },
    mode: "onTouched",
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true);
    try {
      await submitContactForm(values);
      toast.success(t("toast.success"));
      form.reset();
    } catch {
      toast.error(t("toast.error"));
    } finally {
      setSubmitting(false);
    }
  }

  const requiredMark = (
    <span aria-hidden className="ml-0.5 text-cta">
      *
    </span>
  );

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        aria-describedby="contact-form-required-hint"
        className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8"
      >
        <p
          id="contact-form-required-hint"
          className="font-mono text-[11px] tracking-[0.18em] text-text-subtle uppercase"
        >
          {t("requiredHintPrefix")}
          <span className="text-cta">*</span>
          {t("requiredHintSuffix")}
        </p>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("labels.name")}
                {requiredMark}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="name"
                  placeholder={t("placeholders.name")}
                  disabled={submitting}
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("labels.email")}
                {requiredMark}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder={t("placeholders.email")}
                  disabled={submitting}
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("labels.company")}
                <span className="ml-1 font-mono text-[10px] tracking-wider text-text-subtle uppercase">
                  {t("optional")}
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="organization"
                  placeholder={t("placeholders.company")}
                  disabled={submitting}
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("labels.message")}
                {requiredMark}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder={t("placeholders.message")}
                  disabled={submitting}
                  className="min-h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("labels.source")}
                <span className="ml-1 font-mono text-[10px] tracking-wider text-text-subtle uppercase">
                  {t("optional")}
                </span>
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={(value) => {
                    field.onChange(value === "" ? undefined : value);
                  }}
                  disabled={submitting}
                >
                  <SelectTrigger
                    onBlur={field.onBlur}
                    aria-label={t("labels.source")}
                    className="h-11 w-full justify-between"
                  >
                    <SelectValue placeholder={t("placeholders.source")} />
                  </SelectTrigger>
                  <SelectContent>
                    {SOURCE_KEYS.map((key) => (
                      <SelectItem key={key} value={key}>
                        {t(`sources.${key}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          aria-busy={submitting}
          className="mt-2 h-12 w-full gap-2 bg-cta px-6 text-base text-primary-foreground hover:bg-cta-hover sm:w-fit"
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              {t("submitting")}
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden />
              {t("submit")}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
