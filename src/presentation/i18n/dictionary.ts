/**
 * The interface's own words in one locale: headings, labels and messages
 * around the portfolio's content. Plain strings only, so client components can
 * take them as props; `{name}` marks a value filled in with `format`.
 */
export type Dictionary = {
  /** The language's name in itself, for the link that switches to it. */
  language: string;
  /** Spells out what the language link does, in the language it leads to. */
  switchLanguage: string;
  skipToContent: string;
  emailMe: string;
  availability: string;
  nav: { home: string; sections: string; github: string; linkedin: string };
  hero: { downloadCv: string; seeWork: string };
  keyboard: {
    /** The Enter key's legend and what it does: it emails the owner. */
    enter: string;
    space: string;
    hint: { type: string; or: string; jump: string };
    jumped: string;
  };
  meet: {
    title: string;
    portrait: string;
    experience: string;
    basedIn: string;
    english: string;
    linkedin: string;
    github: string;
  };
  hood: { title: string; lead: string; topSkills: string };
  code: CodeWindowText;
  work: {
    title: string;
    lead: string;
    credits: { role: string; stack: string; year: string; stage: string; client: string };
    story: { problem: string; solution: string; result: string };
    integrations: { title: string; lead: string };
  };
  screenshot: ScreenWindowText;
  process: { title: string; lead: string };
  experience: { title: string; lead: string; education: string; english: string; present: string };
  contact: {
    title: string;
    email: string;
    copy: CopyEmailText;
    whatsappLabel: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    cv: string;
  };
  footer: { portfolio: string; products: string; contact: string; email: string; cv: string; credits: string };
  backToTop: string;
};

export type CodeWindowText = {
  window: string;
  run: string;
  comment: string;
  specComment: string;
  /** What the console prints for each step of `hire`. */
  output: { write: string; connect: string; build: string; review: string; ship: string };
};

export type ScreenWindowText = { expandLabel: string; expand: string; close: string };

export type CopyEmailText = { idle: string; copied: string; failed: string };

/** The template with each `{name}` replaced by its value. */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) => values[name] ?? placeholder);
}
