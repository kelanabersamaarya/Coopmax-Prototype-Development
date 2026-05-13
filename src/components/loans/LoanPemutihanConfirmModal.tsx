"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function ActionButton({
  children,
  variant,
  onClick,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-12 w-full rounded-[8px] text-[14px] font-semibold transition",
        variant === "primary"
          ? "bg-[#2f80ed] text-white ring-2 ring-[#2f80ed]/30 hover:bg-[#266ed0]"
          : "bg-[#7f8aa0] text-white ring-2 ring-[#7f8aa0]/20 hover:bg-[#6f7a90]",
      )}
    >
      {children}
    </button>
  );
}

export default function LoanPemutihanConfirmModal({
  open,
  onCancel,
  onYes,
}: {
  open: boolean;
  onCancel: () => void;
  onYes: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onCancel() : null)}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.5rem)] sm:w-[720px]",
          "max-w-[720px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // hide default close button (kita pakai X custom)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="relative bg-white px-6 py-10 sm:px-10 sm:py-12">
          <button
            type="button"
            onClick={onCancel}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full ring-2 ring-[#f2b48c]">
              <div className="text-5xl font-semibold text-[#f2b48c]">!</div>
            </div>

            <div className="mt-8 text-2xl font-semibold tracking-tight text-slate-900">
              Yakin Melakukan Pemutihan Pinjaman?
            </div>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <ActionButton variant="primary" onClick={onYes}>
                Yes
              </ActionButton>
              <ActionButton variant="secondary" onClick={onCancel}>
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}