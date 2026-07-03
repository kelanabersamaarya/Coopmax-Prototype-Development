"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileTopToast({
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
    }, 2800);

    return () => window.clearTimeout(timeoutId);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="pointer-events-none absolute inset-x-4 top-4 z-[140]">
      <div
        className={cn(
          "pointer-events-auto flex min-h-[54px] items-center gap-3 rounded-[14px]",
          "bg-[#FCE4E7] px-4 py-3 text-[#EF135D]",
          "shadow-[0_12px_28px_rgba(239,19,93,0.18)] ring-1 ring-[#F8C8D0]",
          "animate-in fade-in-0 slide-in-from-top-3 duration-200",
        )}
      >
        <div className="min-w-0 flex-1 text-[13px] font-bold leading-snug">
          {message}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#EF135D] transition active:scale-[0.96]"
          aria-label="Tutup peringatan"
          title="Tutup"
        >
          <X className="h-4 w-4" strokeWidth={2.8} />
        </button>
      </div>
    </div>
  );
}