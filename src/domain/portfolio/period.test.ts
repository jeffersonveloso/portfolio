import { describe, expect, it } from "vitest";
import { formatPeriod } from "@/domain/portfolio/period";

describe("formatPeriod", () => {
  it("shows a running period as ending now, in the page's words", () => {
    expect(formatPeriod({ from: 2025 }, "now")).toBe("2025 — now");
    expect(formatPeriod({ from: 2025 }, "atual")).toBe("2025 — atual");
  });

  it("shows a closed period with both years", () => {
    expect(formatPeriod({ from: 2017, to: 2022 }, "now")).toBe("2017 — 2022");
  });
});
