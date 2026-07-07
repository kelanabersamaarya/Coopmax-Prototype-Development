import * as React from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import LoanProductForm from "@/components/loans/LoanProductForm";
import { cn } from "@/lib/utils";
import LoanProductSaveConfirmGate from "@/components/loans/products/LoanProductSaveConfirmGate";
import LoanProductBranchEditForm from "@/components/loans/products/LoanProductBranchEditForm";

export default function LoanProductEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const formWrapperRef = React.useRef<HTMLDivElement | null>(null);

  const id = params.id ?? "";
  const isPaymentLinkArea = location.pathname.startsWith("/payment-link");
  const isCabangEdit = searchParams.get("from") === "cabang";
  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");
  const isSakCabangConsolidationEdit = isSakCabangArea && !isCabangEdit;

  const backPath = isPaymentLinkArea
    ? "/payment-link/loan-products"
    : isSakCabangArea
      ? isCabangEdit
        ? "/sak-ep-cabang/loan-products/cabang"
        : "/sak-ep-cabang/loan-products"
      : isCabangEdit
        ? "/loan-products/cabang"
        : "/loan-products";

  React.useEffect(() => {
    const codeInput =
      formWrapperRef.current?.querySelector<HTMLInputElement>(
        'input[placeholder="Masukkan Kode"]',
      );

    if (!codeInput) return;

    codeInput.readOnly = true;
    codeInput.setAttribute("aria-readonly", "true");
    codeInput.classList.add("cursor-not-allowed", "bg-slate-100", "text-slate-700");
  }, []);

  const form = isCabangEdit ? (
    <LoanProductBranchEditForm
      productId={id}
      onCancel={() => navigate(backPath)}
      onSaved={() => navigate(backPath)}
    />
  ) : (
    <LoanProductForm
      mode="edit"
      productId={id}
      context="consolidation"
      onCancel={() => navigate(backPath)}
      onSaved={() => navigate(backPath)}
    />
  );

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mt-2 flex items-baseline gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Produk Pinjaman
              </h1>
              <div className="text-sm font-semibold text-slate-500">Ubah</div>
            </div>

            <div className="sr-only">{id}</div>
          </div>
        </div>

        <div
          ref={formWrapperRef}
          className={cn(
            "mt-6 grid gap-4",
            "loan-product-edit-form",
            !isCabangEdit && isSakCabangConsolidationEdit
              ? "sak-ep-cabang-loan-product-consolidation-form"
              : "",
          )}
        >
          <LoanProductSaveConfirmGate>{form}</LoanProductSaveConfirmGate>
        </div>
      </div>
    </div>
  );
}