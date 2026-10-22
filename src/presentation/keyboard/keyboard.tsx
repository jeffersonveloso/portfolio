"use client";

import { useRef, type CSSProperties } from "react";
import type { SectionMatch, TypedEntry } from "@/domain/navigation/typed-entry";
import type { Section } from "@/domain/portfolio/section";
import type { Dictionary } from "@/presentation/i18n/dictionary";
import { JumpHint } from "@/presentation/keyboard/jump-hint";
import { BOARD_ROWS, BOARD_UNITS, boardKeys, type KeySpec } from "@/presentation/keyboard/layout";
import { useInViewFlag } from "@/presentation/keyboard/use-in-view-flag";
import { useKeyPresses } from "@/presentation/keyboard/use-key-presses";
import { useTypedNavigation } from "@/presentation/keyboard/use-typed-navigation";

type KeyboardProps = {
  /** Text the board types on first paint. */
  intro: string;
  /** Where the Enter key goes. */
  enterHref: string;
  /** Sections a visitor can jump to by typing their name on the board. */
  sections: readonly Section[];
  text: Dictionary["keyboard"];
  className?: string;
  style?: CSSProperties;
};

function keyStyle(key: KeySpec) {
  return { "--x": key.x, "--y": key.y, "--w": key.w ?? 1 } as CSSProperties;
}

// While the visitor types, the space bar doubles as the board's display: it
// echoes the entry with a caret, and the end that spells a section is blue.
function SpaceBarEcho({ entry, match }: { entry: TypedEntry; match: SectionMatch | null }) {
  const matched = match ? entry.text.slice(-match.typed.length) : "";
  return (
    <span className="key-legend" data-align="center">
      <span className="key-echo">
        {entry.text.slice(0, entry.text.length - matched.length)}
        <span className="text-action">{matched}</span>
        <span className="key-caret" />
      </span>
    </span>
  );
}

// The hero's product render: a 65% board whose keys follow the visitor's own
// keyboard, and whose typing can move the page to a section.
export function Keyboard({ intro, enterHref, sections, text, className = "", style }: KeyboardProps) {
  const plate = useRef<HTMLDivElement>(null);
  useKeyPresses(plate, intro);
  const inView = useInViewFlag(plate, 0.25);
  const { entry, match, announcement } = useTypedNavigation(sections, inView, text.jumped);

  return (
    <>
      <div className={`kb ${className}`} style={style}>
        <div ref={plate} className="kb-plate" style={{ "--units": BOARD_UNITS, "--rows": BOARD_ROWS } as CSSProperties}>
          {boardKeys.map((key) => {
            if (key.code === "Enter") {
              return (
                <a
                  key={key.code}
                  href={enterHref}
                  className="key"
                  data-code={key.code}
                  data-tone={key.tone}
                  style={keyStyle(key)}
                  aria-label={text.enter}
                >
                  <span className="key-cap">
                    <span className="key-legend">
                      <span className="md:hidden">↵</span>
                      <span className="max-md:hidden">{text.enter}</span>
                    </span>
                  </span>
                </a>
              );
            }
            const legend =
              key.code === "Space" && !entry.isEmpty ? (
                <SpaceBarEcho entry={entry} match={match} />
              ) : (
                <span className="key-legend" data-align={key.center ? "center" : undefined}>
                  {key.code === "Space" ? text.space : key.label}
                </span>
              );
            return (
              <span
                key={key.code}
                aria-hidden="true"
                className="key"
                data-code={key.code}
                data-tone={key.tone === "alpha" ? undefined : key.tone}
                style={keyStyle(key)}
              >
                <span className="key-cap">{legend}</span>
              </span>
            );
          })}
        </div>
      </div>
      <JumpHint sections={sections} match={match} text={text.hint} />
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </>
  );
}
