import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import TermProductCoaSelect from "@/components/savings/term-products/TermProductCoaSelect";

export default function ProdukDepositoTambah() {
  const navigate = useNavigate();

  const [kode, setKode] = React.useState("");
  const [namaProduk, setNamaProduk] = React.useState("");
  const [minimalDeposito, setMinimalDeposito] = React.useState("0,00");
  const [kpDeposito, setKpDeposito] = React.useState("");
  const [kpBunga, setKpBunga] = React.useState("");
  const [kpPajakBunga, setKpPajakBunga] = React.useState("");
  const [kpPendapatanPinalty, setKpPendapatanPinalty] = React.useState("");

  const listPath =
    "/sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-konsolidasi";

  function save() {
    toast("Simpan produk deposito (prototype)", {
      description: `${kode || "Kode"} • ${namaProduk || "Produk Deposito"}`,
    });
  }

  const formInputClassName = cn(
    "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-[#334155] shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const labelClassName = "text-[14px] font-normal leading-snug text-[#002060]";
  const requiredMark = <span className="text-rose-600">*</span>;

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Produk Deposito
          </h1>
          <div className="text-sm font-semibold text-slate-500">Tambah</div>
        </div>

        <Card className="mt-6 rounded-[5px] border-slate-200/70 bg-white/90 p-10 shadow-sm backdrop-blur">
          <div className="text-[18px] font-bold leading-tight text-black">
            Konfigurasi Dasar Produk Deposito
          </div>

          <div className="mt-5 grid gap-5">
            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Kode{requiredMark}</label>
              <Input
                value={kode}
                onChange={(event) => setKode(event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Nama Produk{requiredMark}</label>
              <Input
                value={namaProduk}
                onChange={(event) => setNamaProduk(event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Minimal Deposito{requiredMark}</label>
              <Input
                value={minimalDeposito}
                onChange={(event) => setMinimalDeposito(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="h-px w-full bg-slate-300/80" />

            <div className="text-[18px] font-bold leading-tight text-black">
              Konfigurasi KP Deposito
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>KP Deposito</label>
              <TermProductCoaSelect
                value={kpDeposito}
                onValueChange={setKpDeposito}
                placeholder="Pilih CoA Deposito"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>KP Bunga</label>
              <TermProductCoaSelect
                value={kpBunga}
                onValueChange={setKpBunga}
                placeholder="Pilih CoA Bunga"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>KP Pajak Bunga</label>
              <TermProductCoaSelect
                value={kpPajakBunga}
                onValueChange={setKpPajakBunga}
                placeholder="Pilih CoA Pajak Bunga"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>KP Pendapatan Pinalty</label>
              <TermProductCoaSelect
                value={kpPendapatanPinalty}
                onValueChange={setKpPendapatanPinalty}
                placeholder="Pilih CoA Pinalty"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(listPath)}
              className={cn(
                "inline-flex h-[32px] w-full items-center justify-center gap-1.5 rounded-[6px]",
                "bg-[#77839A] px-2 text-[11px] font-bold tracking-tight text-white",
                "ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
                "sm:w-[90px]",
              )}
            >
              <span className="text-[18px] font-extrabold leading-none">×</span>
              Batalkan
            </button>

            <button
              type="button"
              onClick={save}
              className={cn(
                "inline-flex h-[32px] w-full items-center justify-center gap-1.5 rounded-[6px]",
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