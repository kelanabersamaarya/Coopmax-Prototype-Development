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
      <div className="text-center text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-300/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-slate-300/80" />
        <div className="h-px flex-1 bg-slate-300/70" />
      </div>
    </div>
  );
}