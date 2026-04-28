"use client";

const PENALTY_ROWS = 3;
const PENALTY_AMOUNT = 75000;

export function penaltyForIndex(idx: number) {
  return idx < PENALTY_ROWS ? PENALTY_AMOUNT : 0;
}

export function calcSelectedPenaltyTotal(selected: boolean[], rowCount: number) {
  const len = Math.max(0, rowCount);
  let sum = 0;
  for (let i = 0; i < len; i++) {
    if (selected[i] && i < PENALTY_ROWS) sum += PENALTY_AMOUNT;
  }
  return sum;
}