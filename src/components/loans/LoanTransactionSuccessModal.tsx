"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function LoanTransactionSuccessModal({
  open,
  onBackToList,
  onViewDetail,
  onOpenChange,
}: {
  open: boolean;
  onBackToList: () => void;
  onViewDetail: () => void;
  onOpenChange?: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.5rem)] sm:w-[560px]",
          "max-w-[560px]",
          "rounded-2xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // hide default shadcn close button (biar sesuai style modal sebelumnya)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white px-7 py-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
              <Check className="h-11 w-11 text-[#33aa00]" strokeWidth={3} />
            </div>

            <div className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
              Berhasil menambahkan transaksi
            </div>

            <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onBackToList}
                className={cn(
                  "h-11 w-full rounded-md text-sm font-semibold transition",
                  "bg-[#7f8aa0] text-white ring-2 ring-[#7f8aa0]/20 hover:bg-[#6f7a90]",
                )}
              >
                Kembali ke Daftar
              </button>

              <button
                type="button"
                onClick={onViewDetail}
                className={cn(
                  "h-11 w-full rounded-md text-sm font-semibold transition",
                  "bg-[#2f80ed] text-white ring-2 ring-[#2f80ed]/30 hover:bg-[#266ed0]",
                )}
              >
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}