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
    <div className="grid gap-3">
      <div className="grid gap-2 [grid-template-columns:96px_minmax(0,1fr)]">
        <div className="text-[14px] font-normal text-slate-900">No Rek :</div>

        <div className="flex min-w-0 items-stretch">
          <Input
            placeholder="Cari nasabah"
            className={cn(
              "h-9 rounded-l-[6px] rounded-r-none",
              "border-slate-300 bg-white text-[14px] font-medium text-slate-900",
              "shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-slate-500",
            )}
          />
          <button
            type="button"
            className={cn(
              "inline-flex w-12 items-center justify-center",
              "rounded-r-[6px] rounded-l-none",
              "bg-[#6B7A90] text-white",
              "ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
            )}
            aria-label="Cari"
            title="Cari"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        <div className="text-[14px] font-normal text-slate-900">Nama :</div>
        <div />

        <div className="text-[14px] font-normal text-slate-900">Alamat :</div>
        <div />

        <div className="text-[14px] font-normal text-slate-900">Produk :</div>
        <div />
      </div>
    </div>
  );
}

export default function LoanInstallmentPaymentV2Table({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("mt-5 overflow-hidden rounded-2xl bg-white", className)}>
      <div className="safe-x-scroll">
        <table className="w-full min-w-[980px] border-collapse bg-white">
          <thead className="bg-white">
            <tr>
              <Th className="w-[90px]">NO</Th>
              <Th className="min-w-[320px]">NASABAH</Th>
              <Th className="min-w-[240px]">PINJAMAN</Th>
              <Th className="min-w-[320px] text-center" align="center">
                TRANSAKSI
              </Th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <Td className="w-[90px]">
                <span className="tabular-nums">1.</span>
              </Td>

              <Td className="min-w-[320px]">
                <NasabahRow />
              </Td>

              {/* Placeholder dulu (sesuai scope: fokus kolom NO & NASABAH) */}
              <Td className="min-w-[240px]" />
              <Td className="min-w-[320px]" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}