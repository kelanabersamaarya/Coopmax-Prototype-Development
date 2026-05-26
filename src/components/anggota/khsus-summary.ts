"use client";

import { parseIdrLike } from "@/components/anggota/anggota-money";

export type SummaryTotals = {
  pokok: number;
  bunga: number;
  denda: number;
  total: number;
};

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
    pokok += parseIdrLike(rows[i]?.tagihanPokok ?? "0");
    bunga += parseIdrLike(rows[i]?.tagihanBunga ?? "0");
    denda += penaltyForIndex(i);
  }

  return { pokok, bunga, denda, total: pokok + bunga + denda };
}