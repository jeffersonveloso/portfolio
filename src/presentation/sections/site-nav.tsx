import { format, type Dictionary } from "@/presentation/i18n/dictionary";
import { GitHub, LinkedIn } from "@/presentation/icons";
import { LanguageLinks } from "@/presentation/language-links";
import { button, type } from "@/presentation/ui";
import type { Locale } from "@/domain/i18n/locale";
import type { Profile } from "@/domain/portfolio/profile";
import { sectionHref, type Section } from "@/domain/portfolio/section";

type GlobalNavProps = {
  profile: Profile;
  sections: readonly Section[];
  locale: Locale;
  text: Dictionary["nav"];
};

// Global nav: the thin black bar that scrolls away.
export function GlobalNav({ profile, sections, locale, text }: GlobalNavProps) {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex h-11 max-w-[980px] items-center justify-between px-5">
        <a href="#top" aria-label={format(text.home, { name: profile.name })} className="opacity-90 hover:opacity-100">
          <svg viewBox="0 0 100 100" width="22" height="22" aria-hidden="true">
            <rect x="4" y="4" width="92" height="92" rx="22" fill="#3a3a3c" />
            <rect x="16" y="10" width="68" height="64" rx="15" fill="#4a4a4d" />
            <path
              d="M60 26v24c0 9-6 15-15 15s-14-5-15-12"
              fill="none"
              stroke="#fff"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </svg>
        </a>
        <nav aria-label={text.sections} className="hidden sm:block">
          <ul className="flex items-center gap-7">
            {sections.map((item) => (
              <li key={item.id}>
                <a href={sectionHref(item)} className={`${type.fine} opacity-80 hover:opacity-100`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-5">
          <LanguageLinks current={locale} className={`${type.fine} opacity-80 hover:opacity-100`} />
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            aria-label={text.github}
            className="opacity-80 hover:opacity-100"
          >
            <GitHub width={16} height={16} />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={text.linkedin}
            className="opacity-80 hover:opacity-100"
          >
            <LinkedIn width={16} height={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Sub-nav: frosted parchment, sticky, with the persistent primary action.
type SubNavProps = {
  name: string;
  mailto: string;
  text: Pick<Dictionary, "availability" | "emailMe">;
};

export function SubNav({ name, mailto, text }: SubNavProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-black/[0.08] bg-parchment/80 backdrop-blur-xl backdrop-saturate-[1.8]">
      <div className="mx-auto flex h-[52px] max-w-[980px] items-center justify-between gap-4 px-5">
        <p className={type.tagline}>{name}</p>
        <div className="flex items-center gap-5">
          <span className={`${type.caption} hidden text-graphite-80 md:inline`}>{text.availability}</span>
          <a href={mailto} className={`${button.primary} min-h-0 px-[15px] py-[7px] text-[14px]`}>
            {text.emailMe}
          </a>
        </div>
      </div>
    </div>
  );
}
