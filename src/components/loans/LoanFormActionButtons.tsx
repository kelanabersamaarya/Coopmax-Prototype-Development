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
  const btnBase = cn(
    "inline-flex items-center justify-center gap-1.5",
    "rounded-[6px] px-2 text-[11px] font-bold tracking-tight text-white",
    "focus:outline-none focus-visible:ring-4",
    "w-full h-10 sm:w-[90px] sm:h-[28px]",
  );

  const iconCls = "h-4 w-4";

  return (
    <div className={cn("mt-6 flex justify-end", className)}>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
        <button
          type="button"
          onClick={onCancel}
          className={cn(
            btnBase,
            "bg-[#77839a] ring-1 ring-[#77839a]/25 transition hover:bg-[#6b768c]",
            "focus-visible:ring-[#77839a]/25",
          )}
        >
          <X className={iconCls} strokeWidth={3} />
          {cancelLabel}
        </button>

        <button
          type="button"
          onClick={onSave}
          className={cn(
            btnBase,
            "bg-[#2fb300] ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
            "focus-visible:ring-[#2fb300]/25",
          )}
        >
          <CheckSquare className={iconCls} strokeWidth={3} />
          {saveLabel}
        </button>
      </div>
    </div>
  );
}