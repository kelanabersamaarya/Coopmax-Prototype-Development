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
          <div className="w-full max-w-[340px] overflow-hidden rounded-[26px] bg-white px-6 pb-8 pt-7 text-left shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
            <div className="grid gap-6">
              <div>
                <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
                  Jenis transaksi
                </div>
                <div className="mt-2 text-[14px] font-extrabold leading-tight tracking-tight text-[#243464]">
                  Angsuran Pinjaman
                </div>
              </div>

              <div>
                <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#9A9A9A]">
                  Nominal transaksi
                </div>
                <div className="mt-2 text-[14px] font-extrabold leading-tight tracking-tight text-[#243464]">
                  Rp. 50.000,00
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onDone}
            className={cn(
              "mt-auto inline-flex h-[43px] w-full items-center justify-center gap-2 rounded-[9px]",
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