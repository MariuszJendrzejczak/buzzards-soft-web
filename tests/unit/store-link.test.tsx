import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StoreLink } from "@/components/portfolio/store-link";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

const GOOGLE_URL = "https://play.google.com/store/apps/details?id=com.example.app";
const APPLE_URL = "https://apps.apple.com/app/id123456";
const EXTERNAL = { label: "gen.edu.pl", url: "https://gen.edu.pl/" };

describe("<StoreLink>", () => {
  it("renders the Google Play icon link when googleLink is set", () => {
    renderWithIntl(<StoreLink googleLink={GOOGLE_URL} />);
    const link = screen.getByLabelText(enMessages.portfolio.storeLink.googlePlay);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", GOOGLE_URL);
  });

  it("renders the App Store icon link when appleLink is set", () => {
    renderWithIntl(<StoreLink appleLink={APPLE_URL} />);
    const link = screen.getByLabelText(enMessages.portfolio.storeLink.appStore);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", APPLE_URL);
  });

  it("renders only the external link when only external prop is set", () => {
    renderWithIntl(<StoreLink external={EXTERNAL} />);
    const link = screen.getByLabelText(EXTERNAL.label);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", EXTERNAL.url);
    expect(screen.queryByLabelText(enMessages.portfolio.storeLink.googlePlay)).toBeNull();
    expect(screen.queryByLabelText(enMessages.portfolio.storeLink.appStore)).toBeNull();
  });

  it("renders Google + Apple icons together when both links are passed (no external)", () => {
    renderWithIntl(<StoreLink googleLink={GOOGLE_URL} appleLink={APPLE_URL} />);
    expect(screen.getByLabelText(enMessages.portfolio.storeLink.googlePlay)).toBeInTheDocument();
    expect(screen.getByLabelText(enMessages.portfolio.storeLink.appStore)).toBeInTheDocument();
    expect(screen.queryByLabelText(EXTERNAL.label)).toBeNull();
  });

  it("renders nothing when no link prop is supplied", () => {
    const { container } = renderWithIntl(<StoreLink />);
    expect(container.firstChild).toBeNull();
  });

  it("every outbound link opens in a new tab with rel='noopener noreferrer'", () => {
    renderWithIntl(
      <StoreLink googleLink={GOOGLE_URL} appleLink={APPLE_URL} external={EXTERNAL} />,
    );
    const allLinks: HTMLAnchorElement[] = [
      screen.getByLabelText(enMessages.portfolio.storeLink.googlePlay) as HTMLAnchorElement,
      screen.getByLabelText(enMessages.portfolio.storeLink.appStore) as HTMLAnchorElement,
      screen.getByLabelText(EXTERNAL.label) as HTMLAnchorElement,
    ];
    for (const link of allLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("every icon-only link has an aria-label set", () => {
    renderWithIntl(
      <StoreLink googleLink={GOOGLE_URL} appleLink={APPLE_URL} external={EXTERNAL} />,
    );
    const anchors = screen.getAllByRole("link");
    expect(anchors).toHaveLength(3);
    for (const a of anchors) {
      const label = a.getAttribute("aria-label");
      expect(label).toBeTruthy();
      expect(label?.length).toBeGreaterThan(0);
    }
  });

  it("merges a user-supplied className on the outer wrapper", () => {
    const { container } = renderWithIntl(
      <StoreLink googleLink={GOOGLE_URL} className="wrapper-test-class" />,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("wrapper-test-class");
  });
});
