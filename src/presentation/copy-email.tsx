"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "@/presentation/icons";

type Status = "idle" | "copied" | "failed";

const LABELS: Record<Status, string> = {
  idle: "Copy email",
  copied: "Email copied",
  failed: "Copy failed, select the address instead",
};

export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
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
      <span aria-live="polite">{LABELS[status]}</span>
    </button>
  );
}
