import type { ContactLinks } from "@/application/get-portfolio-page";
import type { Locale } from "@/domain/i18n/locale";
import type { Profile } from "@/domain/portfolio/profile";
import { sectionHref, type Section } from "@/domain/portfolio/section";
import type { Project } from "@/domain/portfolio/work";
import { format, type Dictionary } from "@/presentation/i18n/dictionary";
import { LanguageLinks } from "@/presentation/language-links";
import { type } from "@/presentation/ui";

const link = "text-graphite-80 hover:underline";

type SiteFooterProps = {
  profile: Profile;
  sections: readonly Section[];
  projects: readonly Project[];
  links: ContactLinks;
  locale: Locale;
  text: Dictionary["footer"];
};

export function SiteFooter({ profile, sections, projects, links, locale, text }: SiteFooterProps) {
  const { contact } = profile;
  return (
    <footer className="bg-parchment px-5 py-16 text-graphite-80 sm:px-8">
      <div className="mx-auto max-w-[980px]">
        <div className="grid gap-8 border-b border-hairline pb-8 sm:grid-cols-3">
          <div>
            <h2 className={`${type.captionStrong} text-graphite`}>{text.portfolio}</h2>
            <ul className="mt-2 text-[14px] leading-[2.2]">
              {sections.map((item) => (
                <li key={item.id}>
                  <a href={sectionHref(item)} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={`${type.captionStrong} text-graphite`}>{text.products}</h2>
            <ul className="mt-2 text-[14px] leading-[2.2]">
              {projects.map((project) =>
                project.link ? (
                  <li key={project.slug}>
                    <a href={project.link.href} target="_blank" rel="noreferrer" className={link}>
                      {project.name}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
          <div>
            <h2 className={`${type.captionStrong} text-graphite`}>{text.contact}</h2>
            <ul className="mt-2 text-[14px] leading-[2.2]">
              <li>
                <a href={links.mailtoPlain} className={link}>
                  {text.email}
                </a>
              </li>
              <li>
                <a href={links.whatsapp} target="_blank" rel="noreferrer" className={link}>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className={link}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={contact.github} target="_blank" rel="noreferrer" className={link}>
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.cv} download type="application/pdf" className={link}>
                  {text.cv}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className={`${type.fine} leading-normal text-secondary`}>{format(text.credits, { name: profile.name })}</p>
          <LanguageLinks current={locale} className={`${type.fine} ${link}`} />
        </div>
      </div>
    </footer>
  );
}
