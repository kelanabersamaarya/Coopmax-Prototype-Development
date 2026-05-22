"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SortableHeaderLabel({
  lines,
  className,
  iconClassName,
  align = "center",
}: {
  lines: string[];
  className?: string;
  iconClassName?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        align === "right"
          ? "justify-end"
          : align === "left"
            ? "justify-start"
            : "justify-center",
        className,
      )}
    >
      <div className="leading-[1.05]">
        {lines.map((l, idx) => (
          <span key={idx} className="block">
            {l}
          </span>
        ))}
      </div>

      <span className={cn("inline-flex flex-col leading-none text-slate-900/80", iconClassName)}>
        <ChevronUp className="-mb-0.5 h-3.5 w-3.5" />
        <ChevronDown className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}