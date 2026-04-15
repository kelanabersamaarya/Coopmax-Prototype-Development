"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">RINGKASAN TAGIHAN</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-2 rounded-full bg-slate-50 px-3 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-white"
              aria-label="Pilih transaksi"
            >
              Pilih transaksi
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 rounded-2xl border-slate-200 p-1"
          >
            <DropdownMenuLabel className="px-2 py-2 text-xs font-semibold text-slate-600">
              Pilih transaksi
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />

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
              onClick={() =>
                onTransactionTypeChange("Pembayaran Rincian Tagihan")
              }
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
      </div>

      <Separator className="my-3 bg-slate-200/70" />

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