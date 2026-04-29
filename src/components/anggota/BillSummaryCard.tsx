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
import { TX, type TransactionType } from "@/components/anggota/transaction-types";

function SummaryRow({
  label,
  value,
  strong = false,
  valueAlign = "right",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  strong?: boolean;
  valueAlign?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-x-3 py-3",
        "[grid-template-columns:minmax(190px,1fr)_14px_minmax(0,1fr)]",
      )}
    >
      <div
        className={cn(
          "min-w-0 overflow-hidden text-[14px] leading-snug whitespace-nowrap",
          strong ? "font-semibold text-slate-700" : "font-medium text-slate-600",
        )}
      >
        <span className="block truncate">{label}</span>
      </div>

      <div className="text-center text-[14px] font-semibold text-slate-400">:</div>

      <div
        className={cn(
          "min-w-0 tabular-nums tracking-tight text-slate-900 whitespace-nowrap",
          valueAlign === "left" ? "text-left" : "text-right",
          strong ? "text-[14px] font-extrabold" : "text-[14px] font-bold",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function SummaryRowInline({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-x-2 py-3 text-[14px]",
        "[grid-template-columns:minmax(190px,1fr)_14px_minmax(0,1fr)]",
        className,
      )}
    >
      <span className="min-w-0 overflow-hidden whitespace-nowrap font-semibold text-slate-700">
        <span className="block truncate">{label}</span>
      </span>
      <span className="text-center font-semibold text-slate-400">:</span>
      <span className="min-w-0 text-right font-extrabold tabular-nums tracking-tight text-slate-900 whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}

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
  hasAnySelected,
}: {
  mode: "regular" | "pelunasan";
  totals: { pokok: string; bunga: string; denda: string; total: string };
  installment: { ke: string; lunas: string; seharusnya: string };
  className?: string;
  transactionType?: TransactionType | null;
  onTransactionTypeChange?: (v: TransactionType) => void;
  hasAnySelected?: boolean;
}) {
  const isUnset = !transactionType;

  const isPembayaranPokok = transactionType === TX.POKOK;
  const isPembayaranBunga = transactionType === TX.BUNGA;
  const isPembayaranDenda = transactionType === TX.DENDA;
  const isPembayaranBiayaLainnya = transactionType === TX.BIAYA_LAINNYA;

  const isRegular = transactionType === TX.REGULER;
  const isKhusus = transactionType === TX.KHUSUS;
  const isPenurunanBakiDebet = transactionType === TX.PENURUNAN_BAKI_DEBET;

  const displayTotalsBase = isUnset
    ? { pokok: "0", bunga: "0", denda: "0", total: "0" }
    : totals;

  const displayInstallment = isUnset
    ? { ke: "0", lunas: "0", seharusnya: "0" }
    : installment;

  const handleChange = React.useCallback(
    (v: TransactionType) => {
      onTransactionTypeChange?.(v);
    },
    [onTransactionTypeChange],
  );

  const showInstallmentSection =
    mode !== "pelunasan" &&
    !isPembayaranDenda &&
    !isPembayaranBiayaLainnya &&
    !isPenurunanBakiDebet;

  const useShortLabels = isRegular || isKhusus;

  const shouldZeroRegular = isRegular && hasAnySelected === false;

  const displayTotals = shouldZeroRegular
    ? { pokok: "0", bunga: "0", denda: "0", total: "0" }
    : displayTotalsBase;

  return (
    <Card
      className={cn(
        "relative rounded-[5px] border-slate-200/70 bg-white/85 p-4 shadow-sm backdrop-blur",
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
                "rounded-[5px]",
                "bg-white px-4 text-sm font-medium text-slate-900",
                "ring-1 ring-slate-200 transition hover:bg-slate-50",
              )}
              aria-label="Pilih transaksi"
            >
              <span
                className={cn(
                  "truncate",
                  transactionType ? "" : "text-slate-500",
                )}
              >
                {transactionType ? transactionLabel(transactionType) : "Pilih Transaksi"}
              </span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-[--radix-dropdown-menu-trigger-width] rounded-[5px] border-slate-200 p-1"
          >
            <DropdownMenuItem
              className={cn(
                "rounded-[5px]",
                transactionType === TX.REGULER ? "bg-slate-100" : "",
              )}
              onClick={() => handleChange(TX.REGULER)}
            >
              {transactionLabel(TX.REGULER)}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "rounded-[5px]",
                transactionType === TX.PENURUNAN_BAKI_DEBET ? "bg-slate-100" : "",
              )}
              onClick={() => handleChange(TX.PENURUNAN_BAKI_DEBET)}
            >
              {transactionLabel(TX.PENURUNAN_BAKI_DEBET)}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "rounded-[5px]",
                transactionType === TX.KHUSUS ? "bg-slate-100" : "",
              )}
              onClick={() => handleChange(TX.KHUSUS)}
            >
              {transactionLabel(TX.KHUSUS)}
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                "rounded-[5px]",
                transactionType === TX.PELUNASAN ? "bg-slate-100" : "",
              )}
              onClick={() => handleChange(TX.PELUNASAN)}
            >
              {transactionLabel(TX.PELUNASAN)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="my-4 bg-slate-200/70" />

      <div>
        {isPenurunanBakiDebet ? (
          <div className="space-y-0">
            <SummaryRowInline label="Sisa Pinjaman" value={displayTotals.total} />
          </div>
        ) : isPembayaranBunga ? (
          <SummaryRow label="Total Tagihan Bunga" value={displayTotals.bunga} strong />
        ) : isPembayaranPokok ? (
          <SummaryRow label="Total Tagihan Pokok" value={displayTotals.pokok} strong />
        ) : isPembayaranDenda ? (
          <SummaryRow label="Total Tagihan Denda" value={displayTotals.denda} strong />
        ) : isPembayaranBiayaLainnya ? (
          <SummaryRow
            label="Total Tagihan Biaya Lainnya"
            value={displayTotals.total}
            strong
          />
        ) : (
          <>
            <SummaryRow
              label={useShortLabels ? "Tagihan Pokok" : "Total Tagihan Pokok"}
              value={displayTotals.pokok}
            />
            <SummaryRow
              label={useShortLabels ? "Tagihan Bunga" : "Total Tagihan Bunga"}
              value={displayTotals.bunga}
            />
            <SummaryRow
              label={useShortLabels ? "Tagihan Denda" : "Total Tagihan Denda"}
              value={displayTotals.denda}
            />

            <SummaryRow
              label={
                mode === "pelunasan"
                  ? "Total Pelunasan"
                  : isRegular || isKhusus
                    ? "Total Tagihan"
                    : "Total Tagihan Pokok"
              }
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
            <SummaryRow label="Angsuran Seharusnya" value={displayInstallment.seharusnya} />
          </>
        ) : null}
      </div>
    </Card>
  );
}