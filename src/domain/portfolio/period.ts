/** A span of years. Without an end, it is still running. */
export type Period = {
  readonly from: number;
  readonly to?: number;
};

/** The period as "from — to", with `present` ("now") ending a running one. */
export function formatPeriod({ from, to }: Period, present: string): string {
  return `${from} — ${to ?? present}`;
}
