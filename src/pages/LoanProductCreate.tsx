import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LoanProductForm from "@/components/loans/LoanProductForm";

export default function LoanProductCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isSakCabangArea = location.pathname.startsWith("/sak-ep-cabang");
  const isCabangCreate = searchParams.get("from") === "cabang";

  const backPath = isSakCabangArea
    ? isCabangCreate
      ? "/sak-ep-cabang/loan-products/cabang"
      : "/sak-ep-cabang/loan-products"
    : isCabangCreate
      ? "/loan-products/cabang"
      : "/loan-products";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="mt-2 flex items-baseline gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {isCabangCreate ? "Produk Pinjaman Cabang" : "Produk Pinjaman"}
          </h1>
          <div className="text-sm font-semibold text-slate-500">Tambah</div>
        </div>

        <div className="mt-6 grid gap-4">
          <LoanProductForm
            mode="create"
            context={isCabangCreate ? "branch" : "consolidation"}
            onCancel={() => navigate(backPath)}
            onSaved={() => navigate(backPath)}
          />
        </div>
      </div>
    </div>
  );
}