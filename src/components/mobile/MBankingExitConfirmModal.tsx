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
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-[#17213A]/40 px-5 pb-[28px]">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi keluar"
        onClick={onCancel}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[390px] rounded-[24px] bg-white px-[22px] pb-[22px] pt-[22px]",
          "shadow-[0_18px_45px_rgba(15,23,42,0.24)]",
        )}
      >
        <div className="flex justify-center">
          <div className="grid h-[54px] w-[54px] place-items-center rounded-full bg-[#EAF3FF]">
            <CircleHelp className="h-[31px] w-[31px] text-[#0758C9]" strokeWidth={2.7} />
          </div>
        </div>

        <div className="mt-[20px] text-center">
          <h2 className="text-[18px] font-extrabold leading-tight tracking-[-0.03em] text-[#263A73]">
            Keluar dari M-Banking?
          </h2>
        </div>

        <div className="mt-[20px] grid gap-[10px]">
          <button
            type="button"
            onClick={onExit}
            className={cn(
              "h-[48px] w-full rounded-[14px]",
              "bg-[#0758C9] text-[13px] font-extrabold text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Ya, Keluar
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "h-[48px] w-full rounded-[14px] border-2 border-[#D5D9E1] bg-white",
              "text-[13px] font-extrabold text-[#768095]",
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