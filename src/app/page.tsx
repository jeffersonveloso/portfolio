import { portfolioPage, siteUrl } from "@/app/composition-root";
import { SectionNavigation } from "@/app/section-navigation";
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

export default function Home() {
  const { portfolio, links } = portfolioPage;
  const { profile, sections } = portfolio;

  return (
    <SectionNavigation>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-graphite px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <GlobalNav profile={profile} sections={sections} />
      <SubNav name={profile.name} mailto={links.mailto} />
      <main id="main">
        <Hero profile={profile} sections={sections} mailto={links.mailto} />
        <Meet profile={profile} />
        <UnderTheHood
          profile={profile}
          topSkills={portfolio.topSkills}
          skills={portfolio.skills}
          capabilities={portfolio.capabilities}
        />
        <Work projects={portfolio.projects} caseStudy={portfolio.caseStudy} engagements={portfolio.engagements} />
        <Process workflow={portfolio.workflow} />
        <Experience jobs={portfolio.experience} education={portfolio.education} languages={profile.languages} />
        <Contact profile={profile} links={links} />
      </main>
      <SiteFooter profile={profile} sections={sections} projects={portfolio.projects} links={links} />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(profile, siteUrl)).replace(/</g, "\\u003c") }}
      />
    </SectionNavigation>
  );
}
