import { Keyboard } from "@/presentation/keyboard/keyboard";
import type { Profile } from "@/domain/portfolio/profile";
import type { Section } from "@/domain/portfolio/section";
import { button, type } from "@/presentation/ui";

type HeroProps = {
  profile: Profile;
  sections: readonly Section[];
  mailto: string;
};

export function Hero({ profile, sections, mailto }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="overflow-hidden bg-canvas px-5 pt-14 pb-16 text-center sm:px-8 md:pt-16 md:pb-24"
    >
      <h1 id="hero-title" className={type.hero}>
        {profile.name}
      </h1>
      <p className={`${type.lead} mx-auto mt-2 max-w-[22ch] text-balance md:mt-3 md:max-w-none`}>{profile.role}.</p>
      <p className="mx-auto mt-4 max-w-[46ch] text-graphite-80">{profile.summary}</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
        <a href={mailto} className={button.primary}>
          Email me
        </a>
        <a href="#work" className={button.ghost}>
          See the work
        </a>
      </div>

      <div className="mt-12 flex flex-col items-center md:mt-16">
        <Keyboard intro={profile.name.toUpperCase()} enterHref={mailto} sections={sections} className="kb-hero" />
      </div>
    </section>
  );
}
