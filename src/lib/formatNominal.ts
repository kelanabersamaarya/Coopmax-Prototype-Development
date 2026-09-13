export function formatNominalInput(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  if (!digits) return "0,00";
  return `${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(Number(digits))},00`;
}
