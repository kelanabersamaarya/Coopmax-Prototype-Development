"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function BillingTableHeader({
  hideSelection,
  showPenaltyColumn,
  className,
}: {
  hideSelection: boolean;
  showPenaltyColumn: boolean;
  className?: string;
}) {
  const thBase =
    "px-4 py-3 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";
  const thRight =
    "px-4 py-3 text-right text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700";

  return (
    <thead className={cn("bg-white", className)}>
      <tr className="border-b border-slate-200">
        {!hideSelection ? (
          <th className={cn(thBase, "w-[44px]")}>
            <span className="sr-only">Pilih</span>
          </th>
        ) : null}

        <th className={thBase}>
          Jatuh
          <br />
          Tempo
        </th>

        <th className={thRight}>
          Total Tagihan
          <br />
          Belum Dibayar
        </th>

        <th className={thRight}>
          Tagihan
          <br />
          Pokok
        </th>

        <th className={thRight}>
          Tagihan
          <br />
          Bunga
        </th>

        <th className={thRight}>
          Sisa Tagihan
          <br />
          Pokok
        </th>

        <th className={thRight}>
          Sisa Tagihan
          <br />
          Bunga
        </th>

        {showPenaltyColumn ? (
          <th className={thRight}>
            Tagihan
            <br />
            Denda
          </th>
        ) : null}
      </tr>
    </thead>
  );
}