"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewMBankingDeleteSavedRecipientConfirmModal({
  open,
  title = "Hapus Data Tersimpan?",
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
  }, [open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[150] flex items-end justify-center bg-black/35 px-5 pb-5 pt-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi hapus"
        onClick={onCancel}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[365px] overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FCE4E7] text-[#DC3545]">
              <AlertTriangle className="h-5 w-5" strokeWidth={2.8} />
            </span>

            <div className="text-[16px] font-bold leading-tight text-black">
              {title}
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-[24px] grid gap-[10px]">
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "h-[46px] rounded-[8px] bg-[#DC3545]",
              "text-[12px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Ya, Hapus
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[46px] rounded-[8px] border border-[#D9D9D9] bg-white",
              "text-[12px] font-semibold leading-none text-[#828282]",
              "transition active:scale-[0.98]",
            )}
          >
            Batal
          </button>
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}