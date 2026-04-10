import { nanoid } from "nanoid";

export type BillingScheme = "Flat" | "Anuitas" | "Menurun";

export type LoanProduct = {
  id: string;
  name: string;
  billingScheme: BillingScheme;
  gracePeriodDays: number;
  interestRateYearly: number;
  tenorMonths: number;
  createdAt: string;
};

const STORAGE_KEY = "dyad.loanProducts.v1";

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

export function getLoanProducts(): LoanProduct[] {
  const parsed = safeParse<LoanProduct[]>(localStorage.getItem(STORAGE_KEY));
  if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
  return seedProducts;
}

export function saveLoanProducts(products: LoanProduct[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function createLoanProduct(input: Omit<LoanProduct, "id" | "createdAt">) {
  const next: LoanProduct = {
    ...input,
    id: nanoid(),
    createdAt: new Date().toISOString(),
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
