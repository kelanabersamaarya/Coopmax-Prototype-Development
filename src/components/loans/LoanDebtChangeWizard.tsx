"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import LoanBillingTablePreview from "@/components/loans/LoanBillingTablePreview";

const accountDetails = [
  ["No. Rek. Pinjaman", "SMG260004"],
  ["Nama Anggota / Debitur", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Billing"],
  ["Status Pinjaman", "Aktif / Sudah Dicairkan"],
  ["Baki Debet Pokok", "10.553.571,00"],
  ["Tunggakan Pokok", "0,00"],
  ["Tunggakan Bunga", "125.000,00"],
  ["Denda dan Biaya Lainnya", "0,00"],
  ["Total Kewajiban", "10.678.571,00"],
] as const;

const billingRows = [
  ["25-01-2026", "916.667", "0,00", "83.333", "0,00", "26.389", "75.000"],
  ["25-02-2026", "916.667", "0,00", "83.333", "0,00", "26.389", "75.000"],
  ["25-03-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "75.000"],
  ["25-04-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "0,00"],
  ["25-05-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "0,00"],
  ["25-06-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "0,00"],
  ["25-07-2026", "1.120.000,00", "1.000.000,00", "120.000,00", "10.553.571,00", "1.266.429,00", "0,00"],
  ["25-08-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "0,00"],
  ["25-09-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "0,00"],
  ["25-10-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "0,00"],
] as const;

const PREVIOUS_INTEREST_DEBT = 125_000;

function parseIdr(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString("id-ID").replace(/,/g, ".");
}

function parseDmy(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function AccountField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 text-[14px] font-extrabold leading-snug text-white">
        {value}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  const steps = ["Informasi & Tagihan", "Simulasi", "Simpan Perubahan"];

  return (
    <div className="flex items-center justify-center gap-3 overflow-x-auto px-6 py-5">
      {steps.map((label, index) => {
        const number = index + 1;

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full text-[18px] font-extrabold",
                  number <= step
                    ? "bg-[#2563EB] text-white"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {number}
              </span>
              <span className="mt-2 whitespace-nowrap text-[12px] font-semibold text-slate-700">
                {label}
              </span>
            </div>
            {number < steps.length ? (
              <div
                className={cn(
                  "mb-5 h-[2px] min-w-10 flex-1",
                  number < step ? "bg-[#2563EB]" : "bg-slate-200",
                )}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function UnifiedBillingSimulationTable({
  principalDebt,
  interestDebt,
  otherDebt,
  changeStartInstallment,
}: {
  principalDebt: string;
  interestDebt: string;
  otherDebt: string;
  changeStartInstallment: number;
}) {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(billingRows.length / pageSize));
  const start = (page - 1) * pageSize;
  const pagedRows = billingRows.slice(start, start + pageSize);

  const nextPrincipalDebt = parseIdr(principalDebt);
  const nextInterestDebt = parseIdr(interestDebt);
  const nextOtherDebt = parseIdr(otherDebt);
  const adjustmentAmount = Math.abs(nextInterestDebt - PREVIOUS_INTEREST_DEBT);
  const adjustmentType =
    nextInterestDebt > PREVIOUS_INTEREST_DEBT
      ? "Penambahan Hutang Bunga"
      : nextInterestDebt < PREVIOUS_INTEREST_DEBT
        ? "Pengurangan Hutang Bunga"
        : "Tidak Ada Perubahan";

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Simulasi Perubahan Hutang Bunga
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[2140px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
              <th className="w-[85px] px-3 py-3">Angsuran Ke</th>
              <th className="w-[85px] px-3 py-3">Jatuh Tempo</th>
              <th className="w-[115px] px-3 py-3 text-right">
                Total Tagihan
                <br />
                Belum Dibayar
              </th>
              <th className="w-[125px] px-3 py-3 text-right">
                Tagihan
                <br />
                Pokok
              </th>
              <th className="w-[125px] px-3 py-3 text-right">
                Tagihan
                <br />
                Bunga
              </th>
              <th className="w-[135px] px-3 py-3 text-right">
                Sisa Tagihan
                <br />
                Pokok
              </th>
              <th className="w-[135px] px-3 py-3 text-right">
                Sisa Tagihan
                <br />
                Bunga
              </th>
              <th className="w-[120px] px-3 py-3 text-right">
                Tagihan
                <br />
                Denda
              </th>
              <th className="w-[125px] px-3 py-3 text-right">
                Tunggakan Bunga
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[95px] px-3 py-3">Jenis Penyesuaian</th>
              <th className="w-[110px] px-3 py-3 text-right">
                Nominal
                <br />
                Penyesuaian
              </th>
              <th className="w-[135px] px-3 py-3 text-right">
                Tunggakan Bunga
                <br />
                Setelah Penyesuaian
              </th>
              <th className="w-[135px] px-3 py-3 text-right">
                Total Kewajiban
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[135px] px-3 py-3 text-right">
                Total Kewajiban
                <br />
                Setelah Penyesuaian
              </th>
            </tr>
          </thead>

          <tbody className="text-[12px] text-black">
            {pagedRows.map((row, index) => {
              const [
                dueDate,
                totalBill,
                principalBill,
                interestBill,
                remainingPrincipal,
                remainingInterest,
                penalty,
              ] = row;

              const installmentNo = start + index + 1;
              const isAdjustedRow = installmentNo === changeStartInstallment;
              const previousTotal = parseIdr(totalBill) + PREVIOUS_INTEREST_DEBT;
              const nextTotal =
                parseIdr(totalBill) +
                nextPrincipalDebt +
                nextInterestDebt +
                nextOtherDebt;

              return (
                <tr
                  key={dueDate}
                  data-debt-change={isAdjustedRow ? "true" : undefined}
                  data-debt-change-start={isAdjustedRow ? "true" : undefined}
                  data-debt-change-end={isAdjustedRow ? "true" : undefined}
                  className={cn(
                    "border-b border-slate-100",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                  )}
                >
                  <td className="px-3 py-3 text-left tabular-nums">
                    {installmentNo}
                  </td>
                  <td className="px-3 py-3 tabular-nums">{dueDate}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{totalBill}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{principalBill}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{interestBill}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{remainingPrincipal}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{remainingInterest}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{penalty}</td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {isAdjustedRow ? formatIdr(PREVIOUS_INTEREST_DEBT) : "0,00"}
                  </td>
                  <td className="px-3 py-3">
                    {isAdjustedRow ? adjustmentType : "-"}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {isAdjustedRow ? formatIdr(adjustmentAmount) : "0,00"}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-[#2563EB]">
                    {isAdjustedRow ? formatIdr(nextInterestDebt) : "0,00"}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {isAdjustedRow ? formatIdr(previousTotal) : totalBill}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-[#2563EB]">
                    {isAdjustedRow ? formatIdr(nextTotal) : totalBill}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-slate-600">
          Menampilkan {billingRows.length === 0 ? 0 : start + 1} sampai{" "}
          {Math.min(billingRows.length, start + pageSize)} dari {billingRows.length} entri
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded-[5px] px-3 text-[12px] font-semibold transition",
              "bg-slate-100 text-slate-600 hover:bg-slate-200",
              page <= 1 ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-[5px] bg-[#2563EB] px-3 text-[12px] font-extrabold text-white">
            {page}
          </span>

          <button
            type="button"
            disabled={page >= pageCount}
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            className={cn(
              "inline-flex h-9 items-center gap-1 rounded-[5px] px-3 text-[12px] font-semibold transition",
              "bg-slate-100 text-slate-600 hover:bg-slate-200",
              page >= pageCount ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoanDebtChangeWizard({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [step, setStep] = React.useState(1);
  const [principalDebt, setPrincipalDebt] = React.useState("0,00");
  const [interestDebt, setInterestDebt] = React.useState("125.000,00");
  const [otherDebt, setOtherDebt] = React.useState("0,00");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setPrincipalDebt("0,00");
    setInterestDebt("125.000,00");
    setOtherDebt("0,00");
    setEffectiveDate("");
    setReason("");
  }, [open]);

  const parsedInterestDebt = parseIdr(interestDebt);
  const effectiveDateValue = parseDmy(effectiveDate);

  const hasValidChange =
    parsedInterestDebt !== PREVIOUS_INTEREST_DEBT &&
    effectiveDateValue !== null &&
    reason.trim().length > 0;

  const changeStartInstallment = React.useMemo(() => {
    if (!effectiveDateValue) return 1;

    const firstAffectedIndex = billingRows.findIndex(([dueDate]) => {
      const dueDateValue = parseDmy(dueDate);
      return dueDateValue ? dueDateValue >= effectiveDateValue : false;
    });

    return firstAffectedIndex >= 0 ? firstAffectedIndex + 1 : billingRows.length;
  }, [effectiveDateValue]);

  function nextStep() {
    if (step === 1) {
      if (!hasValidChange) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    toast.success("Perubahan hutang tersimpan", {
      description: `Rekening ${accountNo} berhasil diperbarui.`,
    });
    onOpenChange(false);
  }

  const simulationRows = [
    { label: "Tunggakan Pokok", value: principalDebt },
    { label: "Tunggakan Bunga", value: interestDebt },
    { label: "Denda dan Biaya Lainnya", value: otherDebt },
    { label: "Tanggal Efektif", value: effectiveDate },
    { label: "Angsuran Mulai Berubah", value: `Angsuran ke-${changeStartInstallment}` },
  ];

  const isSimulationStep = step === 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-loan-debt-wizard="true"
        className="w-[calc(100vw-1rem)] max-w-[1040px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl sm:w-[1040px] [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900">
            Ubah Hutang Bunga
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <StepIndicator step={step} />
        <Separator className="bg-slate-200" />

        <main className="max-h-[62vh] overflow-auto px-5 py-6 sm:px-8">
          {step === 1 ? (
            <div className="grid gap-6">
              <div className="rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[14px] font-extrabold tracking-wide">
                    INFORMASI REKENING PINJAMAN
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toast("Riwayat Perubahan Hutang (prototype)", {
                        description: `Rekening: ${accountNo}`,
                      })
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-[5px] bg-white px-3 text-[12px] font-semibold text-[#168294]"
                  >
                    <Clock3 className="h-4 w-4" />
                    Lihat Riwayat Perubahan
                  </button>
                </div>

                <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {accountDetails.map((field) => (
                    <AccountField
                      key={field[0]}
                      label={field[0]}
                      value={field[0] === "No. Rek. Pinjaman" ? accountNo : field[1]}
                    />
                  ))}
                </div>
              </div>

              <LoanBillingTablePreview accountNo={accountNo} />

              <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  Form Perubahan Hutang Bunga
                </div>

                <div className="grid gap-5 px-5 py-5">
                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                    <label className="text-[14px] font-normal text-[#002060]">
                      Tunggakan Pokok
                    </label>
                    <Input
                      value={principalDebt}
                      onChange={(event) => setPrincipalDebt(event.target.value)}
                      className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      inputMode="decimal"
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                    <label className="text-[14px] font-normal text-[#002060]">
                      Tunggakan Bunga Baru
                      <span className="text-rose-600"> *</span>
                    </label>
                    <Input
                      value={interestDebt}
                      onChange={(event) => setInterestDebt(event.target.value)}
                      className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      inputMode="decimal"
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                    <label className="text-[14px] font-normal text-[#002060]">
                      Denda dan Biaya Lainnya
                    </label>
                    <Input
                      value={otherDebt}
                      onChange={(event) => setOtherDebt(event.target.value)}
                      className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      inputMode="decimal"
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                    <label className="text-[14px] font-normal text-[#002060]">
                      Tanggal Efektif
                      <span className="text-rose-600"> *</span>
                    </label>
                    <DatePickerDmyField
                      value={effectiveDate}
                      onChange={setEffectiveDate}
                      inputClassName="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      placeholder="Pilih Tanggal Efektif"
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-start">
                    <label className="pt-2 text-[14px] font-normal text-[#002060]">
                      Alasan Perubahan
                      <span className="text-rose-600"> *</span>
                    </label>
                    <Textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder="Masukkan alasan perubahan hutang bunga"
                      className="min-h-[110px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <UnifiedBillingSimulationTable
              principalDebt={principalDebt}
              interestDebt={interestDebt}
              otherDebt={otherDebt}
              changeStartInstallment={changeStartInstallment}
            />
          ) : null}

          {step === 3 ? (
            <div className="grid gap-5">
              <div>
                <h3 className="text-[14px] font-bold uppercase tracking-wide text-black">
                  Simpan Perubahan Hutang
                </h3>
                <p className="mt-2 text-[13px] text-slate-600">
                  Periksa kembali penyesuaian berikut sebelum menyimpan.
                </p>
              </div>

              <div className="rounded-[12px] border border-slate-200 bg-[#F9FAFF] p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[12px] font-semibold text-slate-500">
                      Rekening Pinjaman
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                      {accountNo}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-slate-500">
                      Nama Debitur
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                      Bapak Bagus
                    </div>
                  </div>
                </div>

                <Separator className="my-5 bg-slate-200" />

                <div className="grid gap-4">
                  {simulationRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 text-[14px]"
                    >
                      <span className="text-slate-600">{row.label}</span>
                      <span className="font-extrabold tabular-nums text-[#2563EB]">
                        {row.value || "0,00"}
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-slate-200 pt-4 text-[14px] text-slate-600">
                    Alasan:{" "}
                    <span className="font-semibold text-slate-900">{reason}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>

        <footer className="flex items-center gap-[10px] border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={() =>
              step === 1 ? onOpenChange(false) : setStep((current) => current - 1)
            }
            className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
          >
            {step === 1 ? (
              <>
                <X className="h-4 w-4" strokeWidth={3} />
                Batal
              </>
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" strokeWidth={3} />
                Kembali
              </>
            )}
          </button>

          {isSimulationStep ? (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-10 min-w-[90px] items-center justify-center rounded-[5px] bg-transparent px-5 text-[12px] font-semibold text-[#DC3545] transition hover:text-[#B71C2B]"
            >
              Batal
            </button>
          ) : null}

          <button
            type="button"
            disabled={step === 1 && !hasValidChange}
            onClick={nextStep}
            className={cn(
              "ml-auto inline-flex h-10 items-center justify-center rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
              step === 3
                ? "min-w-[172px] gap-[9px] bg-[#2fb300] hover:bg-[#279800]"
                : step === 2
                  ? "min-w-[145px] gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]"
                  : hasValidChange
                    ? "min-w-[145px] gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]"
                    : "min-w-[145px] cursor-not-allowed gap-2 bg-slate-300 text-slate-500",
            )}
          >
            {step === 3 ? "Simpan Perubahan" : "Lanjutkan"}
            {step === 3 ? (
              <Check className="h-5 w-5" strokeWidth={3.5} />
            ) : (
              <ChevronRight className="h-4 w-4" strokeWidth={3} />
            )}
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}