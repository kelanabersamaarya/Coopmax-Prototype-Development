"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function LoanWriteoffSectionHeader({
  title = "Informasi Rekening",
  subtitle,
  className,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="text-center text-[14px] font-semibold tracking-tight text-slate-900">
        {title}
      </div>
      <div className="mt-2 h-px w-full bg-slate-300/70" />

      {subtitle ? (
        <div className="mt-3 text-center text-[13px] font-semibold tracking-tight text-slate-800">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}