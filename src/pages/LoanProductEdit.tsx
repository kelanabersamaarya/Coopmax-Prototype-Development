import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { BillingScheme } from "@/lib/loanProductsStore";
import PenaltyRateField, {
  type PenaltyRateMode,
} from "@/components/loans/PenaltyRateField";
import FieldTooltip from "@/components/loans/FieldTooltip";
import LoanFormActionButtons from "@/components/loans/LoanFormActionButtons";

type PeriodUnit = "Bulan" | "Hari";
type RoundingType =
  | "Pembulatan Keatas"
  | "Pembulatan Kebawah"
  | "Tanpa Pembulatan";
type PenaltyMethod = "Hutang Bunga" | "Hutang Pokok" | "Total Tagihan";
type CoaOption =
  | "PINJAMAN YANG DIBERIKAN"
  | "PEND. BUNGA PINJAMAN"
  | "PEND. DENDA"
  | "PENDAPATAN LAIN - LAIN"
  | "PEN. ADMINISTRASI"
  | "PILIH";

type InstallmentMode =
  | "Jadwal Tetap (Diterbitkan Penuh di Awal)"
  | "Jadwal Fleksibel & Tagihan Berkala"
  | "Dihitung dari Sisa Saldo Pokok";

type AmountMode = "rp" | "percent";

type CollectorKind = "Kolektor 1" | "Kolektor 2" | "Kolektor 3";
type FeeMethod = "Plafon Pinjaman" | "Angsuran" | "Tenor";

type CollectorFeeRow = {
  id: string;
  collectorKind: CollectorKind;
  feeMethod: FeeMethod;
  minLoan: string;
  maxLoan: string;
  feePercent: string;
};

type GraceScheme = "Hanya Bayar Bunga";
type GraceUnit = "Pilih Satuan Grace Period" | "Hari" | "Bulan";

type PenaltyBase =
  | "Pokok"
  | "Bunga"
  | "Hutang Pokok"
  | "Hutang Bunga"
  | "Berdasarkan Total tagihan"
  | "Pilih Dasar Perhitungan";

const UI = {
  radius: "rounded-[5px]",
  fieldH: "h-[30px]",
  fieldText: "text-[12.5px]",
  gapY: "gap-[15px]",
  selectTrigger:
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
  input: "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
  textarea: "rounded-[5px] border-slate-200 bg-white text-[12.5px]",
  button: "h-[30px] rounded-[5px] text-[12.5px]",
} as const;

function FieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-start">
      <div className="pt-1">
        <div className="text-sm font-normal text-slate-900">{label}</div>
        {hint ? (
          <div className="mt-1 text-xs text-slate-500">{hint}</div>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function InfoBadge() {
  // Match screenshot: solid blue circle with "?" feel
  return (
    <span
      className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-white ring-1 ring-[#2563eb]/25"
      aria-hidden="true"
    >
      <HelpCircle className="h-4 w-4" />
    </span>
  );
}

const TT = {
  konfigurasiTagihanAngsuran:
    "Atur bagaimana tagihan angsuran diterbitkan termasuk skema tagihans serta atur grace period (satuan & durasi)",
  tagihanMengikutiTabelAngsuran:
    "Tagihan angsuran dibuat otomatis setiap bulan mengikuti tabel angsuran, meliputi angsuran pokok dan bunga.",
  skemaTagihan:
    "Skema tagihan menentukan bagaimana nominal dan komponen tagihan dihitung setiap periode (misalnya pokok, bunga, biaya, dan tunggakan).",
  gracePeriod:
    "Grace period adalah periode awal pinjaman yang memberi keringanan pembayaran untuk sementara waktu sesuai skema yang dipilih.",

  tagihanSesuaiJadwalAngsuran:
    "Tagihan diterbitkan mengikuti jadwal angsuran yang ditentukan sebelumnya. Setiap periode, angsuran akan ditagihkan sesuai jadwal jatuh tempo (misalnya pokok + bunga + biaya).",
  jadwalFleksibelTagihanBerkala:
    "Tagihan diterbitkan rutin setiap periode (misalnya bulanan), namun jenis tagihan bisa disesuaikan (misalnya hanya melakukan penagihan bunga atau hanya pokok pinjaman).",
  tagihanDihitungDariSisaSaldoPokok:
    "Tagihan yang diterbitkan mencakup seluruh pokok, bunga dan denda yang masih harus dibayarkan.",

  gracePeriodBunga:
    "Grace period bunga adalah periode awal pinjaman dimana nasabah hanya membayar bunga tanpa membayar pokok pinjaman",
} as const;

function AmountModeInput({
  mode,
  onModeChange,
  value,
  onValueChange,
  placeholder = "0,00",
}: {
  mode: AmountMode;
  onModeChange: (v: AmountMode) => void;
  value: string;
  onValueChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex w-full items-center gap-2">
        <Select value={mode} onValueChange={(v) => onModeChange(v as AmountMode)}>
          <SelectTrigger className={UI.selectTrigger + " w-[84px] px-2.5"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-[10px] border-slate-200">
            <SelectItem value="rp">Rp.</SelectItem>
            <SelectItem value="percent">%</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={UI.input}
          placeholder={placeholder}
          inputMode="decimal"
        />
      </div>
    </div>
  );
}

function FeeRow({
  row,
  onChange,
  onRemove,
}: {
  row: CollectorFeeRow;
  onChange: (next: CollectorFeeRow) => void;
  onRemove: () => void;
}) {
  const selectCls =
    "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] [&>span.absolute.right-2]:hidden";

  return (
    <div className="grid gap-3 rounded-[5px] bg-white p-4 ring-1 ring-slate-200 md:grid-cols-[1.05fr_1.05fr_1.25fr_1.25fr_0.75fr_56px] md:items-end">
      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">
          Jenis Kolektor
        </Label>
        <Select
          value={row.collectorKind}
          onValueChange={(v) =>
            onChange({ ...row, collectorKind: v as CollectorKind })
          }
        >
          <SelectTrigger className={selectCls}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-[10px] border-slate-200">
            <SelectItem value="Kolektor 1">Kolektor 1</SelectItem>
            <SelectItem value="Kolektor 2">Kolektor 2</SelectItem>
            <SelectItem value="Kolektor 3">Kolektor 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">
          Metode Perhitungan Fee
        </Label>
        <Select
          value={row.feeMethod}
          onValueChange={(v) => onChange({ ...row, feeMethod: v as FeeMethod })}
        >
          <SelectTrigger className={selectCls}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-[10px] border-slate-200">
            <SelectItem value="Plafon Pinjaman">Plafon Pinjaman</SelectItem>
            <SelectItem value="Angsuran">Angsuran</SelectItem>
            <SelectItem value="Tenor">Tenor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">
          Minimal Jumlah Pinjaman
        </Label>
        <Input
          value={row.minLoan}
          onChange={(e) => onChange({ ...row, minLoan: e.target.value })}
          className={UI.input}
          placeholder="1.000.000,00"
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">
          Maksimal Jumlah Pinjaman
        </Label>
        <Input
          value={row.maxLoan}
          onChange={(e) => onChange({ ...row, maxLoan: e.target.value })}
          className={UI.input}
          placeholder="50.000.000,00"
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">Jumlah Fee (%)</Label>
        <div className="relative">
          <Input
            value={row.feePercent}
            onChange={(e) => onChange({ ...row, feePercent: e.target.value })}
            className={UI.input + " pr-10"}
            placeholder="12"
            inputMode="decimal"
          />
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
            %
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="inline-flex h-[30px] w-14 items-center justify-center rounded-[5px] bg-rose-600 text-white ring-1 ring-rose-600/20 transition hover:bg-rose-700"
        aria-label="Hapus fee kolektor"
        title="Hapus"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function LoanProductEdit() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const [code, setCode] = React.useState("klpk04.07");
  const [name, setName] = React.useState("Pinjaman Emas");

  const [rc, setRc] = React.useState(false);

  const [periodUnit, setPeriodUnit] = React.useState<PeriodUnit>("Bulan");
  const [minPeriod, setMinPeriod] = React.useState("12");
  const [maxPeriod, setMaxPeriod] = React.useState("12");

  const [billingScheme, setBillingScheme] =
    React.useState<BillingScheme>("Anuitas");

  const [interestCountsOnInterestDebt, setInterestCountsOnInterestDebt] =
    React.useState(false);

  const [interestYearly, setInterestYearly] = React.useState("24.00");

  const [roundingType, setRoundingType] =
    React.useState<RoundingType>("Pembulatan Keatas");
  const [roundingMultiple, setRoundingMultiple] = React.useState("100");

  const [penalty, setPenalty] = React.useState("100");
  const [nominalStep, setNominalStep] = React.useState("100");

  const [terms, setTerms] = React.useState("");

  const [accPenalty, setAccPenalty] = React.useState(true);
  const [penaltyMethod, setPenaltyMethod] =
    React.useState<PenaltyMethod>("Hutang Bunga");

  const [accInterest, setAccInterest] = React.useState(false);
  const [ignorePrincipalDebt, setIgnorePrincipalDebt] = React.useState(false);
  const [ignoreInterestDebt, setIgnoreInterestDebt] = React.useState(false);

  const [minLoan, setMinLoan] = React.useState("1.000.000,00");
  const [maxLoan, setMaxLoan] = React.useState("100.000.000,00");

  const [specialEndDate, setSpecialEndDate] = React.useState(false);

  const [propisiMode, setPropisiMode] = React.useState<AmountMode>("rp");
  const [adminMode, setAdminMode] = React.useState<AmountMode>("rp");

  const [propisi, setPropisi] = React.useState("0,00");
  const [admin, setAdmin] = React.useState("0,00");
  const [insurance, setInsurance] = React.useState("0,00");
  const [mbankingActivation, setMbankingActivation] = React.useState("0,00");

  const [withoutCollateral, setWithoutCollateral] = React.useState(false);
  const [splitInterestRevenue, setSplitInterestRevenue] = React.useState(false);

  const [coaLoan, setCoaLoan] = React.useState<CoaOption>(
    "PINJAMAN YANG DIBERIKAN",
  );
  const [coaInterestRevenue, setCoaInterestRevenue] =
    React.useState<CoaOption>("PEND. BUNGA PINJAMAN");
  const [coaSplitInterestRevenue, setCoaSplitInterestRevenue] =
    React.useState<CoaOption>("PILIH");
  const [coaPenaltyRevenue, setCoaPenaltyRevenue] =
    React.useState<CoaOption>("PEND. DENDA");
  const [coaRoundingRevenue, setCoaRoundingRevenue] =
    React.useState<CoaOption>("PENDAPATAN LAIN - LAIN");
  const [coaAdminRevenue, setCoaAdminRevenue] =
    React.useState<CoaOption>("PEN. ADMINISTRASI");

  const [collectorFees, setCollectorFees] = React.useState<CollectorFeeRow[]>(
    [],
  );

  const [useInstallmentTable, setUseInstallmentTable] = React.useState(true);
  const [installmentMode, setInstallmentMode] =
    React.useState<InstallmentMode>("Jadwal Tetap (Diterbitkan Penuh di Awal)");

  const [gracePeriodEnabled, setGracePeriodEnabled] = React.useState(false);
  const [graceScheme, setGraceScheme] =
    React.useState<GraceScheme>("Hanya Bayar Bunga");
  const [graceUnit, setGraceUnit] =
    React.useState<GraceUnit>("Pilih Satuan Grace Period");
  const [graceDuration, setGraceDuration] = React.useState("");

  const graceUnitSuffix =
    graceUnit === "Hari" ? "(Hari)" : graceUnit === "Bulan" ? "(Bulan)" : "";

  const graceDurationLabel = `Durasi Grace Period${graceUnitSuffix ? ` ${graceUnitSuffix}` : ""}`;

  const graceDurationPlaceholder =
    graceUnit === "Hari"
      ? "Masukkan Jumlah Hari"
      : graceUnit === "Bulan"
        ? "Masukkan Jumlah Bulan"
        : "Masukkan Durasi";

  const [tarifDendaMode, setTarifDendaMode] =
    React.useState<PenaltyRateMode>("rp");
  const [tarifDendaValue, setTarifDendaValue] = React.useState("0,00");

  const [dasarPerhitungan, setDasarPerhitungan] =
    React.useState<PenaltyBase>("Pilih Dasar Perhitungan");

  const [hariKeterlambatan, setHariKeterlambatan] = React.useState<string>("0");

  const [dendaBerulang, setDendaBerulang] = React.useState(false);

  const hideDasarPerhitungan = tarifDendaMode === "rp";

  React.useEffect(() => {
    if (!hideDasarPerhitungan) return;
    // Saat mode Rp, dasar perhitungan tidak relevan
    setDasarPerhitungan("Pilih Dasar Perhitungan");
    setDendaBerulang(false);
  }, [hideDasarPerhitungan]);

  function addCollectorFee() {
    setCollectorFees((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        collectorKind: "Kolektor 1",
        feeMethod: "Plafon Pinjaman",
        minLoan: "1.000.000,00",
        maxLoan: "50.000.000,00",
        feePercent: "12",
      },
    ]);
    toast("Fee kolektor ditambahkan", {
      description: "Silakan sesuaikan jenis, metode, dan nominalnya.",
    });
  }

  function save() {
    toast.success("Perubahan tersimpan (prototype)", {
      description: `Produk: ${name} • ID: ${id}`,
    });
    navigate("/loan-products");
  }

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
          <Card className="rounded-[5px] border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
            <div className="text-[16px] font-semibold text-slate-900">
              Konfigurasi Dasar Produk Pinjaman
            </div>

            <div className={"mt-5 grid " + UI.gapY}>
              <FieldRow label="Kode">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={UI.input + " bg-slate-100"}
                />
              </FieldRow>

              <FieldRow label="Produk Pinjaman">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="RC">
                <div className="flex items-center gap-3">
                  <Switch checked={rc} onCheckedChange={setRc} />
                </div>
              </FieldRow>

              <FieldRow label="Periode Pinjaman">
                <Select
                  value={periodUnit}
                  onValueChange={(v) => setPeriodUnit(v as PeriodUnit)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="Bulan">Bulan</SelectItem>
                    <SelectItem value="Hari">Hari</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Minimal Periode Pinjaman">
                <Input
                  value={minPeriod}
                  onChange={(e) => setMinPeriod(e.target.value)}
                  inputMode="numeric"
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Maksimal Periode Pinjaman">
                <Input
                  value={maxPeriod}
                  onChange={(e) => setMaxPeriod(e.target.value)}
                  inputMode="numeric"
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Metode Bunga Pinjaman">
                <Select
                  value={billingScheme}
                  onValueChange={(v) => setBillingScheme(v as BillingScheme)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="Anuitas">
                      Bunga Efektif (Anuitas)
                    </SelectItem>
                    <SelectItem value="Flat">Bunga Flat</SelectItem>
                    <SelectItem value="Menurun">Menurun</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Bunga Pinjaman Memperhitungkan Hutang Bunga">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={interestCountsOnInterestDebt}
                    onCheckedChange={setInterestCountsOnInterestDebt}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Bunga Per Tahun (%)">
                <Input
                  value={interestYearly}
                  onChange={(e) => setInterestYearly(e.target.value)}
                  inputMode="decimal"
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Jenis Pembulatan">
                <Select
                  value={roundingType}
                  onValueChange={(v) => setRoundingType(v as RoundingType)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="Pembulatan Keatas">
                      Pembulatan Keatas
                    </SelectItem>
                    <SelectItem value="Pembulatan Kebawah">
                      Pembulatan Kebawah
                    </SelectItem>
                    <SelectItem value="Tanpa Pembulatan">
                      Tanpa Pembulatan
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Kelipatan Pembulatan">
                <Input
                  value={roundingMultiple}
                  onChange={(e) => setRoundingMultiple(e.target.value)}
                  inputMode="numeric"
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Denda Pinjaman">
                <Input
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  inputMode="numeric"
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Nominal Kelipatan">
                <Input
                  value={nominalStep}
                  onChange={(e) => setNominalStep(e.target.value)}
                  inputMode="numeric"
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Ketentuan Produk Pinjaman">
                <Textarea
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className={UI.textarea + " min-h-[96px]"}
                />
              </FieldRow>
            </div>

            <div className={"mt-6 grid " + UI.gapY}>
              <FieldRow label="Akumulasi Denda Pinjaman">
                <div className="flex items-center gap-3">
                  <Switch checked={accPenalty} onCheckedChange={setAccPenalty} />
                </div>
              </FieldRow>

              <FieldRow label="Metode Perhitungan Denda">
                <Select
                  value={penaltyMethod}
                  onValueChange={(v) => setPenaltyMethod(v as PenaltyMethod)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="Hutang Bunga">Hutang Bunga</SelectItem>
                    <SelectItem value="Hutang Pokok">Hutang Pokok</SelectItem>
                    <SelectItem value="Total Tagihan">Total Tagihan</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Akumulasi Bunga Pinjaman">
                <div className="flex items-center gap-3">
                  <Switch checked={accInterest} onCheckedChange={setAccInterest} />
                </div>
              </FieldRow>

              <FieldRow label="Tidak Menghitung Hutang Pokok">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={ignorePrincipalDebt}
                    onCheckedChange={setIgnorePrincipalDebt}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Tidak Menghitung Hutang Bunga">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={ignoreInterestDebt}
                    onCheckedChange={setIgnoreInterestDebt}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Minimal Pinjaman">
                <Input
                  value={minLoan}
                  onChange={(e) => setMinLoan(e.target.value)}
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Maksimal Pinjaman">
                <Input
                  value={maxLoan}
                  onChange={(e) => setMaxLoan(e.target.value)}
                  className={UI.input}
                />
              </FieldRow>

              <FieldRow label="Menggunakan Tanggal Khusus untuk Akhir Periode">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={specialEndDate}
                    onCheckedChange={setSpecialEndDate}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Propisi">
                <AmountModeInput
                  mode={propisiMode}
                  onModeChange={setPropisiMode}
                  value={propisi}
                  onValueChange={setPropisi}
                />
              </FieldRow>

              <FieldRow label="Administrasi">
                <AmountModeInput
                  mode={adminMode}
                  onModeChange={setAdminMode}
                  value={admin}
                  onValueChange={setAdmin}
                />
              </FieldRow>

              <FieldRow label="Biaya Asuransi">
                <Input
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className={UI.input}
                  inputMode="decimal"
                />
              </FieldRow>

              <FieldRow label="Biaya Aktivasi M-Banking">
                <Input
                  value={mbankingActivation}
                  onChange={(e) => setMbankingActivation(e.target.value)}
                  className={UI.input}
                  inputMode="decimal"
                />
              </FieldRow>

              <FieldRow label="Tanpa Agunan">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={withoutCollateral}
                    onCheckedChange={setWithoutCollateral}
                  />
                </div>
              </FieldRow>

              <FieldRow
                label={
                  <span className="inline-flex items-center">
                    Split Pendapatan Bunga <InfoBadge />
                  </span> as any
                }
              >
                <div className="flex items-center gap-3">
                  <Switch
                    checked={splitInterestRevenue}
                    onCheckedChange={setSplitInterestRevenue}
                  />
                </div>
              </FieldRow>
            </div>

            <div className={"mt-6 grid " + UI.gapY}>
              <FieldRow label="KP Pinjaman">
                <Select
                  value={coaLoan}
                  onValueChange={(v) => setCoaLoan(v as CoaOption)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue placeholder="Pilih CoA Pinjaman" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="PINJAMAN YANG DIBERIKAN">
                      PINJAMAN YANG DIBERIKAN
                    </SelectItem>
                    <SelectItem value="PILIH">Pilih…</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="KP Pendapatan Bunga">
                <Select
                  value={coaInterestRevenue}
                  onValueChange={(v) => setCoaInterestRevenue(v as CoaOption)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue placeholder="Pilih CoA Pendapatan Bunga" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="PEND. BUNGA PINJAMAN">
                      PEND. BUNGA PINJAMAN
                    </SelectItem>
                    <SelectItem value="PILIH">Pilih…</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow
                label={
                  <span className="inline-flex items-center">
                    KP Pembagi Pendapatan Bunga <InfoBadge />
                  </span> as any
                }
                hint="Diisi jika ingin pembukuan pendapatan Bunga dibagi ke KP ini."
              >
                <Select
                  value={coaSplitInterestRevenue}
                  onValueChange={(v) => setCoaSplitInterestRevenue(v as CoaOption)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue placeholder="Pilih COA Pendapatan Bunga" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="PILIH">Pilih…</SelectItem>
                    <SelectItem value="PEND. BUNGA PINJAMAN">
                      PEND. BUNGA PINJAMAN
                    </SelectItem>
                    <SelectItem value="PENDAPATAN LAIN - LAIN">
                      PENDAPATAN LAIN - LAIN
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="KP Pendapatan Denda">
                <Select
                  value={coaPenaltyRevenue}
                  onValueChange={(v) => setCoaPenaltyRevenue(v as CoaOption)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue placeholder="Pilih CoA Biaya Denda" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="PEND. DENDA">PEND. DENDA</SelectItem>
                    <SelectItem value="PILIH">Pilih…</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="KP Pendapatan Pembulatan">
                <Select
                  value={coaRoundingRevenue}
                  onValueChange={(v) => setCoaRoundingRevenue(v as CoaOption)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue placeholder="Pilih CoA Pembulatan" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="PENDAPATAN LAIN - LAIN">
                      PENDAPATAN LAIN - LAIN
                    </SelectItem>
                    <SelectItem value="PILIH">Pilih…</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="KP Pendapatan Admin">
                <Select
                  value={coaAdminRevenue}
                  onValueChange={(v) => setCoaAdminRevenue(v as CoaOption)}
                >
                  <SelectTrigger className={UI.selectTrigger}>
                    <SelectValue placeholder="Pilih CoA Biaya Admin" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[10px] border-slate-200">
                    <SelectItem value="PEN. ADMINISTRASI">
                      PEN. ADMINISTRASI
                    </SelectItem>
                    <SelectItem value="PILIH">Pilih…</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-base font-semibold text-slate-900">
                Konfigurasi Fee Kolektor
              </div>
              <Button
                onClick={addCollectorFee}
                className={UI.button + " bg-[#2563EB] text-white hover:bg-[#1D4ED8]"}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Fee Kolektor
              </Button>
            </div>

            <div className="mt-4 grid gap-3">
              {collectorFees.map((f) => (
                <FeeRow
                  key={f.id}
                  row={f}
                  onChange={(next) =>
                    setCollectorFees((prev) =>
                      prev.map((x) => (x.id === f.id ? next : x)),
                    )
                  }
                  onRemove={() => {
                    setCollectorFees((prev) => prev.filter((x) => x.id !== f.id));
                    toast("Fee dihapus", {
                      description: "Item fee kolektor dihapus.",
                    });
                  }}
                />
              ))}
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <div className="text-base font-semibold text-slate-900">
              <span className="inline-flex items-center">
                Konfigurasi Tagihan Angsuran
                <FieldTooltip content={TT.konfigurasiTagihanAngsuran} />
              </span>
            </div>

            <div className={"mt-4 grid " + UI.gapY}>
              <FieldRow
                label={
                  <span className="inline-flex items-center">
                    Tagihan Angsuran Menggunakan Tabel Angsuran
                    <FieldTooltip content={TT.tagihanMengikutiTabelAngsuran} />
                  </span> as any
                }
              >
                <div className="flex items-center gap-3">
                  <Switch
                    checked={useInstallmentTable}
                    onCheckedChange={setUseInstallmentTable}
                  />
                </div>
              </FieldRow>

              {useInstallmentTable ? (
                <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                  <div className="pt-1 text-sm font-normal text-slate-900">
                    <span className="inline-flex items-center">
                      Skema Tagihan <FieldTooltip content={TT.skemaTagihan} />
                    </span>
                  </div>

                  <RadioGroup
                    value={installmentMode}
                    onValueChange={(v) => setInstallmentMode(v as InstallmentMode)}
                    className="flex flex-wrap items-center gap-x-6 gap-y-2"
                  >
                    {(
                      [
                        "Jadwal Tetap (Diterbitkan Penuh di Awal)",
                        "Jadwal Fleksibel & Tagihan Berkala",
                        "Dihitung dari Sisa Saldo Pokok",
                      ] as InstallmentMode[]
                    ).map((m) => {
                      const labelText =
                        m === "Jadwal Tetap (Diterbitkan Penuh di Awal)"
                          ? "Tagihan Sesuai Jadwal Angsuran"
                          : m === "Jadwal Fleksibel & Tagihan Berkala"
                            ? "Jadwal Fleksibel & Tagihan Berkala"
                            : "Tagihan Dihitung Dari Sisa Saldo Pokok";

                      const tooltipText =
                        m === "Jadwal Tetap (Diterbitkan Penuh di Awal)"
                          ? TT.tagihanSesuaiJadwalAngsuran
                          : m === "Jadwal Fleksibel & Tagihan Berkala"
                            ? TT.jadwalFleksibelTagihanBerkala
                            : TT.tagihanDihitungDariSisaSaldoPokok;

                      return (
                        <label
                          key={m}
                          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-900"
                        >
                          <RadioGroupItem value={m} id={`mode-${m}`} />
                          <span className="inline-flex items-center">
                            <span className="whitespace-nowrap">{labelText}</span>
                            <FieldTooltip content={tooltipText} />
                          </span>
                        </label>
                      );
                    })}
                  </RadioGroup>
                </div>
              ) : null}
            </div>

            {useInstallmentTable ? (
              <>
                <Separator className="my-6 bg-slate-200/70" />

                <div className="text-base font-semibold text-slate-900">
                  <span className="inline-flex items-center">
                    Konfigurasi Denda
                    <FieldTooltip content="Atur metode, dasar perhitungan, dan parameter keterlambatan untuk denda pinjaman." />
                  </span>
                </div>

                <div className={"mt-4 grid " + UI.gapY}>
                  <FieldRow label="Metode Denda">
                    <PenaltyRateField
                      mode={tarifDendaMode}
                      onModeChange={setTarifDendaMode}
                      value={tarifDendaValue}
                      onValueChange={setTarifDendaValue}
                      size="compact"
                      className={UI.radius}
                    />
                  </FieldRow>

                  {!hideDasarPerhitungan ? (
                    <>
                      <FieldRow label="Dasar Perhitungan">
                        <Select
                          value={dasarPerhitungan}
                          onValueChange={(v) =>
                            setDasarPerhitungan(v as PenaltyBase)
                          }
                        >
                          <SelectTrigger
                            className={
                              "h-[30px] " +
                              UI.radius +
                              " border-slate-200 bg-white " +
                              UI.fieldText
                            }
                          >
                            <SelectValue placeholder="Pilih Dasar Perhitungan" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[10px] border-slate-200">
                            <SelectItem value="Pilih Dasar Perhitungan">
                              Pilih Dasar Perhitungan
                            </SelectItem>
                            <SelectItem value="Pokok">Pokok</SelectItem>
                            <SelectItem value="Bunga">Bunga</SelectItem>
                            <SelectItem value="Hutang Pokok">Hutang Pokok</SelectItem>
                            <SelectItem value="Hutang Bunga">Hutang Bunga</SelectItem>
                            <SelectItem value="Berdasarkan Total tagihan">
                              Berdasarkan Total tagihan
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FieldRow>

                      <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                        <div className="pt-1 text-sm font-normal text-slate-900">
                          Denda Berulang
                        </div>
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={dendaBerulang}
                            onCheckedChange={setDendaBerulang}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}

                  <FieldRow label="Jumlah Hari Keterlambatan">
                    <Input
                      value={hariKeterlambatan}
                      onChange={(e) => setHariKeterlambatan(e.target.value)}
                      className={
                        "h-[30px] " +
                        UI.radius +
                        " border-slate-200 bg-white " +
                        UI.fieldText
                      }
                      placeholder="Masukkan Jumlah Hari"
                      inputMode="numeric"
                    />
                  </FieldRow>
                </div>

                <Separator className="my-6 bg-slate-200/70" />

                <div className="text-base font-semibold text-slate-900">
                  <span className="inline-flex items-center">
                    Konfigurasi Grace Period
                    <FieldTooltip content={TT.gracePeriod} />
                  </span>
                </div>

                <div className={"mt-4 grid " + UI.gapY}>
                  <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                    <div className="pt-1 text-sm font-normal text-slate-900">
                      Grace Period
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={gracePeriodEnabled}
                        onCheckedChange={setGracePeriodEnabled}
                      />
                    </div>
                  </div>

                  {gracePeriodEnabled ? (
                    <>
                      <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                        <div className="pt-1 text-sm font-normal text-slate-900">
                          Skema Grace Period
                        </div>
                        <RadioGroup
                          value={graceScheme}
                          onValueChange={(v) => setGraceScheme(v as GraceScheme)}
                          className="flex items-center gap-6"
                        >
                          <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                            <RadioGroupItem
                              value="Hanya Bayar Bunga"
                              id="grace-hanya-bayar-bunga"
                            />
                            <span className="inline-flex items-center">
                              Hanya Bayar Bunga
                              <FieldTooltip content={TT.gracePeriodBunga} />
                            </span>
                          </label>
                        </RadioGroup>
                      </div>

                      <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                        <div className="pt-1 text-sm font-normal text-slate-900">
                          Satuan Grace Period
                        </div>
                        <Select
                          value={graceUnit}
                          onValueChange={(v) => setGraceUnit(v as GraceUnit)}
                        >
                          <SelectTrigger
                            className={
                              "h-[30px] " +
                              UI.radius +
                              " border-slate-200 bg-white " +
                              UI.fieldText
                            }
                          >
                            <SelectValue placeholder="Pilih Satuan Grace Period" />
                          </SelectTrigger>
                          <SelectContent className="rounded-[10px] border-slate-200">
                            <SelectItem value="Pilih Satuan Grace Period">
                              Pilih Satuan Grace Period
                            </SelectItem>
                            <SelectItem value="Hari">Hari</SelectItem>
                            <SelectItem value="Bulan">Bulan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                        <div className="pt-1 text-sm font-normal text-slate-900">
                          {graceDurationLabel}
                        </div>
                        <Input
                          value={graceDuration}
                          onChange={(e) => setGraceDuration(e.target.value)}
                          className={
                            "h-[30px] " +
                            UI.radius +
                            " border-slate-200 bg-white " +
                            UI.fieldText
                          }
                          placeholder={graceDurationPlaceholder}
                          inputMode="numeric"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}

            <LoanFormActionButtons
              onCancel={() => navigate("/loan-products")}
              onSave={save}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}