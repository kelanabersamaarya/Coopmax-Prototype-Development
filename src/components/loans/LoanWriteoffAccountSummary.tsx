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
      <div className="text-[12px] font-medium text-white/85">{label}</div>
      <div
        className={cn(
          "mt-1 break-words leading-snug text-white",
          strong
            ? "text-[16px] font-extrabold tracking-tight"
            : "text-[14px] font-semibold",
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
        "overflow-hidden rounded-[12px] bg-[#17A2B8] text-white",
        "ring-1 ring-white/15 shadow-sm",
        className,
      )}
    >
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="text-[13px] font-extrabold uppercase tracking-wide text-white">
          PINJAMAN BILLING
        </div>

        <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-3">
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