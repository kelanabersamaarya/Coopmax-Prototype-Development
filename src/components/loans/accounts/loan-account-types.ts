export type StatusFilter = "Semua" | "Aktif / Sudah Dicairkan" | "Lunas" | "Macet";

export type LoanAccountRow = {
  id: string;
  noRekening: string;
  tanggalDaftar: string;
  produkPinjaman: string;
  idNasabah: string;
  namaNasabah: string;
  nominal: string;
  sisaPinjaman: string;
  bungaPerTahun: string;
  status: Exclude<StatusFilter, "Semua">;
};

export type LoanAccountsFilterState = {
  qNoRek: string;
  qTanggal: string;
  qProduk: string;
  qIdNasabah: string;
  qNamaNasabah: string;
  qNominal: string;
  qSisa: string;
  qBunga: string;
  qStatus: StatusFilter;
};

export type LoanAccountsFilterHandlers = {
  setQNoRek: (value: string) => void;
  setQTanggal: (value: string) => void;
  setQProduk: (value: string) => void;
  setQIdNasabah: (value: string) => void;
  setQNamaNasabah: (value: string) => void;
  setQNominal: (value: string) => void;
  setQSisa: (value: string) => void;
  setQBunga: (value: string) => void;
  setQStatus: (value: StatusFilter) => void;
};
