"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Profile } from "@/domain/portfolio/profile";
import type { CodeWindowText } from "@/presentation/i18n/dictionary";

type Tok = [kind: keyof typeof INK, text: string];

// Xcode's default dark theme, near enough.
const INK = {
  pl: "#e5e5e7",
  pu: "#a8a8ad",
  kw: "#fc5fa3",
  st: "#fc6a5d",
  cm: "#8d99a5",
  ty: "#5dd8ff",
  fn: "#67b7a4",
  pr: "#a5d6ff",
};

const s = (text: string): Tok => ["st", `"${text}"`];
const prop = (name: string, ...value: Tok[]): Tok[] => [
  ["pl", "  "],
  ["pr", name],
  ["pu", ": "],
  ...value,
  ["pu", ","],
];

// The source lines, built from the profile. The code stays English; its
// comments are in the page's language.
function sourceLines(profile: Profile, stack: readonly string[], text: CodeWindowText): Tok[][] {
  const list = stack.flatMap((item, i): Tok[] => (i === 0 ? [s(item)] : [["pu", ", "], s(item)]));
  return [
    [["cm", text.comment]],
    [
      ["kw", "import"],
      ["pu", " { "],
      ["pl", "remote"],
      ["pu", " } "],
      ["kw", "from"],
      ["pl", " "],
      s("@careers/global"),
      ["pu", ";"],
    ],
    [],
    [
      ["kw", "export const"],
      ["pl", " jefferson "],
      ["pu", "= {"],
    ],
    prop("name", s(profile.name)),
    prop("role", s(profile.role)),
    prop("experience", s(profile.facts.experience)),
    prop("basedIn", s(profile.facts.basedIn)),
    prop("english", s(profile.facts.english)),
    prop("openTo", ["fn", "remote"], ["pu", "(["], s("Full Stack"), ["pu", ", "], s("Software Engineer"), ["pu", "])"]),
    prop("stack", ["pu", "["], ...list, ["pu", "]"]),
    [
      ["pu", "} "],
      ["kw", "as const"],
      ["pu", ";"],
    ],
    [],
    [
      ["kw", "export async function"],
      ["pl", " "],
      ["fn", "hire"],
      ["pu", "("],
      ["pl", "team"],
      ["pu", ": "],
      ["ty", "Team"],
      ["pu", ") {"],
    ],
    [
      ["pl", "  "],
      ["kw", "const"],
      ["pl", " spec "],
      ["pu", "= "],
      ["kw", "await"],
      ["pl", " "],
      ["fn", "write"],
      ["pu", "("],
      ["pl", "team.problem"],
      ["pu", ");"],
      ["cm", text.specComment],
    ],
    [
      ["pl", "  "],
      ["kw", "const"],
      ["pl", " systems "],
      ["pu", "= "],
      ["kw", "await"],
      ["pl", " "],
      ["fn", "connect"],
      ["pu", "("],
      ["pl", "team.erp"],
      ["pu", ", "],
      ["pl", "team.crm"],
      ["pu", ");"],
    ],
    [
      ["pl", "  "],
      ["kw", "const"],
      ["pl", " product "],
      ["pu", "= "],
      ["kw", "await"],
      ["pl", " "],
      ["fn", "build"],
      ["pu", "("],
      ["pl", "spec"],
      ["pu", ", "],
      ["pl", "systems"],
      ["pu", ");"],
    ],
    [
      ["pl", "  "],
      ["kw", "await"],
      ["pl", " "],
      ["fn", "review"],
      ["pu", "("],
      ["pl", "product"],
      ["pu", ", { "],
      ["pr", "ai"],
      ["pu", ": "],
      s("CodeRabbit"),
      ["pu", ", "],
      ["pr", "peers"],
      ["pu", ": "],
      ["kw", "true"],
      ["pu", " });"],
    ],
    [
      ["pl", "  "],
      ["kw", "return"],
      ["pl", " "],
      ["fn", "ship"],
      ["pu", "("],
      ["pl", "product"],
      ["pu", ");"],
    ],
    [["pu", "}"]],
  ];
}

