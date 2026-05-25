import * as React from "react";
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
import { Info, Plus, Save, X, HelpCircle, Trash2 } from "lucide-react";
import { createLoanProduct, BillingScheme } from "@/lib/loanProductsStore";
import PenaltyRateField, {
  type PenaltyRateMode,
} from "@/components/loans/PenaltyRateField";
import FieldTooltip from "@/components/loans/FieldTooltip";
import { cn } from "@/lib/utils";
import LoanFormActionButtons from "@/components/loans/LoanFormActionButtons";
import LoanProductFeeCoaFields from "@/components/loans/LoanProductFeeCoaFields";
import LoanProductAccountingCoaFields, {
  type MainCoaOption,
} from "@/components/loans/LoanProductAccountingCoaFields";

type PeriodUnit = "Bulan" | "Hari";
type RoundingType =
  | "Pembulatan Keatas"
  | "Pembulatan Kebawah"
  | "Tanpa Pembulatan";

type InstallmentMode =
  | "Jadwal Tetap (Diterbitkan Penuh di Awal)"
  | "Jadwal Fleksibel & Tagihan Berkala"
  | "Dihitung dari Sisa Saldo Pokok";

type GraceScheme = "Hanya Bayar Bunga";
type GraceUnit = "Pilih Satuan Grace Period" | "Hari" | "Bulan";

type PenaltyBase =
  | "Pokok"
  | "Bunga"
  | "Hutang Pokok"
  | "Hutang Bunga"
  | "Total Tagihan"
  | "Pilih Dasar Perhitungan";

type CollectorKind = "Kolektor 1" | "Kolektor 2" | "Kolektor 3";
type FeeMethod = "Plafon Pinjaman" | "Angsuran" | "Tenor";
type AmountMode = "rp" | "percent";
type LoanProductFormMode = "create" | "edit";

type CollectorFeeRow = {
  id: string;
  collectorKind: CollectorKind;
  feeMethod: FeeMethod;
  minLoan: string;
  maxLoan: string;
  feePercent: string;
};

type LoanProductFormProps = {
  mode: LoanProductFormMode;
  productId?: string;
  onCancel: () => void;
  onSaved: () => void;
};

type FormStyle = {
  cardClassName: string;
  gapClassName: string;
  inputClassName: string;
  textareaClassName: string;
  selectTriggerClassName: string;
  selectContentClassName: string;
  feeRowClassName: string;
  feeInputClassName: string;
  feeSelectTriggerClassName: string;
  feeSelectContentClassName: string;
  feeRemoveButtonClassName: string;
  feeRemoveIconClassName: string;
  addFeeButtonClassName: string;
  addFeeButtonIconClassName: string;
  penaltyRadiusClassName: string;
};

const FORM_STYLE_BY_MODE: Record<LoanProductFormMode, FormStyle> = {
  create: {
    cardClassName:
      "rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6",
    gapClassName: "gap-5",
    inputClassName:
      "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
    textareaClassName:
      "min-h-[96px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
    selectTriggerClassName:
      "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
    selectContentClassName: "rounded-[10px] border-slate-200",
    feeRowClassName:
      "grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 md:grid-cols-[1.05fr_1.05fr_1.25fr_1.25fr_0.75fr_56px] md:items-end",
    feeInputClassName:
      "h-11 rounded-xl border-slate-200 bg-white text-[12.5px]",
    feeSelectTriggerClassName:
      "h-11 rounded-xl border-slate-200 bg-white text-[12.5px] [&>span.absolute.right-2]:hidden",
    feeSelectContentClassName: "rounded-2xl border-slate-200",
    feeRemoveButtonClassName:
      "inline-flex h-11 w-14 items-center justify-center rounded-xl bg-rose-600 text-white ring-1 ring-rose-600/20 transition hover:bg-rose-700",
    feeRemoveIconClassName: "h-5 w-5",
    addFeeButtonClassName:
      "h-10 rounded-xl bg-[#2563EB] px-8 text-white hover:bg-[#1D4ED8]",
    addFeeButtonIconClassName: "mr-2 h-4 w-4",
    penaltyRadiusClassName: "rounded-[5px]",
  },
  edit: {
    cardClassName:
      "rounded-[5px] border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6",
    gapClassName: "gap-[15px]",
    inputClassName:
      "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
    textareaClassName:
      "min-h-[96px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
    selectTriggerClassName:
      "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
    selectContentClassName: "rounded-[10px] border-slate-200",
    feeRowClassName:
      "grid gap-3 rounded-[5px] bg-white p-4 ring-1 ring-slate-200 md:grid-cols-[1.05fr_1.05fr_1.25fr_1.25fr_0.75fr_56px] md:items-end",
    feeInputClassName:
      "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px]",
    feeSelectTriggerClassName:
      "h-[30px] rounded-[5px] border-slate-200 bg-white text-[12.5px] [&>span.absolute.right-2]:hidden",
    feeSelectContentClassName: "rounded-[10px] border-slate-200",
    feeRemoveButtonClassName:
      "inline-flex h-[30px] w-14 items-center justify-center rounded-[5px] bg-rose-600 text-white ring-1 ring-rose-600/20 transition hover:bg-rose-700",
    feeRemoveIconClassName: "h-4 w-4",
    addFeeButtonClassName:
      "h-[30px] rounded-[5px] bg-[#2563EB] text-[12.5px] text-white hover:bg-[#1D4ED8]",
    addFeeButtonIconClassName: "mr-2 h-4 w-4",
    penaltyRadiusClassName: "rounded-[5px]",
  },
};

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
  recurringPenalty:
    "Aktifkan Agar Denda Dihitung Secara Berulang dan Terus Bertambah Hingga Tagihan Dilunasi",
} as const;

