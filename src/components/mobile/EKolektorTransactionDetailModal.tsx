"use client";

import * as React from "react";
import { Check, FileText, Mail, MessageCircle, Send, Share2, Zap } from "lucide-react";
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
  const [shareOpen, setShareOpen] = React.useState(false);

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

        <div className="-mt-1 flex flex-col items-center gap-3">
          <div
            className="relative z-10 flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(201, 218, 243, 0.5)" }}
          >
            <Check
              className="relative z-20 h-[56px] w-[56px] shrink-0"
              style={{ color: "#0057C8" }}
              strokeWidth={3.5}
            />
          </div>
          <h2
            id="transaction-detail-title"
            className="text-center text-[20px] font-extrabold leading-none tracking-tight text-[#203064]"
          >
            Sukses
          </h2>
        </div>

        <div
          className="mt-7 flex h-[81px] w-full items-center justify-center rounded-[12px] px-4"
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <div
              className="text-[25px] font-extrabold leading-tight tracking-tight text-[#203064]"
              style={{ backgroundColor: "#F6F6F6" }}
            >
              {amount}
            </div>
            <div
              className="mt-2 text-[12px] font-normal leading-tight tracking-tight text-[#828282]"
              style={{ backgroundColor: "#F6F6F6" }}
            >
              Jumlah Transaksi
            </div>
          </div>
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
              "h-[39px] w-full rounded-full bg-[#004FC7] text-[13px] font-semibold text-white",
              "transition hover:bg-[#0046B3] active:translate-y-px",
            )}
          >
            Cetak Bukti
          </button>
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className={cn(
              "h-[39px] w-full rounded-full bg-[#004FC7] text-[13px] font-semibold text-white",
              "transition hover:bg-[#0046B3] active:translate-y-px",
            )}
          >
            Bagikan
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

      {shareOpen ? (
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
      ) : null}
    </div>
  );
}
