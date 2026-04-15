"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className={cn("text-slate-600", strong ? "font-semibold" : "")}>
        {label}
      </div>
      <div className={cn("text-slate-900", strong ? "font-semibold" : "")}>
        {value}
      </div>
    </div>
  );
}

type TransactionType =
  | "Pembayaran Angsuran"
  | "Pembayaran Rincian Tagihan"
  | "Pelunasan";

function transactionLabel(v: TransactionType) {
  if (v === "Pembayaran Angsuran") return "Pembayaran angsuran";
  if (v === "Pembayaran Rincian Tagihan") return "Pembayaran rincian tagihan";
  return "Pelunasan";
}

export default function BillSummaryCard({
  mode,
  totals,
  installment,
  className,
  transactionType,
  onTransactionTypeChange,
}: {
  mode: "regular" | "pelunasan";
  totals: { pokok: string; bunga: string; denda: string; total: string };
  installment: { ke: string; lunas: string; seharusnya: string };
  className?: string;
  transactionType: TransactionType;
  onTransactionTypeChange: (v: TransactionType) => void;
}) {
  return (
    <Card
      className={cn(
        "relative rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4",
        className,
      )}
    >
      {/* Header: title only */}
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">RINGKASAN TAGIHAN</div>
      </div>

      {/* Dropdown moved BELOW title */}
      <div className="mt-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "inline-flex h-9 w-full items-center justify-between gap-2 rounded-full",
                "bg-white px-4 text-sm font-semibold text-slate-800",
                "ring-1 ring-slate-200 transition hover:bg-slate-50",
              )}
              aria-label="Pilih transaksi"
            >
              <span className="truncate">
                {transactionType ? transactionLabel(transactionType) : "Pilih transaksi"}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] rounded-2xl border-slate-200 p-1"
          >
            <DropdownMenuItem
              className={cn(
                "rounded-xl",
                transactionType === "Pembayaran Angsuran" ? "bg-slate-100" : "",
              )}
              onClick={() => onTransactionTypeChange("Pembayaran Angsuran")}
            >
              Pembayaran angsuran
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "rounded-xl",
                transactionType === "Pembayaran Rincian Tagihan"
                  ? "bg-slate-100"
                  : "",
              )}
              onClick={() => onTransactionTypeChange("Pembayaran Rincian Tagihan")}
            >
              Pembayaran rincian tagihan
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "rounded-xl",
                transactionType === "Pelunasan" ? "bg-slate-100" : "",
              )}
              onClick={() => onTransactionTypeChange("Pelunasan")}
            >
              Pelunasan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mt-2 text-[11px] font-medium text-slate-500">
          Pilihan ini akan mengubah field transaksi di panel sebelah.
        </div>
      </div>

      <Separator className="my-4 bg-slate-200/70" />

      <div className="space-y-2 text-sm">
        <SummaryRow label="Total Pokok" value={totals.pokok} />
        <SummaryRow label="Total Bunga" value={totals.bunga} />
        <SummaryRow label="Total Denda" value={totals.denda} />

        <SummaryRow
          label={
            mode === "pelunasan" ? (
              <span className="text-slate-900">
                <span className="block">Total</span>
                <span className="block">Pelunasan</span>
              </span>
            ) : (
              "Total Tagihan"
            )
          }
          value={totals.total}
          strong
        />

        <Separator className="my-3 bg-slate-200/70" />

        <SummaryRow label="Angsuran Ke" value={installment.ke} />
        <SummaryRow label="Angsuran Lunas" value={installment.lunas} />
        <SummaryRow label="Angsuran Seharusnya" value={installment.seharusnya} />
      </div>
    </Card>
  );
}