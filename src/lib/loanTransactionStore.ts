export type SavedLoanTransaction = {
  transactionNo: string;
  accountNo: string;
  rekTabungan: string;
  idNasabah: string;
  namaNasabah: string;
  namaKolektor: string;
  keterangan: string;
  tanggal: string;
  jenisTransaksi: string;
  nominal: string;
  denda: string;
};

const STORAGE_KEY = "astiti-loan-transactions";

function readTransactions(): SavedLoanTransaction[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedLoanTransaction[]) : [];
  } catch {
    return [];
  }
}

export function saveLoanTransactions(transactions: SavedLoanTransaction[]) {
  if (typeof window === "undefined") return;

  const current = readTransactions().filter(
    (item) => !transactions.some((next) => next.transactionNo === item.transactionNo),
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, ...transactions]));
  window.dispatchEvent(new Event("loan-transactions-updated"));
}

export function getLoanTransaction(transactionNo: string) {
  return readTransactions().find((item) => item.transactionNo === transactionNo) ?? null;
}

export function getLoanTransactions() {
  return readTransactions();
}

export function getLoanTransactionsForAccount(accountNo: string) {
  return readTransactions().filter((item) => item.accountNo === accountNo);
}

export const LOAN_TRANSACTIONS_UPDATED_EVENT = "loan-transactions-updated";