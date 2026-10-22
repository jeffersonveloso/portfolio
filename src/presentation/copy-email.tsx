"use client";

import { useEffect, useRef, useState } from "react";
import type { CopyEmailText } from "@/presentation/i18n/dictionary";
import { Check, Copy } from "@/presentation/icons";

type Status = keyof CopyEmailText;

type CopyEmailProps = {
  email: string;
  /** What the button says while idle, after a copy and after a failure. */
  labels: CopyEmailText;
  className?: string;
};

export function CopyEmail({ email, labels, className = "" }: CopyEmailProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {status === "copied" ? <Check /> : <Copy />}
      <span aria-live="polite">{labels[status]}</span>
    </button>
  );
}
