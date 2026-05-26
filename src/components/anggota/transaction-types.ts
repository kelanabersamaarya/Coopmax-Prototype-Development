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

export function normalizeTransactionType(t: string | null | undefined) {
  return (t ?? "").trim().toLowerCase();
}

function equalsTransactionType(
  value: string | null | undefined,
  expected: string,
  aliases: string[] = [],
) {
  const normalized = normalizeTransactionType(value);
  return [expected, ...aliases].some(
    (candidate) => normalized === normalizeTransactionType(candidate),
  );
}

export function isReguler(t: string | null | undefined) {
  return equalsTransactionType(t, TX.REGULER);
}

export function isKhusus(t: string | null | undefined) {
  return equalsTransactionType(t, TX.KHUSUS);
}

export function isPelunasan(t: string | null | undefined) {
  return equalsTransactionType(t, TX.PELUNASAN);
}

export function isPenaltyOnly(t: string | null | undefined) {
  return equalsTransactionType(t, TX.DENDA, ["Bayar Denda"]);
}

export function isFeeOnly(t: string | null | undefined) {
  return equalsTransactionType(t, TX.BIAYA_LAINNYA, [
    "Bayar Biaya Lainnya",
    "Bayar Biaya Tambahan",
  ]);
}

export function isPokokOnly(t: string | null | undefined) {
  return equalsTransactionType(t, TX.POKOK, ["Bayar Pokok"]);
}

export function isBungaOnly(t: string | null | undefined) {
  return equalsTransactionType(t, TX.BUNGA, ["Bayar Bunga"]);
}

export function isPenurunanBakiDebet(t: string | null | undefined) {
  const normalized = normalizeTransactionType(t);
  return (
    equalsTransactionType(t, TX.PENURUNAN_BAKI_DEBET) ||
    (normalized.includes("penurunan") &&
      normalized.includes("baki") &&
      normalized.includes("debet"))
  );
}
