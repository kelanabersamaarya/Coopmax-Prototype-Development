import LoanProductsListPage from "@/components/loans/products/LoanProductsListPage";

export default function LoanProducts() {
  return (
    <LoanProductsListPage
      variant="consolidation"
      title="Produk Pinjaman"
      subtitle="Daftar"
      showCreateButton
      createPath="/loan-products/new"
      detailPath={(id) => `/loan-products/${id}`}
      editPath={(id) => `/loan-products/${id}/edit`}
    />
  );
}
