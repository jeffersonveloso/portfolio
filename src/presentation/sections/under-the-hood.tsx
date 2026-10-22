import type { Dictionary } from "@/presentation/i18n/dictionary";
import { CodeWindow } from "@/presentation/windows/code-window";
import { section, tile, type } from "@/presentation/ui";
import type { Profile } from "@/domain/portfolio/profile";
import type { Capability, SkillGroup } from "@/domain/portfolio/skills";

type UnderTheHoodProps = {
  profile: Profile;
  topSkills: readonly string[];
  skills: readonly SkillGroup[];
  capabilities: readonly Capability[];
  text: Pick<Dictionary, "hood" | "code">;
};

export function UnderTheHood({ profile, topSkills, skills, capabilities, text }: UnderTheHoodProps) {
  return (
    <section aria-labelledby="hood-title" className={`${tile.parchment} ${section}`}>
      <div className="mx-auto max-w-[980px]">
        <div className="text-center">
          <h2 id="hood-title" className={type.displayLg}>
            {text.hood.title}
          </h2>
          <p className={`${type.lead} mx-auto mt-3 max-w-[30ch] text-balance`}>{text.hood.lead}</p>
        </div>

        <div className="mx-auto mt-10 max-w-[860px] md:mt-14">
          <CodeWindow profile={profile} stack={topSkills.slice(0, 5)} text={text.code} />
        </div>

        {/* The nav's skills link lands here, past the code window. */}
        <div id="skills" className="mt-14 text-center">
          <h3 className={type.tagline}>{text.hood.topSkills}</h3>
          <ul className="mx-auto mt-6 flex max-w-[780px] flex-wrap justify-center gap-x-2.5 gap-y-4">
            {topSkills.map((skill, i) => (
              <li key={skill} className={`${type.caption} keycap-chip`} data-tone={i < 5 ? "mod" : undefined}>
                <span>{skill}</span>
              </li>
            ))}
          </ul>

          {/* Every skill as a spec sheet: group on the left, tools on the right. */}
          <dl className="mt-12 border-t border-black/10 text-left">
            {skills.map((item) => (
              <div
                key={item.group}
                className="grid gap-1 border-b border-black/10 py-4 md:grid-cols-[14rem_1fr] md:gap-8"
              >
                <dt className={type.bodyStrong}>{item.group}</dt>
                <dd className="text-graphite-80">{item.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-8 border-t border-black/10 pt-10 md:grid-cols-2">
          {capabilities.map((item) => (
            <div key={item.title}>
              <h3 className={type.tagline}>{item.title}</h3>
              <p className="mt-2 text-graphite-80">{item.body}</p>
              <p className={`${type.caption} mt-2 text-secondary`}>{item.tools.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
