import type { PrefillSeed } from "./loan-account-edit-types";

export const seedByAccountNo: Record<string, PrefillSeed> = {
  SMG260004: {
    noRekening: "SMG260004",
    tanggalDaftar: "07-04-2026",
    produkPinjaman: "Pinjaman Billing",
    idNasabah: "N2600006",
    nik: "887878787878787",
    nama: "Bapak Bagus",
    alamat: "Sidakarya",
    unitAnggota: "-",
    kolektor: "Gina Farida M.M.",

    bungaPerTahun: "12.00",
    metodeBunga: "Flat",
    besarPinjaman: "12.000.000,00",
    jangkaWaktu: "12",

    jenisPerhitunganBunga: "Jadwal Tetap",
    metodePerhitunganBunga: "Bunga Efektif",
    frekuensiBunga: "Bulanan",
    periode: "1",
    tanggalTagihanKe1: "07-04-2026",

    penaltyVisible: true,
    penaltyDraft: {
      rateMode: "percent",
      rateValue: "1%",
      base: "Pokok",
      lateDays: "3",
    },
    penaltyRecurring: true,
  },
  "klpk04.07260001": {
    noRekening: "klpk04.07260001",
    tanggalDaftar: "10-02-2026",
    produkPinjaman: "Pinjaman Billing",
    idNasabah: "N2500009",
    nik: "1601095402960002",
    nama: "Indah Sari",
    alamat: "Denpasar",
    unitAnggota: "-",
    kolektor: "Kolektor A",

    bungaPerTahun: "11.50",
    metodeBunga: "Flat",
    besarPinjaman: "10.000.000,00",
    jangkaWaktu: "12",

    jenisPerhitunganBunga: "Jadwal Tetap",
    metodePerhitunganBunga: "Bunga Efektif",
    frekuensiBunga: "Bulanan",
    periode: "1",
    tanggalTagihanKe1: "10-02-2026",

    penaltyVisible: true,
    penaltyDraft: {
      rateMode: "rp",
      rateValue: "25.000",
      base: "Pokok",
      lateDays: "5",
    },
    penaltyRecurring: false,
  },
};
