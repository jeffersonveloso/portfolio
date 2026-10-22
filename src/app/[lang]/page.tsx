import { portfolioPage, siteUrl } from "@/app/composition-root";
import { localeOf } from "@/app/locale-param";
import { SectionNavigation } from "@/app/section-navigation";
import { getDictionary } from "@/presentation/i18n/dictionaries";
import { BackToTop } from "@/presentation/keyboard/back-to-top";
import { Contact } from "@/presentation/sections/contact";
import { Experience } from "@/presentation/sections/experience";
import { Hero } from "@/presentation/sections/hero";
import { Meet } from "@/presentation/sections/meet";
import { Process } from "@/presentation/sections/process";
import { SiteFooter } from "@/presentation/sections/site-footer";
import { GlobalNav, SubNav } from "@/presentation/sections/site-nav";
import { UnderTheHood } from "@/presentation/sections/under-the-hood";
import { Work } from "@/presentation/sections/work";
import { personJsonLd } from "@/presentation/seo/person-json-ld";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const locale = await localeOf(params);
  const { portfolio, links } = portfolioPage(locale);
  const { profile, sections } = portfolio;
  const text = getDictionary(locale);

  return (
    <SectionNavigation>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-graphite px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {text.skipToContent}
      </a>
      <GlobalNav profile={profile} sections={sections} locale={locale} text={text.nav} />
      <SubNav name={profile.name} mailto={links.mailto} text={text} />
      <main id="main">
        <Hero profile={profile} sections={sections} mailto={links.mailto} text={text} />
        <Meet profile={profile} text={text.meet} />
        <UnderTheHood
          profile={profile}
          topSkills={portfolio.topSkills}
          skills={portfolio.skills}
          capabilities={portfolio.capabilities}
          text={text}
        />
        <Work
          projects={portfolio.projects}
          caseStudy={portfolio.caseStudy}
          engagements={portfolio.engagements}
          text={text.work}
          screenshot={text.screenshot}
          present={text.experience.present}
        />
        <Process workflow={portfolio.workflow} text={text.process} />
        <Experience
          jobs={portfolio.experience}
          education={portfolio.education}
          languages={profile.languages}
          text={text.experience}
        />
        <Contact profile={profile} links={links} text={text.contact} emailMe={text.emailMe} />
      </main>
      <SiteFooter
        profile={profile}
        sections={sections}
        projects={portfolio.projects}
        links={links}
        locale={locale}
        text={text.footer}
      />
      <BackToTop label={text.backToTop} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(profile, siteUrl)).replace(/</g, "\\u003c") }}
      />
    </SectionNavigation>
  );
}
