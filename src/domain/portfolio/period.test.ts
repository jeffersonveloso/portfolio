import { describe, expect, it } from "vitest";
import { formatPeriod } from "@/domain/portfolio/period";

describe("formatPeriod", () => {
  it("shows a running period as ending now", () => {
    expect(formatPeriod({ from: 2025 })).toBe("2025 — now");
  });

  it("shows a closed period with both years", () => {
    expect(formatPeriod({ from: 2017, to: 2022 })).toBe("2017 — 2022");
  });
});
