import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import TermProductCoaSelect from "@/components/savings/term-products/TermProductCoaSelect";
import SavingsTogglePill from "@/components/savings/products/SavingsTogglePill";
import SavingsMonthSelect from "@/components/savings/products/SavingsMonthSelect";
import ClearableSavingsSelect from "@/components/savings/products/ClearableSavingsSelect";

export default function ProdukDepositoTambah() {
  const navigate = useNavigate();

  const tanggalMaksimalOptions = React.useMemo(
    () => Array.from({ length: 31 }).map((_, index) => String(index + 1)),
    [],
  );

  const [kode, setKode] = React.useState("");
  const [namaProduk, setNamaProduk] = React.useState("");
  const [minimalDeposito, setMinimalDeposito] = React.useState("0,00");
  const [tanggalMaksimalDapatBunga, setTanggalMaksimalDapatBunga] =
    React.useState("");
  const [jenisBunga, setJenisBunga] = React.useState("");
  const [bungaPerTahun, setBungaPerTahun] = React.useState("0%");
  const [jangkaWaktu, setJangkaWaktu] = React.useState("");
  const [satuanJangkaWaktu, setSatuanJangkaWaktu] = React.useState("");
  const [pajakBunga, setPajakBunga] = React.useState("0%");
  const [jenisPembulatan, setJenisPembulatan] = React.useState("");
  const [kelipatanPembulatan, setKelipatanPembulatan] = React.useState("0");
  const [minimalBulan, setMinimalBulan] = React.useState("");
  const [pinaltyMode, setPinaltyMode] = React.useState("rp");
  const [pinalty, setPinalty] = React.useState("0,00");
  const [aro, setAro] = React.useState(false);
  const [bisaDicairkanSebelumJatuhTempo, setBisaDicairkanSebelumJatuhTempo] =
    React.useState(false);
  const [pencairanKeTabungan, setPencairanKeTabungan] = React.useState(false);
  const [produkTabunganTujuan, setProdukTabunganTujuan] = React.useState("");
  const [status, setStatus] = React.useState(true);

  const [kpDeposito, setKpDeposito] = React.useState("");
  const [kpBunga, setKpBunga] = React.useState("");
  const [kpPajakBunga, setKpPajakBunga] = React.useState("");
  const [kpPendapatanPinalty, setKpPendapatanPinalty] = React.useState("");
  const [kpBiayaBunga, setKpBiayaBunga] = React.useState("");
  const [kpPengakuanBiayaBunga, setKpPengakuanBiayaBunga] = React.useState("");

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

  const disabledInputClassName = cn(
    formInputClassName,
    "bg-slate-200/80 text-[#64748B]",
  );

  const selectTriggerClassName = cn(
    "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-[#64748B] shadow-none",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-500",
  );

  const selectContentClassName = cn(
    "rounded-[5px] border-slate-300 bg-white p-0 shadow-xl",
    "[&_[data-radix-select-item-indicator]]:hidden",
    "[&_[data-slot=select-item-indicator]]:hidden",
    "[&>span.absolute.right-2]:hidden",
    "[&_[data-radix-collection-item]]:pl-4",
    "[&_[data-radix-collection-item]]:pr-4",
  );

  const selectItemClassName = cn(
    "rounded-none px-4 py-2.5 text-[14px] font-normal text-black",
    "hover:bg-violet-600 hover:text-white",
    "focus:bg-violet-600 focus:text-white",
    "data-[highlighted]:bg-violet-600 data-[highlighted]:text-white",
    "data-[state=checked]:bg-violet-600 data-[state=checked]:text-white",
  );

  const labelClassName = "text-[14px] font-normal leading-snug text-[#002060]";
  const helperClassName = "mt-1 text-[13px] font-normal text-[#6479A6]";
  const requiredMark = <span className="text-rose-600">*</span>;

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Produk Deposito Tambah
          </h1>
        </div>

        <Card className="mt-6 rounded-[5px] border-slate-200/70 bg-white/90 p-10 shadow-sm backdrop-blur">
          <div className="grid gap-[20px]">
            <div className="text-[18px] font-bold leading-tight text-black">
              Konfigurasi Dasar Produk Deposito
            </div>

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

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Tanggal Maksimal Dapat Bunga{requiredMark}
              </label>
              <SavingsMonthSelect
                value={tanggalMaksimalDapatBunga}
                onValueChange={setTanggalMaksimalDapatBunga}
                placeholder="Pilih Tanggal Maksimal Dapat Bunga"
                options={tanggalMaksimalOptions}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Jenis Bunga{requiredMark}</label>
              <ClearableSavingsSelect
                value={jenisBunga}
                onValueChange={setJenisBunga}
                placeholder="Pilih Jenis Bunga"
                options={["Bunga Harian", "Bunga Bulanan", "Bunga Rata-rata"]}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Bunga Pertahun{requiredMark}</label>
              <Input
                value={bungaPerTahun}
                onChange={(event) => setBungaPerTahun(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Jangka Waktu{requiredMark}</label>
              <SavingsMonthSelect
                value={jangkaWaktu}
                onValueChange={setJangkaWaktu}
                placeholder="Pilih Jumlah"
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Satuan Jangka Waktu{requiredMark}</label>
              <ClearableSavingsSelect
                value={satuanJangkaWaktu}
                onValueChange={setSatuanJangkaWaktu}
                placeholder="Pilih Satuan Jangka Waktu"
                options={["Hari", "Bulan", "Tahun"]}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Pajak Bunga{requiredMark}</label>
              <Input
                value={pajakBunga}
                onChange={(event) => setPajakBunga(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Jenis Pembulatan</label>
              <ClearableSavingsSelect
                value={jenisPembulatan}
                onValueChange={setJenisPembulatan}
                placeholder="Pilih Jenis Pembulatan"
                options={[
                  "Pembulatan Keatas",
                  "Pembulatan Kebawah",
                  "Tanpa Pembulatan",
                ]}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Kelipatan Pembulatan</label>
              <Input
                value={kelipatanPembulatan}
                onChange={(event) => setKelipatanPembulatan(event.target.value)}
                className={disabledInputClassName}
                inputMode="numeric"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Minimal Bulan Deposito{requiredMark}</label>
              <SavingsMonthSelect
                value={minimalBulan}
                onValueChange={setMinimalBulan}
                placeholder="Pilih Jumlah Bulan"
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Pinalty{requiredMark}</label>
              <div className="flex items-stretch">
                <Select value={pinaltyMode} onValueChange={setPinaltyMode}>
                  <SelectTrigger
                    className={cn(
                      selectTriggerClassName,
                      "w-[72px] rounded-r-none border-r-0",
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    <SelectItem value="rp" className={selectItemClassName}>
                      Rp.
                    </SelectItem>
                    <SelectItem value="percent" className={selectItemClassName}>
                      %
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={pinalty}
                  onChange={(event) => setPinalty(event.target.value)}
                  className={cn(formInputClassName, "rounded-l-none")}
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Perpanjangan Otomatis
              </label>
              <div>
                <SavingsTogglePill checked={aro} onChange={setAro} />
                <div className={helperClassName}>
                  Jika ON, deposito dapat diperpanjang otomatis setelah jatuh tempo.
                </div>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Dapat Dicairkan Sebelum Jatuh Tempo
              </label>
              <div>
                <SavingsTogglePill
                  checked={bisaDicairkanSebelumJatuhTempo}
                  onChange={setBisaDicairkanSebelumJatuhTempo}
                />
                <div className={helperClassName}>
                  Jika ON, deposito dapat dicairkan sebelum tanggal jatuh tempo
                  dengan ketentuan pinalty.
                </div>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Pencairan ke Rekening Tabungan
              </label>
              <div>
                <SavingsTogglePill
                  checked={pencairanKeTabungan}
                  onChange={setPencairanKeTabungan}
                />
              </div>
            </div>

            {pencairanKeTabungan ? (
              <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
                <label className={labelClassName}>Produk Tabungan Tujuan</label>
                <ClearableSavingsSelect
                  value={produkTabunganTujuan}
                  onValueChange={setProdukTabunganTujuan}
                  placeholder="Pilih Produk Tabungan"
                  options={[
                    "Simpanan Sukarela",
                    "Simpanan Harian",
                    "Simpanan Pendidikan",
                  ]}
                  triggerClassName={selectTriggerClassName}
                  contentClassName={selectContentClassName}
                  itemClassName={selectItemClassName}
                />
              </div>
            ) : null}

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Status{requiredMark}</label>
              <SavingsTogglePill checked={status} onChange={setStatus} />
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

            <div className="h-px w-full bg-slate-300/80" />

            <div className="text-[18px] font-bold leading-tight text-black">
              Konfigurasi KP Deposito SAK EP
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[5px]")}>
                KP Pengakuan Biaya Bunga
              </label>
              <div>
                <TermProductCoaSelect
                  value={kpPengakuanBiayaBunga}
                  onValueChange={setKpPengakuanBiayaBunga}
                  placeholder="Pilih CoA Pengakuan Biaya Bunga"
                />
                <div className={helperClassName}>
                  Akun pengakuan biaya bunga sesuai kebijakan akuntansi deposito
                  pada penerapan SAK EP.
                </div>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[5px]")}>
                KP Biaya Bunga
              </label>
              <div>
                <TermProductCoaSelect
                  value={kpBiayaBunga}
                  onValueChange={setKpBiayaBunga}
                  placeholder="Pilih CoA Biaya Bunga"
                />
                <div className={helperClassName}>
                  Akun biaya bunga saat pengakuan sesuai kebijakan akuntansi
                  deposito pada penerapan SAK EP.
                </div>
              </div>
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