"use client";

export const TX = {
  REGULER: "Pembayaran Reguler",
  KHUSUS: "Pembayaran Khusus",
  PELUNASAN: "Pelunasan",
  PENURUNAN_BAKI_DEBET: "Pembayaran Penurunan Baki Debet",
  POKOK: "Pembayaran Pokok",
  BUNGA: "Pembayaran Bunga",
  DENDA: "Pembayaran Denda",
  BIAYA_LAINNYA: "Pembayaran Biaya Lainnya",
} as const;

export type TransactionType = (typeof TX)[keyof typeof TX];

export function isPenurunanBakiDebet(t: string | null | undefined) {
  return (t ?? "") === TX.PENURUNAN_BAKI_DEBET;
}

export function isReguler(t: string | null | undefined) {
  return (t ?? "") === TX.REGULER;
}

export function isKhusus(t: string | null | undefined) {
  return (t ?? "") === TX.KHUSUS;
}

export function isPelunasan(t: string | null | undefined) {
  return (t ?? "") === TX.PELUNASAN;
}