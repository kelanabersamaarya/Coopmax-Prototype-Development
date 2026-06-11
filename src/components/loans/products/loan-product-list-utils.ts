import type { LoanProduct } from "@/lib/loanProductsStore";

export type StatusFilter = "Semua" | "Aktif" | "Nonaktif";

export const LOAN_PRODUCT_METHOD_FILTER_OPTIONS = [
  "Semua",
  "Bunga Efektif",
  "Bunga Flat",
  "Menurun",
] as const;

export const LOAN_PRODUCT_STATUS_FILTER_OPTIONS: StatusFilter[] = [
  "Semua",
  "Aktif",
  "Nonaktif",
];

export const LOAN_PRODUCT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export function deriveLoanProductCode(product: LoanProduct) {
  if (product.id.startsWith("seed-")) return product.id === "seed-1" ? "100" : "99";
  return product.id.slice(0, 4).toUpperCase();
}

export function getLoanProductBillingLabel(scheme: LoanProduct["billingScheme"]) {
  if (scheme === "Anuitas") return "Bunga Efektif";
  if (scheme === "Menurun") return "Menurun";
  return "Bunga Flat";
}
