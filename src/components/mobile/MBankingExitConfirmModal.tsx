"use client";

import { cn } from "@/lib/utils";

export default function MBankingExitConfirmModal({
  open,
  onCancel,
  onExit,
}: {
  open: boolean;
  onCancel: () => void;
  onExit: () => void;
}) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/35 px-7">
      <div className="w-full max-w-[315px] overflow-hidden rounded-[18px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.25)]">
        <div className="px-6 pb-5 pt-6 text-left">
          <div className="text-[18px] font-extrabold leading-tight tracking-tight text-[#000000]">
            Info
          </div>

          <div className="mt-3 text-[13px] font-normal leading-relaxed text-[#7A7A7A]">
            Apakah yakin keluar dari aplikasi
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[40px] w-[80px] rounded-full",
              "bg-[#828282] text-[14px] font-semibold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onExit}
            className={cn(
              "h-[40px] w-[80px] rounded-full",
              "bg-[#EF135D] text-[14px] font-semibold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}