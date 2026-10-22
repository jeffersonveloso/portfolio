import type { Dictionary } from "@/presentation/i18n/dictionary";
import { Macro } from "@/presentation/keyboard/macro";
import { section, tile, type } from "@/presentation/ui";
import type { WorkflowStep } from "@/domain/portfolio/skills";

export function Process({ workflow, text }: { workflow: readonly WorkflowStep[]; text: Dictionary["process"] }) {
  return (
    <section id="process" aria-labelledby="process-title" className={`${tile.light} ${section}`}>
      <div className="mx-auto max-w-[980px]">
        <div className="text-center">
          <h2 id="process-title" className={type.displayLg}>
            {text.title}
          </h2>
          <p className={`${type.lead} mx-auto mt-3 max-w-[34ch] text-balance`}>{text.lead}</p>
        </div>
        <div className="mt-12 flex justify-center">
          <Macro labels={workflow.map((step) => step.label)} />
        </div>
        <ol className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.map((step, i) => (
            <li key={step.label} className="border-t border-black/10 pt-5">
              <h3 className={type.tagline}>
                <span className="text-secondary tabular-nums">{i + 1}. </span>
                {step.title}
              </h3>
              <p className="mt-2 text-graphite-80">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
