import type { CaseStudy, Engagement, Project } from "@/domain/portfolio/work";
import { formatPeriod } from "@/domain/portfolio/period";
import type { Dictionary, ScreenWindowText } from "@/presentation/i18n/dictionary";
import { Keyset } from "@/presentation/keyboard/keyset";
import { SplitKeyset } from "@/presentation/keyboard/split-keyset";
import { section, textLink, textLinkOnDark, tile, type } from "@/presentation/ui";
import { ScreenWindow } from "@/presentation/windows/screen-window";

const dotted = (items: readonly string[]) => items.join(" · ");

function Credits({ rows, dark }: { rows: [term: string, value: string][]; dark: boolean }) {
  return (
    <dl
      className={`mx-auto grid max-w-[640px] grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-6 gap-y-4 border-t pt-5 text-left ${dark ? "border-white/15" : "border-black/10"}`}
    >
      {rows.map(([term, value]) => (
        <div key={term}>
          <dt className={`${type.caption} ${dark ? "text-mist" : "text-secondary"}`}>{term}</dt>
          {/* A no-break space keeps each "·" on the line it closes. */}
          <dd className={`${type.captionStrong} mt-1 text-balance`}>{value.replaceAll(" · ", " · ")}</dd>
        </div>
      ))}
    </dl>
  );
}

type WorkText = Dictionary["work"];

type ProjectTileProps = {
  project: Project;
  surface: keyof typeof tile;
  text: WorkText;
  present: string;
};

function ProjectTile({ project, surface, text, present }: ProjectTileProps) {
  const dark = surface.startsWith("dark");
  const featured = surface === "dark2";
  const credits: [string, string][] = [
    [text.credits.role, project.role],
    [text.credits.stack, dotted(project.stack)],
    ...(project.period ? [[text.credits.year, formatPeriod(project.period, present)] as [string, string]] : []),
    [text.credits.stage, project.stage],
  ];
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={`${tile[surface]} ${section} flex flex-col items-center text-center`}
    >
      <h3 id={`${project.slug}-title`} className={featured ? type.displayLg : type.displayMd}>
        {project.name}
      </h3>
      <p className={`${featured ? type.lead : type.taglineRegular} mt-2 max-w-[34ch] text-balance`}>
        {project.summary}
      </p>
      {project.link ? (
        <p className="mt-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <a href={project.link.href} target="_blank" rel="noreferrer" className={dark ? textLinkOnDark : textLink}>
            {project.link.label} ›
          </a>
          {project.link.note ? (
            <span className={`${type.caption} ${dark ? "text-mist" : "text-secondary"}`}>{project.link.note}</span>
          ) : null}
        </p>
      ) : null}
      <div className="my-10 md:my-12">
        <Keyset legends={project.highlights} tone={project.accent} className={featured ? "kb-set-lg" : "kb-set"} />
      </div>
      <p className={`max-w-[52ch] ${dark ? "text-mist" : "text-graphite-80"}`}>{project.body}</p>
      <div className="mt-8 w-full">
        <Credits rows={credits} dark={dark} />
      </div>
    </article>
  );
}

// A client case told as problem, build and result, under its split keyset,
// with the real product in two overlapping windows.
function CaseStudyTile({
  study,
  text,
  screenshot,
}: {
  study: CaseStudy;
  text: WorkText;
  screenshot: ScreenWindowText;
}) {
  const [board, detail] = study.screenshots;
  const story = [
    [text.story.problem, study.problem],
    [text.story.solution, study.solution],
    [text.story.result, study.result],
  ];
  return (
    <article
      id="case-study"
      aria-labelledby={`${study.slug}-title`}
      className={`${tile.dark3} ${section} flex flex-col items-center text-center`}
    >
      <h3 id={`${study.slug}-title`} className={type.displayLg}>
        {study.name}
      </h3>
      <p className={`${type.lead} mt-2 max-w-[30ch] text-balance`}>{study.summary}</p>
      <div className="my-10 md:my-12">
        <SplitKeyset halves={study.highlights} tone={study.accent} />
      </div>
      <div className="grid w-full max-w-[980px] gap-8 text-left md:grid-cols-3 md:gap-10">
        {story.map(([title, body]) => (
          <section key={title} className="border-t border-white/15 pt-5">
            <h4 className={type.tagline}>{title}</h4>
            <p className="mt-2 text-mist">{body}</p>
          </section>
        ))}
      </div>
      <figure className="mt-14 w-full max-w-[980px] md:mt-16">
        <div className="grid gap-6 md:grid-cols-12 md:gap-0 md:pb-16">
          <ScreenWindow
            screen={board}
            text={screenshot}
            sizes="(min-width: 64rem) 735px, (min-width: 48rem) 75vw, 100vw"
            className="md:col-[1/10] md:row-start-1"
          />
          <ScreenWindow
            screen={detail}
            text={screenshot}
            sizes="(min-width: 64rem) 572px, (min-width: 48rem) 58vw, 100vw"
            className="md:col-[6/13] md:row-start-1 md:translate-y-16 md:self-end"
          />
        </div>
        <figcaption className={`${type.caption} mx-auto mt-6 max-w-[60ch] text-balance text-mist`}>
          {study.screenshotsCaption}
        </figcaption>
      </figure>
      <div className="mt-12 w-full">
        <Credits
          rows={[
            [text.credits.role, study.role],
            [text.credits.client, study.client],
            [text.credits.stack, dotted(study.stack)],
            [text.credits.stage, study.stage],
          ]}
          dark
        />
      </div>
    </article>
  );
}

type WorkProps = {
  /** The featured product first. */
  projects: readonly Project[];
  caseStudy: CaseStudy;
  engagements: readonly Engagement[];
  text: WorkText;
  screenshot: ScreenWindowText;
  /** How a running period ends ("now"). */
  present: string;
};

export function Work({ projects, caseStudy, engagements, text, screenshot, present }: WorkProps) {
  const [featured, ...rest] = projects;
  return (
    <section id="work" aria-labelledby="work-title">
      <div className={`${tile.light} ${section} text-center`}>
        <h2 id="work-title" className={type.displayLg}>
          {text.title}
        </h2>
        <p className={`${type.lead} mx-auto mt-3 max-w-[32ch] text-balance`}>{text.lead}</p>
      </div>

      <ProjectTile project={featured} surface="dark2" text={text} present={present} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {rest.map((project, i) => (
          <ProjectTile
            key={project.slug}
            project={project}
            surface={i === 0 ? "light" : "parchment"}
            text={text}
            present={present}
          />
        ))}
      </div>

      <CaseStudyTile study={caseStudy} text={text} screenshot={screenshot} />

      <div className={`${tile.parchment} ${section}`}>
        <div className="mx-auto max-w-[980px]">
          <h3 className={`${type.displayMd} text-center`}>{text.integrations.title}</h3>
          <p className="mx-auto mt-3 max-w-[52ch] text-center text-graphite-80">{text.integrations.lead}</p>
          <ul className="mt-10 border-t border-black/10">
            {engagements.map((item) => (
              <li
                key={item.name}
                className="grid gap-2 border-b border-black/10 py-6 md:grid-cols-[14rem_1fr] md:gap-8"
              >
                <p className={type.tagline}>{item.name}</p>
                <div>
                  <p className="max-w-[52ch] text-graphite-80">{item.body}</p>
                  <p className={`${type.caption} mt-2 text-secondary`}>{item.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
