"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingInScreenToast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  React.useEffect(() => {
    if (!message) return;

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="pointer-events-none absolute inset-x-4 top-4 z-[160]">
      <div
        className={cn(
          "pointer-events-auto flex min-h-[54px] items-center gap-3 rounded-[14px]",
          "bg-[#33AA00] px-4 py-3 text-white",
          "shadow-[0_12px_28px_rgba(51,170,0,0.24)] ring-1 ring-[#2f9800]",
          "animate-in fade-in-0 slide-in-from-top-3 duration-200",
        )}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/18 ring-1 ring-white/20">
          <Check className="h-5 w-5 text-white" strokeWidth={3.2} />
        </span>

        <div className="min-w-0 flex-1 text-[13px] font-bold leading-snug">
          {message}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/90 transition active:scale-[0.96]"
          aria-label="Tutup toaster"
          title="Tutup"
        >
          <X className="h-4 w-4" strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
}