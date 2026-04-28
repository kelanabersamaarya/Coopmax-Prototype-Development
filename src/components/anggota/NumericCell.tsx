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
  debug = false,
}: {
  children: React.ReactNode;
  className?: string;
  align?: "right" | "separator";
  debug?: boolean;
}) {
  const text = typeof children === "string" ? children : null;

  const Marker = debug ? (
    <span className="ml-2 text-[10px] font-semibold text-rose-500">•nc</span>
  ) : null;

  // If not string, fallback to right-aligned
  if (align === "right" || !text) {
    return (
      <span className={cn("block w-full whitespace-nowrap", className)}>
        <span className="flex w-full items-baseline justify-end">
          <span className={cn("text-right", "num-sans-tabular")}>{children}</span>
          {Marker}
        </span>
      </span>
    );
  }

  // Always use the 3-column grid so numbers align even when there is no dot.
  const { head, tail } = splitByLastDot(text);
  const hasDot = text.includes(".") && tail !== "";

  return (
    <span className={cn("block w-full whitespace-nowrap", className)}>
      <span className="flex w-full items-baseline justify-end">
        <span className="grid w-full items-baseline [grid-template-columns:1fr_auto_auto] num-sans-tabular">
          <span className="min-w-0 text-right">{head}</span>
          <span className={cn("px-0.5 text-right", hasDot ? "" : "opacity-0")}>
            .
          </span>
          {/* Fixed tail width keeps columns aligned across rows */}
          <span className="w-[3ch] text-left">{hasDot ? tail : ""}</span>
        </span>
        {Marker}
      </span>
    </span>
  );
}