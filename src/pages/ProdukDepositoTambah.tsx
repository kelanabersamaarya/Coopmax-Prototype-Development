import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CheckSquare } from "lucide-react";
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
import ClearableSavingsSelect from "@/components/savings/products/ClearableSavingsSelect";
import SavingsMonthSelect from "@/components/savings/products/SavingsMonthSelect";
import FieldTooltip from "@/components/loans/FieldTooltip";

type DepositSeed = {
  kode: string;
  namaProduk: string;
  minimalDeposito: string;
  tanggalMaksimalDapatBunga: string;
  jenisBunga: string;
  bungaPerTahun: string;
  jenisPembulatan: string;
  kelipatanPembulatan: string;
  pajakBunga: string;
  pinaltyMode: string;
  pinalty: string;
  periodeWaktu: string;
  metodeDapatBunga: string;
  status: boolean;
  transferBungaGross: boolean;
  penampungBungaNasabahLain: boolean;
  kpDeposito: string;
  kpBunga: string;
  kpPendapatanPinalty: string;
  kpPengakuanBiayaBunga: string;
  kpBiayaBunga: string;
};

const emptyCreateSeed: DepositSeed = {
  kode: "",
  namaProduk: "",
  minimalDeposito: "",
  tanggalMaksimalDapatBunga: "",
  jenisBunga: "",
  bungaPerTahun: "0%",
  jenisPembulatan: "",
  kelipatanPembulatan: "",
  pajakBunga: "0%",
  pinaltyMode: "rp",
  pinalty: "0,00",
  periodeWaktu: "",
  metodeDapatBunga: "",
  status: false,
  transferBungaGross: false,
  penampungBungaNasabahLain: false,
  kpDeposito: "",
  kpBunga: "",
  kpPendapatanPinalty: "",
  kpPengakuanBiayaBunga: "",
  kpBiayaBunga: "",
};

const defaultEditSeed: DepositSeed = {
  kode: "TB001",
  namaProduk: "Simpanan Berjangka 1 Bulan",
  minimalDeposito: "1.000.000,00",
  tanggalMaksimalDapatBunga: "0",
  jenisBunga: "Metode Bunga Flat",
  bungaPerTahun: "4.50%",
  jenisPembulatan: "Pembulatan Keatas",
  kelipatanPembulatan: "100",
  pajakBunga: "10%",
  pinaltyMode: "rp",
  pinalty: "25.000,00",
  periodeWaktu: "1",
  metodeDapatBunga: "Pada Saat Jatuh Tempo Pada Periode Yang Sama Dapat Bunga",
  status: true,
  transferBungaGross: true,
  penampungBungaNasabahLain: false,
  kpDeposito: "1.1.1.3.2 - Simpanan Berjangka",
  kpBunga: "4.1.1.1 - Pendapatan Bunga",
  kpPendapatanPinalty: "4.1.1.2 - Pendapatan Pinalty",
  kpPengakuanBiayaBunga: "5.1.1.1 - Beban Jasa Simpanan",
  kpBiayaBunga: "5.1.1.1 - Beban Jasa Simpanan",
};

const editSeedById: Record<string, DepositSeed> = {
  "TS-001": defaultEditSeed,
  "TS-002": {
    ...defaultEditSeed,
    kode: "TB003",
    namaProduk: "Simpanan Berjangka 3 Bulan",
    bungaPerTahun: "5.00%",
    periodeWaktu: "3",
    minimalDeposito: "2.000.000,00",
  },
  "TS-003": {
    ...defaultEditSeed,
    kode: "TB006",
    namaProduk: "Simpanan Berjangka 6 Bulan",
    bungaPerTahun: "5.50%",
    periodeWaktu: "6",
    minimalDeposito: "5.000.000,00",
  },
  "TS-004": {
    ...defaultEditSeed,
    kode: "TB012",
    namaProduk: "Simpanan Berjangka 12 Bulan",
    bungaPerTahun: "6.00%",
    periodeWaktu: "12",
    minimalDeposito: "10.000.000,00",
  },
  "TS-005": {
    ...defaultEditSeed,
    kode: "TB024",
    namaProduk: "Simpanan Berjangka 24 Bulan",
    bungaPerTahun: "6.25%",
    periodeWaktu: "24",
    status: false,
    transferBungaGross: false,
    pinalty: "50.000,00",
  },
};

