import LoanProductsListPage from "@/components/loans/products/LoanProductsListPage";

export default function LoanProductsCabang() {
  return (
    <LoanProductsListPage
      variant="branch"
      title="Produk Pinjaman Cabang"
      subtitle="Daftar"
      showCreateButton={false}
      detailPath={(id) => `/loan-products/${id}`}
      editPath={(id) => `/loan-products/${id}/edit?from=cabang`}
    />
  );
}
