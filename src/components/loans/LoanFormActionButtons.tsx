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
    <div
      className={cn(
        "mt-7 grid gap-3 sm:grid-cols-2 sm:justify-end sm:gap-4",
        className,
      )}
    >
      <button
        type="button"
        onClick={onCancel}
        className={cn(
          "inline-flex h-[66px] w-full items-center justify-center gap-3",
          "rounded-2xl px-8 text-[22px] font-extrabold tracking-tight text-white",
          "bg-[#77839a] ring-1 ring-[#77839a]/25 transition hover:bg-[#6b768c]",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#77839a]/25",
        )}
      >
        <X className="h-7 w-7" strokeWidth={3} />
        {cancelLabel}
      </button>

      <button
        type="button"
        onClick={onSave}
        className={cn(
          "inline-flex h-[66px] w-full items-center justify-center gap-3",
          "rounded-2xl px-8 text-[22px] font-extrabold tracking-tight text-white",
          "bg-[#2fb300] ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2fb300]/25",
        )}
      >
        <CheckSquare className="h-7 w-7" strokeWidth={3} />
        {saveLabel}
      </button>
    </div>
  );
}