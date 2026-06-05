"use client";

import { Check, Home } from "lucide-react";
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
        <div className="flex h-full flex-col items-center px-7 pb-8 pt-[92px] text-center">
          <div className="grid h-[108px] w-[108px] place-items-center rounded-full bg-white/15 ring-1 ring-white/20">
            <Check className="h-[58px] w-[58px] text-white" strokeWidth={3.2} />
          </div>

          <h1 className="mt-8 text-[25px] font-extrabold leading-tight tracking-tight text-white">
            Transaksi Berhasil
          </h1>

          <p className="mt-3 max-w-[280px] text-[14px] font-normal leading-relaxed text-white/80">
            Pembayaran angsuran pinjaman berhasil dikirim dan menunggu proses
            sinkronisasi.
          </p>

          <div className="mt-9 w-full overflow-hidden rounded-[22px] bg-white text-left shadow-[0_12px_34px_rgba(15,23,42,0.18)] ring-1 ring-white/20">
            <div className="bg-white px-5 py-4">
              <div className="text-[12px] font-normal text-[#8A8A8A]">
                Nomor Transaksi
              </div>
              <div className="mt-1 text-[16px] font-extrabold tracking-tight text-[#23305A]">
                TRX-ANG-0001
              </div>
            </div>

            <div className="grid gap-4 px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="text-[13px] font-normal text-[#8A8A8A]">
                  Jenis Transaksi
                </div>
                <div className="text-right text-[13px] font-extrabold text-[#23305A]">
                  Angsuran Pinjaman
                </div>
              </div>

              <div className="h-px w-full bg-[#E8E8E8]" />

              <div className="flex items-start justify-between gap-4">
                <div className="text-[13px] font-normal text-[#8A8A8A]">
                  Rekening Tujuan
                </div>
                <div className="text-right text-[13px] font-extrabold text-[#23305A]">
                  7260175
                </div>
              </div>

              <div className="h-px w-full bg-[#E8E8E8]" />

              <div className="flex items-start justify-between gap-4">
                <div className="text-[13px] font-normal text-[#8A8A8A]">
                  Nominal Transaksi
                </div>
                <div className="text-right text-[18px] font-extrabold text-[#EF135D]">
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