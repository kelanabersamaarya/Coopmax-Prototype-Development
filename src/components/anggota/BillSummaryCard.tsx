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
          strong ? "text-[14px] font-extrabold" : "text-[14px] font-bold",
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
  | "Pelunasan"
  | "Pembayaran Pokok"
  | "Pembayaran Bunga"
  | "Pembayaran Denda"
  | "Pembayaran Biaya Lainnya";

function titleCaseEachWord(input: string) {
  return input
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function transactionLabel(v: TransactionType) {
  return titleCaseEachWord(v);
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
  onTransactionTypeChange?: (v: TransactionType) => void;
}) {
  const isUnset = !transactionType;

  const isPembayaranPokok = transactionType === "Pembayaran Pokok";
  const isPembayaranBunga = transactionType === "Pembayaran Bunga";
  const isPembayaranDenda = transactionType === "Pembayaran Denda";
  const isPembayaranBiayaLainnya = transactionType === "Pembayaran Biaya Lainnya";

  const displayTotals = isUnset
    ? { pokok: "0", bunga: "0", denda: "0", total: "0" }
    : totals;

  const displayInstallment = isUnset
    ? { ke: "0", lunas: "0", seharusnya: "0" }
    : installment;

  const showInstallmentSection =
    mode !== "pelunasan" && !isPembayaranDenda && !isPembayaranBiayaLainnya;

  const handleChange = React.useCallback(
    (v: TransactionType) => {
      onTransactionTypeChange?.(v);
    },
    [onTransactionTypeChange],
  );

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
              onClick={() => handleChange("Pembayaran Reguler")}
            >
              {transactionLabel("Pembayaran Reguler")}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "rounded-xl",
                transactionType === "Pembayaran Rincian Tagihan"
                  ? "bg-slate-100"
                  : "",
              )}
              onClick={() => handleChange("Pembayaran Rincian Tagihan")}
            >
              {transactionLabel("Pembayaran Rincian Tagihan")}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "rounded-xl",
                transactionType === "Pelunasan" ? "bg-slate-100" : "",
              )}
              onClick={() => handleChange("Pelunasan")}
            >
              {transactionLabel("Pelunasan")}
            </DropdownMenuItem>

            {/* DISABLED/HIDDEN: Pembayaran Pokok, Pembayaran Bunga, Pembayaran Denda */}

            <DropdownMenuItem
              className={cn(
                "rounded-xl",
                transactionType === "Pembayaran Biaya Lainnya" ? "bg-slate-100" : "",
              )}
              onClick={() => handleChange("Pembayaran Biaya Lainnya")}
            >
              {transactionLabel("Pembayaran Biaya Lainnya")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="my-4 bg-slate-200/70" />

      <div>
        {isPembayaranBunga ? (
          <SummaryRow
            label="Total Tagihan Bunga"
            value={displayTotals.bunga}
            strong
          />
        ) : isPembayaranPokok ? (
          <SummaryRow
            label="Total Tagihan Pokok"
            value={displayTotals.pokok}
            strong
          />
        ) : isPembayaranDenda ? (
          <SummaryRow
            label="Total Tagihan Denda"
            value={displayTotals.denda}
            strong
          />
        ) : isPembayaranBiayaLainnya ? (
          <SummaryRow
            label="Total Tagihan Biaya Lainnya"
            value={displayTotals.total}
            strong
          />
        ) : (
          <>
            <SummaryRow label="Total Tagihan Pokok" value={displayTotals.pokok} />
            <SummaryRow label="Total Tagihan Bunga" value={displayTotals.bunga} />
            <SummaryRow label="Total Tagihan Denda" value={displayTotals.denda} />

            <SummaryRow
              label={mode === "pelunasan" ? "Total Pelunasan" : "Total Tagihan"}
              value={displayTotals.total}
              strong
            />
          </>
        )}

        {showInstallmentSection ? (
          <>
            <div className="py-3">
              <Separator className="bg-slate-300/70" />
            </div>

            <SummaryRow label="Angsuran Ke" value={displayInstallment.ke} />
            <SummaryRow label="Angsuran Lunas" value={displayInstallment.lunas} />
            <SummaryRow
              label="Angsuran Seharusnya"
              value={displayInstallment.seharusnya}
            />
          </>
        ) : null}
      </div>
    </Card>
  );
}