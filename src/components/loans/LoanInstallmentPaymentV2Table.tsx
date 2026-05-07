"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function Th({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className={cn(
        "border-b border-slate-300/70 px-4 py-3",
        "text-[12px] font-extrabold uppercase tracking-wide",
        "text-[#64748B]",
        align === "right"
          ? "text-right"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        "border-b border-slate-200 px-4 py-5 align-top",
        "text-[13px] font-medium text-slate-900",
        align === "right"
          ? "text-right tabular-nums"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

function NasabahRow() {
  return (
    <div className="grid gap-1">
      <div className="grid min-w-0 gap-y-1 gap-x-2 [grid-template-columns:62px_minmax(0,1fr)]">
        <div className="pt-0.5 text-[14px] font-normal text-slate-900 whitespace-nowrap">
          No Rek :
        </div>

        <div className="flex min-w-0 items-stretch">
          <Input
            placeholder="Cari nasabah"
            className={cn(
              "h-8 min-w-0 rounded-l-[6px] rounded-r-none",
              "border-slate-300 bg-white text-[14px] font-medium text-slate-900",
              "shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-slate-500",
            )}
          />
          <button
            type="button"
            className={cn(
              "inline-flex w-10 shrink-0 items-center justify-center",
              "rounded-r-[6px] rounded-l-none",
              "bg-[#6B7A90] text-white",
              "ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
            )}
            aria-label="Cari"
            title="Cari"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="pt-0.5 text-[14px] font-normal text-slate-900 whitespace-nowrap">
          Nama :
        </div>
        <div className="min-w-0 text-[13px] text-slate-600 truncate">-</div>

        <div className="pt-0.5 text-[14px] font-normal text-slate-900 whitespace-nowrap">
          Alamat :
        </div>
        <div className="min-w-0 text-[13px] text-slate-600 truncate">-</div>

        <div className="pt-0.5 text-[14px] font-normal text-slate-900 whitespace-nowrap">
          Produk :
        </div>
        <div className="min-w-0 text-[13px] text-slate-600 truncate">-</div>
      </div>
    </div>
  );
}

export default function LoanInstallmentPaymentV2Table({
  className,
}: {
  className?: string;
}) {
  // NO (56) + NASABAH (280) = 336px
  const fixedPx = 56 + 280;

  return (
    <div className={cn("mt-5 overflow-hidden rounded-2xl bg-white", className)}>
      <table className="w-full table-fixed border-collapse bg-white">
        <colgroup>
          <col style={{ width: 56 }} />
          <col style={{ width: 280 }} />
          {/* Buat perbedaan lebih jelas */}
          <col style={{ width: `calc((100% - ${fixedPx}px) * 0.4)` }} />
          <col style={{ width: `calc((100% - ${fixedPx}px) * 0.6)` }} />
        </colgroup>

        <thead className="bg-white">
          <tr>
            <Th className="px-3">
              <div className="text-left">NO</div>
            </Th>

            <Th className="pl-3 pr-4">NASABAH</Th>

            <Th>PINJAMAN</Th>

            <Th className="text-center" align="center">
              TRANSAKSI
            </Th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <Td className="px-3">
              <span className="tabular-nums">1.</span>
            </Td>

            <Td className="pl-3 pr-4">
              <NasabahRow />
            </Td>

            <Td />
            <Td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}