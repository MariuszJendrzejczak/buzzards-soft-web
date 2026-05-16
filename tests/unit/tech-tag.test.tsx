import { describe, expect, it } from "vitest";

import { TechTag } from "@/components/portfolio/tech-tag";

import { renderWithIntl } from "./test-utils";

describe("<TechTag>", () => {
  it("renders the children verbatim", () => {
    const { container } = renderWithIntl(<TechTag>Dart</TechTag>);
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span?.textContent).toBe("Dart");
  });

  it("renders as a <span> (inline element, safe inside <li>/<p>)", () => {
    const { container } = renderWithIntl(<TechTag>Riverpod</TechTag>);
    expect(container.firstElementChild?.tagName).toBe("SPAN");
  });

  it("applies the default (non-muted) tone classes", () => {
    const { container } = renderWithIntl(<TechTag>Firebase</TechTag>);
    const span = container.querySelector("span");
    expect(span?.className).toContain("border-border");
    expect(span?.className).toContain("bg-surface/60");
    expect(span?.className).toContain("text-muted-foreground");
    // muted-tone classes must NOT leak into the default variant.
    expect(span?.className).not.toContain("text-text-subtle");
  });

  it("applies the muted tone classes when `muted` is true", () => {
    const { container } = renderWithIntl(
      <TechTag muted>Unity (legacy)</TechTag>,
    );
    const span = container.querySelector("span");
    expect(span?.className).toContain("border-border/60");
    expect(span?.className).toContain("bg-surface/30");
    expect(span?.className).toContain("text-text-subtle");
    // default-tone class must NOT appear in the muted variant.
    expect(span?.className).not.toContain("text-muted-foreground");
  });

  it("merges a user-supplied className", () => {
    const { container } = renderWithIntl(
      <TechTag className="custom-tag-class">REST API</TechTag>,
    );
    const span = container.querySelector("span");
    expect(span?.className).toContain("custom-tag-class");
  });

  it("keeps the shared base layout classes (rounded-md, font-mono, whitespace-nowrap)", () => {
    const { container } = renderWithIntl(<TechTag>Clean Architecture</TechTag>);
    const span = container.querySelector("span");
    expect(span?.className).toContain("rounded-md");
    expect(span?.className).toContain("font-mono");
    expect(span?.className).toContain("whitespace-nowrap");
  });

  it("accepts a ReactNode (not only string) as children", () => {
    const { container } = renderWithIntl(
      <TechTag>
        <em data-testid="nested">Dart</em>
      </TechTag>,
    );
    expect(container.querySelector("[data-testid='nested']")).not.toBeNull();
  });
});
