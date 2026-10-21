import { useEffect, type RefObject } from "react";
import { codeFor, glow } from "@/presentation/keyboard/layout";

const PRESS_MS = 110;
const STEP_MS = 125;
const LIT_MS = 180;

/**
 * Drives the board's keys. It types `intro` once and the keys it used stay
 * lit in the stripe colours, like a custom keyset spelling the name. After
 * that it presses whatever the visitor types on their own keyboard. Keys are
 * only drawn: no key is blocked.
 */
export function useKeyPresses(plate: RefObject<HTMLElement | null>, intro: string): void {
  useEffect(() => {
    const root = plate.current;
    if (!root) return;
    const keys = new Map<string, HTMLElement>();
    root.querySelectorAll<HTMLElement>("[data-code]").forEach((el) => keys.set(el.dataset.code!, el));
    const timers = new Set<number>();
    let hue = 0;

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const press = (code: string, keep = false) => {
      const key = keys.get(code);
      if (!key) return;
      key.setAttribute("data-down", "");
      later(() => key.removeAttribute("data-down"), PRESS_MS);
      // Keys of the name keep their colour; any other key glows and cools.
      if (key.hasAttribute("data-keep")) return;
      if (code !== "Space") {
        const { lit, legend } = glow[hue++ % glow.length];
        key.style.setProperty("--lit", lit);
        key.style.setProperty("--lit-legend", legend);
        key.setAttribute("data-lit", "");
      }
      if (keep && code !== "Space") key.setAttribute("data-keep", "");
      else later(() => key.removeAttribute("data-lit"), LIT_MS);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    intro.split("").forEach((char, i) => {
      // Without motion the name's keys light at once, still and complete.
      if (reduceMotion) press(codeFor(char), true);
      else later(() => press(codeFor(char), true), 700 + i * STEP_MS);
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.repeat) press(event.code);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [plate, intro]);
}
