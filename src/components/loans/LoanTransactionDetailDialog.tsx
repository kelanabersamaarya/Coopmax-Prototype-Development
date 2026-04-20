"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type LoanTransactionDetail = {
  transactionNo: string;
  nominal: string;
  transactionType: string;
  transactionDateTime: string;
  principalInstallment: string;
  interestInstallment: string;
  loanStart: string;
  loanEnd: string;
};

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-semibold text-white/85">
        <span className="block break-words">{label}</span>
      </div>
      <div className="mt-1 text-sm font-extrabold tracking-tight text-white">
        <span className="block break-words leading-snug">{value}</span>
      </div>
    </div>
  );
}

export default function LoanTransactionDetailDialog({
  open,
  onOpenChange,
  accountNo,
  detail,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accountNo: string;
  detail: LoanTransactionDetail | null;
}) {
  if (!detail) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[760px]",
          "max-w-[760px]",
          "overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          // hide default close button (biar hanya X custom)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Detail Transaksi
              </div>
              <div className="mt-0.5 text-xs font-semibold text-slate-500">
                Rekening: <span className="text-slate-700">{accountNo}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="overflow-hidden rounded-3xl bg-[#17a2b8] p-5 text-white shadow-sm ring-1 ring-white/10 sm:p-6">
              <div className="text-sm font-extrabold tracking-wide">
                TRANSAKSI PINJAMAN
              </div>

              <div
                className={cn(
                  "mt-5 grid gap-x-8 gap-y-5",
                  "sm:[grid-template-columns:repeat(2,minmax(0,1fr))]",
                  "lg:[grid-template-columns:repeat(4,minmax(0,1fr))]",
                )}
              >
                <Field label="No. Transaksi" value={detail.transactionNo} />
                <Field label="Nominal" value={detail.nominal} />
                <Field label="Jenis Transaksi" value={detail.transactionType} />
                <Field
                  label="Tanggal & Waktu Transaksi"
                  value={detail.transactionDateTime}
                />

                <Field label="Angsuran Pokok" value={detail.principalInstallment} />
                <Field label="Angsuran Bunga" value={detail.interestInstallment} />
                <Field label="Pinjaman Awal" value={detail.loanStart} />
                <Field label="Pinjaman Akhir" value={detail.loanEnd} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}