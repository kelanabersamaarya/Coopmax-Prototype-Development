"use client";

import type { BillingRow } from "@/components/anggota/BillingTable";
import { formatIdrLike } from "@/components/anggota/anggota-money";

const PENALTY_ROWS = 3;
const PENALTY_AMOUNT = 75000;

export function calcPenaltyTotal(rows: BillingRow[], selected: boolean[]) {
  return rows.reduce((sum, _row, idx) => {
    const checked = selected[idx] ?? true;
    if (!checked) return sum;
    if (idx >= PENALTY_ROWS) return sum;
    return sum + PENALTY_AMOUNT;
  }, 0);
}

export { formatIdrLike };