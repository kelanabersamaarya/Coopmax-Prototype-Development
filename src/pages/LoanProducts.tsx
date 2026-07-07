import { useLocation } from "react-router-dom";
import LoanProductsListPage from "@/components/loans/products/LoanProductsListPage";

export default function LoanProducts() {
  const location = useLocation();
  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");
  const isPaymentLinkArea = location.pathname.startsWith("/payment-link");

  return (
    <LoanProductsListPage
      variant="consolidation"
      title="Produk Pinjaman"
      subtitle="Daftar"
      showCreateButton
      createPath={
        isPaymentLinkArea
          ? "/payment-link/loan-products/new"
          : isSakCabangArea
            ? "/sak-ep-cabang/loan-products/new"
            : "/loan-products/new"
      }
      detailPath={(id) =>
        isPaymentLinkArea
          ? `/payment-link/loan-products/${id}`
          : isSakCabangArea
            ? `/sak-ep-cabang/loan-products/${id}`
            : `/loan-products/${id}`
      }
      editPath={(id) =>
        isPaymentLinkArea
          ? `/payment-link/loan-products/${id}/edit`
          : isSakCabangArea
            ? `/sak-ep-cabang/loan-products/${id}/edit`
            : `/loan-products/${id}/edit`
      }
    />
  );
}