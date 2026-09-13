import type { LoanAccountRow } from "./loan-account-types";

const active = "Aktif / Sudah Dicairkan" as const;

const loanAccountData = [
  ["09260003", "03-09-2026", "Pinjaman bulanan", "N2400033", "Rika Wastuti", "5.000.000,00", "4.900.000,00", "24.00"],
  ["09260002", "08-06-2026", "Pinjaman bulanan", "A2600003", "arya", "10.000.000,00", "8.666.666,68", "24.00"],
  ["12250002", "11-06-2025", "Pinjaman Bulanan", "A2300013", "Yulia Farida", "24.000.000,00", "4.240.000,00", "12.00"],
  ["12250001", "11-06-2025", "Pinjaman Bulanan", "A2300013", "Yulia Farida", "12.000.000,00", "10.000.000,00", "12.00"],
  ["SMG250001", "14-11-2025", "Simpanan Multiguna", "N2400033", "Rika Wastuti", "20.000.000,00", "20.000.000,00", "0.99"],
  ["12250004", "09-04-2025", "Pinjaman Bulanan", "N2400029", "Pangeran Sirait", "12.000.000,00", "8.080.000,00", "12.00"],
  ["09250002", "26-03-2025", "Pinjaman bulanan", "A2500003", "Nasab Irawan S.Farm", "5.000.000,00", "5.000.000,00", "24.00"],
  ["09240017", "12-12-2024", "Pinjaman bulanan", "N2400033", "Rika Wastuti", "10.000.000,00", "8.900.000,00", "24.00"],
  ["09240016", "21-10-2024", "Pinjaman bulanan", "A2400004", "Safina Kuswandari", "1.000.000,00", "504.166,67", "5.00"],
  ["09240014", "26-06-2024", "Pinjaman bulanan", "N2400029", "Pangeran Sirait", "12.000.000,00", "12.000.000,00", "24.00"],
] satisfies Array<[string, string, string, string, string, string, string, string]>;

export const loanAccountRowsSeed: LoanAccountRow[] = loanAccountData.map(
  ([noRekening, tanggalDaftar, produkPinjaman, idNasabah, namaNasabah, nominal, sisaPinjaman, bungaPerTahun], index) => ({
    id: `RP-${index + 1}`,
    noRekening,
    tanggalDaftar,
    produkPinjaman,
    idNasabah,
    namaNasabah,
    nominal,
    sisaPinjaman,
    bungaPerTahun,
    status: active,
  }),
);
