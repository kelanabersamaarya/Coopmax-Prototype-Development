export function parseAmount(input: string) {
  const cleaned = input.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function formatIdrLike(n: number) {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}