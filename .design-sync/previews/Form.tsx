import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "buzzards-soft-ui";

type ContactValues = {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
};

const SOURCES = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Polecenie" },
  { value: "google", label: "Google" },
  { value: "other", label: "Inne" },
];

const required = (
  <span aria-hidden className="ml-0.5 text-destructive">
    *
  </span>
);
const optional = (
  <span className="font-mono text-[10px] tracking-wider text-text-subtle uppercase">opcjonalne</span>
);

function ContactFields({
  form,
  submitting = false,
}: {
  form: ReturnType<typeof useForm<ContactValues>>;
  submitting?: boolean;
}) {
  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(() => {})}
        className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
      >
        <p className="font-mono text-[11px] tracking-[0.18em] text-text-subtle uppercase">
          Pola oznaczone <span className="text-destructive">*</span> są wymagane
        </p>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię i nazwisko{required}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Jan Kowalski" disabled={submitting} className="h-11" />
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
              <FormLabel>Email{required}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="jan@firma.pl"
                  disabled={submitting}
                  aria-invalid={!!form.formState.errors.email}
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
              <FormLabel>Czego dotyczy kontakt?{required}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="rola / kontrakt / projekt / inne — krótko, czym mogę pomóc"
                  disabled={submitting}
                  aria-invalid={!!form.formState.errors.message}
                  className="min-h-32"
                />
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
          className="mt-1 h-12 w-fit gap-2 bg-cta px-6 text-base text-white hover:bg-cta-hover"
        >
          {submitting ? (
            <>
              <Icons.Loader2 className="size-4 animate-spin" aria-hidden />
              Wysyłam…
            </>
          ) : (
            <>
              <Icons.Send className="size-4" aria-hidden />
              Wyślij wiadomość
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

export function ContactForm() {
  const form = useForm<ContactValues>({
    defaultValues: { name: "", email: "", company: "", message: "" },
  });
  return (
    <div className="p-6" style={{ width: 520 }}>
      <ContactFields form={form} />
    </div>
  );
}

export function ValidationErrors() {
  const form = useForm<ContactValues>({
    defaultValues: { name: "Anna Nowak", email: "anna@pracownia", message: "Strona dla firmy" },
  });
  useEffect(() => {
    form.setError("email", { type: "pattern", message: "Nieprawidłowy adres e-mail" });
    form.setError("message", {
      type: "minLength",
      message: "Min. 20 znaków — opisz krótko, czego dotyczy kontakt",
    });
  }, [form]);
  return (
    <div className="p-6" style={{ width: 520 }}>
      <ContactFields form={form} />
    </div>
  );
}

export function Submitting() {
  const form = useForm<ContactValues>({
    defaultValues: {
      name: "Anna Nowak",
      email: "anna@pracownia-nowak.pl",
      message:
        "Dzień dobry, jestem zainteresowany pakietem Full. Proszę o kontakt w sprawie szczegółów i wyceny.",
    },
  });
  return (
    <div className="p-6" style={{ width: 520 }}>
      <ContactFields form={form} submitting />
    </div>
  );
}

export function OptionalFieldsWithDescription() {
  const form = useForm<ContactValues>({
    defaultValues: { company: "Pracownia Nowak", source: "referral" },
  });
  return (
    <div className="p-6" style={{ width: 520 }}>
      <Form {...form}>
        <form className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firma{optional}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nazwa firmy" className="h-11" />
                </FormControl>
                <FormDescription>Pomaga mi przygotować się do pierwszej rozmowy.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skąd o mnie wiesz?{optional}</FormLabel>
                <FormControl>
                  <Select
                    items={SOURCES}
                    value={field.value ?? ""}
                    onValueChange={(value) => field.onChange(value === "" ? undefined : value)}
                  >
                    <SelectTrigger aria-label="Skąd o mnie wiesz?" className="h-11 w-full justify-between">
                      <SelectValue placeholder="Wybierz (opcjonalnie)" />
                    </SelectTrigger>
                    <SelectContent>
                      {SOURCES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
