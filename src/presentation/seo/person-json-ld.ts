import type { Profile } from "@/domain/portfolio/profile";

/** schema.org Person data for search engines. */
export function personJsonLd(profile: Profile, siteUrl: string) {
  const { contact, location } = profile;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${contact.email}`,
    url: siteUrl,
    image: new URL(profile.photo.src, siteUrl).toString(),
    sameAs: [contact.linkedin, contact.github],
    address: { "@type": "PostalAddress", addressRegion: location.region, addressCountry: location.countryCode },
    knowsLanguage: profile.languages.map((language) => language.code),
  };
}
