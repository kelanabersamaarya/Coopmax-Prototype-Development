"use client";

import { CircleHelp } from "lucide-react";
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
    <div className="absolute inset-0 z-[120] flex items-center justify-center bg-[#17213A]/40 px-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi keluar"
        onClick={onCancel}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[440px] rounded-[26px] bg-white px-[26px] pb-[26px] pt-[27px]",
          "shadow-[0_18px_45px_rgba(15,23,42,0.24)]",
        )}
      >
        <div className="flex justify-center">
          <div className="grid h-[62px] w-[62px] place-items-center rounded-full bg-[#EAF3FF]">
            <CircleHelp className="h-[36px] w-[36px] text-[#0758C9]" strokeWidth={2.7} />
          </div>
        </div>

        <div className="mt-[26px] text-center">
          <h2 className="text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-[#263A73]">
            Keluar dari M-Banking?
          </h2>

          <p className="mt-[17px] text-[15px] font-normal leading-[1.7] tracking-[-0.01em] text-[#71809F]">
            Anda akan keluar dari aplikasi M-Banking.
            <br />
            Pastikan semua aktivitas sudah selesai.
          </p>
        </div>

        <div className="mt-[25px] grid gap-[12px]">
          <button
            type="button"
            onClick={onExit}
            className={cn(
              "h-[54px] w-full rounded-[16px]",
              "bg-[#0758C9] text-[15px] font-extrabold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Ya, Keluar
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[54px] w-full rounded-[16px] border-2 border-[#D5D9E1] bg-white",
              "text-[15px] font-extrabold text-[#768095]",
              "transition active:scale-[0.98]",
            )}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}