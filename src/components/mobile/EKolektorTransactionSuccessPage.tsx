"use client";

import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function EKolektorTransactionSuccessPage({
  onDone,
}: {
  onDone: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <main className="min-h-0 flex-1 overflow-hidden bg-[#004FC7]">
        <div className="flex h-full flex-col items-center px-7 pb-8 pt-[112px] text-center">
          <div className="flex-1" />

          <button
            type="button"
            onClick={onDone}
            className={cn(
              "inline-flex h-[43px] w-full items-center justify-center gap-2 rounded-[9px]",
              "bg-white text-[14px] font-semibold text-[#004FC7]",
              "shadow-[0_3px_8px_rgba(0,0,0,0.16)]",
              "transition hover:bg-white/95 active:translate-y-px",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/25",
            )}
          >
            <Home className="h-4.5 w-4.5" />
            Kembali ke Beranda
          </button>
        </div>
      </main>

      <EKolektorAndroidNavBar onBack={onDone} />
    </div>
  );
}