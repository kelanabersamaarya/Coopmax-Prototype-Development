export type SavingsProductStatus = "Semua" | "Aktif" | "Nonaktif";

export type SavingsProductRow = {
  id: string;
  kode: string;
  namaProduk: string;
  jenisBunga: string;
  bungaTabungan: string;
  tabunganBerjangka: string;
  status: Exclude<SavingsProductStatus, "Semua">;
};

export const SAVINGS_PRODUCT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const SAVINGS_PRODUCT_INTEREST_TYPE_OPTIONS = [
  "Semua",
  "Bunga Harian",
  "Bunga Bulanan",
  "Bunga Berjangka",
] as const;

export const SAVINGS_PRODUCT_STATUS_OPTIONS: SavingsProductStatus[] = [
  "Semua",
  "Aktif",
  "Nonaktif",
];

export const savingsProductRowsSeed: SavingsProductRow[] = [
  {
    id: "SP-001",
    kode: "S001",
    namaProduk: "Simpanan Sukarela",
    jenisBunga: "Bunga Harian",
    bungaTabungan: "2.50%",
    tabunganBerjangka: "Tidak",
    status: "Aktif",
  },
  {
    id: "SP-002",
    kode: "S002",
    namaProduk: "Simpanan Harian",
    jenisBunga: "Bunga Bulanan",
    bungaTabungan: "3.00%",
    tabunganBerjangka: "Tidak",
    status: "Aktif",
  },
  {
    id: "SP-003",
    kode: "S003",
    namaProduk: "Simpanan Pendidikan",
    jenisBunga: "Bunga Bulanan",
    bungaTabungan: "3.25%",
    tabunganBerjangka: "Tidak",
    status: "Aktif",
  },
  {
    id: "SP-004",
    kode: "SB001",
    namaProduk: "Simpanan Berjangka 6 Bulan",
    jenisBunga: "Bunga Berjangka",
    bungaTabungan: "5.50%",
    tabunganBerjangka: "Ya",
    status: "Aktif",
  },
  {
    id: "SP-005",
    kode: "SB002",
    namaProduk: "Simpanan Berjangka 12 Bulan",
    jenisBunga: "Bunga Berjangka",
    bungaTabungan: "6.00%",
    tabunganBerjangka: "Ya",
    status: "Nonaktif",
  },
];