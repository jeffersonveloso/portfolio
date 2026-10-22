import { describe, expect, it } from "vitest";
import { preferredLocale } from "@/infrastructure/http/preferred-locale";

describe("preferredLocale", () => {
  it("serves Portuguese to a Brazilian browser", () => {
    expect(preferredLocale("pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")).toBe("pt-BR");
  });

  it("serves English to an English browser", () => {
    expect(preferredLocale("en-US,en;q=0.9,pt-BR;q=0.8")).toBe("en");
  });

  it("matches any Portuguese by language", () => {
    expect(preferredLocale("pt")).toBe("pt-BR");
    expect(preferredLocale("pt-PT")).toBe("pt-BR");
  });

  it("follows the weights, not the order", () => {
    expect(preferredLocale("en;q=0.5, pt-BR;q=0.9")).toBe("pt-BR");
  });

  it("skips languages the portfolio is not told in", () => {
    expect(preferredLocale("fr-FR,fr;q=0.9,pt;q=0.4")).toBe("pt-BR");
  });

  it("falls back to English", () => {
    expect(preferredLocale("fr-FR,de;q=0.8")).toBe("en");
    expect(preferredLocale("*")).toBe("en");
    expect(preferredLocale("")).toBe("en");
    expect(preferredLocale(null)).toBe("en");
  });

  it("ignores refused and malformed entries", () => {
    expect(preferredLocale("pt-BR;q=0, en;q=0.5")).toBe("en");
    expect(preferredLocale("pt-BR;q=abc")).toBe("en");
  });
});
