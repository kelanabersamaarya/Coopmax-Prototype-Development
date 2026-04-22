"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function LoanTypeRequiredDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[680px]",
          "max-w-[680px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // hide default close button (biar sesuai modal contoh)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full ring-4 ring-[#f2b48c]/35">
              <div className="text-5xl font-semibold text-[#f2b48c]">!</div>
            </div>

            <div className="mt-6 text-4xl font-semibold tracking-tight text-slate-800">
              Peringatan
            </div>

            <div className="mt-3 text-lg text-slate-700">
              Jenis Pinjaman belum dipilih
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "mt-8 inline-flex h-12 min-w-[140px] items-center justify-center",
                "rounded-xl bg-[#2f80ed] px-8 text-base font-semibold text-white",
                "ring-2 ring-[#2f80ed]/25 transition hover:bg-[#266ed0]",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2f80ed]/25",
              )}
            >
              OK
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}