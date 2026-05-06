"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function SectionDividerLabel({
  label = "Informasi Rekening & Nasabah",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center gap-3">
        <div className="text-center text-[14px] font-extrabold tracking-wide text-slate-900">
          {label}
        </div>
      </div>

      <div className="mt-2 h-px w-full bg-slate-300/70" />
    </div>
  );
}