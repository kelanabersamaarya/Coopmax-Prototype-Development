"use client";

export type SummaryTotals = {
  pokok: number;
  bunga: number;
  denda: number;
  total: number;
};

function parseMoneyLikeId(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  const hasComma = s.includes(",");

  const normalized = hasComma
    ? s.replace(/\./g, "").replace(",", ".")
    : s.replace(/\./g, "");

  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function penaltyForIndex(idx: number) {
  const base = 25000;
  return base + idx * 5000;
}

export function calcKhususTotalsFromRows(
  rows: Array<{ tagihanPokok: string; tagihanBunga: string }>,
): SummaryTotals {
  let pokok = 0;
  let bunga = 0;
  let denda = 0;

  for (let i = 0; i < rows.length; i++) {
    pokok += parseMoneyLikeId(rows[i]?.tagihanPokok ?? "0");
    bunga += parseMoneyLikeId(rows[i]?.tagihanBunga ?? "0");
    denda += penaltyForIndex(i);
  }

  return { pokok, bunga, denda, total: pokok + bunga + denda };
}