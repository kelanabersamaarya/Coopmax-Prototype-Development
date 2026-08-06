export function parseIdr(value: string) {
  const normalized = (value ?? "").trim().replace(/\./g, "").replace(",", ".");
  const amount = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export function formatIdr(value: number) {
  return Math.max(0, value).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatIdrWhole(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString("id-ID").replace(/,/g, ".");
}

export function getAdjustedInterest(
  previousInterest: string,
  adjustmentType: string,
  adjustmentAmount: string,
) {
  const previous = parseIdr(previousInterest);
  const adjustment = parseIdr(adjustmentAmount);

  if (adjustmentType === "Pembebasan Seluruh Bunga") return 0;
  if (adjustmentType === "Penambahan Bunga") return previous + adjustment;
  return Math.max(0, previous - adjustment);
}

export function parseDmy(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}
