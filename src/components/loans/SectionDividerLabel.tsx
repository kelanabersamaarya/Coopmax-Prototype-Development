"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function SectionDividerLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="text-center text-[14px] font-semibold tracking-tight text-slate-900">
        {label}
      </div>
      <div className="mt-2 h-px w-full bg-slate-300/70" />
    </div>
  );
}