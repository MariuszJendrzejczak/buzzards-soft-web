import { cleanup, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// sonner's toast is a runtime side-effect module; the form imports it at load.
// Stub it so the client component mounts in jsdom without a real toaster.
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import enMessages from "@/messages/en.json";

import { ContactForm } from "@/components/sections/contact/contact-form";
import { renderWithIntl } from "./test-utils";

// Oracle for the default placeholder is the pre-existing `contactForm` i18n copy
// (independent of this slice); oracle for the offer variant is offer-page.md §11.
const homeMessagePlaceholder = enMessages.contactForm.placeholders.message;
const OFFER_INTRO = "Tell me in a couple of sentences what you need.";
const OFFER_PLACEHOLDER = "what business/service you have and what you need";

afterEach(() => {
  cleanup();
});

describe("<ContactForm> — home (default, no props)", () => {
  it("uses the contactForm message placeholder", () => {
    renderWithIntl(<ContactForm />);
    const textarea = screen.getByPlaceholderText(homeMessagePlaceholder);
    expect(textarea).not.toBeNull();
  });

  it("renders no offer intro paragraph", () => {
    renderWithIntl(<ContactForm />);
    expect(screen.queryByText(OFFER_INTRO)).toBeNull();
  });
});

describe("<ContactForm> — offer variant (props set)", () => {
  it("shows the offer intro above the form", () => {
    renderWithIntl(
      <ContactForm intro={OFFER_INTRO} messagePlaceholder={OFFER_PLACEHOLDER} />,
    );
    expect(screen.getByText(OFFER_INTRO)).not.toBeNull();
  });

  it("overrides the message-field placeholder with the offer placeholder", () => {
    renderWithIntl(
      <ContactForm intro={OFFER_INTRO} messagePlaceholder={OFFER_PLACEHOLDER} />,
    );
    expect(screen.getByPlaceholderText(OFFER_PLACEHOLDER)).not.toBeNull();
    // and the default home placeholder is no longer present
    expect(screen.queryByPlaceholderText(homeMessagePlaceholder)).toBeNull();
  });
});
