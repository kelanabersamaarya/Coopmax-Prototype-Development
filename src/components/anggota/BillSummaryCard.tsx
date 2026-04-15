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
    <div className="grid grid-cols-[minmax(0,1fr)_14px_auto] items-start gap-x-3 py-1.5 text-sm">
      <div
        className={cn(
          "leading-snug text-slate-800",
          strong ? "font-semibold text-slate-900" : "font-normal",
        )}
      >
        {label}
      </div>
      <div className="text-center text-slate-500">:</div>
      <div
        className={cn(
          "text-right tabular-nums text-slate-800",
          strong ? "font-semibold text-slate-900" : "font-normal",
        )}
      >
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

function labelStack(top: string, bottom: string) {
  return (
    <span className="block">
      <span className="block">{top}</span>
      <span className="block">{bottom}</span>
    </span>
  );
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
  transactionType?: TransactionType | null;
  onTransactionTypeChange: (v: TransactionType) => void;
}) {
  const isPembayaranKhusus = transactionType === "Pembayaran Rincian Tagihan";

  return (
    <Card
      className={cn(
        "relative rounded-2xl border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">
          RINGKASAN TAGIHAN
        </div>
      </div>

      <div className="mt-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-full items-center justify-between gap-2",
                "rounded-[5px]",
                "bg-white px-4 text-sm font-normal text-slate-800",
                "ring-1 ring-slate-200 transition hover:bg-slate-50",
              )}
              aria-label="Pilih transaksi"
            >
              <span
                className={cn("truncate", transactionType ? "" : "text-slate-500")}
              >
                {transactionType
                  ? transactionLabel(transactionType)
                  : "Pilih Transaksi"}
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
      </div>

      <Separator className="my-4 bg-slate-200/70" />

      <div className={cn("space-y-0", isPembayaranKhusus ? "px-2 sm:px-3" : "")}>
        <SummaryRow
          label={isPembayaranKhusus ? labelStack("Total", "Pokok") : "Total Pokok"}
          value={totals.pokok}
        />
        <SummaryRow
          label={isPembayaranKhusus ? labelStack("Total", "Bunga") : "Total Bunga"}
          value={totals.bunga}
        />
        <SummaryRow
          label={isPembayaranKhusus ? labelStack("Total", "Denda") : "Total Denda"}
          value={totals.denda}
        />

        <SummaryRow
          label={
            mode === "pelunasan"
              ? labelStack("Total", "Pelunasan")
              : isPembayaranKhusus
                ? labelStack("Total", "Tagihan")
                : "Total Tagihan"
          }
          value={totals.total}
          strong
        />

        <div className="py-2">
          <Separator className="bg-slate-300" />
        </div>

        <SummaryRow
          label={isPembayaranKhusus ? labelStack("Angsuran", "Ke") : "Angsuran Ke"}
          value={installment.ke}
        />
        <SummaryRow
          label={
            isPembayaranKhusus ? labelStack("Angsuran", "Lunas") : "Angsuran Lunas"
          }
          value={installment.lunas}
        />
        <SummaryRow
          label={
            isPembayaranKhusus
              ? labelStack("Angsuran", "Seharusnya")
              : "Angsuran Seharusnya"
          }
          value={installment.seharusnya}
        />
      </div>

      <div className="pt-2">
        <Separator className="bg-slate-300" />
      </div>
    </Card>
  );
}