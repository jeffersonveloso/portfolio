import type { CSSProperties } from "react";
import type { ProductAccent } from "@/domain/portfolio/work";

// Where each of the five keys sits in a keyset, in key units.
const SLOTS = [
  { x: 0, y: 0, w: 1.25 },
  { x: 1.25, y: 0, w: 1 },
  { x: 2.25, y: 0, w: 1 },
  { x: 0, y: 1, w: 1.5 },
  { x: 1.5, y: 1, w: 1.75 },
];

// A project's keyset: its features printed on keycaps in the product's own
// colour, alternating with white alphas. A product render, so decorative.
export function Keyset({
  legends,
  tone,
  className = "",
}: {
  legends: readonly string[];
  tone: ProductAccent;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`kb ${className}`}>
      <div className="kb-plate" style={{ "--units": 3.25, "--rows": 2 } as CSSProperties}>
        {legends.slice(0, SLOTS.length).map((legend, i) => {
          const slot = SLOTS[i];
          return (
            <span
              key={legend}
              className="key"
              data-tone={i % 2 === 0 ? tone : undefined}
              style={{ "--x": slot.x, "--y": slot.y, "--w": slot.w } as CSSProperties}
            >
              <span className="key-cap">
                <span className="key-legend" data-align="center">
                  {legend}
                </span>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
