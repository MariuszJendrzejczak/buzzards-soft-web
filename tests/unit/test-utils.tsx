import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactElement, ReactNode } from "react";

import enMessages from "@/messages/en.json";

type Messages = typeof enMessages;

type ProviderProps = {
  children: ReactNode;
  locale?: string;
  messages?: Messages;
};

export function TestProviders({
  children,
  locale = "en",
  messages = enMessages,
}: ProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export function renderWithIntl(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    locale?: string;
    messages?: Messages;
  },
): RenderResult {
  const { locale, messages, ...rest } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders locale={locale} messages={messages}>
        {children}
      </TestProviders>
    ),
    ...rest,
  });
}
