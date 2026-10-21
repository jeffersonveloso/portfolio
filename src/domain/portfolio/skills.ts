/** Skills of one kind, such as "Back end". */
export type SkillGroup = {
  readonly group: string;
  readonly items: readonly string[];
};

/** Something the owner does for a team, with the tools it takes. */
export type Capability = {
  readonly title: string;
  readonly body: string;
  readonly tools: readonly string[];
};

/** One step of the owner's spec-driven way of working. */
export type WorkflowStep = {
  /** Short name, printed on the step's key. */
  readonly label: string;
  readonly title: string;
  readonly body: string;
};
