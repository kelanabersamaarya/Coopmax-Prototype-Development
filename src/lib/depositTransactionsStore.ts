export type DepositTransaction = {
  no: number;
  id: string;
  deposito: string;
  tabungan: string;
  nasabah: string;
  nama: string;
  kolektor: string;
  produk: string;
  tanggal: string;
  jenis: string;
  nominal: string;
  keterangan: string;
  saldoAwal: string;
  saldoAkhir: string;
};

const STORAGE_KEY = "astiti-deposito-transactions";

const initialTransaction: DepositTransaction = {
  no: 1,
  id: "PBD/130926/0001",
  deposito: "55230003",
  tabungan: "-",
  nasabah: "A2400002",
  nama: "Zulfa Yunita Nasyidah S.Ked",
  kolektor: "-",
  produk: "SIJAKOP",
  tanggal: "13-09-2026",
  jenis: "Penarikan Bunga SIJAKOP",
  nominal: "- 16.600,00",
  keterangan: "penarikan bunga sijakop",
  saldoAwal: "16.600,00",
  saldoAkhir: "0,00",
};

export function getDepositTransactions(): DepositTransaction[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([initialTransaction]));
    return [initialTransaction];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [initialTransaction];
  } catch {
    return [initialTransaction];
  }
}

export function saveDepositTransaction(transaction: Omit<DepositTransaction, "no">) {
  const transactions = getDepositTransactions();
  const next = { ...transaction, no: transactions.length + 1 };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...transactions, next]));
  window.dispatchEvent(new Event("deposit-transactions-updated"));
  return next;
}

export function getDepositTransaction(id: string) {
  return getDepositTransactions().find((transaction) => transaction.id === id);
}
