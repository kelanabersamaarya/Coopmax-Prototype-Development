"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function splitByLastDot(value: string) {
  const s = (value ?? "").trim();
  const idx = s.lastIndexOf(".");
  if (idx <= 0 || idx === s.length - 1) return { head: s, tail: "" };
  return {
    head: s.slice(0, idx),
    tail: s.slice(idx + 1),
  };
}

export default function NumericCell({
  children,
  className,
  align = "separator",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "right" | "separator";
}) {
  const text = typeof children === "string" ? children : null;

  if (align === "right" || !text || !text.includes(".")) {
    return (
      <span
        className={cn(
          "block w-full text-right whitespace-nowrap",
          "num-sans-tabular",
          className,
        )}
      >
        {children}
      </span>
    );
  }

  const { head, tail } = splitByLastDot(text);

  // target: sejajarkan titik ribuan. tail (3 digit) dibuat fixed width.
  return (
    <span
      className={cn(
        "block w-full whitespace-nowrap",
        "num-sans-tabular",
        className,
      )}
    >
      <span className="grid w-full items-baseline [grid-template-columns:1fr_auto_auto]">
        <span className="min-w-0 text-right">{head}</span>
        <span className="px-0.5 text-right">.</span>
        <span className="w-[3ch] text-left">{tail}</span>
      </span>
    </span>
  );
}