export type LoanInterestHistoryEntry = {
  id: string;
  previousRate: number;
  newRate: number;
  effectiveDate: string;
  reason: string;
  changedAt: string;
};

const STORAGE_KEY = "dyad.loanInterestHistory.v1";

type HistoryState = Record<string, LoanInterestHistoryEntry[]>;

function readState(): HistoryState {
  if (typeof window === "undefined") return {};

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    const parsed = value ? (JSON.parse(value) as HistoryState) : {};

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeState(state: HistoryState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getLoanInterestHistory(accountNo: string) {
  return readState()[accountNo] ?? [];
}

export function addLoanInterestHistory(
  accountNo: string,
  entry: Omit<LoanInterestHistoryEntry, "id" | "changedAt">,
) {
  if (typeof window === "undefined") return;

  const state = readState();
  const nextEntry: LoanInterestHistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    changedAt: new Date().toLocaleString("id-ID", {
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