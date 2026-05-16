import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RoleBadge } from "@/components/portfolio/role-badge";
import enMessages from "@/messages/en.json";

import { renderWithIntl } from "./test-utils";

describe("<RoleBadge>", () => {
  it("renders the 'od-zera' label and emerald variant classes", () => {
    const { container } = renderWithIntl(<RoleBadge role="od-zera" />);
    const badge = container.querySelector("[data-role='od-zera']") as HTMLElement | null;
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe(enMessages.portfolio.role["od-zera"]);
    expect(badge?.className).toContain("emerald");
    expect(badge?.className).not.toContain("gray");
  });

  it("renders the 'rozwoj-i-serwis' label and gray variant classes", () => {
    const { container } = renderWithIntl(<RoleBadge role="rozwoj-i-serwis" />);
    const badge = container.querySelector("[data-role='rozwoj-i-serwis']") as HTMLElement | null;
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe(enMessages.portfolio.role["rozwoj-i-serwis"]);
    expect(badge?.className).toContain("gray");
    expect(badge?.className).not.toContain("emerald");
  });

  it("merges a user-supplied className", () => {
    renderWithIntl(<RoleBadge role="od-zera" className="custom-test-class" />);
    const badge = screen.getByText(enMessages.portfolio.role["od-zera"]);
    expect(badge.className).toContain("custom-test-class");
  });
});
