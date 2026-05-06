"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function SectionDividerLabel({
  label = "INFORMASI REKENING",
  status = "Belum Terproses",
  className,
}: {
  label?: string;
  status?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center gap-3">
        <span className="inline-flex items-center rounded-full bg-rose-600 px-3 py-1 text-[12px] font-semibold text-white ring-1 ring-rose-600/20">
          {status}
        </span>
        <div className="text-center text-[14px] font-extrabold tracking-wide text-slate-900">
          {label}
        </div>
      </div>

      <div className="mt-2 h-px w-full bg-slate-300/70" />
    </div>
  );
}