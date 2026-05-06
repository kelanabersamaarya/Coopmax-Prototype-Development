"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import LoanAccountInfoPreview from "@/components/loans/LoanAccountInfoPreview";

export default function LoanAccountBillingBlock({
  index,
  accountNo,
  onRemove,
  className,
}: {
  index: number;
  accountNo: string;
  onRemove: () => void;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl bg-white/60 ring-1 ring-slate-200/70", className)}>
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <div className="min-w-0">
          <div className="text-[12px] font-extrabold tracking-wide text-slate-900">
            REKENING {index + 1}
          </div>
          <div className="mt-0.5 text-[12.5px] font-semibold text-slate-700">
            {accountNo}
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full",
            "bg-rose-600 text-white ring-1 ring-rose-600/20 transition hover:bg-rose-700",
          )}
          aria-label={`Hapus rekening ${accountNo}`}
          title="Hapus rekening"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="px-3 pb-3">
        {/* key memastikan block ini re-mount dan terlihat sebagai blok terpisah */}
        <LoanAccountInfoPreview key={accountNo} accountNo={accountNo} className="mt-0" />
      </div>
    </div>
  );
}