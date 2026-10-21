import type { Section } from "@/domain/portfolio/section";

/** Moves the visitor around the page. */
export interface SectionNavigator {
  goTo(section: Section): void;
  goToTop(): void;
}
