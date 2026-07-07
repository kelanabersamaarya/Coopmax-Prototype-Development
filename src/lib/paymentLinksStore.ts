export type PaymentLinkStatus = "Semua" | "Terkirim/Aktif" | "Dibayar" | "Kedaluwarsa";

export type PaymentBillPaymentStatus = "Semua" | "Belum Dibayar" | "Sebagian Dibayar" | "Lunas";

export type PaymentReminderStage =
  | "Semua"
  | "H-7 jatuh tempo"
  | "H-3 jatuh tempo"
  | "H-1 jatuh tempo"
  | "hari jatuh tempo"
  | "H+7 jatuh tempo"
  | "H+3 jatuh tempo"
  | "H+1 jatuh tempo";

export type PaymentLinkRow = {
  id: string;
  namaAnggota: string;
  idAnggota: string;
  tahapPengingat: Exclude<PaymentReminderStage, "Semua">;
  noPaymentLink: string;
  noRekPinjaman: string;
  nominalTagihan: string;
  tanggalDibuat: string;
  tanggalKedaluwarsa: string;
  status: Exclude<PaymentLinkStatus, "Semua">;
  statusPembayaranTagihan: Exclude<PaymentBillPaymentStatus, "Semua">;
};

export const paymentReminderStageOptions: PaymentReminderStage[] = [
  "Semua",
  "H-7 jatuh tempo",
  "H-3 jatuh tempo",
  "H-1 jatuh tempo",
  "hari jatuh tempo",
  "H+7 jatuh tempo",
  "H+3 jatuh tempo",
  "H+1 jatuh tempo",
];

export const paymentLinkRowsSeed: PaymentLinkRow[] = [
  {
    id: "PAY-260001",
    namaAnggota: "Laura Patel",
    idAnggota: "N2600006",
    tahapPengingat: "H-7 jatuh tempo",
    noPaymentLink: "PL/260626/0001",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "26-06-2026",
    tanggalKedaluwarsa: "03-07-2026",
    status: "Terkirim/Aktif",
    statusPembayaranTagihan: "Belum Dibayar",
  },
  {
    id: "PAY-260002",
    namaAnggota: "Bapak Bagus",
    idAnggota: "N2600007",
    tahapPengingat: "H-3 jatuh tempo",
    noPaymentLink: "PL/260626/0002",
    noRekPinjaman: "12260006",
    nominalTagihan: "1.250.000,00",
    tanggalDibuat: "26-06-2026",
    tanggalKedaluwarsa: "30-06-2026",
    status: "Dibayar",
    statusPembayaranTagihan: "Lunas",
  },
  {
    id: "PAY-260003",
    namaAnggota: "Rika Wastuti",
    idAnggota: "N2400033",
    tahapPengingat: "H-1 jatuh tempo",
    noPaymentLink: "PL/250626/0003",
    noRekPinjaman: "072260001",
    nominalTagihan: "916.667,00",
    tanggalDibuat: "25-06-2026",
    tanggalKedaluwarsa: "25-06-2026",
    status: "Kedaluwarsa",
    statusPembayaranTagihan: "Belum Dibayar",
  },
  {
    id: "PAY-260004",
    namaAnggota: "Pangeran Sirait",
    idAnggota: "N2400029",
    tahapPengingat: "hari jatuh tempo",
    noPaymentLink: "PL/240626/0004",
    noRekPinjaman: "12260002",
    nominalTagihan: "500.000,00",
    tanggalDibuat: "24-06-2026",
    tanggalKedaluwarsa: "01-07-2026",
    status: "Terkirim/Aktif",
    statusPembayaranTagihan: "Sebagian Dibayar",
  },
  {
    id: "PAY-260005",
    namaAnggota: "Indah Sari",
    idAnggota: "N2500009",
    tahapPengingat: "H+7 jatuh tempo",
    noPaymentLink: "PL/230626/0005",
    noRekPinjaman: "klpk04.07260001",
    nominalTagihan: "1.120.000,00",
    tanggalDibuat: "23-06-2026",
    tanggalKedaluwarsa: "30-06-2026",
    status: "Dibayar",
    statusPembayaranTagihan: "Lunas",
  },
  {
    id: "PAY-260006",
    namaAnggota: "Nyoman Ariana",
    idAnggota: "N2500011",
    tahapPengingat: "H+3 jatuh tempo",
    noPaymentLink: "PL/220626/0006",
    noRekPinjaman: "SMG260021",
    nominalTagihan: "750.000,00",
    tanggalDibuat: "22-06-2026",
    tanggalKedaluwarsa: "29-06-2026",
    status: "Terkirim/Aktif",
    statusPembayaranTagihan: "Belum Dibayar",
  },
  {
    id: "PAY-260007",
    namaAnggota: "Komang Dewa",
    idAnggota: "N2500012",
    tahapPengingat: "H+1 jatuh tempo",
    noPaymentLink: "PL/210626/0007",
    noRekPinjaman: "210260001",
    nominalTagihan: "1.233.400,00",
    tanggalDibuat: "21-06-2026",
    tanggalKedaluwarsa: "28-06-2026",
    status: "Terkirim/Aktif",
    statusPembayaranTagihan: "Belum Dibayar",
  },
];

export function getPaymentLinks() {
  return paymentLinkRowsSeed;
}

export function getPaymentLinkByNo(noPaymentLink: string) {
  const key = decodeURIComponent(noPaymentLink ?? "").trim();
  return paymentLinkRowsSeed.find((row) => row.noPaymentLink === key) ?? null;
}