import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import SavingsTogglePill from "@/components/savings/products/SavingsTogglePill";
import SavingsProductAdditionalTabs from "@/components/savings/products/SavingsProductAdditionalTabs";
import SavingsProductCoaDropdownFields from "@/components/savings/products/SavingsProductCoaDropdownFields";
import SavingsMonthSelect from "@/components/savings/products/SavingsMonthSelect";

type SavingsProductSeed = {
  kode: string;
  tabunganKhususAnggota: string;
  namaProduk: string;
  setoranAwal: string;
  setoranMinimal: string;
  saldoMinimal: string;
  saldoMengendap: string;
  bulanMengendap: string;
  tanggalMaksimalDapatBunga: string;
  bungaTier: boolean;
  bulanTidakDihitung: boolean;
  bulanTerhitungBunga: boolean;
  jenisBunga: string;
  bungaTabungan: string;
  jenisPembulatan: string;
  kelipatanPembulatan: string;
  pajakBunga: string;
  biayaAdminMode: string;
  biayaAdmin: string;
  minimalBulanTanpaTransaksi: string;
  biayaAdminMbankingSaja: boolean;
  tabunganBerjangka: boolean;
  aksesAntarNasabah: boolean;
  aksesAntarBank: boolean;
  simpananAsuransi: boolean;
  bungaCadanganTabungan: boolean;
  penampungSplitBunga: boolean;
  saldoDapatDitarik: boolean;
  transferMasuk: boolean;
  rekeningTanpaSetoranAwal: boolean;
  status: boolean;
  jenisTransaksiBungaDefault: string;
};

const defaultEditSeed: SavingsProductSeed = {
  kode: "S001",
  tabunganKhususAnggota: "semua",
  namaProduk: "Simpanan Sukarela",
  setoranAwal: "100.000,00",
  setoranMinimal: "10.000,00",
  saldoMinimal: "25.000,00",
  saldoMengendap: "50.000,00",
  bulanMengendap: "1",
  tanggalMaksimalDapatBunga: "31",
  bungaTier: true,
  bulanTidakDihitung: false,
  bulanTerhitungBunga: true,
  jenisBunga: "Bunga Harian",
  bungaTabungan: "2.50%",
  jenisPembulatan: "Pembulatan Keatas",
  kelipatanPembulatan: "100",
  pajakBunga: "10%",
  biayaAdminMode: "rp",
  biayaAdmin: "2.000,00",
  minimalBulanTanpaTransaksi: "3",
  biayaAdminMbankingSaja: false,
  tabunganBerjangka: false,
  aksesAntarNasabah: true,
  aksesAntarBank: true,
  simpananAsuransi: false,
  bungaCadanganTabungan: true,
  penampungSplitBunga: false,
  saldoDapatDitarik: true,
  transferMasuk: true,
  rekeningTanpaSetoranAwal: false,
  status: true,
  jenisTransaksiBungaDefault: "Bunga Tabungan",
};

const editSeedById: Record<string, SavingsProductSeed> = {
  "SP-001": defaultEditSeed,
  "SP-002": {
    ...defaultEditSeed,
    kode: "S002",
    namaProduk: "Simpanan Harian",
    jenisBunga: "Bunga Bulanan",
    bungaTabungan: "3.00%",
    setoranAwal: "50.000,00",
  },
  "SP-003": {
    ...defaultEditSeed,
    kode: "S003",
    namaProduk: "Simpanan Pendidikan",
    bungaTabungan: "3.25%",
    saldoMengendap: "100.000,00",
  },
  "SP-004": {
    ...defaultEditSeed,
    kode: "SB001",
    namaProduk: "Simpanan Berjangka 6 Bulan",
    jenisBunga: "Bunga Rata-rata",
    bungaTabungan: "5.50%",
    tabunganBerjangka: true,
  },
  "SP-005": {
    ...defaultEditSeed,
    kode: "SB002",
    namaProduk: "Simpanan Berjangka 12 Bulan",
    jenisBunga: "Bunga Rata-rata",
    bungaTabungan: "6.00%",
    tabunganBerjangka: true,
    status: false,
  },
};

