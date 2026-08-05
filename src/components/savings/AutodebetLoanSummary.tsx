"use client";

import { cn } from "@/lib/utils";

type AutodebetLoanSummaryProps = {
  totalPlafon: string;
  totalPokok: string;
  totalBunga: string;
  totalAngsuran: string;
};

const items = [
  { key: "totalPlafon", label: "Total Plafon" },
  { key: "totalPokok", label: "Total Pokok" },
  { key: "totalBunga", label: "Total Bunga" },
  { key: "totalAngsuran", label: "Total Angsuran" },
] as const;

export default function AutodebetLoanSummary({
  totalPlafon,
  totalPokok,
  totalBunga,
  totalAngsuran,
}: AutodebetLoanSummaryProps) {
  const values = {
    totalPlafon,
    totalPokok,
    totalBunga,
    totalAngsuran,
  };

  return (
    <div className="rounded-[5px] border border-slate-300 bg-white p-4 shadow-sm">
      <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
        Informasi Pinjaman
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.key}
            className={cn(
              "rounded-[5px] border border-slate-200 bg-slate-50 px-3 py-3",
              item.key === "totalAngsuran"
                ? "border-blue-200 bg-blue-50"
                : "",
            )}
          >
            <div className="text-[11px] font-semibold text-slate-600">
              {item.label}
            </div>
            <div className="mt-1 text-[14px] font-extrabold tabular-nums text-slate-900">
              {values[item.key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}