export default function ProdukDepositoTambah() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const isEditPage = location.pathname.endsWith("/edit");
  const editSeed = isEditPage
    ? editSeedById[params.id ?? ""] ?? defaultEditSeed
    : null;
  const initialSeed = editSeed ?? emptyCreateSeed;

  const tanggalMaksimalOptions = React.useMemo(
    () => Array.from({ length: 32 }).map((_, index) => String(index)),
    [],
  );

  const [kode, setKode] = React.useState(initialSeed.kode);
  const [namaProduk, setNamaProduk] = React.useState(initialSeed.namaProduk);
  const [minimalDeposito, setMinimalDeposito] = React.useState(
    initialSeed.minimalDeposito,
  );
  const [tanggalMaksimalDapatBunga, setTanggalMaksimalDapatBunga] =
    React.useState(initialSeed.tanggalMaksimalDapatBunga);
  const [jenisBunga, setJenisBunga] = React.useState(initialSeed.jenisBunga);
  const [bungaPerTahun, setBungaPerTahun] = React.useState(
    initialSeed.bungaPerTahun,
  );
  const [jenisPembulatan, setJenisPembulatan] = React.useState(
    initialSeed.jenisPembulatan,
  );
  const [kelipatanPembulatan, setKelipatanPembulatan] = React.useState(
    initialSeed.kelipatanPembulatan,
  );
  const [pajakBunga, setPajakBunga] = React.useState(initialSeed.pajakBunga);
  const [pinaltyMode, setPinaltyMode] = React.useState(initialSeed.pinaltyMode);
  const [pinalty, setPinalty] = React.useState(initialSeed.pinalty);
  const [periodeWaktu, setPeriodeWaktu] = React.useState(
    initialSeed.periodeWaktu,
  );
  const [metodeDapatBunga, setMetodeDapatBunga] = React.useState(
    initialSeed.metodeDapatBunga,
  );
  const [status, setStatus] = React.useState(initialSeed.status);
  const [transferBungaGross, setTransferBungaGross] = React.useState(
    initialSeed.transferBungaGross,
  );
  const [penampungBungaNasabahLain, setPenampungBungaNasabahLain] =
    React.useState(initialSeed.penampungBungaNasabahLain);

  const [kpDeposito, setKpDeposito] = React.useState(initialSeed.kpDeposito);
  const [kpBunga, setKpBunga] = React.useState(initialSeed.kpBunga);
  const [kpPendapatanPinalty, setKpPendapatanPinalty] = React.useState(
    initialSeed.kpPendapatanPinalty,
  );
  const [kpPengakuanBiayaBunga, setKpPengakuanBiayaBunga] = React.useState(
    initialSeed.kpPengakuanBiayaBunga,
  );
  const [kpBiayaBunga, setKpBiayaBunga] = React.useState(
    initialSeed.kpBiayaBunga,
  );

  const listPath =
    "/sak-ep-cabang/simpanan-berjangka/produk-simpanan-berjangka-konsolidasi";

  const hasJenisPembulatan = jenisPembulatan.trim().length > 0;

  React.useEffect(() => {
    if (hasJenisPembulatan) return;
    setKelipatanPembulatan("");
  }, [hasJenisPembulatan]);

  function handlePinaltyModeChange(nextMode: string) {
    setPinaltyMode(nextMode);

    const current = pinalty.trim();

    if (nextMode === "percent") {
      if (!current || current === "0" || current === "0,00" || current === "0.00") {
        setPinalty("0%");
      }
      return;
    }

    if (nextMode === "rp") {
      if (!current || current === "0" || current === "0%") {
        setPinalty("0,00");
      }
    }
  }

  function save() {
    toast(
      isEditPage
        ? "Perubahan produk deposito tersimpan"
        : "Simpan produk deposito (prototype)",
      {
        description: `${kode || "Kode"} • ${namaProduk || "Produk Deposito"}`,
      },
    );
  }

  const formInputClassName = cn(
    "h-[30px] rounded-[5px] border-slate-300 bg-white px-3",
    "text-[14px] font-normal text-[#334155] shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const readonlyInputClassName = cn(
    formInputClassName,
    "cursor-not-allowed bg-slate-200/80 text-[#64748B]",
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
            Produk Deposito
          </h1>
          <div className="text-[16px] font-semibold tracking-tight text-[#64748B]">
            {isEditPage ? "Ubah" : "Tambah"}
          </div>
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
                readOnly={isEditPage}
                aria-readonly={isEditPage}
                className={isEditPage ? readonlyInputClassName : formInputClassName}
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
                placeholder="0,00"
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={cn(labelClassName, "inline-flex items-center")}>
                Tanggal Maksimal dapat Bunga{requiredMark}
                <FieldTooltip
                  content="Jika pilih '0' maka proses bunga akan selalu dijalankan pada bulan selanjutnya."
                  className="ml-2"
                />
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
                options={[
                  "Metode Bunga Flat",
                  "Metode Bunga Efektif",
                  "Metode Bunga Rata-rata",
                ]}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Bunga Per Tahun (%){requiredMark}
              </label>
              <Input
                value={bungaPerTahun}
                onChange={(event) => setBungaPerTahun(event.target.value)}
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
                className={
                  hasJenisPembulatan
                    ? formInputClassName
                    : readonlyInputClassName
                }
                inputMode="numeric"
                readOnly={!hasJenisPembulatan}
                disabled={!hasJenisPembulatan}
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
              <label className={labelClassName}>Pinalty{requiredMark}</label>
              <div className="flex items-stretch">
                <Select
                  value={pinaltyMode || undefined}
                  onValueChange={handlePinaltyModeChange}
                >
                  <SelectTrigger
                    className={cn(
                      selectTriggerClassName,
                      "w-[72px] rounded-r-none border-r-0 text-black",
                    )}
                  >
                    <SelectValue placeholder="" />
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
                  placeholder={pinaltyMode === "percent" ? "0%" : "0,00"}
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Periode Waktu{requiredMark}</label>
              <div className="relative">
                <Input
                  value={periodeWaktu}
                  onChange={(event) =>
                    setPeriodeWaktu(event.target.value.replace(/[^\d]/g, ""))
                  }
                  className={cn(formInputClassName, "rounded-r-[5px] pr-20")}
                  inputMode="numeric"
                />
                <span className="pointer-events-none absolute right-0 top-0 inline-flex h-[30px] min-w-[68px] items-center justify-center rounded-r-[5px] bg-[#596882] px-3 text-[14px] font-normal text-white">
                  Bulan
                </span>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Metode Dapat Bunga{requiredMark}</label>
              <ClearableSavingsSelect
                value={metodeDapatBunga}
                onValueChange={setMetodeDapatBunga}
                placeholder="Pilih Metode Dapat Bunga"
                options={[
                  "Pada Saat Jatuh Tempo Pada Periode Yang Sama Dapat Bunga",
                  "Pada Saat Jatuh Tempo Periode Berikutnya",
                  "Pada Saat Pencairan Deposito",
                ]}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Status{requiredMark}</label>
              <SavingsTogglePill checked={status} onChange={setStatus} />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={cn(labelClassName, "inline-flex items-center")}>
                Transfer Bunga Gross{requiredMark}
                <FieldTooltip
                  content="Jika pilih 'on' maka penyerahantun bunga akan diberikan secara gross atau belum dipotong pajak. Nominal bunga yang diterima adalah nominal sebelum dipotong pajak. Pemotongan pajak bunga akan dilakukan secara terpisah pada rekening simpanan penampung bunga."
                  className="ml-2"
                />
              </label>
              <SavingsTogglePill
                checked={transferBungaGross}
                onChange={setTransferBungaGross}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={cn(labelClassName, "inline-flex items-center")}>
                Penampung Bunga Milik Nasabah Lain{requiredMark}
                <FieldTooltip
                  content="Jika pilih 'on' maka rekening penampung bunga diperbolehkan memilih rekening milik nasabah lain"
                  className="ml-2"
                />
              </label>
              <SavingsTogglePill
                checked={penampungBungaNasabahLain}
                onChange={setPenampungBungaNasabahLain}
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
                  Akun pengakuan biaya bunga sesuai kebijakan akuntasi deposito
                  pada penerapan SAK EP
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
                  Akun biaya bunga saat pengakuan biaya bunga sesuai kebijakan
                  akuntansi deposito pada penerapan SAK EP
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
              <CheckSquare className="h-5 w-5" strokeWidth={3} />
              Simpan
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}