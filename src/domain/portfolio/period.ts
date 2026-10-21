/** A span of years. Without an end, it is still running. */
export type Period = {
  readonly from: number;
  readonly to?: number;
};

export function formatPeriod({ from, to }: Period): string {
  return `${from} — ${to ?? "now"}`;
}
