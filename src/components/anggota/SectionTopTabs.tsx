"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  active?: boolean;
  className?: string;
};

export default function SectionTopTabs({ label, active = true, className }: Props) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between">
        <div className="text-[11px] font-semibold text-slate-700">{label}</div>
        <div className="h-px flex-1 bg-slate-200/70" />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div
          className={cn(
            "h-2.5 w-10 rounded-full",
            active ? "bg-[hsl(var(--app-accent))]" : "bg-slate-200",
          )}
        />
        <div className="h-px flex-1 bg-slate-200/70" />
      </div>
    </div>
  );
}