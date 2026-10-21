import { describe, expect, it } from "vitest";
import { ENTRY_LIMIT, TypedEntry } from "@/domain/navigation/typed-entry";
import type { Section } from "@/domain/portfolio/section";

const skills: Section = { id: "skills", label: "Skills" };
const work: Section = { id: "work", label: "Work" };
const experience: Section = { id: "experience", label: "Experience" };
const sections = [skills, work, experience];

const typing = (keys: string[] | string, from = TypedEntry.empty) =>
  [...keys].reduce((entry, key) => entry.press(key), from);

describe("TypedEntry.press", () => {
  it("appends printable characters", () => {
    expect(typing("wor").text).toBe("wor");
  });

  it("removes the last character on Backspace", () => {
    expect(typing("work").press("Backspace").text).toBe("wor");
  });

  it("clears on Escape and on the space bar", () => {
    expect(typing("work").press("Escape").isEmpty).toBe(true);
    expect(typing("work").press(" ").isEmpty).toBe(true);
  });

  it("leaves the entry alone on other non-printing keys", () => {
    const entry = typing("work");
    expect(entry.press("Shift")).toBe(entry);
    expect(entry.press("ArrowLeft")).toBe(entry);
  });

  it(`keeps only the last ${ENTRY_LIMIT} characters`, () => {
    expect(typing("x".repeat(ENTRY_LIMIT + 5)).text).toHaveLength(ENTRY_LIMIT);
  });

  it("comes back to the shared empty entry", () => {
    expect(typing("w").press("Backspace")).toBe(TypedEntry.empty);
  });
});

describe("TypedEntry.match", () => {
  it("finds the section a prefix starts", () => {
    expect(typing("exp").match(sections)).toEqual({ section: experience, typed: "exp", complete: false });
  });

  it("completes on the full name, ignoring case", () => {
    expect(typing("WORK").match(sections)).toEqual({ section: work, typed: "work", complete: true });
  });

  it("matches the end of the entry, so earlier letters do not block it", () => {
    expect(typing("qqwork").match(sections)).toMatchObject({ section: work, complete: true });
  });

  it("keeps a typo visible until it is fixed with Backspace", () => {
    const typo = typing("exprience");
    expect(typo.text).toBe("exprience");
    expect(typo.match(sections)).toMatchObject({ section: experience, typed: "e", complete: false });

    const fixed = typing("erience", typing(Array(6).fill("Backspace"), typo));
    expect(fixed.text).toBe("experience");
    expect(fixed.match(sections)).toMatchObject({ section: experience, complete: true });
  });

  it("matches nothing when no ending starts a name", () => {
    expect(typing("xyz").match(sections)).toBeNull();
    expect(TypedEntry.empty.match(sections)).toBeNull();
  });
});
