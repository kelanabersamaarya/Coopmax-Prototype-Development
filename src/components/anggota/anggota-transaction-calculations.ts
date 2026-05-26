"use client";

import { formatIdrLike, parseIdrLike } from "@/components/anggota/anggota-money";

export type BillingCalculationRow = {
  totalBelumDibayar?: string;
  tagihanPokok?: string;
  tagihanBunga?: string;
  sisaPokok?: string;
  sisaBunga?: string;
};

export type NumericTotals = {
  pokok: number;
  bunga: number;
  denda: number;
  total: number;
};

export type BillSummaryTotals = {
  pokok: string;
  bunga: string;
  denda: string;
  total: string;
};

export function calcSelectedBaseTotals(
  rows: BillingCalculationRow[],
  selected: boolean[],
) {
  let pokok = 0;
  let bunga = 0;

  for (let i = 0; i < rows.length; i++) {
    if (!(selected[i] ?? false)) continue;
    pokok += parseIdrLike(rows[i]?.tagihanPokok ?? "0");
    bunga += parseIdrLike(rows[i]?.tagihanBunga ?? "0");
  }

  return { pokok, bunga, total: pokok + bunga };
}

export function calcRowsFieldTotal(
  rows: BillingCalculationRow[],
  field: keyof BillingCalculationRow,
) {
  return rows.reduce((sum, row) => sum + parseIdrLike(row[field] ?? "0"), 0);
}

export function calcPelunasanTotals(rows: BillingCalculationRow[]) {
  const sum = rows.reduce(
    (acc, r) => {
      acc.total += parseIdrLike(r.totalBelumDibayar ?? "0");
      acc.pokok += parseIdrLike(r.tagihanPokok ?? "0");
      acc.bunga += parseIdrLike(r.tagihanBunga ?? "0");
      acc.sisaPokok += parseIdrLike(r.sisaPokok ?? "0");
      acc.sisaBunga += parseIdrLike(r.sisaBunga ?? "0");
      return acc;
    },
    { total: 0, pokok: 0, bunga: 0, sisaPokok: 0, sisaBunga: 0 },
  );

  return {
    totalBelumDibayar: formatIdrLike(sum.total),
    pokok: formatIdrLike(sum.pokok),
    bunga: formatIdrLike(sum.bunga),
    sisaPokok: formatIdrLike(sum.sisaPokok),
    sisaBunga: formatIdrLike(sum.sisaBunga),
  };
}

export function formatBillSummaryTotals(totals: NumericTotals): BillSummaryTotals {
  return {
    pokok: formatIdrLike(totals.pokok),
    bunga: formatIdrLike(totals.bunga),
    denda: formatIdrLike(totals.denda),
    total: formatIdrLike(totals.total),
  };
}

export function calcRegulerSummary(
  baseTotals: { pokok: number; bunga: number; total: number },
  denda: number,
): BillSummaryTotals {
  return formatBillSummaryTotals({
    pokok: baseTotals.pokok,
    bunga: baseTotals.bunga,
    denda,
    total: baseTotals.total + denda,
  });
}

export function calcKhususSummary(totals: Partial<NumericTotals> | null | undefined) {
  return formatBillSummaryTotals({
    pokok: totals?.pokok ?? 0,
    bunga: totals?.bunga ?? 0,
    denda: totals?.denda ?? 0,
    total: totals?.total ?? 0,
  });
}

export function calcPelunasanSummary(
  pelunasanTotals: { totalBelumDibayar: string; pokok: string; bunga: string } | null,
  denda: number,
): BillSummaryTotals {
  return {
    pokok: pelunasanTotals?.pokok ?? "0",
    bunga: pelunasanTotals?.bunga ?? "0",
    denda: formatIdrLike(denda),
    total: formatIdrLike(parseIdrLike(pelunasanTotals?.totalBelumDibayar ?? "0") + denda),
  };
}

export function calcPenaltyOnlySummary(denda: number): BillSummaryTotals {
  return {
    pokok: "0",
    bunga: "0",
    denda: formatIdrLike(denda),
    total: formatIdrLike(denda),
  };
}

export function calcPenurunanBakiDebetSummary(
  total: string | number | null | undefined,
  includeAsPokok: boolean,
): BillSummaryTotals {
  const formatted = typeof total === "string" ? total : formatIdrLike(total ?? 0);
  return {
    pokok: includeAsPokok ? formatted : "0",
    bunga: "0",
    denda: "0",
    total: formatted,
  };
}