function FieldRow({
  label,
  hint,
  children,
}: {
  label: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-start">
      <div className="pt-1">
        <div className="text-sm font-normal text-slate-900">{label}</div>
        {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function InfoBadge() {
  return (
    <span
      className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-white ring-1 ring-[#2563eb]/25"
      aria-hidden="true"
    >
      <HelpCircle className="h-4 w-4" />
    </span>
  );
}

function AmountModeInput({
  mode,
  onModeChange,
  value,
  onValueChange,
  style,
  placeholder = "0,00",
}: {
  mode: AmountMode;
  onModeChange: (v: AmountMode) => void;
  value: string;
  onValueChange: (v: string) => void;
  style: FormStyle;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex w-full items-center gap-2">
        <Select value={mode} onValueChange={(v) => onModeChange(v as AmountMode)}>
          <SelectTrigger className={cn(style.selectTriggerClassName, "w-[84px] px-2.5")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={style.selectContentClassName}>
            <SelectItem value="rp">Rp.</SelectItem>
            <SelectItem value="percent">%</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={style.inputClassName}
          placeholder={placeholder}
          inputMode="decimal"
        />
      </div>
    </div>
  );
}

function FeeRow({
  row,
  style,
  onChange,
  onRemove,
}: {
  row: CollectorFeeRow;
  style: FormStyle;
  onChange: (next: CollectorFeeRow) => void;
  onRemove: () => void;
}) {
  return (
    <div className={style.feeRowClassName}>
      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">Jenis Kolektor</Label>
        <Select
          value={row.collectorKind}
          onValueChange={(v) => onChange({ ...row, collectorKind: v as CollectorKind })}
        >
          <SelectTrigger className={style.feeSelectTriggerClassName}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={style.feeSelectContentClassName}>
            <SelectItem value="Kolektor 1">Kolektor 1</SelectItem>
            <SelectItem value="Kolektor 2">Kolektor 2</SelectItem>
            <SelectItem value="Kolektor 3">Kolektor 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">Metode Perhitungan Fee</Label>
        <Select
          value={row.feeMethod}
          onValueChange={(v) => onChange({ ...row, feeMethod: v as FeeMethod })}
        >
          <SelectTrigger className={style.feeSelectTriggerClassName}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={style.feeSelectContentClassName}>
            <SelectItem value="Plafon Pinjaman">Plafon Pinjaman</SelectItem>
            <SelectItem value="Angsuran">Angsuran</SelectItem>
            <SelectItem value="Tenor">Tenor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">Minimal Jumlah Pinjaman</Label>
        <Input
          value={row.minLoan}
          onChange={(e) => onChange({ ...row, minLoan: e.target.value })}
          className={style.feeInputClassName}
          placeholder="1.000.000,00"
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">Maksimal Jumlah Pinjaman</Label>
        <Input
          value={row.maxLoan}
          onChange={(e) => onChange({ ...row, maxLoan: e.target.value })}
          className={style.feeInputClassName}
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
            className={cn(style.feeInputClassName, "pr-10")}
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
        className={style.feeRemoveButtonClassName}
        aria-label="Hapus fee kolektor"
        title="Hapus"
      >
        <Trash2 className={style.feeRemoveIconClassName} />
      </button>
    </div>
  );
}

export default function LoanProductForm({
  mode,
  productId = "",
  onCancel,
  onSaved,
}: LoanProductFormProps) {
  const style = FORM_STYLE_BY_MODE[mode];
  const isCreate = mode === "create";

  const [code, setCode] = React.useState(isCreate ? "klp04.07" : "klpk04.07");
  const [name, setName] = React.useState("Pinjaman Emas");
  const [rc, setRc] = React.useState(false);
  const [periodUnit, setPeriodUnit] = React.useState<PeriodUnit>("Bulan");
  const [minPeriod, setMinPeriod] = React.useState("12");
  const [maxPeriod, setMaxPeriod] = React.useState("12");
  const [billingScheme, setBillingScheme] = React.useState<BillingScheme>("Anuitas");
  const [interestCountsOnInterestDebt, setInterestCountsOnInterestDebt] = React.useState(false);
  const [interestYearly, setInterestYearly] = React.useState("24.00");
  const [roundingType, setRoundingType] = React.useState<RoundingType>("Pembulatan Keatas");
  const [roundingMultiple, setRoundingMultiple] = React.useState("100");
  const [nominalStep, setNominalStep] = React.useState("100");
  const [terms, setTerms] = React.useState("");
  const [accInterest, setAccInterest] = React.useState(false);
  const [ignorePrincipalDebt, setIgnorePrincipalDebt] = React.useState(false);
  const [ignoreInterestDebt, setIgnoreInterestDebt] = React.useState(false);
  const [minLoan, setMinLoan] = React.useState("1.000.000,00");
  const [maxLoan, setMaxLoan] = React.useState("100.000.000,00");
  const [specialEndDate, setSpecialEndDate] = React.useState(false);
  const [aturCoaJenisBiaya, setAturCoaJenisBiaya] = React.useState(false);
  const [propisiMode, setPropisiMode] = React.useState<AmountMode>("rp");
  const [adminMode, setAdminMode] = React.useState<AmountMode>("rp");
  const [propisi, setPropisi] = React.useState("0,00");
  const [admin, setAdmin] = React.useState("0,00");
  const [insurance, setInsurance] = React.useState("0,00");
  const [mbankingActivation, setMbankingActivation] = React.useState("0,00");
  const [withoutCollateral, setWithoutCollateral] = React.useState(false);
  const [splitInterestRevenue, setSplitInterestRevenue] = React.useState(false);
  const [coaLoan, setCoaLoan] = React.useState<MainCoaOption>("PINJAMAN YANG DIBERIKAN");
  const [coaInterestRevenue, setCoaInterestRevenue] = React.useState<MainCoaOption>("PEND. BUNGA PINJAMAN");
  const [coaSplitInterestRevenue, setCoaSplitInterestRevenue] = React.useState<MainCoaOption>("PILIH");
  const [coaPenaltyRevenue, setCoaPenaltyRevenue] = React.useState<MainCoaOption>("PEND. DENDA");
  const [coaRoundingRevenue, setCoaRoundingRevenue] = React.useState<MainCoaOption>("PENDAPATAN LAIN - LAIN");
  const [coaAdminRevenue, setCoaAdminRevenue] = React.useState<MainCoaOption>("PEN. ADMINISTRASI");
  const [collectorFees, setCollectorFees] = React.useState<CollectorFeeRow[]>([]);
  const [useInstallmentTable, setUseInstallmentTable] = React.useState(!isCreate);
  const [installmentMode, setInstallmentMode] = React.useState<InstallmentMode>("Jadwal Tetap (Diterbitkan Penuh di Awal)");
  const [tarifDendaMode, setTarifDendaMode] = React.useState<PenaltyRateMode>("rp");
  const [tarifDendaValue, setTarifDendaValue] = React.useState("0,00");
  const [dasarPerhitungan, setDasarPerhitungan] = React.useState<PenaltyBase>("Pilih Dasar Perhitungan");
  const [hariKeterlambatan, setHariKeterlambatan] = React.useState<string>("0");
  const [dendaBerulang, setDendaBerulang] = React.useState(false);
  const [gracePeriodEnabled, setGracePeriodEnabled] = React.useState(false);
  const [graceScheme, setGraceScheme] = React.useState<GraceScheme>("Hanya Bayar Bunga");
  const [graceUnit, setGraceUnit] = React.useState<GraceUnit>("Pilih Satuan Grace Period");
  const [graceDuration, setGraceDuration] = React.useState("");

  const graceUnitSuffix = graceUnit === "Hari" ? "(Hari)" : graceUnit === "Bulan" ? "(Bulan)" : "";
  const graceDurationLabel = `Durasi Grace Period${graceUnitSuffix ? ` ${graceUnitSuffix}` : ""}`;
  const graceDurationPlaceholder =
    graceUnit === "Hari"
      ? "Masukkan Jumlah Hari"
      : graceUnit === "Bulan"
        ? "Masukkan Jumlah Bulan"
        : "Masukkan Durasi";
  const hideDasarPerhitungan = tarifDendaMode === "rp";

  React.useEffect(() => {
    if (!hideDasarPerhitungan) return;
    setDasarPerhitungan("Pilih Dasar Perhitungan");
  }, [hideDasarPerhitungan]);

  function updateAccountingCoa(key: string, value: MainCoaOption) {
    if (key === "coaLoan") setCoaLoan(value);
    if (key === "coaInterestRevenue") setCoaInterestRevenue(value);
    if (key === "coaSplitInterestRevenue") setCoaSplitInterestRevenue(value);
    if (key === "coaPenaltyRevenue") setCoaPenaltyRevenue(value);
    if (key === "coaRoundingRevenue") setCoaRoundingRevenue(value);
    if (key === "coaAdminRevenue") setCoaAdminRevenue(value);
  }

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
    if (isCreate) {
      const tenorMonths = Math.max(1, Number.parseInt(minPeriod || "12", 10) || 12);
      const rate = Number.parseFloat((interestYearly || "0").replace(",", ".")) || 0;

      if (name.trim().length < 3) {
        toast("Nama produk belum valid", { description: "Minimal 3 karakter." });
        return;
      }
      if (rate <= 0) {
        toast("Bunga belum valid", { description: "Isi bunga per tahun (> 0)." });
        return;
      }

      createLoanProduct({
        name: name.trim(),
        tenorMonths,
        interestRateYearly: rate,
        billingScheme,
        gracePeriodDays: gracePeriodEnabled ? 7 : 0,
      });

      toast.success("Produk pinjaman tersimpan", {
        description: "Produk baru sudah masuk ke daftar.",
      });
      onSaved();
      return;
    }

    toast.success("Perubahan tersimpan (prototype)", {
      description: `Produk: ${name} • ID: ${productId}`,
    });
    onSaved();
  }

  const dendaSection = (
    <>
      <Separator className="my-6 bg-slate-200/70" />

      <div className="text-base font-semibold text-slate-900">
        <span className="inline-flex items-center">
          Konfigurasi Denda
          <FieldTooltip content="Atur metode, dasar perhitungan, dan parameter keterlambatan untuk denda pinjaman." />
        </span>
      </div>

      <div className={cn(isCreate ? "grid" : "mt-4 grid", style.gapClassName)}>
        <FieldRow label="Metode Denda">
          <PenaltyRateField
            mode={tarifDendaMode}
            onModeChange={setTarifDendaMode}
            value={tarifDendaValue}
            onValueChange={setTarifDendaValue}
            size="compact"
            className={style.penaltyRadiusClassName}
          />
        </FieldRow>

        {!hideDasarPerhitungan ? (
          <FieldRow label="Dasar Perhitungan">
            <Select value={dasarPerhitungan} onValueChange={(v) => setDasarPerhitungan(v as PenaltyBase)}>
              <SelectTrigger className={style.selectTriggerClassName}>
                <SelectValue placeholder="Pilih Dasar Perhitungan" />
              </SelectTrigger>
              <SelectContent className={style.selectContentClassName}>
                <SelectItem value="Pilih Dasar Perhitungan">Pilih Dasar Perhitungan</SelectItem>
                <SelectItem value="Pokok">Pokok</SelectItem>
                <SelectItem value="Bunga">Bunga</SelectItem>
                <SelectItem value="Hutang Pokok">Hutang Pokok</SelectItem>
                <SelectItem value="Hutang Bunga">Hutang Bunga</SelectItem>
                <SelectItem value="Total Tagihan">Total Tagihan</SelectItem>
              </SelectContent>
            </Select>
          </FieldRow>
        ) : null}

        <FieldRow label="Jumlah Hari Keterlambatan">
          <Input
            value={hariKeterlambatan}
            onChange={(e) => setHariKeterlambatan(e.target.value)}
            className={style.inputClassName}
            placeholder="Masukkan Jumlah Hari"
            inputMode="numeric"
          />
        </FieldRow>

        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
          <div className="pt-1 text-sm font-normal text-slate-900">
            <span className="inline-flex items-center gap-1.5">
              Proses Denda Berulang (Recurring)
              <FieldTooltip content={TT.recurringPenalty} className="ml-0" />
            </span>
          </div>
          <Switch checked={dendaBerulang} onCheckedChange={setDendaBerulang} />
        </div>
      </div>
    </>
  );

  const graceSection = (
    <>
      <Separator className="my-6 bg-slate-200/70" />

      <div className="text-base font-semibold text-slate-900">
        <span className="inline-flex items-center">
          Konfigurasi Grace Period
          <FieldTooltip content={TT.gracePeriod} />
        </span>
      </div>

      <div className={cn(isCreate ? "grid" : "mt-4 grid", style.gapClassName)}>
        {isCreate ? (
          <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
            <div className="pt-1 text-sm font-normal text-slate-900">Grace Period</div>
            <Switch checked={gracePeriodEnabled} onCheckedChange={setGracePeriodEnabled} />
          </div>
        ) : (
          <FieldRow label="Grace Period">
            <Switch checked={gracePeriodEnabled} onCheckedChange={setGracePeriodEnabled} />
          </FieldRow>
        )}

        {gracePeriodEnabled ? (
          <>
            <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
              <div className="pt-1 text-sm font-normal text-slate-900">Skema Grace Period</div>
              <RadioGroup
                value={graceScheme}
                onValueChange={(v) => setGraceScheme(v as GraceScheme)}
                className="flex items-center gap-6"
              >
                <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                  <RadioGroupItem value="Hanya Bayar Bunga" id="grace-hanya-bayar-bunga" />
                  <span className="inline-flex items-center">
                    Hanya Bayar Bunga
                    <FieldTooltip content={TT.gracePeriodBunga} />
                  </span>
                </label>
              </RadioGroup>
            </div>

            <FieldRow label="Satuan Grace Period">
              <Select value={graceUnit} onValueChange={(v) => setGraceUnit(v as GraceUnit)}>
                <SelectTrigger className={style.selectTriggerClassName}>
                  <SelectValue placeholder="Pilih Satuan Grace Period" />
                </SelectTrigger>
                <SelectContent className={style.selectContentClassName}>
                  <SelectItem value="Pilih Satuan Grace Period">Pilih Satuan Grace Period</SelectItem>
                  <SelectItem value="Hari">Hari</SelectItem>
                  <SelectItem value="Bulan">Bulan</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>

            <FieldRow label={graceDurationLabel}>
              <Input
                value={graceDuration}
                onChange={(e) => setGraceDuration(e.target.value)}
                className={style.inputClassName}
                placeholder={graceDurationPlaceholder}
                inputMode="numeric"
              />
            </FieldRow>
          </>
        ) : null}
      </div>
    </>
  );

  return (
    <Card className={style.cardClassName}>
      <div className="text-[16px] font-semibold text-slate-900">Konfigurasi Dasar Produk Pinjaman</div>

      <div className={cn("mt-5 grid", style.gapClassName)}>
        <FieldRow label="Kode">
          <Input value={code} onChange={(e) => setCode(e.target.value)} className={cn(style.inputClassName, "bg-slate-100")} />
        </FieldRow>

        <FieldRow label="Produk Pinjaman">
          <Input value={name} onChange={(e) => setName(e.target.value)} className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="RC">
          <Switch checked={rc} onCheckedChange={setRc} />
        </FieldRow>

        <FieldRow label="Periode Pinjaman">
          <Select value={periodUnit} onValueChange={(v) => setPeriodUnit(v as PeriodUnit)}>
            <SelectTrigger className={style.selectTriggerClassName}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={style.selectContentClassName}>
              <SelectItem value="Bulan">Bulan</SelectItem>
              <SelectItem value="Hari">Hari</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="Minimal Periode Pinjaman">
          <Input value={minPeriod} onChange={(e) => setMinPeriod(e.target.value)} inputMode="numeric" className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="Maksimal Periode Pinjaman">
          <Input value={maxPeriod} onChange={(e) => setMaxPeriod(e.target.value)} inputMode="numeric" className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="Metode Bunga Pinjaman">
          <Select value={billingScheme} onValueChange={(v) => setBillingScheme(v as BillingScheme)}>
            <SelectTrigger className={style.selectTriggerClassName}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={style.selectContentClassName}>
              <SelectItem value="Anuitas">Bunga Efektif (Anuitas)</SelectItem>
              <SelectItem value="Flat">Bunga Flat</SelectItem>
              <SelectItem value="Menurun">Menurun</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="Bunga Pinjaman Memperhitungkan Hutang Bunga">
          <Switch checked={interestCountsOnInterestDebt} onCheckedChange={setInterestCountsOnInterestDebt} />
        </FieldRow>

        <FieldRow label="Bunga Per Tahun (%)">
          <Input value={interestYearly} onChange={(e) => setInterestYearly(e.target.value)} inputMode="decimal" className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="Jenis Pembulatan">
          <Select value={roundingType} onValueChange={(v) => setRoundingType(v as RoundingType)}>
            <SelectTrigger className={style.selectTriggerClassName}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={style.selectContentClassName}>
              <SelectItem value="Pembulatan Keatas">Pembulatan Keatas</SelectItem>
              <SelectItem value="Pembulatan Kebawah">Pembulatan Kebawah</SelectItem>
              <SelectItem value="Tanpa Pembulatan">Tanpa Pembulatan</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="Kelipatan Pembulatan">
          <Input value={roundingMultiple} onChange={(e) => setRoundingMultiple(e.target.value)} inputMode="numeric" className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="Nominal Kelipatan">
          <Input value={nominalStep} onChange={(e) => setNominalStep(e.target.value)} inputMode="numeric" className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="Ketentuan Produk Pinjaman">
          <Textarea value={terms} onChange={(e) => setTerms(e.target.value)} className={style.textareaClassName} />
        </FieldRow>
      </div>

      <div className={cn("mt-6 grid", style.gapClassName)}>
        <FieldRow label="Akumulasi Bunga Pinjaman">
          <Switch checked={accInterest} onCheckedChange={setAccInterest} />
        </FieldRow>

        <FieldRow label="Tidak Menghitung Hutang Pokok">
          <Switch checked={ignorePrincipalDebt} onCheckedChange={setIgnorePrincipalDebt} />
        </FieldRow>

        <FieldRow label="Tidak Menghitung Hutang Bunga">
          <Switch checked={ignoreInterestDebt} onCheckedChange={setIgnoreInterestDebt} />
        </FieldRow>

        <FieldRow label="Minimal Pinjaman">
          <Input value={minLoan} onChange={(e) => setMinLoan(e.target.value)} className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="Maksimal Pinjaman">
          <Input value={maxLoan} onChange={(e) => setMaxLoan(e.target.value)} className={style.inputClassName} />
        </FieldRow>

        <FieldRow label="Menggunakan Tanggal Khusus untuk Akhir Periode">
          <Switch checked={specialEndDate} onCheckedChange={setSpecialEndDate} />
        </FieldRow>

        <FieldRow label="Atur COA Jenis Biaya pada Produk Pinjaman">
          <Switch checked={aturCoaJenisBiaya} onCheckedChange={setAturCoaJenisBiaya} />
        </FieldRow>

        {aturCoaJenisBiaya ? (
          <LoanProductFeeCoaFields
            selectTriggerClassName={style.selectTriggerClassName}
            selectContentClassName={style.selectContentClassName}
          />
        ) : null}

        <FieldRow label="Propisi">
          {isCreate ? (
            <Input value={propisi} onChange={(e) => setPropisi(e.target.value)} className={style.inputClassName} inputMode="decimal" />
          ) : (
            <AmountModeInput mode={propisiMode} onModeChange={setPropisiMode} value={propisi} onValueChange={setPropisi} style={style} />
          )}
        </FieldRow>

        <FieldRow label="Administrasi">
          {isCreate ? (
            <Input value={admin} onChange={(e) => setAdmin(e.target.value)} className={style.inputClassName} inputMode="decimal" />
          ) : (
            <AmountModeInput mode={adminMode} onModeChange={setAdminMode} value={admin} onValueChange={setAdmin} style={style} />
          )}
        </FieldRow>

        <FieldRow label="Biaya Asuransi">
          <Input value={insurance} onChange={(e) => setInsurance(e.target.value)} className={style.inputClassName} inputMode="decimal" />
        </FieldRow>

        <FieldRow label="Biaya Aktivasi M-Banking">
          <Input value={mbankingActivation} onChange={(e) => setMbankingActivation(e.target.value)} className={style.inputClassName} inputMode="decimal" />
        </FieldRow>

        <FieldRow label="Tanpa Agunan">
          <Switch checked={withoutCollateral} onCheckedChange={setWithoutCollateral} />
        </FieldRow>

        <FieldRow
          label={
            <span className="inline-flex items-center">
              Split Pendapatan Bunga <InfoBadge />
            </span>
          }
          hint={isCreate ? "Prototype UI." : undefined}
        >
          <Switch checked={splitInterestRevenue} onCheckedChange={setSplitInterestRevenue} />
        </FieldRow>
      </div>

      <LoanProductAccountingCoaFields
        className="mt-6"
        values={{
          coaLoan,
          coaInterestRevenue,
          coaSplitInterestRevenue,
          coaPenaltyRevenue,
          coaRoundingRevenue,
          coaAdminRevenue,
        }}
        onChange={updateAccountingCoa}
        selectTriggerClassName={style.selectTriggerClassName}
        selectContentClassName="rounded-[5px] border-slate-200 p-0 shadow-xl"
      />

      <Separator className="my-6 bg-slate-200/70" />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-base font-semibold text-slate-900">Konfigurasi Fee Kolektor</div>
        <Button onClick={addCollectorFee} className={style.addFeeButtonClassName}>
          <Plus className={style.addFeeButtonIconClassName} />
          Tambah Fee Kolektor
        </Button>
      </div>

      <div className="mt-4 grid gap-3">
        {collectorFees.map((f) => (
          <FeeRow
            key={f.id}
            row={f}
            style={style}
            onChange={(next) => setCollectorFees((prev) => prev.map((x) => (x.id === f.id ? next : x)))}
            onRemove={() => {
              setCollectorFees((prev) => prev.filter((x) => x.id !== f.id));
              toast("Fee dihapus", { description: "Item fee kolektor dihapus." });
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

      <div className={cn("mt-4 grid", style.gapClassName)}>
        <FieldRow
          label={
            <span className="inline-flex items-center">
              Tagihan Angsuran Menggunakan Tabel Angsuran
              <FieldTooltip content={TT.tagihanMengikutiTabelAngsuran} />
            </span>
          }
        >
          <Switch checked={useInstallmentTable} onCheckedChange={setUseInstallmentTable} />
        </FieldRow>

        {useInstallmentTable ? (
          <>
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
                    <label key={m} className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-900">
                      <RadioGroupItem value={m} id={`mode-${mode}-${m}`} />
                      <span className="inline-flex items-center">
                        <span className="whitespace-nowrap">{labelText}</span>
                        <FieldTooltip content={tooltipText} />
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>

            {isCreate ? (
              <>
                {dendaSection}
                {graceSection}
              </>
            ) : null}
          </>
        ) : null}
      </div>

      {!isCreate && useInstallmentTable ? (
        <>
          {dendaSection}
          {graceSection}
        </>
      ) : null}

      <LoanFormActionButtons onCancel={onCancel} onSave={save} />

      <div className="sr-only">
        {isCreate ? (
          <>
            <Info />
            <Save />
            <X />
          </>
        ) : null}
        {aturCoaJenisBiaya ? "coa-biaya-active" : "coa-biaya-inactive"}
      </div>
    </Card>
  );
}
