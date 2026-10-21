"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { ProductAccent } from "@/domain/portfolio/work";
import { glow } from "@/presentation/keyboard/layout";

// Each half is 2.75 units wide: two keys over one wide key. The halves
// mirror each other, so the coloured keys sit on the outside edges.
const HALVES = [
  [
    { x: 0, y: 0, w: 1.5, toned: true },
    { x: 1.5, y: 0, w: 1.25, toned: false },
    { x: 0, y: 1, w: 2.75, toned: true },
  ],
  [
    { x: 0, y: 0, w: 1.25, toned: false },
    { x: 1.25, y: 0, w: 1.5, toned: true },
    { x: 0, y: 1, w: 2.75, toned: true },
  ],
];

// The left half's seam key ("Split") is the one that fires.
const SPLIT_KEY = 1;

// The case study's render: a split keyboard, one half per kitchen. When it
// scrolls into view the seam key presses and the two halves pull apart, the
// way each order is split between the kitchens.
export function SplitKeyset({
  halves,
  tone,
}: {
  halves: readonly [readonly string[], readonly string[]];
  tone: ProductAccent;
}) {
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = board.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const key = el.querySelectorAll<HTMLElement>(".key")[SPLIT_KEY];
    const { lit, legend } = glow[2];
    const timers: number[] = [];
    el.setAttribute("data-joined", "");
    const fire = () => {
      key.style.setProperty("--lit", lit);
      key.style.setProperty("--lit-legend", legend);
      timers.push(
        window.setTimeout(() => {
          key.setAttribute("data-down", "");
          key.setAttribute("data-lit", "");
        }, 300),
        window.setTimeout(() => key.removeAttribute("data-down"), 420),
        window.setTimeout(() => el.removeAttribute("data-joined"), 460),
        window.setTimeout(() => key.removeAttribute("data-lit"), 900),
      );
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fire();
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
      el.removeAttribute("data-joined");
    };
  }, []);

  return (
    <div ref={board} aria-hidden="true" className="kb-split">
      {HALVES.map((slots, h) => (
        <div key={h} className="kb">
          <div className="kb-plate" style={{ "--units": 2.75, "--rows": 2 } as CSSProperties}>
            {slots.map((slot, i) => (
              <span
                key={halves[h][i]}
                className="key"
                data-tone={slot.toned ? tone : undefined}
                style={{ "--x": slot.x, "--y": slot.y, "--w": slot.w } as CSSProperties}
              >
                <span className="key-cap">
                  <span className="key-legend" data-align="center">
                    {halves[h][i]}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
