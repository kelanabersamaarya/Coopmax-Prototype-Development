"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function showSolidSuccess(message: string) {
  toast.custom((t) => (
    <div
      className={cn(
        "w-[min(520px,calc(100vw-1rem))]",
        "rounded-[8px] bg-emerald-600 text-white shadow-xl",
        "ring-1 ring-emerald-700/40",
        "px-4 py-3",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20">
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="truncate text-[15px] font-semibold leading-none">
            {message}
          </div>
        </div>

        <button
          type="button"
          onClick={() => toast.dismiss(t)}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full",
            "bg-white/15 ring-1 ring-white/20",
            "transition hover:bg-white/20",
          )}
          aria-label="Tutup"
          title="Tutup"
        >
          <X className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  ));
}