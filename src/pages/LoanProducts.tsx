import { useLocation } from "react-router-dom";
import LoanProductsListPage from "@/components/loans/products/LoanProductsListPage";

export default function LoanProducts() {
  const location = useLocation();
  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");

  return (
    <LoanProductsListPage
      variant="consolidation"
      title="Produk Pinjaman"
      subtitle="Daftar"
      showCreateButton
      createPath={
        isSakCabangArea
          ? "/sak-ep-cabang/loan-products/new"
          : "/loan-products/new"
      }
      detailPath={(id) =>
        isSakCabangArea
          ? `/sak-ep-cabang/loan-products/${id}`
          : `/loan-products/${id}`
      }
      editPath={(id) =>
        isSakCabangArea
          ? `/sak-ep-cabang/loan-products/${id}/edit`
          : `/loan-products/${id}/edit`
      }
    />
  );
}