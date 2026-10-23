"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function BillingTableHeader({
  hideSelection,
  showPenaltyColumn,
  showStatusColumn = false,
  className,
}: {
  hideSelection: boolean;
  showPenaltyColumn: boolean;
  showStatusColumn?: boolean;
  className?: string;
}) {
  const thBase =
    "px-2 py-3 text-left align-middle text-[10px] font-extrabold uppercase leading-[15px] tracking-wide text-slate-700";
  const thRight =
    "px-2 py-3 text-left align-middle text-[10px] font-extrabold uppercase leading-[15px] tracking-wide text-slate-700";

  return (
    <thead className={cn("bg-white", className)}>
      <tr className="border-b border-slate-200">
        {!hideSelection ? (
          <th className={cn(thBase, "w-[44px]")}>
            <span className="sr-only">Pilih</span>
          </th>
        ) : null}

        <th className={cn(thBase, "w-[100px] min-w-[100px] max-w-[100px]")}>
          Jatuh
          <br />
          Tempo
        </th>

        <th className={cn(thRight, "w-[116px]")}>
          Total Tagihan
          <br />
          Belum Dibayar
        </th>

        <th className={cn(thRight, "w-[118px]")}>
          Tagihan
          <br />
          Pokok
        </th>

        <th className={cn(thRight, "w-[108px]")}>
          Tagihan
          <br />
          Bunga
        </th>

        <th className={cn(thRight, "w-[126px]")}>
          Sisa Tagihan
          <br />
          Pokok
        </th>

        <th className={cn(thRight, "w-[126px]")}>
          Sisa Tagihan
          <br />
          Bunga
        </th>

        {showPenaltyColumn ? (
          <th className={cn(thRight, "w-[118px]")}>
            Tagihan
            <br />
            Denda
          </th>
        ) : null}

        {showStatusColumn ? (
          <th className={cn(thBase, "w-[132px]")}>Status Tagihan</th>
        ) : null}
      </tr>
    </thead>
  );
}