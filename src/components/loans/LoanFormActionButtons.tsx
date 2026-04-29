"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckSquare, X } from "lucide-react";

export default function LoanFormActionButtons({
  onCancel,
  onSave,
  saveLabel = "Simpan",
  cancelLabel = "Batalkan",
  className,
}: {
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 flex justify-end", className)}>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            "inline-flex h-10 w-full items-center justify-center gap-2 sm:w-[140px]",
            "rounded-xl px-4 text-[13px] font-bold tracking-tight text-white",
            "bg-[#77839a] ring-1 ring-[#77839a]/25 transition hover:bg-[#6b768c]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#77839a]/25",
          )}
        >
          <X className="h-5 w-5" strokeWidth={3} />
          {cancelLabel}
        </button>

        <button
          type="button"
          onClick={onSave}
          className={cn(
            "inline-flex h-10 w-full items-center justify-center gap-2 sm:w-[140px]",
            "rounded-xl px-4 text-[13px] font-bold tracking-tight text-white",
            "bg-[#2fb300] ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
            "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2fb300]/25",
          )}
        >
          <CheckSquare className="h-5 w-5" strokeWidth={3} />
          {saveLabel}
        </button>
      </div>
    </div>
  );
}