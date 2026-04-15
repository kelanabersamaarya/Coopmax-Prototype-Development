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
    <div
      className={cn(
        "grid items-baseline gap-x-3 py-3",
        "[grid-template-columns:minmax(0,1fr)_14px_minmax(0,1fr)]",
      )}
    >
      <div
        className={cn(
          "text-[14px] leading-snug",
          strong ? "font-semibold text-slate-700" : "font-medium text-slate-600",
        )}
      >
        {label}
      </div>

      <div className="text-center text-[14px] font-semibold text-slate-400">:</div>

      <div
        className={cn(
          "text-right tabular-nums tracking-tight text-slate-900",
          strong ? "text-[30px] font-extrabold" : "text-[28px] font-bold",
        )}
      >
        {value}
      </div>
    </div>
  );
}

type TransactionType =
  | "Pembayaran Reguler"
  | "Pembayaran Rincian Tagihan"
  | "Pelunasan";

function transactionLabel(v: TransactionType) {
  if (v === "Pembayaran Reguler") return "Pembayaran reguler";
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
        "relative rounded-2xl border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur",
        className,
      )}
    >
      <div className="text-sm font-semibold text-slate-900">RINGKASAN TAGIHAN</div>

      <div className="mt-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-full items-center justify-between gap-2",
                "rounded-[6px]",
                "bg-white px-4 text-sm font-medium text-slate-900",
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
                transactionType === "Pembayaran Reguler" ? "bg-slate-100" : "",
              )}
              onClick={() => onTransactionTypeChange("Pembayaran Reguler")}
            >
              Pembayaran reguler
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

      <div className={cn(isPembayaranKhusus ? "px-0" : "px-0")}>
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

        <div className="py-3">
          <Separator className="bg-slate-300/70" />
        </div>

        <SummaryRow
          label={isPembayaranKhusus ? labelStack("Angsuran", "Ke") : "Angsuran Ke"}
          value={installment.ke}
          strong={false}
        />
        <SummaryRow
          label={
            isPembayaranKhusus ? labelStack("Angsuran", "Lunas") : "Angsuran Lunas"
          }
          value={installment.lunas}
          strong={false}
        />
        <SummaryRow
          label={
            isPembayaranKhusus
              ? labelStack("Angsuran", "Seharusnya")
              : "Angsuran Seharusnya"
          }
          value={installment.seharusnya}
          strong={false}
        />
      </div>
    </Card>
  );
}