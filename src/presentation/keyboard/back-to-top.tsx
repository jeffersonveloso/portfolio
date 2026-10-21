"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowUp } from "@/presentation/icons";
import { useSectionNavigator } from "@/presentation/navigation/section-navigator-context";

// Back to top: a single graphite arrow key in its own case, floating at the
// bottom right once the hero has scrolled out of view. Without JavaScript it
// is a plain link to the hero.
export function BackToTop() {
  const navigator = useSectionNavigator();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Back to the very top, then start keyboard focus there (the nav's logo).
  const toTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigator.goToTop();
    document.querySelector<HTMLElement>('a[href="#top"]')?.focus({ preventScroll: true });
  };

  return (
    <a href="#top" onClick={toTop} aria-label="Back to top" data-shown={shown || undefined} className="kb kb-top">
      <span className="kb-plate block" style={{ "--units": 1, "--rows": 1 } as CSSProperties}>
        <span className="key" data-tone="mod" style={{ "--x": 0, "--y": 0, "--w": 1 } as CSSProperties}>
          <span className="key-cap">
            <span className="key-legend" data-align="center">
              <ArrowUp className="kb-top-arrow" strokeWidth="2.25" />
            </span>
          </span>
        </span>
      </span>
    </a>
  );
}
