export type PaymentLinkStatus = "Semua" | "Terkirim/Aktif" | "Dibayar" | "Kedaluwarsa";

export type PaymentLinkRow = {
  id: string;
  namaAnggota: string;
  noPaymentLink: string;
  noRekPinjaman: string;
  nominalTagihan: string;
  tanggalDibuat: string;
  tanggalKedaluwarsa: string;
  status: Exclude<PaymentLinkStatus, "Semua">;
};

export const paymentLinkRowsSeed: PaymentLinkRow[] = [
  {
    id: "PAY-260001",
    namaAnggota: "Laura Patel",
    noPaymentLink: "PL/260626/0001",
    noRekPinjaman: "SMG260004",
    nominalTagihan: "991.666,00",
    tanggalDibuat: "26-06-2026",
    tanggalKedaluwarsa: "03-07-2026",
    status: "Terkirim/Aktif",
  },
  {
    id: "PAY-260002",
    namaAnggota: "Bapak Bagus",
    noPaymentLink: "PL/260626/0002",
    noRekPinjaman: "12260006",
    nominalTagihan: "1.250.000,00",
    tanggalDibuat: "26-06-2026",
    tanggalKedaluwarsa: "30-06-2026",
    status: "Dibayar",
  },
  {
    id: "PAY-260003",
    namaAnggota: "Rika Wastuti",
    noPaymentLink: "PL/250626/0003",
    noRekPinjaman: "072260001",
    nominalTagihan: "916.667,00",
    tanggalDibuat: "25-06-2026",
    tanggalKedaluwarsa: "25-06-2026",
    status: "Kedaluwarsa",
  },
  {
    id: "PAY-260004",
    namaAnggota: "Pangeran Sirait",
    noPaymentLink: "PL/240626/0004",
    noRekPinjaman: "12260002",
    nominalTagihan: "500.000,00",
    tanggalDibuat: "24-06-2026",
    tanggalKedaluwarsa: "01-07-2026",
    status: "Terkirim/Aktif",
  },
  {
    id: "PAY-260005",
    namaAnggota: "Indah Sari",
    noPaymentLink: "PL/230626/0005",
    noRekPinjaman: "klpk04.07260001",
    nominalTagihan: "1.120.000,00",
    tanggalDibuat: "23-06-2026",
    tanggalKedaluwarsa: "30-06-2026",
    status: "Dibayar",
  },
];

export function getPaymentLinks() {
  return paymentLinkRowsSeed;
}

export function getPaymentLinkByNo(noPaymentLink: string) {
  const key = decodeURIComponent(noPaymentLink ?? "").trim();
  return paymentLinkRowsSeed.find((row) => row.noPaymentLink === key) ?? null;
}