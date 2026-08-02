export type LoanInterestAdjustmentHistoryEntry = {
  id: string;
  installmentNo: number;
  interestBefore: string;
  adjustmentType: string;
  adjustmentAmount: string;
  reason: string;
  interestAfter: string;
  totalBefore: string;
  totalAfter: string;
  adjustedAt: string;
};

const STORAGE_KEY = "dyad.loanInterestAdjustmentHistory.v1";
export const LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT =
  "dyad.loanInterestAdjustmentHistory.changed";

type HistoryState = Record<string, LoanInterestAdjustmentHistoryEntry[]>;

function readState(): HistoryState {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as HistoryState) : {};

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeState(next: HistoryState) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(
    new CustomEvent(LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT),
  );
}

export function getLoanInterestAdjustmentHistory(accountNo: string) {
  return readState()[accountNo] ?? [];
}

export function addLoanInterestAdjustmentHistory(
  accountNo: string,
  entry: Omit<LoanInterestAdjustmentHistoryEntry, "id" | "adjustedAt">,
) {
  if (typeof window === "undefined" || !accountNo.trim()) return;

  const state = readState();
  const nextEntry: LoanInterestAdjustmentHistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    adjustedAt: new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };

  writeState({
    ...state,
    [accountNo]: [nextEntry, ...(state[accountNo] ?? [])],
  });
}