export default function ProdukTabunganTambah() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string }>();

  const isEditPage = location.pathname.endsWith("/edit");
  const editSeed = isEditPage
    ? editSeedById[params.id ?? ""] ?? defaultEditSeed
    : null;

  const tanggalMaksimalOptions = React.useMemo(
    () => Array.from({ length: 31 }).map((_, index) => String(index + 1)),
    [],
  );

  const [kode, setKode] = React.useState(editSeed?.kode ?? "");
  const [tabunganKhususAnggota, setTabunganKhususAnggota] = React.useState(
    editSeed?.tabunganKhususAnggota ?? "",
  );
  const [namaProduk, setNamaProduk] = React.useState(
    editSeed?.namaProduk ?? "",
  );
  const [setoranAwal, setSetoranAwal] = React.useState(
    editSeed?.setoranAwal ?? "0,00",
  );
  const [setoranMinimal, setSetoranMinimal] = React.useState(
    editSeed?.setoranMinimal ?? "0,00",
  );
  const [saldoMinimal, setSaldoMinimal] = React.useState(
    editSeed?.saldoMinimal ?? "0,00",
  );
  const [saldoMengendap, setSaldoMengendap] = React.useState(
    editSeed?.saldoMengendap ?? "0,00",
  );
  const [bulanMengendap, setBulanMengendap] = React.useState(
    editSeed?.bulanMengendap ?? "",
  );
  const [tanggalMaksimalDapatBunga, setTanggalMaksimalDapatBunga] =
    React.useState(editSeed?.tanggalMaksimalDapatBunga ?? "");
  const [bungaTier, setBungaTier] = React.useState(
    editSeed?.bungaTier ?? false,
  );
  const [bulanTidakDihitung, setBulanTidakDihitung] = React.useState(
    editSeed?.bulanTidakDihitung ?? false,
  );
  const [bulanTerhitungBunga, setBulanTerhitungBunga] = React.useState(
    editSeed?.bulanTerhitungBunga ?? false,
  );

  const [jenisBunga, setJenisBunga] = React.useState(
    editSeed?.jenisBunga ?? "",
  );
  const [bungaTabungan, setBungaTabungan] = React.useState(
    editSeed?.bungaTabungan ?? "",
  );
  const [jenisPembulatan, setJenisPembulatan] = React.useState(
    editSeed?.jenisPembulatan ?? "",
  );
  const [kelipatanPembulatan, setKelipatanPembulatan] = React.useState(
    editSeed?.kelipatanPembulatan ?? "0",
  );
  const [pajakBunga, setPajakBunga] = React.useState(
    editSeed?.pajakBunga ?? "0%",
  );
  const [biayaAdminMode, setBiayaAdminMode] = React.useState(
    editSeed?.biayaAdminMode ?? "rp",
  );
  const [biayaAdmin, setBiayaAdmin] = React.useState(
    editSeed?.biayaAdmin ?? "0,00",
  );
  const [minimalBulanTanpaTransaksi, setMinimalBulanTanpaTransaksi] =
    React.useState(editSeed?.minimalBulanTanpaTransaksi ?? "0");

  const [biayaAdminMbankingSaja, setBiayaAdminMbankingSaja] =
    React.useState(editSeed?.biayaAdminMbankingSaja ?? false);
  const [tabunganBerjangka, setTabunganBerjangka] = React.useState(
    editSeed?.tabunganBerjangka ?? false,
  );
  const [aksesAntarNasabah, setAksesAntarNasabah] = React.useState(
    editSeed?.aksesAntarNasabah ?? false,
  );
  const [aksesAntarBank, setAksesAntarBank] = React.useState(
    editSeed?.aksesAntarBank ?? false,
  );
  const [simpananAsuransi, setSimpananAsuransi] = React.useState(
    editSeed?.simpananAsuransi ?? false,
  );
  const [bungaCadanganTabungan, setBungaCadanganTabungan] =
    React.useState(editSeed?.bungaCadanganTabungan ?? false);
  const [penampungSplitBunga, setPenampungSplitBunga] = React.useState(
    editSeed?.penampungSplitBunga ?? false,
  );
  const [saldoDapatDitarik, setSaldoDapatDitarik] = React.useState(
    editSeed?.saldoDapatDitarik ?? false,
  );
  const [transferMasuk, setTransferMasuk] = React.useState(
    editSeed?.transferMasuk ?? false,
  );
  const [rekeningTanpaSetoranAwal, setRekeningTanpaSetoranAwal] =
    React.useState(editSeed?.rekeningTanpaSetoranAwal ?? false);
  const [status, setStatus] = React.useState(editSeed?.status ?? true);
  const [jenisTransaksiBungaDefault, setJenisTransaksiBungaDefault] =
    React.useState(editSeed?.jenisTransaksiBungaDefault ?? "");

  function save() {
    toast(
      isEditPage
        ? "Perubahan produk simpanan tersimpan"
        : "Simpan produk tabungan (prototype)",
      {
        description: isEditPage
          ? `${kode} • ${namaProduk}`
          : "Detail lanjutan produk tabungan akan ditambahkan pada tahap berikutnya.",
      },
    );
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

  const labelClassName =
    "text-[14px] font-normal leading-snug text-[#002060]";
  const helperClassName = "mt-1 text-[13px] font-normal text-[#6479A6]";
  const requiredMark = <span className="text-rose-600">*</span>;

  return (
    <div className="min-h-screen bg-[hsl(var(--app-bg))]">
      <div className="w-full px-2 py-6 md:px-3 md:py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
              Produk Tabungan
            </h1>
            <div className="text-sm font-semibold text-slate-500">
              {isEditPage ? "Ubah" : "Tambah"}
            </div>
          </div>
        </div>

        <Card className="mt-6 rounded-[5px] border-slate-200/70 bg-white/90 p-[40px] shadow-sm backdrop-blur">
          <div className="grid gap-[10px]">
            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Kode{requiredMark}</label>
              <Input
                value={kode}
                onChange={(event) => setKode(event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[5px]")}>
                Tabungan Khusus Anggota
              </label>
              <div>
                <Select
                  value={tabunganKhususAnggota}
                  onValueChange={setTabunganKhususAnggota}
                >
                  <SelectTrigger className={selectTriggerClassName}>
                    <SelectValue placeholder="Silahkan Pilih" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    <SelectItem value="anggota" className={selectItemClassName}>
                      Anggota
                    </SelectItem>
                    <SelectItem
                      value="calon-anggota"
                      className={selectItemClassName}
                    >
                      Calon Anggota
                    </SelectItem>
                    <SelectItem value="semua" className={selectItemClassName}>
                      Semua
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className={helperClassName}>
                  Kosongkan jika produk tabungan ini dapat dimiliki oleh setiap
                  Calon Anggota
                </div>
              </div>
            </div>

            <div className="h-[20px]" />

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Nama Produk{requiredMark}</label>
              <Input
                value={namaProduk}
                onChange={(event) => setNamaProduk(event.target.value)}
                className={formInputClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Setoran Awal{requiredMark}</label>
              <Input
                value={setoranAwal}
                onChange={(event) => setSetoranAwal(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Setoran Minimal{requiredMark}
              </label>
              <Input
                value={setoranMinimal}
                onChange={(event) => setSetoranMinimal(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Saldo Minimal{requiredMark}</label>
              <Input
                value={saldoMinimal}
                onChange={(event) => setSaldoMinimal(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Saldo Mengendap{requiredMark}
              </label>
              <Input
                value={saldoMengendap}
                onChange={(event) => setSaldoMengendap(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Jumlah Bulan Mengendap untuk
                <br />
                bunga{requiredMark}
              </label>
              <SavingsMonthSelect
                value={bulanMengendap}
                onValueChange={setBulanMengendap}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Bunga Tier{requiredMark}
              </label>
              <div>
                <SavingsTogglePill checked={bungaTier} onChange={setBungaTier} />
                <div className={helperClassName}>
                  Jika "on" mekanisme bunga yang digunakan adalah bunga tier
                  progressive
                  <br />
                  Jika "off" mekanisme bunga yang digunakan adalah bunga tier
                  simple
                </div>
              </div>
            </div>

            <div className="h-[18px]" />

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Jumlah Bulan Tidak Dihitung{requiredMark}
              </label>
              <div>
                <SavingsTogglePill
                  checked={bulanTidakDihitung}
                  onChange={setBulanTidakDihitung}
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <div />
              <div className={helperClassName}>
                Jika "on" mekanisme Jumlah Bulan Tidak Dihitung tidak aktif,
                dengan default 0
                <br />
                Jika "off" mekanisme Jumlah Bulan Tidak Dihitung tidak aktif
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Jumlah Bulan Terhitung Bunga{requiredMark}
              </label>
              <div>
                <SavingsTogglePill
                  checked={bulanTerhitungBunga}
                  onChange={setBulanTerhitungBunga}
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <div />
              <div className={helperClassName}>
                Jika "on" mekanisme Jumlah Bulan Terhitung Bunga, jika aktif
                akan mempengaruhi range saldo bulan. Hanya berlaku pada
                perhitungan bunga saldo harian dan saldo rata-rata
                <br />
                Jika "off" mekanisme Jumlah Bulan Terhitung Bunga tidak aktif
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Tanggal Maksimal dapat Bunga{requiredMark}
              </label>
              <SavingsMonthSelect
                value={tanggalMaksimalDapatBunga}
                onValueChange={setTanggalMaksimalDapatBunga}
                placeholder="Pilih Tanggal"
                options={tanggalMaksimalOptions}
                triggerClassName={selectTriggerClassName}
                contentClassName={selectContentClassName}
                itemClassName={selectItemClassName}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Jenis Bunga{requiredMark}</label>
              <Select value={jenisBunga} onValueChange={setJenisBunga}>
                <SelectTrigger className={selectTriggerClassName}>
                  <SelectValue placeholder="Pilih Jenis Bunga" />
                </SelectTrigger>
                <SelectContent className={selectContentClassName}>
                  <SelectItem value="Bunga Harian" className={selectItemClassName}>
                    Bunga Harian
                  </SelectItem>
                  <SelectItem value="Bunga Bulanan" className={selectItemClassName}>
                    Bunga Bulanan
                  </SelectItem>
                  <SelectItem value="Bunga Rata-rata" className={selectItemClassName}>
                    Bunga Rata-rata
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Bunga Tabungan{requiredMark}</label>
              <Input
                value={bungaTabungan}
                onChange={(event) => setBungaTabungan(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Jenis Pembulatan</label>
              <Select
                value={jenisPembulatan}
                onValueChange={setJenisPembulatan}
              >
                <SelectTrigger className={selectTriggerClassName}>
                  <SelectValue placeholder="Pilih Jenis Pembulatan" />
                </SelectTrigger>
                <SelectContent className={selectContentClassName}>
                  <SelectItem value="Pembulatan Keatas" className={selectItemClassName}>
                    Pembulatan Keatas
                  </SelectItem>
                  <SelectItem value="Pembulatan Kebawah" className={selectItemClassName}>
                    Pembulatan Kebawah
                  </SelectItem>
                  <SelectItem value="Tanpa Pembulatan" className={selectItemClassName}>
                    Tanpa Pembulatan
                  </SelectItem>
                </SelectContent>
              </Select>
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
              <label className={labelClassName}>Pajak Bunga{requiredMark}</label>
              <Input
                value={pajakBunga}
                onChange={(event) => setPajakBunga(event.target.value)}
                className={formInputClassName}
                inputMode="decimal"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Biaya Admin{requiredMark}</label>
              <div className="flex items-stretch">
                <Select value={biayaAdminMode} onValueChange={setBiayaAdminMode}>
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
                  value={biayaAdmin}
                  onChange={(event) => setBiayaAdmin(event.target.value)}
                  className={cn(formInputClassName, "rounded-l-none")}
                  inputMode="decimal"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Minimal Bulan tanpa Transaksi
                <br />
                dikenakan Biaya Admin{requiredMark}
              </label>
              <Input
                value={minimalBulanTanpaTransaksi}
                onChange={(event) =>
                  setMinimalBulanTanpaTransaksi(event.target.value)
                }
                className={formInputClassName}
                inputMode="numeric"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Biaya Admin Untuk MBanking Saja{requiredMark}
              </label>
              <SavingsTogglePill
                checked={biayaAdminMbankingSaja}
                onChange={setBiayaAdminMbankingSaja}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Tabungan Berjangka{requiredMark}
              </label>
              <SavingsTogglePill
                checked={tabunganBerjangka}
                onChange={setTabunganBerjangka}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Akses Transfer{requiredMark}
              </label>
              <div className="grid gap-5 md:grid-cols-2 md:gap-10">
                <div className="grid gap-3">
                  <div className={labelClassName}>Transfer Antar Nasabah</div>
                  <div className="grid gap-2 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                    <div className={labelClassName}>
                      Akses Antar Nasabah{requiredMark}
                    </div>
                    <SavingsTogglePill
                      checked={aksesAntarNasabah}
                      onChange={setAksesAntarNasabah}
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className={labelClassName}>Transfer Antar Bank</div>
                  <div className="grid gap-2 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                    <div className={labelClassName}>
                      Akses Antar Bank{requiredMark}
                    </div>
                    <SavingsTogglePill
                      checked={aksesAntarBank}
                      onChange={setAksesAntarBank}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Simpanan Asuransi
              </label>
              <div>
                <SavingsTogglePill
                  checked={simpananAsuransi}
                  onChange={setSimpananAsuransi}
                />
                <div className={helperClassName}>
                  Jika "on" produk ini sebagai simpanan khusus untuk asuransi
                  pinjaman
                </div>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Bunga Cadangan Tabungan{requiredMark}
              </label>
              <SavingsTogglePill
                checked={bungaCadanganTabungan}
                onChange={setBungaCadanganTabungan}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Penampung Hasil Split Bunga
                <br />
                Pinjaman{requiredMark}
              </label>
              <SavingsTogglePill
                checked={penampungSplitBunga}
                onChange={setPenampungSplitBunga}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[3px]")}>
                Saldo Dapat Ditarik
              </label>
              <div>
                <SavingsTogglePill
                  checked={saldoDapatDitarik}
                  onChange={setSaldoDapatDitarik}
                />
                <div className={helperClassName}>
                  Jika "on" maka saldo rekening dari produk ini dapat ditarik
                  pada menu penarikan tabungan
                </div>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Transfer Masuk{requiredMark}</label>
              <SavingsTogglePill
                checked={transferMasuk}
                onChange={setTransferMasuk}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>
                Pembukaan Rekening Tanpa Setoran
                <br />
                Awal{requiredMark}
              </label>
              <SavingsTogglePill
                checked={rekeningTanpaSetoranAwal}
                onChange={setRekeningTanpaSetoranAwal}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
              <label className={labelClassName}>Status{requiredMark}</label>
              <SavingsTogglePill checked={status} onChange={setStatus} />
            </div>

            <div className="grid gap-2 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <label className={cn(labelClassName, "pt-[5px]")}>
                Jenis Transaksi Bunga Default
              </label>
              <div>
                <Select
                  value={jenisTransaksiBungaDefault}
                  onValueChange={setJenisTransaksiBungaDefault}
                >
                  <SelectTrigger className={selectTriggerClassName}>
                    <SelectValue placeholder="Pilih Jenis Transaksi Bunga Default" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClassName}>
                    <SelectItem
                      value="Bunga Tabungan"
                      className={selectItemClassName}
                    >
                      Bunga Tabungan
                    </SelectItem>
                    <SelectItem
                      value="Bunga Simpanan"
                      className={selectItemClassName}
                    >
                      Bunga Simpanan
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className={helperClassName}>
                  Jika memilih jenis transaksi bunga default, maka saat melakukan
                  proses bunga jenis transaksi ini yang akan otomatis digunakan
                </div>
              </div>
            </div>

            <SavingsProductCoaDropdownFields />
          </div>

          <SavingsProductAdditionalTabs
            onAddAdminFee={() =>
              toast("Tambah Biaya Admin (prototype)", {
                description: "Form detail biaya admin akan ditambahkan berikutnya.",
              })
            }
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
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
              onClick={save}
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