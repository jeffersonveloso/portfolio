import type { Contact } from "@/domain/portfolio/contact";
import type { Image } from "@/domain/portfolio/media";

export type Language = {
  readonly name: string;
  readonly level: string;
  /** BCP 47 tag. */
  readonly code: string;
};

/** The person the portfolio presents. */
export type Profile = {
  readonly name: string;
  readonly role: string;
  /** Search and share-card description. */
  readonly description: string;
  /** The hero's paragraph. */
  readonly summary: string;
  /** One line on what the owner does, under "Meet". */
  readonly tagline: string;
  readonly bio: string;
  readonly availability: string;
  readonly facts: {
    readonly experience: string;
    readonly basedIn: string;
    readonly english: string;
  };
  readonly location: {
    readonly region: string;
    readonly country: string;
    /** ISO 3166-1 alpha-2. */
    readonly countryCode: string;
    readonly timezone: string;
  };
  readonly languages: readonly Language[];
  readonly photo: Image;
  readonly contact: Contact;
};

export function formatLanguage({ name, level }: Language): string {
  return `${name} ${level}`;
}
