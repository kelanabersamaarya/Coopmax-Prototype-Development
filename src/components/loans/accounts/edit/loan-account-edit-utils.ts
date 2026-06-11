export function isPlaceholderValue(v: string) {
  const s = (v ?? "").trim().toLowerCase();
  return s.startsWith("pilih ") || s === "semua";
}

export function isDefaultMoney(v: string) {
  return (v ?? "").trim() === "0,00" || (v ?? "").trim() === "0";
}

export function getTodayDmy() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}-${mm}-${yyyy}`;
}
