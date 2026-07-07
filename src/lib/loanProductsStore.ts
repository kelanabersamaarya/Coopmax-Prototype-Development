import { nanoid } from "nanoid";

export type BillingScheme = "Flat" | "Anuitas" | "Menurun";

export type LoanProductFormConfig = Record<string, unknown>;

export type LoanProduct = {
  id: string;
  name: string;
  billingScheme: BillingScheme;
  gracePeriodDays: number;
  interestRateYearly: number;
  tenorMonths: number;
  createdAt: string;
  updatedAt?: string;
  formConfig?: LoanProductFormConfig;
};

const STORAGE_KEY = "dyad.loanProducts.v1";

export const LOAN_PRODUCTS_CHANGED_EVENT = "dyad.loanProducts.changed";

let paymentLinkMenuPreviewEnabled: boolean | null = null;

const seedProducts: LoanProduct[] = [
  {
    id: "seed-1",
    name: "Pinjaman Usaha Mikro",
    billingScheme: "Anuitas",
    gracePeriodDays: 7,
    interestRateYearly: 18,
    tenorMonths: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    name: "Pinjaman Konsumtif Flex",
    billingScheme: "Flat",
    gracePeriodDays: 0,
    interestRateYearly: 14,
    tenorMonths: 9,
    createdAt: new Date().toISOString(),
  },
];

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function notifyLoanProductsChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LOAN_PRODUCTS_CHANGED_EVENT));
}

export function setPaymentLinkMenuPreview(enabled: boolean) {
  paymentLinkMenuPreviewEnabled = enabled;
  notifyLoanProductsChanged();
}

export function getLoanProducts(): LoanProduct[] {
  const parsed = safeParse<LoanProduct[]>(localStorage.getItem(STORAGE_KEY));
  if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
  return seedProducts;
}

export function saveLoanProducts(products: LoanProduct[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  notifyLoanProductsChanged();
}

export function hasPaymentLinkEnabledLoanProduct() {
  if (paymentLinkMenuPreviewEnabled === true) return true;

  return getLoanProducts().some(
    (product) => product.formConfig?.paymentLinkEnabled === true,
  );
}

export function createLoanProduct(input: Omit<LoanProduct, "id" | "createdAt">) {
  const next: LoanProduct = {
    ...input,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const current = getLoanProducts();
  const products = [next, ...current.filter((p) => !p.id.startsWith("seed-"))];

  // Keep seeds only if storage was empty before.
  // If user created any product, we keep user-created products only.
  if (current.some((p) => !p.id.startsWith("seed-"))) {
    saveLoanProducts(products);
  } else {
    saveLoanProducts([next, ...current]);
  }

  return next;
}

export function updateLoanProduct(
  id: string,
  input: Partial<Omit<LoanProduct, "id" | "createdAt">>,
) {
  const key = (id ?? "").trim();
  if (!key) return null;

  const current = getLoanProducts();
  let updated: LoanProduct | null = null;

  const next = current.map((product) => {
    if (product.id !== key) return product;

    updated = {
      ...product,
      ...input,
      updatedAt: new Date().toISOString(),
    };

    return updated;
  });

  saveLoanProducts(next);
  return updated;
}