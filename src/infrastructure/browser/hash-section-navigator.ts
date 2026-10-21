import type { SectionNavigator } from "@/application/ports/section-navigator";
import { sectionHref, type Section } from "@/domain/portfolio/section";

/**
 * Navigates with the page's own anchors, so moves use its smooth scrolling
 * and scroll padding and the back button can retrace them.
 */
export class HashSectionNavigator implements SectionNavigator {
  goTo(section: Section): void {
    const href = sectionHref(section);
    const target = document.querySelector(href);
    if (!target) return;
    if (window.location.hash === href) target.scrollIntoView();
    else window.location.hash = href;
  }

  // The very top, above both nav bars, without leaving a section anchor in
  // the address.
  goToTop(): void {
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  }
}
