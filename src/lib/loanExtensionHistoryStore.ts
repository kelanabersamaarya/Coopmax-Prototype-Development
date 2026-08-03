export type LoanExtensionHistoryEntry = {
  id: string;
  method: string;
  effectiveDate: string;
  previousTenor: string;
  newTenor: string;
  changedAt: string;
};

const STORAGE_KEY = "dyad.loanExtensionHistory.v1";
export const LOAN_EXTENSION_HISTORY_EVENT = "dyad.loanExtensionHistory.changed";

type HistoryState = Record<string, LoanExtensionHistoryEntry[]>;

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

function writeState(state: HistoryState) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(LOAN_EXTENSION_HISTORY_EVENT));
}

export function getLoanExtensionHistory(accountNo: string) {
  return readState()[accountNo] ?? [];
}

export function addLoanExtensionHistory(
  accountNo: string,
  entry: Omit<LoanExtensionHistoryEntry, "id" | "changedAt">,
) {
  const key = accountNo.trim();
  if (typeof window === "undefined" || !key) return;

  const state = readState();
  const nextEntry: LoanExtensionHistoryEntry = {
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
    [key]: [nextEntry, ...(state[key] ?? [])],
  });
}