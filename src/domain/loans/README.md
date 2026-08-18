# Loan billing domain map

This folder is the compatibility-first boundary for the loan billing refactor.

- `types/billing.ts`: shared billing row, totals, payment, and row-state contracts.
- `constants/billing.ts`: stable billing seed constants and collector values.
- `billing/calculations/`: domain facade for existing pure billing and penalty calculations.
- `billing/transaction-modes.ts`: transaction mode facade retaining legacy matching and aliases.

## Existing entry points

- Member billing: `src/pages/AnggotaTransaksi.tsx`, `src/components/anggota/TransaksiAnggotaView1.tsx`, and `TransaksiAnggotaView2.tsx`.
- Loan payment: `src/pages/LoanInstallmentPayment.tsx` and `LoanInstallmentPaymentV2.tsx`.
- Stores remain in `src/lib` until consumers are migrated one at a time.
- Routes remain exclusively in `src/App.tsx`.

The facades intentionally delegate to the existing implementation so values, rounding, static data, DOM, CSS classes, and interaction order remain unchanged during migration.
