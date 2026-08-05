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
    <section className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-[#F9FAFF] px-4 py-2.5">
        <div className="text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
          Informasi Pinjaman
        </div>
      </div>

      <div className="px-4 py-1">
        {items.map((item) => (
          <div
            key={item.key}
            className="grid gap-1 py-2 sm:grid-cols-[minmax(180px,0.9fr)_minmax(0,1fr)] sm:items-center"
          >
            <div className="text-[13px] font-normal text-slate-600">
              {item.label}
            </div>

            <div
              className={cn(
                "text-[14px] font-semibold tabular-nums text-slate-900",
                item.key === "totalAngsuran" ? "text-[#2563EB]" : "",
              )}
            >
              {values[item.key]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}