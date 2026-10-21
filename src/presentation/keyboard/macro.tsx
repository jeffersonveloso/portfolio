"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { glow } from "@/presentation/keyboard/layout";

const KEY_W = 1.5;

// The spec-driven route as a six-key macro: when it scrolls into view the
// keys fire in order, each lighting in the next stripe colour.
export function Macro({ labels }: { labels: string[] }) {
  const plate = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = plate.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const keys = Array.from(el.querySelectorAll<HTMLElement>(".key"));
    const timers: number[] = [];
    const fire = () =>
      keys.forEach((key, i) => {
        const { lit, legend } = glow[i % glow.length];
        timers.push(
          window.setTimeout(
            () => {
              key.style.setProperty("--lit", lit);
              key.style.setProperty("--lit-legend", legend);
              key.setAttribute("data-down", "");
              key.setAttribute("data-lit", "");
            },
            300 + i * 260,
          ),
          window.setTimeout(() => key.removeAttribute("data-down"), 420 + i * 260),
          window.setTimeout(() => key.removeAttribute("data-lit"), 700 + i * 260),
        );
      });
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
    };
  }, []);

  return (
    <div aria-hidden="true" className="kb kb-macro">
      <div ref={plate} className="kb-plate" style={{ "--units": labels.length * KEY_W, "--rows": 1 } as CSSProperties}>
        {labels.map((label, i) => (
          <span
            key={label}
            className="key"
            data-tone={i === labels.length - 1 ? "green" : undefined}
            style={{ "--x": i * KEY_W, "--y": 0, "--w": KEY_W } as CSSProperties}
          >
            <span className="key-cap">
              <span className="key-legend" data-align="center">
                {label}
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
