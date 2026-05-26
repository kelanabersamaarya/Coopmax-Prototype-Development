export function parseIdrLike(input: string | number | null | undefined) {
  if (typeof input === "number") {
    return Number.isFinite(input) ? input : 0;
  }

  const raw = (input ?? "").toString().trim();
  if (!raw) return 0;

  const withoutCurrency = raw.replace(/[^\d,.-]/g, "");
  const hasComma = withoutCurrency.includes(",");

  const normalized = hasComma
    ? withoutCurrency.replace(/\./g, "").replace(",", ".")
    : withoutCurrency.replace(/\./g, "");

  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

export function parseAmount(input: string | number | null | undefined) {
  return parseIdrLike(input);
}

export function formatIdrLike(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatIdr0(n: number) {
  return formatIdrLike(n);
}
