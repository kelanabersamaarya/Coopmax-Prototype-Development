"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function ActionButton({
  children,
  variant,
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-[60px] w-[190px] rounded-[5px] text-[16px] font-semibold transition",
        variant === "primary"
          ? "bg-[#2f80ed] text-white ring-2 ring-[#2f80ed]/30 hover:bg-[#266ed0]"
          : "bg-[#7f8aa0] text-white ring-2 ring-[#7f8aa0]/20 hover:bg-[#6f7a90]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default function PenaltyCancelConfirmModal({
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
          "w-[calc(100vw-1rem)] sm:w-[490px]",
          "max-w-[490px]",
          "h-[310px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // hide default close button
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="relative h-full bg-white px-6 py-8">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="-mt-2 grid h-20 w-20 place-items-center rounded-full ring-2 ring-[#f2b48c]">
              <div className="text-5xl font-semibold text-[#f2b48c]">!</div>
            </div>

            <div className="mt-5 text-[20px] font-semibold leading-tight tracking-tight text-slate-900">
              Yakin Melakukan Pembatalan Denda?
            </div>

            <div className="mt-6 inline-flex items-center gap-[6px]">
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