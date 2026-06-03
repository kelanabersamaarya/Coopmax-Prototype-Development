"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function SortableHeaderLabel({
  lines,
  className,
  align = "left",
}: {
  lines: string[];
  className?: string;
  iconClassName?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center",
        align === "right"
          ? "justify-end"
          : align === "center"
            ? "justify-center"
            : "justify-start",
        className,
      )}
    >
      <div
        className={cn(
          "min-w-0 leading-[1.05]",
          align === "right"
            ? "text-right"
            : align === "left"
              ? "text-left"
              : "text-center",
        )}
      >
        {lines.map((l, idx) => (
          <span
            key={idx}
            className={cn("block", idx === 0 ? "whitespace-nowrap" : "")}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}