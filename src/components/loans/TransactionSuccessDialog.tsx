"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function TransactionSuccessDialog({
  open,
  onOpenChange,
  onBackToList,
  onViewDetail,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onBackToList: () => void;
  onViewDetail: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[760px]",
          "max-w-[760px]",
          "rounded-2xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // hide default close (biar tampilan mirip)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white ring-4 ring-emerald-200/60">
              <Check className="h-11 w-11 text-emerald-500" strokeWidth={3} />
            </div>

            <div className="mt-7 text-[34px] font-semibold tracking-tight text-slate-700">
              Berhasil menambahkan transaksi
            </div>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={onBackToList}
                className={cn(
                  "h-12 w-full rounded-md",
                  "bg-[#9aa3af] text-white",
                  "text-[18px] font-semibold",
                  "ring-2 ring-[#9aa3af]/25 transition hover:bg-[#8b95a3]",
                )}
              >
                Kembali ke Daftar
              </button>

              <button
                type="button"
                onClick={onViewDetail}
                className={cn(
                  "h-12 w-full rounded-md",
                  "bg-[#2f80ed] text-white",
                  "text-[18px] font-semibold",
                  "ring-4 ring-[#2f80ed]/25 transition hover:bg-[#266ed0]",
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