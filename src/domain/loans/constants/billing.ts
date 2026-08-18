export const LOAN_BILLING_PENALTY = {
  rows: 3,
  amount: 75_000,
  detailDays: 3,
  perDay: 25_000,
} as const;

export const LOAN_PAYMENT_COLLECTORS = [
  "Pilih Kolektor",
  "Dinda Sudiati",
  "Kolektor A",
  "Kolektor B",
] as const;

export type LoanPaymentCollector = (typeof LOAN_PAYMENT_COLLECTORS)[number];