// Lines the debugger steps through; the console prints each step's output.
const STEPS = [
  { line: 14, step: "write" },
  { line: 15, step: "connect" },
  { line: 16, step: "build" },
  { line: 17, step: "review" },
  { line: 18, step: "ship" },
] as const;

const STEP_MS = 900;

type CodeWindowProps = {
  profile: Profile;
  stack: readonly string[];
  text: CodeWindowText;
};

export function CodeWindow({ profile, stack, text }: CodeWindowProps) {
  const lines = sourceLines(profile, stack, text);
  const root = useRef<HTMLDivElement>(null);
  // -1: idle with every result shown; 0..n: running, n steps done.
  const [step, setStep] = useState(-1);
  const timer = useRef<number | undefined>(undefined);

  const run = useCallback(() => {
    window.clearInterval(timer.current);
    setStep(0);
    let n = 0;
    timer.current = window.setInterval(() => {
      n += 1;
      setStep(n);
      if (n >= STEPS.length) {
        window.clearInterval(timer.current);
        window.setTimeout(() => setStep(-1), STEP_MS);
      }
    }, STEP_MS);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timer.current);
    };
  }, [run]);

  const running = step >= 0;
  const done = running ? step : STEPS.length;
  const activeLine = running && step < STEPS.length ? STEPS[step].line : -1;

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-[10px] bg-[#1e1e20] text-left shadow-product ring-1 ring-black/40"
    >
      <div className="relative flex h-[38px] items-center border-b border-black/60 bg-[#2c2c2e] px-3.5">
        <div aria-hidden="true" className="flex gap-2">
          <span className="traffic bg-[#ff5f57]" />
          <span className="traffic bg-[#febc2e]" />
          <span className="traffic bg-[#28c840]" />
        </div>
        <p className="pointer-events-none absolute inset-x-0 text-center text-[13px] text-[#a1a1a6]">{text.window}</p>
        <button
          type="button"
          onClick={run}
          className="relative ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] text-[#c7c7cc] hover:bg-white/10"
        >
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path d="M3 1.5v9l7-4.5z" fill="currentColor" />
          </svg>
          {text.run}
        </button>
      </div>

      <pre className="overflow-x-auto py-4 font-mono text-[11px] leading-[1.75] sm:text-[12px] md:text-[13.5px]">
        <code>
          {lines.map((tokens, i) => (
            <span key={i} className="code-line flex pr-6" data-active={i === activeLine ? "" : undefined}>
              <span aria-hidden="true" className="w-12 shrink-0 pr-4 text-right text-[#8e8e93] select-none">
                {i + 1}
              </span>
              <span className="min-w-0 pl-[2ch] -indent-[2ch] whitespace-pre-wrap sm:pl-0 sm:indent-0 sm:whitespace-pre">
                {tokens.map(([kind, text], j) => (
                  <span key={j} style={{ color: INK[kind] }}>
                    {text}
                  </span>
                ))}
                {tokens.length === 0 ? " " : null}
              </span>
            </span>
          ))}
        </code>
      </pre>

      <div className="border-t border-white/10 bg-[#19191b] px-5 py-4 font-mono text-[12px] leading-[1.8] md:text-[13px]">
        <p className="text-[#8d99a5]">› await hire(yourTeam)</p>
        {/* Every result keeps its line while unprinted, so a run never
            changes the page's height under an anchor scroll. */}
        <ul>
          {STEPS.map((item, i) => (
            <li key={item.step} className={`flex gap-3 ${i < done ? "" : "invisible"}`}>
              <span className="text-[#28c840]">✓</span>
              <span className="w-16 shrink-0 text-[#e5e5e7]">{item.step}</span>
              <span className="text-[#a8a8ad]">{text.output[item.step]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
