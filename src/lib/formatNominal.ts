export function formatNominalInput(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  if (!digits) return "";
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(Number(digits));
}
