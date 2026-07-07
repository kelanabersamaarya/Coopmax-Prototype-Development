import * as React from "react";
import { useLocation } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import {
  createLoanProduct,
  getLoanProducts,
  updateLoanProduct,
  type BillingScheme,
  type LoanProductFormConfig,
} from "@/lib/loanProductsStore";
import { cn } from "@/lib/utils";
import LoanFormActionButtons from "@/components/loans/LoanFormActionButtons";
import PenaltyRateField, {
  type PenaltyRateMode,
} from "@/components/loans/PenaltyRateField";
import FieldTooltip from "@/components/loans/FieldTooltip";
import LoanProductAccountingCoaFields, {
  type MainCoaOption,
} from "@/components/loans/LoanProductAccountingCoaFields";
import {
  emptyFeeCoaValues,
  type FeeCoaValues,
} from "@/components/loans/LoanProductFeeCoaFields";
import LoanProductPaymentLinkSection from "@/components/loans/products/LoanProductPaymentLinkSection";

type LoanProductFormMode = "create" | "edit";
type LoanProductFormContext = "consolidation" | "branch";

type PeriodUnit = "Pilih Periode Pinjaman" | "Bulan" | "Hari";
type BillingOption = "Pilih Metode Bunga Pinjaman" | BillingScheme;
type RoundingType =
  | "Pilih Jenis Pembulatan"
  | "Pembulatan Keatas"
  | "Pembulatan Kebawah"
  | "Tanpa Pembulatan";
type InstallmentMode =
  | "Jadwal Tetap (Diterbitkan Penuh di Awal)"
  | "Jadwal Fleksibel & Tagihan Berkala"
  | "Dihitung dari Sisa Saldo Pokok";
type GraceUnit = "Pilih Satuan Grace Period" | "Hari" | "Bulan";
type PenaltyBase =
  | "Pokok"
  | "Bunga"
  | "Hutang Pokok"
  | "Hutang Bunga"
  | "Total Tagihan"
  | "Pilih Dasar Perhitungan";
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

type LoanProductFormProps = {
  mode: LoanProductFormMode;
  productId?: string;
  context?: LoanProductFormContext;
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
  tagihanMengikutiTabelAngsuran:
    "Tagihan angsuran dibuat otomatis setiap bulan mengikuti tabel angsuran.",
  skemaTagihan:
    "Skema tagihan menentukan bagaimana nominal dan komponen tagihan dihitung setiap periode.",
  denda:
    "Atur metode, dasar perhitungan, dan parameter keterlambatan untuk denda pinjaman.",
  gracePeriod:
    "Grace period adalah periode awal pinjaman yang memberi keringanan pembayaran untuk sementara waktu.",
  recurringPenalty:
    "Aktifkan Agar Denda Dihitung Secara Berulang dan Terus Bertambah Hingga Tagihan Dilunasi",
};

const mainCoaOptions = [
  "PINJAMAN YANG DIBERIKAN",
  "PEND. BUNGA PINJAMAN",
  "PEND. DENDA",
  "PENDAPATAN LAIN - LAIN",
  "PEN. ADMINISTRASI",
  "PILIH",
] as const;

function readString(config: LoanProductFormConfig, key: string, fallback: string) {
  const value = config[key];
  return typeof value === "string" ? value : fallback;
}

function readBool(config: LoanProductFormConfig, key: string, fallback: boolean) {
  const value = config[key];
  return typeof value === "boolean" ? value : fallback;
}

