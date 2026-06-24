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
      showCreateButton={false}
      detailPath={(id) =>
        isSakCabangArea
          ? `/sak-ep-cabang/loan-products/${id}?from=cabang`
          : `/loan-products/${id}?from=cabang`
      }
      editPath={(id) =>
        isSakCabangArea
          ? `/sak-ep-cabang/loan-products/${id}/edit?from=cabang`
          : `/loan-products/${id}/edit?from=cabang`
      }
    />
  );
}