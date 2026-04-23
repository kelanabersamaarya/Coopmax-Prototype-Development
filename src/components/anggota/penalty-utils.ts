"use client";

export function penaltyForIndex(idx: number) {
  const base = 25000;
  return base + idx * 5000;
}

export function calcSelectedPenaltyTotal(selected: boolean[], rowCount: number) {
  const len = Math.max(0, rowCount);
  let sum = 0;
  for (let i = 0; i < len; i++) {
    if (selected[i]) sum += penaltyForIndex(i);
  }
  return sum;
}