function readArray<T>(config: LoanProductFormConfig, key: string, fallback: T[]) {
  const value = config[key];
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function readRecord<T extends Record<string, unknown>>(
  config: LoanProductFormConfig,
  key: string,
  fallback: T,
) {
  const value = config[key];
  return value && typeof value === "object" && !Array.isArray(value)
    ? ({ ...fallback, ...(value as Partial<T>) } as T)
    : fallback;
}

function readOption<T extends string>(
  config: LoanProductFormConfig,
  key: string,
  fallback: T,
  options: readonly T[],
) {
  const value = config[key];
  return typeof value === "string" && options.includes(value as T)
    ? (value as T)
    : fallback;
}

function buildBlankCreateConfig(): LoanProductFormConfig {
  return {
    code: "",
    periodUnit: "Pilih Periode Pinjaman",
    minPeriod: "",
    maxPeriod: "",
    billingScheme: "Pilih Metode Bunga Pinjaman",
    interestYearly: "",
    roundingType: "Pilih Jenis Pembulatan",
    roundingMultiple: "",
    nominalStep: "",
    terms: "",
    minLoan: "",
    maxLoan: "",
    propisi: "",
    admin: "",
    insurance: "",
    mbankingActivation: "",
    coaLoan: "PILIH",
    coaInterestRevenue: "PILIH",
    coaSplitInterestRevenue: "PILIH",
    coaPenaltyRevenue: "PILIH",
    coaRoundingRevenue: "PILIH",
    coaAdminRevenue: "PILIH",
    feeCoaValues: emptyFeeCoaValues,
    collectorFees: [],
    useInstallmentTable: false,
    tarifDendaValue: "",
    hariKeterlambatan: "",
    graceDuration: "",
    paymentLinkEnabled: false,
    paymentLinkPublishDate: "",
    paymentLinkExpiryDate: "",
  };
}

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
        onChange={(event) => onValueChange(event.target.value)}
        className={style.inputClassName}
        placeholder={placeholder}
        inputMode="decimal"
      />
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
          onValueChange={(value) =>
            onChange({ ...row, collectorKind: value as CollectorKind })
          }
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
        <Label className="text-xs font-semibold text-slate-700">
          Metode Perhitungan Fee
        </Label>
        <Select
          value={row.feeMethod}
          onValueChange={(value) =>
            onChange({ ...row, feeMethod: value as FeeMethod })
          }
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
        <Label className="text-xs font-semibold text-slate-700">
          Minimal Jumlah Pinjaman
        </Label>
        <Input
          value={row.minLoan}
          onChange={(event) => onChange({ ...row, minLoan: event.target.value })}
          className={style.feeInputClassName}
          placeholder="0,00"
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">
          Maksimal Jumlah Pinjaman
        </Label>
        <Input
          value={row.maxLoan}
          onChange={(event) => onChange({ ...row, maxLoan: event.target.value })}
          className={style.feeInputClassName}
          placeholder="0,00"
          inputMode="decimal"
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-xs font-semibold text-slate-700">Jumlah Fee (%)</Label>
        <Input
          value={row.feePercent}
          onChange={(event) =>
            onChange({ ...row, feePercent: event.target.value })
          }
          className={style.feeInputClassName}
          placeholder="0"
          inputMode="decimal"
        />
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
  context = "consolidation",
  onCancel,
  onSaved,
}: LoanProductFormProps) {
  const location = useLocation();
  const style = FORM_STYLE_BY_MODE[mode];
  const isCreate = mode === "create";
  const isBranchEdit = mode === "edit" && context === "branch";
  const useBlankCreateDefaults = isCreate && context === "consolidation";
  const isPaymentLinkProductModule =
    location.pathname.startsWith("/payment-link/loan-products");

  const existingProduct = React.useMemo(() => {
    if (mode !== "edit" || !productId) return null;
    return getLoanProducts().find((product) => product.id === productId) ?? null;
  }, [mode, productId]);

  const savedConfig = React.useMemo<LoanProductFormConfig>(() => {
    if (useBlankCreateDefaults) return buildBlankCreateConfig();
    return existingProduct?.formConfig ?? {};
  }, [existingProduct, useBlankCreateDefaults]);

  const defaultName = useBlankCreateDefaults
    ? ""
    : existingProduct?.name ?? "Pinjaman Emas";

  const [code, setCode] = React.useState(() =>
    readString(savedConfig, "code", isCreate ? "klp04.07" : "klpk04.07"),
  );
  const [name, setName] = React.useState(defaultName);
  const [rc, setRc] = React.useState(() => readBool(savedConfig, "rc", false));
  const [periodUnit, setPeriodUnit] = React.useState<PeriodUnit>(() =>
    readOption(savedConfig, "periodUnit", "Bulan", [
      "Pilih Periode Pinjaman",
      "Bulan",
      "Hari",
    ]),
  );
  const [minPeriod, setMinPeriod] = React.useState(() =>
    readString(
      savedConfig,
      "minPeriod",
      existingProduct ? String(existingProduct.tenorMonths) : "12",
    ),
  );
  const [maxPeriod, setMaxPeriod] = React.useState(() =>
    readString(
      savedConfig,
      "maxPeriod",
      existingProduct ? String(existingProduct.tenorMonths) : "12",
    ),
  );
  const [billingScheme, setBillingScheme] = React.useState<BillingOption>(() =>
    readOption(savedConfig, "billingScheme", existingProduct?.billingScheme ?? "Anuitas", [
      "Pilih Metode Bunga Pinjaman",
      "Flat",
      "Anuitas",
      "Menurun",
    ]),
  );
  const [interestYearly, setInterestYearly] = React.useState(() =>
    readString(
      savedConfig,
      "interestYearly",
      existingProduct ? existingProduct.interestRateYearly.toFixed(2) : "24.00",
    ),
  );
  const [interestCountsOnInterestDebt, setInterestCountsOnInterestDebt] =
    React.useState(() =>
      readBool(savedConfig, "interestCountsOnInterestDebt", false),
    );
  const [roundingType, setRoundingType] = React.useState<RoundingType>(() =>
    readOption(savedConfig, "roundingType", "Pembulatan Keatas", [
      "Pilih Jenis Pembulatan",
      "Pembulatan Keatas",
      "Pembulatan Kebawah",
      "Tanpa Pembulatan",
    ]),
  );
  const [roundingMultiple, setRoundingMultiple] = React.useState(() =>
    readString(savedConfig, "roundingMultiple", "100"),
  );
  const [nominalStep, setNominalStep] = React.useState(() =>
    readString(savedConfig, "nominalStep", "100"),
  );
  const [terms, setTerms] = React.useState(() =>
    readString(savedConfig, "terms", ""),
  );

  const [accInterest, setAccInterest] = React.useState(() =>
    readBool(savedConfig, "accInterest", false),
  );
  const [ignorePrincipalDebt, setIgnorePrincipalDebt] = React.useState(() =>
    readBool(savedConfig, "ignorePrincipalDebt", false),
  );
  const [ignoreInterestDebt, setIgnoreInterestDebt] = React.useState(() =>
    readBool(savedConfig, "ignoreInterestDebt", false),
  );
  const [minLoan, setMinLoan] = React.useState(() =>
    readString(savedConfig, "minLoan", "1.000.000,00"),
  );
  const [maxLoan, setMaxLoan] = React.useState(() =>
    readString(savedConfig, "maxLoan", "100.000.000,00"),
  );
  const [specialEndDate, setSpecialEndDate] = React.useState(() =>
    readBool(savedConfig, "specialEndDate", false),
  );

  const [propisiMode, setPropisiMode] = React.useState<AmountMode>(() =>
    readOption(savedConfig, "propisiMode", "rp", ["rp", "percent"]),
  );
  const [adminMode, setAdminMode] = React.useState<AmountMode>(() =>
    readOption(savedConfig, "adminMode", "rp", ["rp", "percent"]),
  );
  const [insuranceMode, setInsuranceMode] = React.useState<AmountMode>(() =>
    readOption(savedConfig, "insuranceMode", "rp", ["rp", "percent"]),
  );
  const [mbankingActivationMode, setMbankingActivationMode] =
    React.useState<AmountMode>(() =>
      readOption(savedConfig, "mbankingActivationMode", "rp", ["rp", "percent"]),
    );

  const [propisi, setPropisi] = React.useState(() =>
    readString(savedConfig, "propisi", "0,00"),
  );
  const [admin, setAdmin] = React.useState(() =>
    readString(savedConfig, "admin", "0,00"),
  );
  const [insurance, setInsurance] = React.useState(() =>
    readString(savedConfig, "insurance", "0,00"),
  );
  const [mbankingActivation, setMbankingActivation] = React.useState(() =>
    readString(savedConfig, "mbankingActivation", "0,00"),
  );
  const [withoutCollateral, setWithoutCollateral] = React.useState(() =>
    readBool(savedConfig, "withoutCollateral", false),
  );
  const [splitInterestRevenue, setSplitInterestRevenue] = React.useState(() =>
    readBool(savedConfig, "splitInterestRevenue", false),
  );

  const [coaLoan, setCoaLoan] = React.useState<MainCoaOption>(() =>
    readOption(savedConfig, "coaLoan", "PINJAMAN YANG DIBERIKAN", mainCoaOptions),
  );
  const [coaInterestRevenue, setCoaInterestRevenue] =
    React.useState<MainCoaOption>(() =>
      readOption(savedConfig, "coaInterestRevenue", "PEND. BUNGA PINJAMAN", mainCoaOptions),
    );
  const [coaSplitInterestRevenue, setCoaSplitInterestRevenue] =
    React.useState<MainCoaOption>(() =>
      readOption(savedConfig, "coaSplitInterestRevenue", "PILIH", mainCoaOptions),
    );
  const [coaPenaltyRevenue, setCoaPenaltyRevenue] =
    React.useState<MainCoaOption>(() =>
      readOption(savedConfig, "coaPenaltyRevenue", "PEND. DENDA", mainCoaOptions),
    );
  const [coaRoundingRevenue, setCoaRoundingRevenue] =
    React.useState<MainCoaOption>(() =>
      readOption(savedConfig, "coaRoundingRevenue", "PENDAPATAN LAIN - LAIN", mainCoaOptions),
    );
  const [coaAdminRevenue, setCoaAdminRevenue] =
    React.useState<MainCoaOption>(() =>
      readOption(savedConfig, "coaAdminRevenue", "PEN. ADMINISTRASI", mainCoaOptions),
    );

  const [aturCoaJenisBiaya, setAturCoaJenisBiaya] = React.useState(() =>
    readBool(savedConfig, "aturCoaJenisBiaya", false),
  );
  const [feeCoaValues, setFeeCoaValues] = React.useState<FeeCoaValues>(() =>
    readRecord(savedConfig, "feeCoaValues", emptyFeeCoaValues),
  );
  const [collectorFees, setCollectorFees] = React.useState<CollectorFeeRow[]>(
    () => readArray<CollectorFeeRow>(savedConfig, "collectorFees", []),
  );

  const [paymentLinkEnabled, setPaymentLinkEnabled] = React.useState(() =>
    readBool(savedConfig, "paymentLinkEnabled", false),
  );
  const [paymentLinkPublishDate, setPaymentLinkPublishDate] = React.useState(() =>
    readString(savedConfig, "paymentLinkPublishDate", ""),
  );
  const [paymentLinkExpiryDate, setPaymentLinkExpiryDate] = React.useState(() =>
    readString(savedConfig, "paymentLinkExpiryDate", ""),
  );

  const [useInstallmentTable, setUseInstallmentTable] = React.useState(() =>
    readBool(savedConfig, "useInstallmentTable", !isCreate),
  );
  const [installmentMode, setInstallmentMode] =
    React.useState<InstallmentMode>(() =>
      readOption(
        savedConfig,
        "installmentMode",
        "Jadwal Tetap (Diterbitkan Penuh di Awal)",
        [
          "Jadwal Tetap (Diterbitkan Penuh di Awal)",
          "Jadwal Fleksibel & Tagihan Berkala",
          "Dihitung dari Sisa Saldo Pokok",
        ],
      ),
    );

  const [tarifDendaMode, setTarifDendaMode] =
    React.useState<PenaltyRateMode>(() =>
      readOption(savedConfig, "tarifDendaMode", "rp", ["rp", "percent"]),
    );
  const [tarifDendaValue, setTarifDendaValue] = React.useState(() =>
    readString(savedConfig, "tarifDendaValue", "0,00"),
  );
  const [dasarPerhitungan, setDasarPerhitungan] =
    React.useState<PenaltyBase>(() =>
      readOption(savedConfig, "dasarPerhitungan", "Pilih Dasar Perhitungan", [
        "Pokok",
        "Bunga",
        "Hutang Pokok",
        "Hutang Bunga",
        "Total Tagihan",
        "Pilih Dasar Perhitungan",
      ]),
    );
  const [hariKeterlambatan, setHariKeterlambatan] = React.useState(() =>
    readString(savedConfig, "hariKeterlambatan", "0"),
  );
  const [dendaBerulang, setDendaBerulang] = React.useState(() =>
    readBool(savedConfig, "dendaBerulang", false),
  );

  const [gracePeriodEnabled, setGracePeriodEnabled] = React.useState(() =>
    readBool(savedConfig, "gracePeriodEnabled", false),
  );
  const [graceUnit, setGraceUnit] = React.useState<GraceUnit>(() =>
    readOption(savedConfig, "graceUnit", "Pilih Satuan Grace Period", [
      "Pilih Satuan Grace Period",
      "Hari",
      "Bulan",
    ]),
  );
  const [graceDuration, setGraceDuration] = React.useState(() =>
    readString(savedConfig, "graceDuration", ""),
  );

  const hideDasarPerhitungan = tarifDendaMode === "rp";
  const graceDurationLabel =
    graceUnit === "Hari"
      ? "Durasi Grace Period (Hari)"
      : graceUnit === "Bulan"
        ? "Durasi Grace Period (Bulan)"
        : "Durasi Grace Period";

  React.useEffect(() => {
    if (hideDasarPerhitungan) {
      setDasarPerhitungan("Pilih Dasar Perhitungan");
    }
  }, [hideDasarPerhitungan]);

  React.useEffect(() => {
    if (!useInstallmentTable && paymentLinkEnabled) {
      setPaymentLinkEnabled(false);
    }
  }, [paymentLinkEnabled, useInstallmentTable]);

  function updateAccountingCoa(key: string, value: MainCoaOption) {
    if (key === "coaLoan") setCoaLoan(value);
    if (key === "coaInterestRevenue") setCoaInterestRevenue(value);
    if (key === "coaSplitInterestRevenue") setCoaSplitInterestRevenue(value);
    if (key === "coaPenaltyRevenue") setCoaPenaltyRevenue(value);
    if (key === "coaRoundingRevenue") setCoaRoundingRevenue(value);
    if (key === "coaAdminRevenue") setCoaAdminRevenue(value);
  }

  function addCollectorFee() {
    setCollectorFees((current) => [
      ...current,
      {
        id: String(Date.now()),
        collectorKind: "Kolektor 1",
        feeMethod: "Plafon Pinjaman",
        minLoan: "",
        maxLoan: "",
        feePercent: "",
      },
    ]);
    toast("Fee kolektor ditambahkan", {
      description: "Silakan sesuaikan jenis, metode, dan nominalnya.",
    });
  }

  function buildFormConfig(): LoanProductFormConfig {
    return {
      code,
      rc,
      periodUnit,
      minPeriod,
      maxPeriod,
      billingScheme,
      interestYearly,
      interestCountsOnInterestDebt,
      roundingType,
      roundingMultiple,
      nominalStep,
      terms,
      accInterest,
      ignorePrincipalDebt,
      ignoreInterestDebt,
      minLoan,
      maxLoan,
      specialEndDate,
      propisiMode,
      adminMode,
      insuranceMode,
      mbankingActivationMode,
      propisi,
      admin,
      insurance,
      mbankingActivation,
      withoutCollateral,
      splitInterestRevenue,
      coaLoan,
      coaInterestRevenue,
      coaSplitInterestRevenue,
      coaPenaltyRevenue,
      coaRoundingRevenue,
      coaAdminRevenue,
      aturCoaJenisBiaya,
      feeCoaValues,
      collectorFees,
      paymentLinkEnabled: useInstallmentTable ? paymentLinkEnabled : false,
      paymentLinkPublishDate,
      paymentLinkExpiryDate,
      useInstallmentTable,
      installmentMode,
      tarifDendaMode,
      tarifDendaValue,
      dasarPerhitungan,
      hariKeterlambatan,
      dendaBerulang,
      gracePeriodEnabled,
      graceUnit,
      graceDuration,
    };
  }

  function save() {
    if (name.trim().length < 3) {
      toast("Nama produk belum valid", {
        description: "Minimal 3 karakter.",
      });
      return;
    }

    if (billingScheme === "Pilih Metode Bunga Pinjaman") {
      toast("Metode bunga wajib dipilih");
      return;
    }

    const rate = Number.parseFloat((interestYearly || "0").replace(",", "."));
    if (!Number.isFinite(rate) || rate <= 0) {
      toast("Bunga belum valid", {
        description: "Isi bunga per tahun (> 0).",
      });
      return;
    }

    const tenorMonths = Math.max(1, Number.parseInt(minPeriod || "1", 10) || 1);
    const formConfig = buildFormConfig();

    if (isCreate) {
      createLoanProduct({
        name: name.trim(),
        tenorMonths,
        interestRateYearly: rate,
        billingScheme,
        gracePeriodDays: gracePeriodEnabled ? Number(graceDuration || 0) : 0,
        formConfig,
      });

      toast.success("Produk pinjaman tersimpan", {
        description: "Produk baru sudah masuk ke daftar.",
      });
      onSaved();
      return;
    }

    updateLoanProduct(productId, {
      name: name.trim(),
      tenorMonths,
      interestRateYearly: rate,
      billingScheme,
      gracePeriodDays: gracePeriodEnabled ? Number(graceDuration || 0) : 0,
      formConfig,
    });

    toast.success("Perubahan tersimpan", {
      description: `Produk: ${name}`,
    });
    onSaved();
  }

  const dendaSection = (
    <>
      <Separator className="my-6 bg-slate-200/70" />

      <div className="text-base font-semibold text-slate-900">
        <span className="inline-flex items-center">
          Konfigurasi Denda
          <FieldTooltip content={TT.denda} />
        </span>
      </div>

      <div className={cn("mt-4 grid", style.gapClassName)}>
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
            <Select
              value={dasarPerhitungan}
              onValueChange={(value) =>
                setDasarPerhitungan(value as PenaltyBase)
              }
            >
              <SelectTrigger className={style.selectTriggerClassName}>
                <SelectValue placeholder="Pilih Dasar Perhitungan" />
              </SelectTrigger>
              <SelectContent className={style.selectContentClassName}>
                <SelectItem value="Pilih Dasar Perhitungan">
                  Pilih Dasar Perhitungan
                </SelectItem>
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
            onChange={(event) => setHariKeterlambatan(event.target.value)}
            className={style.inputClassName}
            placeholder="Masukkan Jumlah Hari"
            inputMode="numeric"
          />
        </FieldRow>

        <FieldRow
          label={
            <span className="inline-flex items-center">
              Proses Denda Berulang (Recurring)
              <FieldTooltip content={TT.recurringPenalty} />
            </span>
          }
        >
          <Switch checked={dendaBerulang} onCheckedChange={setDendaBerulang} />
        </FieldRow>
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

      <div className={cn("mt-4 grid", style.gapClassName)}>
        <FieldRow label="Grace Period">
          <Switch
            checked={gracePeriodEnabled}
            onCheckedChange={setGracePeriodEnabled}
          />
        </FieldRow>

        {gracePeriodEnabled ? (
          <>
            <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
              <div className="pt-1 text-sm font-normal text-slate-900">
                Skema Grace Period
              </div>
              <RadioGroup value="Hanya Bayar Bunga" className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                  <RadioGroupItem value="Hanya Bayar Bunga" id={`grace-${mode}`} />
                  Hanya Bayar Bunga
                </label>
              </RadioGroup>
            </div>

            <FieldRow label="Satuan Grace Period">
              <Select
                value={graceUnit}
                onValueChange={(value) => setGraceUnit(value as GraceUnit)}
              >
                <SelectTrigger className={style.selectTriggerClassName}>
                  <SelectValue placeholder="Pilih Satuan Grace Period" />
                </SelectTrigger>
                <SelectContent className={style.selectContentClassName}>
                  <SelectItem value="Pilih Satuan Grace Period">
                    Pilih Satuan Grace Period
                  </SelectItem>
                  <SelectItem value="Hari">Hari</SelectItem>
                  <SelectItem value="Bulan">Bulan</SelectItem>
                </SelectContent>
              </Select>
            </FieldRow>

            <FieldRow label={graceDurationLabel}>
              <Input
                value={graceDuration}
                onChange={(event) => setGraceDuration(event.target.value)}
                className={style.inputClassName}
                placeholder="Masukkan Durasi"
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
      <div className="text-[16px] font-semibold text-slate-900">
        Konfigurasi Dasar Produk Pinjaman
      </div>

      <div className={cn("mt-5 grid", style.gapClassName)}>
        <FieldRow label="Kode">
          <Input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className={style.inputClassName}
            placeholder="Masukkan Kode"
          />
        </FieldRow>

        <FieldRow label="Produk Pinjaman">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            readOnly={isBranchEdit}
            aria-readonly={isBranchEdit}
            className={cn(
              style.inputClassName,
              isBranchEdit && "cursor-not-allowed bg-slate-100 text-slate-700",
            )}
            placeholder="Masukkan Produk Pinjaman"
          />
        </FieldRow>

        <FieldRow label="RC">
          <Switch checked={rc} onCheckedChange={setRc} />
        </FieldRow>

        <FieldRow label="Periode Pinjaman">
          <Select
            value={periodUnit}
            onValueChange={(value) => setPeriodUnit(value as PeriodUnit)}
          >
            <SelectTrigger className={style.selectTriggerClassName}>
              <SelectValue placeholder="Pilih Periode Pinjaman" />
            </SelectTrigger>
            <SelectContent className={style.selectContentClassName}>
              <SelectItem value="Pilih Periode Pinjaman">
                Pilih Periode Pinjaman
              </SelectItem>
              <SelectItem value="Bulan">Bulan</SelectItem>
              <SelectItem value="Hari">Hari</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="Minimal Periode Pinjaman">
          <Input
            value={minPeriod}
            onChange={(event) => setMinPeriod(event.target.value)}
            inputMode="numeric"
            className={style.inputClassName}
            placeholder="Masukkan Minimal Periode"
          />
        </FieldRow>

        <FieldRow label="Maksimal Periode Pinjaman">
          <Input
            value={maxPeriod}
            onChange={(event) => setMaxPeriod(event.target.value)}
            inputMode="numeric"
            className={style.inputClassName}
            placeholder="Masukkan Maksimal Periode"
          />
        </FieldRow>

        <FieldRow label="Metode Bunga Pinjaman">
          <Select
            value={billingScheme}
            onValueChange={(value) => setBillingScheme(value as BillingOption)}
          >
            <SelectTrigger className={style.selectTriggerClassName}>
              <SelectValue placeholder="Pilih Metode Bunga Pinjaman" />
            </SelectTrigger>
            <SelectContent className={style.selectContentClassName}>
              <SelectItem value="Pilih Metode Bunga Pinjaman">
                Pilih Metode Bunga Pinjaman
              </SelectItem>
              <SelectItem value="Anuitas">Bunga Efektif (Anuitas)</SelectItem>
              <SelectItem value="Flat">Bunga Flat</SelectItem>
              <SelectItem value="Menurun">Menurun</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="Bunga Pinjaman Memperhitungkan Hutang Bunga">
          <Switch
            checked={interestCountsOnInterestDebt}
            onCheckedChange={setInterestCountsOnInterestDebt}
          />
        </FieldRow>

        <FieldRow label="Bunga Per Tahun (%)">
          <Input
            value={interestYearly}
            onChange={(event) => setInterestYearly(event.target.value)}
            inputMode="decimal"
            className={style.inputClassName}
            placeholder="0,00"
          />
        </FieldRow>

        <FieldRow label="Jenis Pembulatan">
          <Select
            value={roundingType}
            onValueChange={(value) => setRoundingType(value as RoundingType)}
          >
            <SelectTrigger className={style.selectTriggerClassName}>
              <SelectValue placeholder="Pilih Jenis Pembulatan" />
            </SelectTrigger>
            <SelectContent className={style.selectContentClassName}>
              <SelectItem value="Pilih Jenis Pembulatan">
                Pilih Jenis Pembulatan
              </SelectItem>
              <SelectItem value="Pembulatan Keatas">Pembulatan Keatas</SelectItem>
              <SelectItem value="Pembulatan Kebawah">
                Pembulatan Kebawah
              </SelectItem>
              <SelectItem value="Tanpa Pembulatan">Tanpa Pembulatan</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="Kelipatan Pembulatan">
          <Input
            value={roundingMultiple}
            onChange={(event) => setRoundingMultiple(event.target.value)}
            inputMode="numeric"
            className={style.inputClassName}
            placeholder="0"
          />
        </FieldRow>

        <FieldRow label="Nominal Kelipatan">
          <Input
            value={nominalStep}
            onChange={(event) => setNominalStep(event.target.value)}
            inputMode="numeric"
            className={style.inputClassName}
            placeholder="0"
          />
        </FieldRow>

        <FieldRow label="Ketentuan Produk Pinjaman">
          <Textarea
            value={terms}
            onChange={(event) => setTerms(event.target.value)}
            className={style.textareaClassName}
            placeholder="Masukkan Ketentuan Produk Pinjaman"
          />
        </FieldRow>
      </div>

      <div className={cn("mt-6 grid", style.gapClassName)}>
        <FieldRow label="Akumulasi Bunga Pinjaman">
          <Switch checked={accInterest} onCheckedChange={setAccInterest} />
        </FieldRow>

        <FieldRow label="Tidak Menghitung Hutang Pokok">
          <Switch
            checked={ignorePrincipalDebt}
            onCheckedChange={setIgnorePrincipalDebt}
          />
        </FieldRow>

        <FieldRow label="Tidak Menghitung Hutang Bunga">
          <Switch
            checked={ignoreInterestDebt}
            onCheckedChange={setIgnoreInterestDebt}
          />
        </FieldRow>

        <FieldRow label="Minimal Pinjaman">
          <Input
            value={minLoan}
            onChange={(event) => setMinLoan(event.target.value)}
            className={style.inputClassName}
            placeholder="0,00"
          />
        </FieldRow>

        <FieldRow label="Maksimal Pinjaman">
          <Input
            value={maxLoan}
            onChange={(event) => setMaxLoan(event.target.value)}
            className={style.inputClassName}
            placeholder="0,00"
          />
        </FieldRow>

        <FieldRow label="Menggunakan Tanggal Khusus untuk Akhir Periode">
          <Switch checked={specialEndDate} onCheckedChange={setSpecialEndDate} />
        </FieldRow>

        <FieldRow label="Propisi">
          <AmountModeInput
            mode={propisiMode}
            onModeChange={setPropisiMode}
            value={propisi}
            onValueChange={setPropisi}
            style={style}
          />
        </FieldRow>

        <FieldRow label="Administrasi">
          <AmountModeInput
            mode={adminMode}
            onModeChange={setAdminMode}
            value={admin}
            onValueChange={setAdmin}
            style={style}
          />
        </FieldRow>

        <FieldRow label="Biaya Asuransi">
          <AmountModeInput
            mode={insuranceMode}
            onModeChange={setInsuranceMode}
            value={insurance}
            onValueChange={setInsurance}
            style={style}
          />
        </FieldRow>

        <FieldRow label="Biaya Aktivasi M-Banking">
          <AmountModeInput
            mode={mbankingActivationMode}
            onModeChange={setMbankingActivationMode}
            value={mbankingActivation}
            onValueChange={setMbankingActivation}
            style={style}
          />
        </FieldRow>

        <FieldRow label="Tanpa Agunan">
          <Switch checked={withoutCollateral} onCheckedChange={setWithoutCollateral} />
        </FieldRow>

        <FieldRow label="Split Pendapatan Bunga">
          <Switch
            checked={splitInterestRevenue}
            onCheckedChange={setSplitInterestRevenue}
          />
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
        aturCoaJenisBiaya={aturCoaJenisBiaya}
        onAturCoaJenisBiayaChange={setAturCoaJenisBiaya}
        feeCoaValues={feeCoaValues}
        onFeeCoaValuesChange={setFeeCoaValues}
        selectTriggerClassName={style.selectTriggerClassName}
        selectContentClassName="rounded-[5px] border-slate-200 p-0 shadow-xl"
        feeSelectTriggerClassName={style.selectTriggerClassName}
        feeSelectContentClassName={style.selectContentClassName}
      />

      <Separator className="my-6 bg-slate-200/70" />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-base font-semibold text-slate-900">
          Konfigurasi Fee Kolektor
        </div>
        <Button onClick={addCollectorFee} className={style.addFeeButtonClassName}>
          <Plus className={style.addFeeButtonIconClassName} />
          Tambah Fee Kolektor
        </Button>
      </div>

      <div className="mt-4 grid gap-3">
        {collectorFees.map((fee) => (
          <FeeRow
            key={fee.id}
            row={fee}
            style={style}
            onChange={(next) =>
              setCollectorFees((current) =>
                current.map((item) => (item.id === fee.id ? next : item)),
              )
            }
            onRemove={() => {
              setCollectorFees((current) =>
                current.filter((item) => item.id !== fee.id),
              );
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
          <FieldTooltip content={TT.skemaTagihan} />
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
          <Switch
            checked={useInstallmentTable}
            onCheckedChange={setUseInstallmentTable}
          />
        </FieldRow>

        {useInstallmentTable ? (
          <>
            <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
              <div className="pt-1 text-sm font-normal text-slate-900">
                Skema Tagihan
              </div>
              <RadioGroup
                value={installmentMode}
                onValueChange={(value) =>
                  setInstallmentMode(value as InstallmentMode)
                }
                className="flex flex-wrap items-center gap-x-6 gap-y-2"
              >
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-900">
                  <RadioGroupItem
                    value="Jadwal Tetap (Diterbitkan Penuh di Awal)"
                    id={`mode-${mode}-fixed`}
                  />
                  Tagihan Sesuai Jadwal Angsuran
                </label>

                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-900">
                  <RadioGroupItem
                    value="Jadwal Fleksibel & Tagihan Berkala"
                    id={`mode-${mode}-flex`}
                  />
                  Jadwal Fleksibel & Tagihan Berkala
                </label>

                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-900">
                  <RadioGroupItem
                    value="Dihitung dari Sisa Saldo Pokok"
                    id={`mode-${mode}-balance`}
                  />
                  Tagihan Dihitung Dari Sisa Saldo Pokok
                </label>
              </RadioGroup>
            </div>

            {isPaymentLinkProductModule ? (
              <LoanProductPaymentLinkSection
                enabled={paymentLinkEnabled}
                onEnabledChange={setPaymentLinkEnabled}
                publishDate={paymentLinkPublishDate}
                onPublishDateChange={setPaymentLinkPublishDate}
                expiryDate={paymentLinkExpiryDate}
                onExpiryDateChange={setPaymentLinkExpiryDate}
                inputClassName={style.inputClassName}
                showSeparator={false}
                showTitle={false}
              />
            ) : null}
          </>
        ) : null}
      </div>

      {useInstallmentTable ? (
        <>
          {dendaSection}
          {graceSection}
        </>
      ) : null}

      <LoanFormActionButtons onCancel={onCancel} onSave={save} />
    </Card>
  );
}