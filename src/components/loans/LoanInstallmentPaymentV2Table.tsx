"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Row = {
  no: number;
  rekening: string;
  nama: string;
  nominal: string;
  status: "Siap" | "Draft";
};

const seed: Row[] = [
  { no: 1, rekening: "12260006", nama: "Pangeran Sirait", nominal: "500.000,00", status: "Siap" },
  { no: 2, rekening: "SMG260004", nama: "Bapak Bagus", nominal: "1.120.000,00", status: "Draft" },
  { no: 3, rekening: "072260001", nama: "Rika Wastuti", nominal: "250.000,00", status: "Siap" },
];

function StatusPill({ value }: { value: Row["status"] }) {
  const cls =
    value === "Siap"
      ? "bg-emerald-600 text-white ring-emerald-600/20"
      : "bg-slate-200 text-slate-800 ring-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[999px] px-2.5 py-1 text-[11px] font-semibold ring-1",
        cls,
      )}
    >
      {value}
    </span>
  );
}

export default function LoanInstallmentPaymentV2Table({ className }: { className?: string }) {
  const [rows] = React.useState<Row[]>(seed);

  return (
    <div className={cn("mt-4 overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200", className)}>
      <div className="safe-x-scroll">
        <table className="min-w-[880px] w-full border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
              <th className="w-[64px] px-4 py-3">No.</th>
              <th className="w-[160px] px-4 py-3">Rekening</th>
              <th className="min-w-[240px] px-4 py-3">Nama</th>
              <th className="w-[160px] px-4 py-3 text-right">Nominal</th>
              <th className="w-[140px] px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {rows.map((r, idx) => (
              <tr
                key={r.no}
                className={cn("border-t border-slate-100 text-[13px]", idx % 2 === 0 ? "bg-white" : "bg-slate-50/60")}
              >
                <td className="px-4 py-3 tabular-nums text-slate-900">{r.no}</td>
                <td className="px-4 py-3 tabular-nums font-semibold text-slate-900">{r.rekening}</td>
                <td className="px-4 py-3 text-slate-900">{r.nama}</td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-emerald-700">
                  {r.nominal}
                </td>
                <td className="px-4 py-3">
                  <StatusPill value={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}