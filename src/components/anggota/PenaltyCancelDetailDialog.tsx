"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const R = "rounded-[5px]";

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-start">
      <div className="pt-1 text-[14px] font-normal text-slate-900">{label}</div>
      <div className="min-w-0 text-[14px] font-semibold text-slate-900">
        {children}
      </div>
    </div>
  );
}

export default function PenaltyCancelDetailDialog({
  open,
  onOpenChange,
  cancelDate,
  reason,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  cancelDate: string;
  reason: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[720px]",
          "max-w-[720px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                Detail Pembatalan
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center",
                R,
                "text-slate-700 transition hover:bg-slate-100",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-6">
            <div className="grid gap-5">
              <FieldRow label="Tanggal pembatalan">{cancelDate}</FieldRow>

              <FieldRow label="Alasan pembatalan">
                <div className="whitespace-pre-wrap break-words font-semibold text-slate-900">
                  {reason}
                </div>
              </FieldRow>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "w-[90px] h-[28px] px-2",
                  "rounded-[6px]",
                  "text-[11px] font-bold tracking-tight text-white",
                  "bg-[#6B7A90] ring-1 ring-[#6B7A90]/25 transition hover:bg-[#5f6d82]",
                )}
              >
                <X className="h-4 w-4" strokeWidth={3} />
                Tutup
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}