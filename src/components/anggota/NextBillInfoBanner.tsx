"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NextBillInfoBanner({
  publishText = "20 April 2025",
  dueText = "5 Mei 2025",
  className,
}: {
  publishText?: string;
  dueText?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white px-4 py-4",
        className,
      )}
      role="note"
      aria-label="Informasi tagihan berikutnya"
    >
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
          <Info className="h-5 w-5" />
        </span>

        <div className="min-w-0 text-sm font-medium text-slate-900">
          Tagihan berikutnya akan diterbitkan pada{" "}
          <span className="font-extrabold text-[#3366FF]">{publishText}</span> dan
          jatuh tempo pada{" "}
          <span className="font-extrabold text-[#3366FF]">{dueText}</span>.
        </div>
      </div>
    </div>
  );
}