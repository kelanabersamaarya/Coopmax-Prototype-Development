"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function BillingTableHeader({
  hideSelection,
  showPenaltyColumn,
  showActionColumn = false,
  showStatusColumn = false,
  className,
}: {
  hideSelection: boolean;
  showPenaltyColumn: boolean;
  showActionColumn?: boolean;
  showStatusColumn?: boolean;
  className?: string;
}) {
  const thBase =
    "px-4 py-3 text-left align-bottom text-[10px] font-extrabold uppercase leading-[15px] tracking-wide text-slate-700";
  const thRight = thBase;

  return (
    <thead className={cn("bg-white", className)}>
      <tr className="border-b border-slate-200">
        {!hideSelection ? (
          <th className={cn(thBase, "w-[44px]")}>
            <span className="sr-only">Pilih</span>
          </th>
        ) : null}

        <th className={cn(thBase, "w-[120px] min-w-[120px] max-w-[120px] whitespace-nowrap")}>
          Jatuh
          <br />
          Tempo
        </th>

        <th className={cn(thRight, "w-[128px] min-w-[128px] max-w-[128px]")}>
          Total Tagihan
          <br />
          Belum Dibayar
        </th>

        <th className={cn(thRight, "w-[128px] min-w-[128px] max-w-[128px]")}>
          Tagihan
          <br />
          Pokok
        </th>

        <th className={cn(thRight, "w-[128px] min-w-[128px] max-w-[128px]")}>
          Tagihan
          <br />
          Bunga
        </th>

        <th className={cn(thRight, "w-[128px] min-w-[128px] max-w-[128px]")}>
          Sisa Tagihan
          <br />
          Pokok
        </th>

        <th className={cn(thRight, "w-[128px] min-w-[128px] max-w-[128px]")}>
          Sisa Tagihan
          <br />
          Bunga
        </th>

        {showPenaltyColumn ? (
          <th className={cn(thRight, "w-[128px] min-w-[128px] max-w-[128px]")}>
            Tagihan
            <br />
            Denda
          </th>
        ) : null}

        {showActionColumn ? (
          <th className="w-[56px] min-w-[56px] max-w-[56px] px-4 py-3 text-left align-bottom text-[10px] font-extrabold uppercase leading-[15px] tracking-wide text-slate-700">
            <span className="sr-only">Aksi</span>
          </th>
        ) : null}

        {showStatusColumn ? (
          <th className={cn(thBase, "min-w-[170px] whitespace-nowrap")}>Status Tagihan</th>
        ) : null}
      </tr>
    </thead>
  );
}