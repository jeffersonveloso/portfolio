import { useEffect, useRef, type RefObject } from "react";

/**
 * A live flag for whether `target` is at least `threshold` in view. It is a
 * ref, not state, so reading it in an event handler never re-renders.
 */
export function useInViewFlag(target: RefObject<Element | null>, threshold: number): RefObject<boolean> {
  const inView = useRef(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => (inView.current = entry.isIntersecting), { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, threshold]);

  return inView;
}
