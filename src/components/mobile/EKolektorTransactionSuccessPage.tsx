"use client";

import * as React from "react";
import { Check, FileText, Mail, MessageCircle, Send, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

function buildSuccessTransaction(): EKolektorTodayTransaction {
  return {
    id: `angsuran-${Date.now()}`,
    customerName: "Laura Patel",
    accountNo: "7260175",
    transactionType: "Angsuran Pinjaman",
    amount: "+Rp. 5.000,00",
    date: "5 Jun 2026",
    time: "16:16",
  };
}

export default function EKolektorTransactionSuccessPage({
  onDone,
  onTransactionSaved,
}: {
  onDone: () => void;
  onTransactionSaved: (transaction: EKolektorTodayTransaction) => void;
}) {
  const [shareOpen, setShareOpen] = React.useState(false);

  function goHomeWithHistory() {
    onTransactionSaved(buildSuccessTransaction());
    onDone();
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#004FC7]">
      <main className="min-h-0 flex-1 overflow-hidden bg-[#004FC7]">
        <div className="flex h-full flex-col items-center px-7 pb-8 pt-[54px] text-center">
          <section className="w-full max-w-[340px] overflow-hidden rounded-[26px] bg-white px-6 pb-8 pt-7 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
            <div className="text-[20px] font-extrabold leading-none tracking-tight text-black">
              Solusi Sakti
            </div>

            <div className="mt-10 flex justify-center">
              <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full bg-[rgba(0,79,199,0.2)]">
                <Check
                  className="h-[52px] w-[52px] text-[#004FC7]"
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
                  "h-[43px] w-full rounded-full border border-[#004FC7] bg-white text-[14px] font-semibold text-[#004FC7]",
                  "transition hover:bg-[#eff5ff] active:translate-y-px",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
                )}
              >
                Cetak Bukti
              </button>

              <button
                type="button"
                onClick={() => setShareOpen(true)}
                className={cn(
                  "h-[43px] w-full rounded-full border border-[#004FC7] bg-white text-[14px] font-semibold text-[#004FC7]",
                  "transition hover:bg-[#eff5ff] active:translate-y-px",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
                )}
              >
                Bagikan
              </button>

              <button
                type="button"
                onClick={goHomeWithHistory}
                className={cn(
                  "h-[43px] w-full rounded-full text-[14px] font-semibold text-white",
                  "bg-[#004FC7]",
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

      <EKolektorAndroidNavBar onBack={goHomeWithHistory} />

      {shareOpen ? (
        <>
          <button
            type="button"
            aria-label="Tutup panel berbagi"
            className="absolute inset-0 z-40 bg-black/20"
            onClick={() => setShareOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 z-50 rounded-t-[26px] bg-white px-4 pb-7 pt-3 shadow-[0_-8px_28px_rgba(15,23,42,0.2)]">
            <button
              type="button"
              aria-label="Tutup opsi berbagi"
              className="mx-auto mb-6 block h-1.5 w-14 rounded-full bg-[#B8B8B8]"
              onClick={() => setShareOpen(false)}
            />
            <div className="mb-5 text-[22px] font-extrabold text-[#202020]">1 item</div>
            <div className="flex items-center gap-3 rounded-[15px] bg-[#E5E5E7] px-4 py-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#E53238] text-white">
                <FileText className="h-8 w-8" />
                <span className="absolute bottom-1 text-[8px] font-extrabold tracking-tight text-white">PDF</span>
              </div>
              <div className="truncate text-[16px] font-medium text-[#202020]">
                Bukti Pembayaran Angsuran.pdf
              </div>
            </div>
            <div className="mt-5 grid grid-cols-5 gap-3 text-center">
              {[
                { label: "Quick Share", icon: Zap, color: "bg-[#2879F5]" },
                { label: "WhatsApp", icon: MessageCircle, color: "bg-[#25D366]" },
                { label: "Message", icon: MessageCircle, color: "bg-[#8AA8F0]" },
                { label: "Gmail", icon: Mail, color: "bg-[#EA4335]" },
                { label: "Telegram", icon: Send, color: "bg-[#2AABEE]" },
              ].map(({ label, icon: Icon, color }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toast.success(`${label} dipilih`)}
                  className="flex min-w-0 flex-col items-center gap-2"
                >
                  <span className={cn("flex h-14 w-14 items-center justify-center rounded-full text-white", color)}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="truncate text-[11px] text-[#202020]">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}