import type { Screenshot } from "@/domain/portfolio/media";
import type { Period } from "@/domain/portfolio/period";

/** A product's own colour, used for its keyset. */
export type ProductAccent = "green" | "purple" | "yellow" | "orange";

/** A product the owner built. */
export type Project = {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly body: string;
  readonly role: string;
  readonly stack: readonly string[];
  /** Omitted until the owner confirms when it started. */
  readonly period?: Period;
  readonly stage: string;
  readonly link?: { readonly href: string; readonly label: string; readonly note?: string };
  /** Five features that name the product. */
  readonly highlights: readonly string[];
  readonly accent: ProductAccent;
};

/** Client work told as problem, build and result. */
export type CaseStudy = {
  readonly slug: string;
  readonly name: string;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly result: string;
  readonly role: string;
  readonly client: string;
  readonly stack: readonly string[];
  readonly stage: string;
  /** Features in two groups of three, one group per kitchen. */
  readonly highlights: readonly [readonly string[], readonly string[]];
  readonly accent: ProductAccent;
  readonly screenshots: readonly [Screenshot, Screenshot];
  readonly screenshotsCaption: string;
};

/** Integration work done for a client, or a small product of the owner's. */
export type Engagement = {
  readonly name: string;
  readonly body: string;
  readonly role: string;
};
