import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

const STORAGE_KEY = "dyad.e-kolektor.today-transactions.v1";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getEKolektorTransactions(): EKolektorTodayTransaction[] {
  if (typeof window === "undefined") return [];

  const parsed = safeParse<EKolektorTodayTransaction[]>(
    window.localStorage.getItem(STORAGE_KEY),
  );

  return Array.isArray(parsed) ? parsed : [];
}

export function saveEKolektorTransactions(
  transactions: EKolektorTodayTransaction[],
) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}