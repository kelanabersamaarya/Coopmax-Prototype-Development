import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export default function LoanProductEdit() {
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Button
              asChild
              variant="ghost"
              className="-ml-2 rounded-full text-slate-700 hover:bg-white/60"
            >
              <Link to="/loan-products">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Kembali
              </Link>
            </Button>

            <div className="mt-2 flex items-baseline gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                Produk Pinjaman
              </h1>
              <div className="text-sm font-semibold text-slate-500">Ubah</div>
            </div>

            <div className="sr-only">{id}</div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      {/* Konten detail edit menyusul sesuai pengaturan yang Anda kirim */}
      <div className={cn("px-2 pb-10 md:px-3")}>
        <div className="rounded-3xl border border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-slate-900">
            Halaman edit siap
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Kirim detail pengaturan produk pinjaman yang ingin ditampilkan, nanti
            saya lanjutkan isi formnya.
          </div>
        </div>
      </div>
    </div>
  );
}