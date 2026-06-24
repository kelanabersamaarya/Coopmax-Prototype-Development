import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProdukTabunganTambah() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              Produk Tabungan
            </h1>
            <div className="text-sm font-semibold text-slate-500">Tambah</div>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate(
                "/sak-ep-cabang/simpanan/produk-simpanan-konsolidasi",
              )
            }
            className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-800 hover:bg-slate-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar
          </Button>
        </div>

        <Card className="mt-6 rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center">
            <div className="text-base font-semibold text-slate-900">
              Halaman Produk Tabungan Tambah
            </div>
            <div className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Kerangka halaman sudah siap. Detail form dan isiannya bisa
              ditambahkan pada tahap berikutnya sesuai kebutuhan.
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/sak-ep-cabang/simpanan/produk-simpanan-konsolidasi",
                )
              }
              className={cn(
                "inline-flex h-[28px] w-full items-center justify-center gap-1.5 rounded-[6px]",
                "bg-[#77839A] px-2 text-[11px] font-bold tracking-tight text-white",
                "ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
                "sm:w-[90px]",
              )}
            >
              Batal
            </button>

            <button
              type="button"
              onClick={() =>
                toast("Simpan produk tabungan (prototype)", {
                  description:
                    "Detail isian produk tabungan akan ditambahkan pada tahap berikutnya.",
                })
              }
              className={cn(
                "inline-flex h-[28px] w-full items-center justify-center gap-1.5 rounded-[6px]",
                "bg-[#2fb300] px-2 text-[11px] font-bold tracking-tight text-white",
                "ring-1 ring-[#2fb300]/25 transition hover:bg-[#279800]",
                "sm:w-[90px]",
              )}
            >
              <Save className="h-4 w-4" strokeWidth={3} />
              Simpan
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}