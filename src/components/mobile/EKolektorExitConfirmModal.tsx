"use client";

import { cn } from "@/lib/utils";

export default function EKolektorExitConfirmModal({
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

        <div className="grid grid-cols-2 border-t border-[#E8E8E8]">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[48px] border-r border-[#E8E8E8]",
              "text-[14px] font-semibold text-[#6B7280]",
              "transition active:bg-slate-50",
            )}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onExit}
            className={cn(
              "h-[48px]",
              "text-[14px] font-extrabold text-[#004FC7]",
              "transition active:bg-blue-50",
            )}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}