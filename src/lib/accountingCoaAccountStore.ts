export type AccountingCoaAccountEditState = {
  type: string;
  code: string;
  name: string;
  nominalMinus: boolean;
  status: boolean;
  cash: boolean;
  coaAccounts: string[];
  arusKasDebit: string;
  arusKasKredit: string;
};

const STORAGE_KEY = "dyad.accounting.coaAccountEdits.v1";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readStore(): Record<string, AccountingCoaAccountEditState> {
  if (typeof window === "undefined") return {};

  const parsed = safeParse<Record<string, AccountingCoaAccountEditState>>(
    window.localStorage.getItem(STORAGE_KEY),
  );

  if (!parsed || typeof parsed !== "object") return {};
  return parsed;
}

function writeStore(next: Record<string, AccountingCoaAccountEditState>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function getAccountingCoaAccountEdit(accountCode: string) {
  const key = (accountCode ?? "").trim();
  if (!key) return null;

  const store = readStore();
  return store[key] ?? null;
}

export function saveAccountingCoaAccountEdit(
  accountCode: string,
  state: AccountingCoaAccountEditState,
) {
  const key = (accountCode ?? "").trim();
  if (!key) return;

  const store = readStore();
  writeStore({
    ...store,
    [key]: {
      ...state,
      coaAccounts:
        state.coaAccounts.length > 0 ? state.coaAccounts : [""],
    },
  });
}