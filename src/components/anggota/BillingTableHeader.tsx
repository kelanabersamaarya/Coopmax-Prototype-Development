"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export default function BillingTableHeader({
  hideSelection,
  showPenaltyColumn,
  showActionColumn = false,
  showStatusColumn = false,
  layout = "default",
  className,
}: {
  hideSelection: boolean;
  showPenaltyColumn: boolean;
  showActionColumn?: boolean;
  showStatusColumn?: boolean;
  layout?: "default" | "loan-dialog";
  className?: string;
}) {
  const thBase =
    "px-[5px] py-3 text-left align-middle text-[12px] font-extrabold uppercase leading-[15px] tracking-wide text-slate-700";
  const thRight = thBase;
  const totalAmountWidth = layout === "loan-dialog" ? "w-[80px] min-w-[80px] max-w-[80px]" : "w-[90px] min-w-[90px] max-w-[90px]";
  const penaltyWidth = layout === "loan-dialog" ? "w-[84px] min-w-[84px] max-w-[84px]" : "w-[60px] min-w-[60px] max-w-[60px]";

  return (
    <thead className={cn("bg-white", className)}>
      <tr className="border-b border-[#CDD4E0]">
        {!hideSelection ? (
          <th className={cn(thBase, "w-[36px]")}>
            <span className="sr-only">Pilih</span>
          </th>
        ) : null}

        <th className={cn(thBase, "w-[72px] min-w-[72px] max-w-[72px] whitespace-nowrap")}>
          <span className="inline-block translate-x-1">
            Jatuh
            <br />
            Tempo
          </span>
        </th>

        <th className={cn(thRight, totalAmountWidth)}>
          Total Tagihan
          <br />
          Belum Dibayar
        </th>

        <th className={cn(thRight, "w-[100px] min-w-[100px] max-w-[100px]")}>
          Tagihan
          <br />
          Pokok
        </th>

        <th className={cn(thRight, "w-[100px] min-w-[100px] max-w-[100px]")}>
          Tagihan
          <br />
          Bunga
        </th>

        <th className={cn(thRight, "w-[100px] min-w-[100px] max-w-[100px]")}>
          Sisa Tagihan
          <br />
          Pokok
        </th>

        <th className={cn(thRight, "w-[100px] min-w-[100px] max-w-[100px]")}>
          Sisa Tagihan
          <br />
          Bunga
        </th>

        {showPenaltyColumn ? (
          <th className={cn(thRight, penaltyWidth)}>
            Tagihan
            <br />
            Denda
          </th>
        ) : null}

        {showActionColumn ? (
          <th className="w-[24px] min-w-[24px] max-w-[24px] px-0 py-3 text-left align-middle text-[12px] font-extrabold uppercase leading-[15px] tracking-wide text-slate-700">
            <span className="sr-only">Aksi</span>
          </th>
        ) : null}

        {showStatusColumn ? (
          <th className={cn(thBase, "w-[76px] min-w-[76px]")}>
           Status
            <br />
            Tagihan
          </th>
        ) : null}
      </tr>
    </thead>
  );
}