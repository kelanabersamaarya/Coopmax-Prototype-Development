export type MenuItemConfig = {
  label: string;
  to: string;
  disabled?: boolean;
};

export const loanMenuItems: MenuItemConfig[] = [
  { label: "Daftar Pengajuan Pinjaman", to: "/loans/applications" },
  { label: "Rekening Pinjaman", to: "/loans/accounts" },
  { label: "Transaksi Pinjaman", to: "/loans/transactions" },
  { label: "Produk Pinjaman Konsolidasi", to: "/loan-products" },
  { label: "Produk Pinjaman Cabang", to: "/loan-products/cabang" },
];

export const sakLoanMenuItems: MenuItemConfig[] = [
  { label: "Produk Pinjaman Konsolidasi", to: "/loan-products" },
  { label: "Produk Pinjaman Cabang", to: "/loan-products/cabang" },
];

export const mobileMenuItems: MenuItemConfig[] = [
  { label: "E-Kolektor", to: "/mobile/e-kolektor" },
  { label: "M-Banking", to: "/mobile/m-banking" },
];
