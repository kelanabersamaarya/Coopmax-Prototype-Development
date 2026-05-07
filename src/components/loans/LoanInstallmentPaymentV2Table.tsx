"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

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

          {/* Sementara kosong dulu sesuai permintaan (baru header) */}
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-6 text-sm text-slate-500">
                {/* intentionally blank state */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}