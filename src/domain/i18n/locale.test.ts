import { describe, expect, it } from "vitest";
import { isLocale } from "@/domain/i18n/locale";

describe("isLocale", () => {
  it("accepts the tags the portfolio is told in", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt-BR")).toBe(true);
  });

  it("rejects other tags and other spellings", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("pt-br")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
