"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

export default function EKolektorTransactionDetailModal({
  transaction,
  onClose,
}: {
  transaction: EKolektorTodayTransaction;
  onClose: () => void;
}) {
  const amount = transaction.amount.replace(/^\+/, "");

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/35 px-4 py-5">
      <button
        type="button"
        aria-label="Tutup detail transaksi"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-detail-title"
        className="relative w-full max-w-[340px] rounded-[22px] bg-white px-5 pb-6 pt-5 shadow-[0_12px_34px_rgba(15,23,42,0.25)]"
      >

        <div className="flex justify-center">
          <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[rgba(75,186,222,0.12)]">
            <Check className="h-[46px] w-[46px] text-[#4BBADE]" strokeWidth={3.2} />
          </div>
        </div>

        <h2
          id="transaction-detail-title"
          className="mt-4 text-center text-[20px] font-extrabold leading-tight tracking-tight text-[#203064]"
        >
          Sukses
        </h2>

        <div className="mt-5 flex h-[77px] w-full flex-col items-center justify-center rounded-[18px] bg-[#F3F3F3]">
          <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#203064]">
            {amount}
          </div>
          <div className="mt-1 text-[12px] text-[#8A8A8A]">Jumlah Transaksi</div>
        </div>

        <div className="mt-5 grid gap-4 text-left text-[14px] leading-tight">
          <div>
            <div className="font-extrabold text-[#203064]">No. Rekening</div>
            <div className="mt-1 font-extrabold text-[#203064]">{transaction.customerName}</div>
            <div className="mt-1 font-extrabold text-[#828282]">{transaction.accountNo}</div>
          </div>
          <div>
            <div className="font-extrabold text-[#203064]">Tanggal</div>
            <div className="mt-1 font-extrabold text-[#203064]">{transaction.date}</div>
            <div className="mt-1 font-extrabold text-[#828282]">{transaction.time}</div>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={() =>
              toast.success("Cetak Bukti (prototype)", {
                description: "Bukti transaksi siap dicetak.",
              })
            }
            className={cn(
              "h-[39px] w-full rounded-full bg-[#4BBADE] text-[13px] font-semibold text-white",
              "shadow-[0_3px_8px_rgba(75,186,222,0.22)] transition hover:bg-[#3EA9CD] active:translate-y-px",
            )}
          >
            Cetak Bukti
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-[39px] w-full rounded-full bg-[#A5A5A5] text-[13px] font-semibold text-white transition hover:bg-[#969696] active:translate-y-px"
          >
            Kembali
          </button>
        </div>
      </section>
    </div>
  );
}
