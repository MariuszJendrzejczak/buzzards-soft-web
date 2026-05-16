import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StackChip } from "@/components/portfolio/stack-chip";

import { renderWithIntl } from "./test-utils";

describe("<StackChip>", () => {
  it("renders 'Flutter' with the blue variant classes", () => {
    const { container } = renderWithIntl(<StackChip stack="Flutter" />);
    const chip = container.querySelector("[data-stack='Flutter']") as HTMLElement | null;
    expect(chip).not.toBeNull();
    expect(chip?.textContent).toBe("Flutter");
    expect(chip?.className).toContain("blue");
    expect(chip?.className).not.toContain("purple");
  });

  it("renders 'Unity' with the purple variant classes", () => {
    const { container } = renderWithIntl(<StackChip stack="Unity" />);
    const chip = container.querySelector("[data-stack='Unity']") as HTMLElement | null;
    expect(chip).not.toBeNull();
    expect(chip?.textContent).toBe("Unity");
    expect(chip?.className).toContain("purple");
    expect(chip?.className).not.toContain("blue");
  });

  it("merges a user-supplied className", () => {
    renderWithIntl(<StackChip stack="Flutter" className="extra-chip-class" />);
    const chip = screen.getByText("Flutter");
    expect(chip.className).toContain("extra-chip-class");
  });
});
