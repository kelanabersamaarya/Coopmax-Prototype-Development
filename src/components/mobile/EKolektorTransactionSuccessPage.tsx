"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";
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
        <div className="flex h-full flex-col items-center px-7 pb-8 pt-[54px] text-center">
          <section className="w-full max-w-[340px] overflow-hidden rounded-[26px] bg-white px-6 pb-8 pt-7 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
            <div className="text-[20px] font-extrabold leading-none tracking-tight text-black">
              Solusi Sakti
            </div>

            <div className="mt-10 flex justify-center">
              <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full bg-[rgba(75,186,222,0.12)]">
                <Check
                  className="h-[52px] w-[52px] text-[#4BBADE]"
                  strokeWidth={3.2}
                />
              </div>
            </div>

            <div className="mt-7 text-[20px] font-extrabold leading-tight tracking-tight text-black">
              Berhasil Menambahkan Transaksi
            </div>

            <div className="mt-7 flex h-[81px] w-full flex-col items-center justify-center rounded-[12px] bg-[#F6F6F6] px-4">
              <div className="text-[25px] font-extrabold leading-tight tracking-tight text-[#203064]">
                Rp. 50.000,00
              </div>
              <div className="mt-2 text-[12px] font-normal leading-tight tracking-tight text-[#828282]">
                Jumlah Transaksi
              </div>
            </div>

            <div className="mt-7 grid gap-5 text-left text-[16px] leading-tight">
              <div>
                <div className="font-extrabold tracking-tight text-[#203064]">
                  No.Rekening:
                </div>
                <div className="mt-2 font-extrabold tracking-tight text-[#203064]">
                  Laura Patel
                </div>
                <div className="mt-2 font-extrabold tracking-tight text-[#828282]">
                  7260175
                </div>
              </div>

              <div>
                <div className="font-extrabold tracking-tight text-[#203064]">
                  Tanggal:
                </div>
                <div className="mt-2 font-extrabold tracking-tight text-[#203064]">
                  5 Jun 2026
                </div>
                <div className="mt-2 font-extrabold tracking-tight text-[#828282]">
                  15:31
                </div>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3">
              <button
                type="button"
                onClick={() =>
                  toast.success("Cetak Bukti (prototype)", {
                    description: "Bukti transaksi siap dicetak.",
                  })
                }
                className={cn(
                  "h-[43px] w-full rounded-[9px]",
                  "bg-[#004FC7] text-[14px] font-semibold text-white",
                  "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
                  "transition hover:bg-[#0046B3] active:translate-y-px",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
                )}
              >
                Cetak Bukti
              </button>

              <button
                type="button"
                onClick={onDone}
                className={cn(
                  "h-[43px] w-full rounded-[9px]",
                  "bg-[#004FC7] text-[14px] font-semibold text-white",
                  "shadow-[0_3px_8px_rgba(0,79,199,0.22)]",
                  "transition hover:bg-[#0046B3] active:translate-y-px",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
                )}
              >
                Kembali
              </button>
            </div>
          </section>
        </div>
      </main>

      <EKolektorAndroidNavBar onBack={onDone} />
    </div>
  );
}