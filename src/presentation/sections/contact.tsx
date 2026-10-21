import type { CSSProperties } from "react";
import { CopyEmail } from "@/presentation/copy-email";
import { button, section, textLinkOnDark, tile, type } from "@/presentation/ui";
import type { ContactLinks } from "@/application/get-portfolio-page";
import { formatLanguage, type Profile } from "@/domain/portfolio/profile";

export function Contact({ profile, links }: { profile: Profile; links: ContactLinks }) {
  const { contact, location } = profile;
  const mailto = links.mailto;
  return (
    <section id="contact" aria-labelledby="contact-title" className={`${tile.dark} ${section} text-center`}>
      <h2 id="contact-title" className={type.displayLg}>
        Let&apos;s talk.
      </h2>
      <p className={`${type.lead} mx-auto mt-3 max-w-[30ch] text-balance text-mist`}>{profile.availability}</p>

      <a href={mailto} className="kb kb-return mx-auto mt-12 block w-fit" aria-label={`Email ${contact.email}`}>
        <span className="kb-plate block" style={{ "--units": 2.75, "--rows": 1 } as CSSProperties}>
          <span className="key" data-tone="action" style={{ "--x": 0, "--y": 0, "--w": 2.75 } as CSSProperties}>
            <span className="key-cap">
              <span className="key-legend" data-align="center">
                return ↵
              </span>
            </span>
          </span>
        </span>
      </a>

      <p className="mt-10">
        <a href={mailto} className={`${type.tagline} break-all text-white hover:underline`}>
          {contact.email}
        </a>
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
        <a href={mailto} className={button.primary}>
          Email me
        </a>
        <CopyEmail email={contact.email} className={button.ghostOnDark} />
      </div>
      <p className="mt-7 flex flex-wrap justify-center gap-x-8 gap-y-3">
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label={`Chat on WhatsApp, ${contact.whatsapp.display}`}
          className={textLinkOnDark}
        >
          Chat on WhatsApp ›
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className={textLinkOnDark}>
          Connect on LinkedIn ›
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" className={textLinkOnDark}>
          Code on GitHub ›
        </a>
      </p>
      <p className={`${type.caption} mt-8 text-mist`}>
        {[`${location.region}, ${location.country}`, location.timezone, ...profile.languages.map(formatLanguage)].join(
          " · ",
        )}
      </p>
    </section>
  );
}
