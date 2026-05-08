"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  accountNo: string;
  customerName: string;
  sisaPokok: string;
  sisaBunga: string;
  sisaDenda: string;
  totalKewajibanBerjalan: string;
  className?: string;
};

function Field({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[12px] font-normal text-slate-700">{label}</div>
      <div
        className={cn(
          "mt-1 break-words leading-snug",
          strong
            ? "text-[16px] font-extrabold tracking-tight text-slate-900"
            : "text-[14px] font-semibold text-slate-900",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function LoanWriteoffAccountSummary({
  accountNo,
  customerName,
  sisaPokok,
  sisaBunga,
  sisaDenda,
  totalKewajibanBerjalan,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[12px] bg-white",
        "ring-1 ring-slate-200/80 shadow-sm",
        className,
      )}
    >
      <div className="px-4 py-3 sm:px-5">
        <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
          PINJAMAN BILLING
        </div>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="No. Rekening Pinjaman" value={accountNo} />
          <Field label="Nama Nasabah" value={customerName} />

          <Field label="Sisa Pokok" value={sisaPokok} />
          <Field label="Sisa Bunga" value={sisaBunga} />

          <Field label="Sisa Denda" value={sisaDenda} />
          <Field
            label="Total Kewajiban Berjalan"
            value={totalKewajibanBerjalan}
            strong
          />
        </div>
      </div>
    </div>
  );
}