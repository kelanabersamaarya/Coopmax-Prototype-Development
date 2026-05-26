"use client";

import { formatIdr0, parseIdrLike } from "@/components/anggota/anggota-money";

export type KhususSelectedTotals = {
  pokok: number;
  bunga: number;
  denda: number;
  total: number;
};

function penaltyForIndex(idx: number) {
  const base = 25000;
  return base + idx * 5000;
}

export function calcKhususSelectedTotals(
  rows: Array<{ tagihanPokok: string; tagihanBunga: string }>,
  selected: boolean[],
): KhususSelectedTotals {
  let pokok = 0;
  let bunga = 0;
  let denda = 0;

  for (let i = 0; i < rows.length; i++) {
    if (!(selected[i] ?? false)) continue;
    pokok += parseIdrLike(rows[i]?.tagihanPokok ?? "0");
    bunga += parseIdrLike(rows[i]?.tagihanBunga ?? "0");
    denda += penaltyForIndex(i);
  }

  return { pokok, bunga, denda, total: pokok + bunga + denda };
}

export { formatIdr0 };