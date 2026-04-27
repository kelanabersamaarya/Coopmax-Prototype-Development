import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { Info, Plus, Save, X, HelpCircle } from "lucide-react";
import { createLoanProduct, BillingScheme } from "@/lib/loanProductsStore";
import PenaltyRateField, {
  type PenaltyRateMode,
} from "@/components/loans/PenaltyRateField";

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

type GraceScheme = "Hanya Bayar Bunga";
type GraceUnit = "Pilih Satuan Grace Period" | "Hari" | "Bulan";

type PenaltyBase =
  | "Pokok"
  | "Bunga"
  | "Hutang Pokok"
  | "Hutang Bunga"
  | "Pilih Dasar Perhitungan";

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
  return (
    <span
      className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-white ring-1 ring-[#2563eb]/25"
      aria-hidden="true"
    >
      <HelpCircle className="h-4 w-4" />
    </span>
  );
}

export default function LoanProductCreate() {
  const navigate = useNavigate();

  // --- Basic ---
  const [code, setCode] = React.useState("klp04.07");
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

  // --- Advanced ---
  const [accPenalty, setAccPenalty] = React.useState(true);
  const [penaltyMethod, setPenaltyMethod] =
    React.useState<PenaltyMethod>("Hutang Bunga");

  const [accInterest, setAccInterest] = React.useState(false);
  const [ignorePrincipalDebt, setIgnorePrincipalDebt] = React.useState(false);
  const [ignoreInterestDebt, setIgnoreInterestDebt] = React.useState(false);

  const [minLoan, setMinLoan] = React.useState("1.000.000,00");
  const [maxLoan, setMaxLoan] = React.useState("100.000.000,00");

  const [specialEndDate, setSpecialEndDate] = React.useState(false);

  const [propisi, setPropisi] = React.useState("0,00");
  const [admin, setAdmin] = React.useState("0,00");
  const [insurance, setInsurance] = React.useState("0,00");
  const [mbankingActivation, setMbankingActivation] = React.useState("0,00");

  const [withoutCollateral, setWithoutCollateral] = React.useState(false);
  const [splitInterestRevenue, setSplitInterestRevenue] = React.useState(false);

  // --- COA ---
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

  // --- Fee Kolektor (simple list like before) ---
  const [collectorFees, setCollectorFees] = React.useState<
    Array<{ id: string; name: string; amount: string }>
  >([]);

  // --- Installment ---
  const [useInstallmentTable, setUseInstallmentTable] = React.useState(true);
  const [installmentMode, setInstallmentMode] =
    React.useState<InstallmentMode>("Jadwal Tetap (Diterbitkan Penuh di Awal)");

  const [tarifDendaMode, setTarifDendaMode] =
    React.useState<PenaltyRateMode>("rp");
  const [tarifDendaValue, setTarifDendaValue] = React.useState("0,00");
  const [dasarPerhitungan, setDasarPerhitungan] =
    React.useState<PenaltyBase>("Pilih Dasar Perhitungan");
  const [hariKeterlambatan, setHariKeterlambatan] = React.useState<string>("0");

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

  function addCollectorFee() {
    setCollectorFees((prev) => [
      ...prev,
      { id: String(Date.now()), name: `Fee ${prev.length + 1}`, amount: "0" },
    ]);
    toast("Fee kolektor ditambahkan", {
      description: "Silakan sesuaikan nama dan nominalnya.",
    });
  }

  function save() {
    const tenorMonths = Math.max(
      1,
      Number.parseInt(minPeriod || "12", 10) || 12,
    );
    const rate =
      Number.parseFloat((interestYearly || "0").replace(",", ".")) || 0;

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
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <Card className="rounded-3xl border-slate-200/70 bg-white/85 p-5 shadow-sm backdrop-blur md:p-6">
            <div className="text-[20px] font-semibold text-slate-900">
              Konfigurasi Produk Pinjaman
            </div>

            <div className="mt-5 grid gap-5">
              <div className="text-sm font-extrabold tracking-tight text-slate-900">
                Konfigurasi Dasar
              </div>

              <FieldRow label="Kode">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="rounded-2xl bg-slate-100"
                />
              </FieldRow>

              <FieldRow label="Produk Pinjaman">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-2xl"
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
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  className="rounded-2xl"
                />
              </FieldRow>

              <FieldRow label="Maksimal Periode Pinjaman">
                <Input
                  value={maxPeriod}
                  onChange={(e) => setMaxPeriod(e.target.value)}
                  inputMode="numeric"
                  className="rounded-2xl"
                />
              </FieldRow>

              <FieldRow label="Metode Bunga Pinjaman">
                <Select
                  value={billingScheme}
                  onValueChange={(v) => setBillingScheme(v as BillingScheme)}
                >
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  className="rounded-2xl"
                />
              </FieldRow>

              <FieldRow label="Jenis Pembulatan">
                <Select
                  value={roundingType}
                  onValueChange={(v) => setRoundingType(v as RoundingType)}
                >
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  className="rounded-2xl"
                />
              </FieldRow>

              <FieldRow label="Denda Pinjaman">
                <Input
                  value={penalty}
                  onChange={(e) => setPenalty(e.target.value)}
                  inputMode="numeric"
                  className="rounded-2xl"
                />
              </FieldRow>

              <FieldRow label="Nominal Kelipatan">
                <Input
                  value={nominalStep}
                  onChange={(e) => setNominalStep(e.target.value)}
                  inputMode="numeric"
                  className="rounded-2xl"
                />
              </FieldRow>

              <FieldRow label="Ketentuan Produk Pinjaman">
                <Textarea
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="min-h-[96px] rounded-2xl"
                />
              </FieldRow>
            </div>

            <div className="mt-6 grid gap-5">
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
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  className="rounded-2xl"
                />
              </FieldRow>

              <FieldRow label="Maksimal Pinjaman">
                <Input
                  value={maxLoan}
                  onChange={(e) => setMaxLoan(e.target.value)}
                  className="rounded-2xl"
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
                <Input
                  value={propisi}
                  onChange={(e) => setPropisi(e.target.value)}
                  className="h-11 rounded-2xl border-slate-200 bg-white"
                  inputMode="decimal"
                />
              </FieldRow>

              <FieldRow label="Administrasi">
                <Input
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  className="h-11 rounded-2xl border-slate-200 bg-white"
                  inputMode="decimal"
                />
              </FieldRow>

              <FieldRow label="Biaya Asuransi">
                <Input
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="h-11 rounded-2xl border-slate-200 bg-white"
                  inputMode="decimal"
                />
              </FieldRow>

              <FieldRow label="Biaya Aktivasi M-Banking">
                <Input
                  value={mbankingActivation}
                  onChange={(e) => setMbankingActivation(e.target.value)}
                  className="h-11 rounded-2xl border-slate-200 bg-white"
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
                hint="Prototype UI."
              >
                <div className="flex items-center gap-3">
                  <Switch
                    checked={splitInterestRevenue}
                    onCheckedChange={setSplitInterestRevenue}
                  />
                </div>
              </FieldRow>
            </div>

            <div className="mt-6 grid gap-5">
              <FieldRow label="KP Pinjaman">
                <Select value={coaLoan} onValueChange={(v) => setCoaLoan(v as CoaOption)}>
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue placeholder="Pilih CoA Pinjaman" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue placeholder="Pilih CoA Pendapatan Bunga" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue placeholder="Pilih COA Pendapatan Bunga" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue placeholder="Pilih CoA Biaya Denda" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue placeholder="Pilih CoA Pembulatan" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                  <SelectTrigger className="rounded-2xl border-slate-200 bg-white">
                    <SelectValue placeholder="Pilih CoA Biaya Admin" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
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
                className="rounded-full bg-[hsl(var(--app-accent))] text-white hover:bg-[hsl(var(--app-accent-2))]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Fee Kolektor
              </Button>
            </div>

            <div className="mt-4 grid gap-3">
              {collectorFees.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
                  Belum ada fee kolektor.
                </div>
              ) : (
                collectorFees.map((f, idx) => (
                  <div
                    key={f.id}
                    className="grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 md:grid-cols-[1fr_220px_56px] md:items-end"
                  >
                    <div className="grid gap-2">
                      <Label className="text-xs font-semibold text-slate-700">
                        Nama
                      </Label>
                      <Input
                        value={f.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCollectorFees((prev) =>
                            prev.map((x) => (x.id === f.id ? { ...x, name: val } : x)),
                          );
                        }}
                        className="h-11 rounded-xl border-slate-200 bg-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label className="text-xs font-semibold text-slate-700">
                        Nominal
                      </Label>
                      <Input
                        value={f.amount}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCollectorFees((prev) =>
                            prev.map((x) =>
                              x.id === f.id ? { ...x, amount: val } : x,
                            ),
                          );
                        }}
                        className="h-11 rounded-xl border-slate-200 bg-white"
                        inputMode="decimal"
                      />
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-11 w-14 items-center justify-center rounded-xl bg-rose-600 text-white ring-1 ring-rose-600/20 transition hover:bg-rose-700"
                      onClick={() => {
                        setCollectorFees((prev) => prev.filter((x) => x.id !== f.id));
                        toast("Fee dihapus", {
                          description: `Item #${idx + 1} dihapus.`,
                        });
                      }}
                      aria-label="Hapus fee"
                      title="Hapus"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <div className="text-base font-semibold text-slate-900">
              <span className="inline-flex items-center">
                Konfigurasi Tagihan Angsuran <InfoBadge />
              </span>
            </div>

            <div className="mt-4 grid gap-5">
              <FieldRow
                label={
                  <span className="inline-flex items-center">
                    Tagihan Angsuran Menggunakan Tabel Angsuran <InfoBadge />
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
                <>
                  <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                    <div className="pt-1 text-sm font-normal text-slate-900">
                      <span className="inline-flex items-center">
                        Skema Tagihan <InfoBadge />
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
                      ).map((m) => (
                        <label
                          key={m}
                          className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-900"
                        >
                          <RadioGroupItem value={m} id={`mode-${m}`} />
                          <span className="whitespace-nowrap">
                            {m === "Jadwal Tetap (Diterbitkan Penuh di Awal)"
                              ? "Tagihan Sesuai Jadwal Angsuran"
                              : m === "Jadwal Fleksibel & Tagihan Berkala"
                                ? "Tagihan Berkala Berdasarkan Periode"
                                : "Tagihan Berdasarkan Sisa Angsuran"}
                          </span>
                          <InfoBadge />
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <FieldRow label="Metode Denda">
                    <PenaltyRateField
                      mode={tarifDendaMode}
                      onModeChange={setTarifDendaMode}
                      value={tarifDendaValue}
                      onValueChange={setTarifDendaValue}
                    />
                  </FieldRow>

                  <FieldRow label="Dasar Perhitungan">
                    <Select
                      value={dasarPerhitungan}
                      onValueChange={(v) => setDasarPerhitungan(v as PenaltyBase)}
                    >
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white">
                        <SelectValue placeholder="Pilih Dasar Perhitungan" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-200">
                        <SelectItem value="Pilih Dasar Perhitungan">
                          Pilih Dasar Perhitungan
                        </SelectItem>
                        <SelectItem value="Pokok">Pokok</SelectItem>
                        <SelectItem value="Bunga">Bunga</SelectItem>
                        <SelectItem value="Hutang Pokok">Hutang Pokok</SelectItem>
                        <SelectItem value="Hutang Bunga">Hutang Bunga</SelectItem>
                      </SelectContent>
                    </Select>
                  </FieldRow>

                  <FieldRow label="Jumlah Hari Keterlambatan">
                    <Input
                      value={hariKeterlambatan}
                      onChange={(e) => setHariKeterlambatan(e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 bg-white"
                      placeholder="Masukkan Jumlah Hari"
                      inputMode="numeric"
                    />
                  </FieldRow>

                  <div className="grid gap-5">
                    <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                      <div className="pt-1 text-sm font-normal text-slate-900">
                        <span className="inline-flex items-center">
                          Grace Period <InfoBadge />
                        </span>
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
                            <span className="inline-flex items-center">
                              Skema Grace Period <InfoBadge />
                            </span>
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
                              Hanya Bayar Bunga
                              <InfoBadge />
                            </label>
                          </RadioGroup>
                        </div>

                        <div className="grid gap-2 md:grid-cols-[240px_1fr] md:items-center">
                          <div className="pt-1 text-sm font-normal text-slate-900">
                            <span className="inline-flex items-center">
                              Satuan Grace Period <InfoBadge />
                            </span>
                          </div>
                          <Select
                            value={graceUnit}
                            onValueChange={(v) => setGraceUnit(v as GraceUnit)}
                          >
                            <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white">
                              <SelectValue placeholder="Pilih Satuan Grace Period" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-200">
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
                            <span className="inline-flex items-center">
                              {graceDurationLabel} <InfoBadge />
                            </span>
                          </div>
                          <Input
                            value={graceDuration}
                            onChange={(e) => setGraceDuration(e.target.value)}
                            className="h-12 rounded-2xl border-slate-200 bg-white"
                            placeholder={graceDurationPlaceholder}
                            inputMode="numeric"
                          />
                        </div>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>

            <Separator className="my-6 bg-slate-200/70" />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button
                variant="outline"
                className="rounded-full border-slate-200 bg-white/60 hover:bg-white"
                onClick={() => navigate("/loan-products")}
              >
                <X className="mr-2 h-4 w-4" />
                Batalkan
              </Button>

              <Button
                onClick={save}
                className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Simpan
              </Button>
            </div>

            <div className="sr-only">
              <Info />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}