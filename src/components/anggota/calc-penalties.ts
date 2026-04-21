"use client";

import type { BillingRow } from "@/components/anggota/BillingTable";

export function calcPenaltyTotal(rows: BillingRow[], selected: boolean[]) {
  const base = 25000;

  return rows.reduce((sum, _row, idx) => {
    const checked = selected[idx] ?? true;
    if (!checked) return sum;
    const total = base + idx * 5000;
    return sum + total;
  }, 0);
}

export function formatIdrLike(n: number) {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}