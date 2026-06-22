import { useLocation } from "react-router-dom";
import LoanProductsListPage from "@/components/loans/products/LoanProductsListPage";

export default function LoanProductsCabang() {
  const location = useLocation();
  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");

  return (
    <LoanProductsListPage
      variant="branch"
      title="Produk Pinjaman Cabang"
      subtitle="Daftar"
      showCreateButton
      createPath={
        isSakCabangArea
          ? "/sak-ep-cabang/loan-products/new?from=cabang"
          : "/loan-products/new?from=cabang"
      }
      detailPath={(id) =>
        isSakCabangArea
          ? `/sak-ep-cabang/loan-products/${id}`
          : `/loan-products/${id}`
      }
      editPath={(id) =>
        isSakCabangArea
          ? `/sak-ep-cabang/loan-products/${id}/edit?from=cabang`
          : `/loan-products/${id}/edit?from=cabang`
      }
    />
  );
}