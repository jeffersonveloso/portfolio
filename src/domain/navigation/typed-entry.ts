import type { Section } from "@/domain/portfolio/section";

/** How many of the last characters an entry keeps. */
export const ENTRY_LIMIT = 24;

export type SectionMatch = {
  readonly section: Section;
  /** The end of the entry, spelling the start of the section's name. */
  readonly typed: string;
  readonly complete: boolean;
};

/**
 * What a visitor has typed on the hero keyboard, as an immutable value.
 * Keys edit it the way a text field would, and matching finds the section
 * whose name the end of the entry is spelling.
 */
export class TypedEntry {
  static readonly empty = new TypedEntry("");

  readonly text: string;

  private constructor(text: string) {
    this.text = text;
  }

  get isEmpty(): boolean {
    return this.text === "";
  }

  /** The entry after a key, named as `KeyboardEvent.key` names it. */
  press(key: string): TypedEntry {
    if (key === "Backspace") return TypedEntry.of(this.text.slice(0, -1));
    // Esc and the space bar clear the entry; other non-printing keys leave it.
    if (key === "Escape" || key === " ") return TypedEntry.empty;
    if (key.length !== 1) return this;
    return TypedEntry.of((this.text + key).slice(-ENTRY_LIMIT));
  }

  /**
   * The section the end of the entry is spelling: the longest run of final
   * characters that starts a section's name. A typo stays in the entry to be
   * fixed, while the letters typed after it can still match.
   */
  match(sections: readonly Section[]): SectionMatch | null {
    const names = sections.map((section) => ({ section, name: section.label.toLowerCase() }));
    for (let run = this.text.toLowerCase(); run; run = run.slice(1)) {
      const hit = names.find(({ name }) => name.startsWith(run));
      if (hit) return { section: hit.section, typed: run, complete: run === hit.name };
    }
    return null;
  }

  private static of(text: string): TypedEntry {
    return text ? new TypedEntry(text) : TypedEntry.empty;
  }
}
