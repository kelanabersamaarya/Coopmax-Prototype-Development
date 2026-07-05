"use client";

import * as React from "react";
import { AlertTriangle, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingInScreenToast({
  message,
  onClose,
  variant = "success",
}: {
  message: string;
  onClose: () => void;
  variant?: "success" | "warning";
}) {
  React.useEffect(() => {
    if (!message) return;

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [message, onClose]);

  if (!message) return null;

  const isWarning = variant === "warning";
  const Icon = isWarning ? AlertTriangle : Check;

  return (
    <div className="pointer-events-none absolute inset-x-4 top-4 z-[160]">
      <div
        className={cn(
          "pointer-events-auto flex min-h-[54px] items-center gap-3 rounded-[14px]",
          "px-4 py-3",
          "animate-in fade-in-0 slide-in-from-top-3 duration-200",
          isWarning
            ? "bg-[#F59E0B] text-white ring-1 ring-[#D97706]"
            : "bg-[#33AA00] text-white ring-1 ring-[#2f9800]",
        )}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/18 ring-1 ring-white/20">
          <Icon className="h-5 w-5 text-white" strokeWidth={3.2} />
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