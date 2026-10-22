import { useEffect, useState, type RefObject } from "react";
import { TypedEntry, type SectionMatch } from "@/domain/navigation/typed-entry";
import type { Section } from "@/domain/portfolio/section";
import { format } from "@/presentation/i18n/dictionary";
import { useSectionNavigator } from "@/presentation/navigation/section-navigator-context";

// The finished name stays on screen this long before the page moves.
const JUMP_MS = 450;
// An entry clears itself after this long without a key.
const IDLE_MS = 6000;

export type TypedNavigation = {
  entry: TypedEntry;
  match: SectionMatch | null;
  /** Last move, for a polite live region. */
  announcement: string;
};

/**
 * Turns typing into navigation. While `active` (the board is in view), keys
 * edit a TypedEntry, and finishing a section's name moves there and announces
 * it with `jumped` ("Jumped to {section}."). Keys with Cmd, Ctrl or Alt, and
 * typing inside a form field, never count.
 */
export function useTypedNavigation(
  sections: readonly Section[],
  active: RefObject<boolean>,
  jumped: string,
): TypedNavigation {
  const navigator = useSectionNavigator();
  const [entry, setEntry] = useState(TypedEntry.empty);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    let current = TypedEntry.empty;
    let idle = 0;
    const jumps = new Set<number>();

    const update = (next: TypedEntry) => {
      current = next;
      setEntry(next);
      window.clearTimeout(idle);
      if (!next.isEmpty) idle = window.setTimeout(() => update(TypedEntry.empty), IDLE_MS);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || !active.current || event.metaKey || event.ctrlKey || event.altKey) return;
      if ((event.target as HTMLElement | null)?.closest("input, textarea, select, [contenteditable]")) return;
      const next = current.press(event.key);
      if (next === current) return;
      update(next);
      const match = next.match(sections);
      if (!match?.complete) return;
      const id = window.setTimeout(() => {
        jumps.delete(id);
        navigator.goTo(match.section);
        setAnnouncement(format(jumped, { section: match.section.label }));
        update(TypedEntry.empty);
      }, JUMP_MS);
      jumps.add(id);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(idle);
      jumps.forEach((id) => window.clearTimeout(id));
    };
  }, [sections, active, navigator, jumped]);

  return { entry, match: entry.match(sections), announcement };
}
