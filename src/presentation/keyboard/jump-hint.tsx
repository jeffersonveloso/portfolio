import type { SectionMatch } from "@/domain/navigation/typed-entry";
import type { Section } from "@/domain/portfolio/section";
import { type } from "@/presentation/ui";

/**
 * The line under the board: the names a visitor can type, with the letters
 * typed so far in blue, and the whole name blue once it is complete.
 */
export function JumpHint({ sections, match }: { sections: readonly Section[]; match: SectionMatch | null }) {
  return (
    <p className={`${type.caption} mt-6 hidden text-secondary md:block`}>
      Type{" "}
      {sections.map((section, i) => {
        const name = section.label.toLowerCase();
        const typed = match?.section.id === section.id ? match.typed : "";
        return (
          <span key={section.id}>
            {i === 0 ? "" : i === sections.length - 1 ? " or " : ", "}
            <span className={`font-semibold ${match?.complete && typed ? "text-action" : "text-graphite"}`}>
              <span className="text-action">{typed}</span>
              {name.slice(typed.length)}
            </span>
          </span>
        );
      })}{" "}
      to jump there. The return key emails me.
    </p>
  );
}
