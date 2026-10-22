import type { Dictionary } from "@/presentation/i18n/dictionary";
import { section, tile, type } from "@/presentation/ui";
import type { Education, Job } from "@/domain/portfolio/career";
import { formatPeriod } from "@/domain/portfolio/period";
import { formatLanguage, type Language } from "@/domain/portfolio/profile";

const card = "rounded-[18px] border border-hairline bg-canvas p-6 md:p-8";

type ExperienceProps = {
  jobs: readonly Job[];
  education: readonly Education[];
  languages: readonly Language[];
  text: Dictionary["experience"];
};

export function Experience({ jobs, education, languages, text }: ExperienceProps) {
  return (
    <section id="experience" aria-labelledby="experience-title" className={`${tile.parchment} ${section}`}>
      <div className="mx-auto max-w-[980px]">
        <div className="text-center">
          <h2 id="experience-title" className={type.displayLg}>
            {text.title}
          </h2>
          <p className={`${type.lead} mx-auto mt-3 max-w-[30ch] text-balance`}>{text.lead}</p>
        </div>

        <ol className="mt-12 flex flex-col gap-5">
          {jobs.map((job) => (
            <li key={job.company} className={`${card} grid gap-4 md:grid-cols-[11rem_1fr] md:gap-8`}>
              <p
                className={`${type.captionStrong} hidden whitespace-nowrap text-secondary tabular-nums md:block md:pt-1`}
              >
                {formatPeriod(job.period, text.present)}
              </p>
              <div>
                <h3 className={type.tagline}>{job.role}</h3>
                <p className="mt-1 text-graphite-80">
                  {job.company}
                  <span className="whitespace-nowrap text-secondary tabular-nums md:hidden">
                    {" "}
                    · {formatPeriod(job.period, text.present)}
                  </span>
                </p>
                <ul className="mt-4 flex flex-col gap-2 text-graphite-80">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-graphite/40" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-5">
          <div className={card}>
            <h3 className={type.tagline}>{text.education}</h3>
            <ul className="mt-4 grid md:grid-cols-2 md:gap-x-8">
              {education.map((item) => (
                <li key={item.title} className="border-b border-divider py-3 md:nth-last-2:border-b-0">
                  <p className={type.bodyStrong}>{item.title}</p>
                  <p className={`${type.caption} mt-1 text-secondary`}>{item.place}</p>
                </li>
              ))}
              <li className="py-3">
                <p className={type.bodyStrong}>{languages.map(formatLanguage).join(" · ")}</p>
                <p className={`${type.caption} mt-1 text-secondary`}>{text.english}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
