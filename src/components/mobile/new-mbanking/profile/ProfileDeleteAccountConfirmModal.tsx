"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileDeleteAccountConfirmModal({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
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
    <div className="absolute inset-0 z-[150] flex items-end bg-black/35 px-5 pb-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi hapus akun"
        onClick={onCancel}
      />

      <div className="relative z-10 w-full overflow-hidden rounded-[8px] bg-white px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FCE4E7] text-[#DC3545]">
                <AlertTriangle className="h-5 w-5" strokeWidth={2.8} />
              </span>

              <div className="text-[16px] font-bold leading-tight text-black">
                Yakin Hapus Akun?
              </div>
            </div>

            <p className="mt-3 text-[13px] font-normal leading-relaxed text-[#828282]">
              Akun M-Banking akan dihapus dan Anda akan diarahkan kembali ke
              halaman awal aplikasi.
            </p>
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
            Ya, Hapus Akun
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