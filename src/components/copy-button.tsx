"use client";

import { useState } from "react";

export function CopyButton({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const input = document.createElement("textarea");
        input.value = value;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.append(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Copy failed");
      }
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.setTimeout(() => setStatus("idle"), 2500);
  };

  return <button type="button" className={className} onClick={copy} aria-label={label}>
    {status === "copied" ? "Copied" : status === "failed" ? "Copy unavailable" : label}
  </button>;
}
