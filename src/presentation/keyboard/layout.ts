// A 65% board on a 15-unit grid with Mac legends. `code` matches
// KeyboardEvent.code so the visitor's own keystrokes press the same key.

export type KeyTone = "alpha" | "mod" | "action" | "green" | "yellow" | "purple";

export type KeySpec = {
  code: string;
  label: string;
  x: number;
  y: number;
  w?: number;
  tone?: KeyTone;
  center?: boolean;
};

function row(y: number, keys: [string, string, number?, KeyTone?, boolean?][]): KeySpec[] {
  let x = 0;
  return keys.map(([code, label, w = 1, tone = "alpha", center = false]) => {
    const key: KeySpec = { code, label, x, y, w, tone, center };
    x += w;
    return key;
  });
}

const letters = (codes: string) => codes.split("").map((c) => [`Key${c}`, c] as [string, string]);

export const BOARD_UNITS = 15;
export const BOARD_ROWS = 5;

export const boardKeys: KeySpec[] = [
  ...row(0, [
    ["Escape", "esc", 1, "green"],
    ...("1234567890".split("").map((d) => [`Digit${d}`, d]) as [string, string][]),
    ["Minus", "-"],
    ["Equal", "="],
    ["Backspace", "delete", 2, "mod"],
  ]),
  ...row(1, [
    ["Tab", "tab", 1.5, "mod"],
    ...letters("QWERTYUIOP"),
    ["BracketLeft", "["],
    ["BracketRight", "]"],
    ["Backslash", "\\", 1.5],
  ]),
  ...row(2, [
    ["CapsLock", "caps lock", 1.75, "mod"],
    ...letters("ASDFGHJKL"),
    ["Semicolon", ";"],
    ["Quote", "'"],
    // Enter and Space take their legends from the page's language.
    ["Enter", "", 2.25, "action"],
  ]),
  ...row(3, [
    ["ShiftLeft", "shift", 2.25, "mod"],
    ...letters("ZXCVBNM"),
    ["Comma", ","],
    ["Period", "."],
    ["Slash", "/"],
    ["ShiftRight", "shift", 1.75, "mod"],
    ["ArrowUp", "↑", 1, "mod", true],
  ]),
  ...row(4, [
    ["ControlLeft", "control", 1.25, "mod"],
    ["AltLeft", "option", 1.25, "mod"],
    ["MetaLeft", "command", 1.25, "mod"],
    ["Space", "", 6.25, "alpha", true],
    ["MetaRight", "cmd", 1, "mod"],
    ["AltRight", "opt", 1, "mod"],
    ["ArrowLeft", "←", 1, "mod", true],
    ["ArrowDown", "↓", 1, "mod", true],
    ["ArrowRight", "→", 1, "mod", true],
  ]),
];

/** The six colours of the classic rainbow stripe, used for the typing glow. */
export const glow = [
  { lit: "#61bb46", legend: "#1d1d1f" },
  { lit: "#fdb827", legend: "#1d1d1f" },
  { lit: "#f5821f", legend: "#1d1d1f" },
  { lit: "#e03a3e", legend: "#ffffff" },
  { lit: "#963d97", legend: "#ffffff" },
  { lit: "#009ddc", legend: "#ffffff" },
];

/** KeyboardEvent.code for each character the intro types. */
export function codeFor(char: string) {
  if (char === " ") return "Space";
  return `Key${char.toUpperCase()}`;
}
