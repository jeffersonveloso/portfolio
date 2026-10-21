import Image from "next/image";
import type { Profile } from "@/domain/portfolio/profile";
import { section, textLinkOnDark, tile, type } from "@/presentation/ui";

export function Meet({ profile }: { profile: Profile }) {
  const firstName = profile.name.split(" ")[0];
  const facts = [
    ["Experience", profile.facts.experience],
    ["Based in", profile.facts.basedIn],
    ["English", profile.facts.english],
  ];
  return (
    <section id="about" aria-labelledby="meet-title" className={`${tile.dark} ${section}`}>
      <div className="mx-auto grid max-w-[980px] items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
        <Image
          src={profile.photo.src}
          width={profile.photo.width}
          height={profile.photo.height}
          alt={`Portrait of ${profile.name}`}
          sizes="(min-width: 48rem) 22rem, 70vw"
          className="mx-auto aspect-[4/5] w-full max-w-[18rem] rounded-[18px] object-cover md:max-w-[22rem]"
        />
        <div>
          <h2 id="meet-title" className={type.displayLg}>
            {`Meet ${firstName}.`}
          </h2>
          <p className={`${type.lead} mt-3 text-mist`}>{profile.tagline}</p>
          <p className="mt-6 max-w-[60ch] text-mist">{profile.bio}</p>
          <dl className="mt-8 grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-3">
            {facts.map(([term, value]) => (
              <div key={term}>
                <dt className={`${type.caption} text-mist`}>{term}</dt>
                <dd className={`${type.bodyStrong} mt-1`}>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className={textLinkOnDark}>
              View my LinkedIn profile ›
            </a>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" className={textLinkOnDark}>
              See my code on GitHub ›
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
