import type { Education, Job } from "@/domain/portfolio/career";
import type { Profile } from "@/domain/portfolio/profile";
import type { Section } from "@/domain/portfolio/section";
import type { Capability, SkillGroup, WorkflowStep } from "@/domain/portfolio/skills";
import type { CaseStudy, Engagement, Project } from "@/domain/portfolio/work";

/** Everything the portfolio presents: the aggregate the page is built from. */
export type Portfolio = {
  readonly profile: Profile;
  /** The page's navigable sections, in page order. */
  readonly sections: readonly Section[];
  readonly topSkills: readonly string[];
  readonly skills: readonly SkillGroup[];
  readonly capabilities: readonly Capability[];
  /** The featured product first. */
  readonly projects: readonly Project[];
  readonly caseStudy: CaseStudy;
  readonly engagements: readonly Engagement[];
  readonly workflow: readonly WorkflowStep[];
  readonly experience: readonly Job[];
  readonly education: readonly Education[];
};
