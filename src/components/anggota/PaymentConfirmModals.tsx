"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

function ModalShell({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.5rem)] sm:w-[520px]",
          "max-w-[520px]",
          "rounded-2xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
        )}
      >
        <div className="bg-white px-6 py-7 sm:px-7 sm:py-8">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

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
        "h-11 w-full rounded-md text-sm font-semibold transition",
        variant === "primary"
          ? "bg-[#2f80ed] text-white ring-2 ring-[#2f80ed]/30 hover:bg-[#266ed0]"
          : "bg-[#7f8aa0] text-white ring-2 ring-[#7f8aa0]/20 hover:bg-[#6f7a90]",
      )}
    >
      {children}
    </button>
  );
}

export function PaymentConfirmModal({
  open,
  onCancel,
  onYes,
}: {
  open: boolean;
  onCancel: () => void;
  onYes: () => void;
}) {
  return (
    <ModalShell open={open} onOpenChange={(v) => (!v ? onCancel() : null)}>
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white ring-2 ring-[#f2b48c]">
            <div className="text-4xl font-semibold text-[#f2b48c]">!</div>
          </div>
        </div>

        <div className="mt-6 text-lg font-semibold text-slate-900">
          Yakin untuk menyimpan data?
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-4">
          <ActionButton variant="primary" onClick={onYes}>
            Yes
          </ActionButton>
          <ActionButton variant="secondary" onClick={onCancel}>
            Cancel
          </ActionButton>
        </div>
      </div>
    </ModalShell>
  );
}

export function PaymentSuccessModal({
  open,
  onOk,
}: {
  open: boolean;
  onOk: () => void;
}) {
  return (
    <ModalShell open={open} onOpenChange={(v) => (!v ? onOk() : null)}>
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
          <Check className="h-11 w-11 text-[#33aa00]" strokeWidth={3} />
        </div>

        <div className="mt-6 text-2xl font-semibold tracking-tight text-slate-900">
          Berhasil menambahkan transaksi
        </div>

        <div className="mt-6 w-full max-w-[220px]">
          <button
            type="button"
            onClick={onOk}
            className="h-12 w-full rounded-md bg-[#2f80ed] text-sm font-semibold text-white ring-2 ring-[#2f80ed]/30 hover:bg-[#266ed0]"
          >
            OK
          </button>
        </div>
      </div>
    </ModalShell>
  );
}