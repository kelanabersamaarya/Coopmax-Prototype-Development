import { useNavigate, useParams } from "react-router-dom";
import LoanProductForm from "@/components/loans/LoanProductForm";

export default function LoanProductEdit() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
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

        <div className="mt-6 grid gap-4">
          <LoanProductForm
            mode="edit"
            productId={id}
            onCancel={() => navigate("/loan-products")}
            onSaved={() => navigate("/loan-products")}
          />
        </div>
      </div>
    </div>
  );
}
