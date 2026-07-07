export type PaymentLinkStatus = "Semua" | "Terkirim" | "Gagal Terkirim" | "Kedaluwarsa";

export type PaymentBillPaymentStatus = "Semua" | "Belum Bayar" | "Lunas";

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
    status: "Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260002",
    namaAnggota: "Laura Patel",
    idAnggota: "N2600006",
    tahapPengingat: "H-3 jatuh tempo",
    noPaymentLink: "PL/260626/0002",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "30-06-2026",
    tanggalKedaluwarsa: "03-07-2026",
    status: "Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260003",
    namaAnggota: "Laura Patel",
    idAnggota: "N2600006",
    tahapPengingat: "H-1 jatuh tempo",
    noPaymentLink: "PL/260626/0003",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "02-07-2026",
    tanggalKedaluwarsa: "03-07-2026",
    status: "Gagal Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260004",
    namaAnggota: "Laura Patel",
    idAnggota: "N2600006",
    tahapPengingat: "hari jatuh tempo",
    noPaymentLink: "PL/260626/0004",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "03-07-2026",
    tanggalKedaluwarsa: "03-07-2026",
    status: "Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260005",
    namaAnggota: "Laura Patel",
    idAnggota: "N2600006",
    tahapPengingat: "H+1 jatuh tempo",
    noPaymentLink: "PL/260626/0005",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "04-07-2026",
    tanggalKedaluwarsa: "10-07-2026",
    status: "Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260006",
    namaAnggota: "Laura Patel",
    idAnggota: "N2600006",
    tahapPengingat: "H+3 jatuh tempo",
    noPaymentLink: "PL/260626/0006",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "06-07-2026",
    tanggalKedaluwarsa: "10-07-2026",
    status: "Gagal Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260007",
    namaAnggota: "Laura Patel",
    idAnggota: "N2600006",
    tahapPengingat: "H+7 jatuh tempo",
    noPaymentLink: "PL/260626/0007",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "10-07-2026",
    tanggalKedaluwarsa: "10-07-2026",
    status: "Kedaluwarsa",
    statusPembayaranTagihan: "Lunas",
  },
  {
    id: "PAY-260008",
    namaAnggota: "Bapak Bagus",
    idAnggota: "N2600007",
    tahapPengingat: "H-7 jatuh tempo",
    noPaymentLink: "PL/260626/0008",
    noRekPinjaman: "12260006",
    nominalTagihan: "1.250.000,00",
    tanggalDibuat: "26-06-2026",
    tanggalKedaluwarsa: "30-06-2026",
    status: "Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260009",
    namaAnggota: "Bapak Bagus",
    idAnggota: "N2600007",
    tahapPengingat: "H-3 jatuh tempo",
    noPaymentLink: "PL/260626/0009",
    noRekPinjaman: "12260006",
    nominalTagihan: "1.250.000,00",
    tanggalDibuat: "27-06-2026",
    tanggalKedaluwarsa: "30-06-2026",
    status: "Kedaluwarsa",
    statusPembayaranTagihan: "Lunas",
  },
  {
    id: "PAY-260010",
    namaAnggota: "Rika Wastuti",
    idAnggota: "N2400033",
    tahapPengingat: "H-1 jatuh tempo",
    noPaymentLink: "PL/250626/0010",
    noRekPinjaman: "072260001",
    nominalTagihan: "916.667,00",
    tanggalDibuat: "25-06-2026",
    tanggalKedaluwarsa: "25-06-2026",
    status: "Gagal Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260011",
    namaAnggota: "Pangeran Sirait",
    idAnggota: "N2400029",
    tahapPengingat: "hari jatuh tempo",
    noPaymentLink: "PL/240626/0011",
    noRekPinjaman: "12260002",
    nominalTagihan: "500.000,00",
    tanggalDibuat: "24-06-2026",
    tanggalKedaluwarsa: "01-07-2026",
    status: "Terkirim",
    statusPembayaranTagihan: "Belum Bayar",
  },
  {
    id: "PAY-260012",
    namaAnggota: "Indah Sari",
    idAnggota: "N2500009",
    tahapPengingat: "H+7 jatuh tempo",
    noPaymentLink: "PL/230626/0012",
    noRekPinjaman: "klpk04.07260001",
    nominalTagihan: "1.120.000,00",
    tanggalDibuat: "23-06-2026",
    tanggalKedaluwarsa: "30-06-2026",
    status: "Terkirim",
    statusPembayaranTagihan: "Lunas",
  },
];

export function getPaymentLinks() {
  return paymentLinkRowsSeed;
}

export function getPaymentLinkByNo(noPaymentLink: string) {
  const key = decodeURIComponent(noPaymentLink ?? "").trim();
  return paymentLinkRowsSeed.find((row) => row.noPaymentLink === key) ?? null;
}