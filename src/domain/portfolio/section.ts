/** A part of the page a visitor can navigate to. */
export type Section = {
  /** The anchor the section is rendered with. */
  readonly id: string;
  readonly label: string;
};

export function sectionHref(section: Section): string {
  return `#${section.id}`;
}
