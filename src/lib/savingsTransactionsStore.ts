export type SavingsTransaction = {
  no: number;
  id: string;
  rekening: string;
  nasabah: string;
  nama: string;
  kolektor: string;
  tabungan: string;
  tanggal: string;
  jenis: string;
  nominal: string;
  keterangan: string;
  saldoAwal: string;
  saldoAkhir: string;
  produk: string;
  tanggalDibuat: string;
};

const STORAGE_KEY = "astiti-savings-transactions";
const SELECTED_KEY = "astiti-selected-savings-transaction";

const initialTransaction: SavingsTransaction = {
  no: 1,
  id: "STR/130926/0001",
  rekening: "SK01260009",
  nasabah: "A2600010",
  nama: "Sinergi Sukses Sentosa",
  kolektor: "Dinda Sudiati",
  tabungan: "Simpanan Sukarela",
  tanggal: "13-09-2026",
  jenis: "Transaksi Setoran Simpanan",
  nominal: "+ 50.000,00",
  keterangan: "Tambah tabungan",
  saldoAwal: "60.000,00",
  saldoAkhir: "110.000,00",
  produk: "Simpanan Sukarela",
  tanggalDibuat: "13-09-2026 14:54:31",
};

export function getSavingsTransactions(): SavingsTransaction[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([initialTransaction]));
    return [initialTransaction];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : [initialTransaction];
  } catch {
    return [initialTransaction];
  }
}

export function saveSavingsTransaction(input: Omit<SavingsTransaction, "no" | "id" | "tanggalDibuat">) {
  const transactions = getSavingsTransactions();
  const dateCode = input.tanggal.replace(/-/g, "").slice(0, 6);
  const prefix = input.jenis.toLowerCase().includes("tarikan") ? "TRK" : "STR";
  const id = `${prefix}/${dateCode}/${String(transactions.length + 1).padStart(4, "0")}`;
  const next: SavingsTransaction = { ...input, no: transactions.length + 1, id, tanggalDibuat: `${input.tanggal} 14:54:31` };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...transactions, next]));
  setSelectedSavingsTransaction(id);
  window.dispatchEvent(new Event("savings-transactions-updated"));
  return next;
}

export function setSelectedSavingsTransaction(id: string) {
  window.localStorage.setItem(SELECTED_KEY, id);
}

export function getSelectedSavingsTransaction() {
  const selectedId = window.localStorage.getItem(SELECTED_KEY);
  return getSavingsTransactions().find((transaction) => transaction.id === selectedId) ?? getSavingsTransactions().at(-1);
}
