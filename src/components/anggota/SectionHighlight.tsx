"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function SectionHighlight({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between gap-3">
        <div className="text-left text-lg font-semibold tracking-tight text-slate-900">
          {title}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[hsl(var(--app-accent))]/40" />
          <div className="h-2 w-2 rounded-full bg-[hsl(var(--app-accent-2))]/35" />
        </div>
      </div>

      <div className="mt-2 h-px w-full bg-slate-300/70" />
    </div>
  );
}