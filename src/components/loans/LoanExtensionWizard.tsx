"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import LoanExtensionHistoryDialog from "@/components/loans/LoanExtensionHistoryDialog";
import LoanExtensionPaymentSchedule from "@/components/loans/LoanExtensionPaymentSchedule";

type Step = 1 | 2;
type ExtensionMethod =
  | "Tenor Tambahan"
  | "Tenor Baru"
  | "Jatuh Tempo Akhir Baru";

const CURRENT_TENOR = 12;
const CURRENT_DUE_MONTH = "April";
const CURRENT_DUE_YEAR = "2027";
const REMAINING_PRINCIPAL = 10_553_571;
const MONTHLY_INTEREST = 120_000;
const CURRENT_DUE_DATE = new Date(2027, 3, 7);

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const years = Array.from({ length: 16 }, (_, index) => String(2026 + index));

const accountDetails = [
  ["No. Rek. Pinjaman", "SMG260004"],
  ["Nama Anggota", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Billing"],
  ["Status Pinjaman", "Aktif / Sudah Dicairkan"],
  ["Baki Debet", "10.553.571,00"],
  ["Nominal Angsuran", "1.120.000,00"],
  ["Suku Bunga", "12,00% per tahun"],
  ["Sisa Tenor", "12 Bulan"],
  ["Tunggakan Pokok", "0,00"],
  ["Tunggakan Bunga", "0,00"],
  ["Denda", "0,00"],
  ["Total Kewajiban", "10.678.571,00"],
] as const;

function formatIdr(value: number) {
  return Math.max(0, Math.round(value))
    .toLocaleString("id-ID")
    .replace(/,/g, ".");
}

function formatDmy(date: Date) {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function addMonths(date: Date, amount: number) {
  const result = new Date(date);
  const originalDay = result.getDate();
  result.setMonth(result.getMonth() + amount);

  if (result.getDate() !== originalDay) result.setDate(0);

  return result;
}

function AccountField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[12px] font-semibold text-white/85">{label}</div>
      <div className="mt-1.5 text-[14px] font-extrabold leading-snug text-white">
        {label === "Status Pinjaman" ? (
          <span className="inline-flex rounded-[4px] bg-[#3BB001] px-2 py-1 text-[11px] font-extrabold leading-none text-white">
            {value}
          </span>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function FieldRow({
  label,
  children,
  top = false,
}: {
  label: string;
  children: React.ReactNode;
  top?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)]",
        top ? "sm:items-start" : "sm:items-center",
      )}
    >
      <label
        className={cn(
          "text-[14px] font-normal text-[#002060]",
          top && "pt-2",
        )}
      >
        {label} <span className="text-rose-600">*</span>
      </label>
      {children}
    </div>
  );
}

function ReadOnlyFieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)] sm:items-center">
      <div className="text-[14px] font-normal text-[#002060]">{label}</div>
      {children}
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps = ["Informasi & Perpanjangan", "Pratinjau dan Simulasi"];

  return (
    <div className="flex items-center justify-center gap-3 overflow-x-auto px-6 py-5">
      {steps.map((label, index) => {
        const number = (index + 1) as Step;

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

export default function LoanExtensionWizard({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [step, setStep] = React.useState<Step>(1);
  const [method, setMethod] = React.useState<ExtensionMethod | "">("");
  const [additionalTenor, setAdditionalTenor] = React.useState("");
  const [newTenor, setNewTenor] = React.useState("");
  const [dueMonth, setDueMonth] = React.useState("");
  const [dueYear, setDueYear] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [historyOpen, setHistoryOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setMethod("");
    setAdditionalTenor("");
    setNewTenor("");
    setDueMonth("");
    setDueYear("");
    setEffectiveDate("");
    setReason("");
    setHistoryOpen(false);
  }, [open]);

  const parsedDueMonth = months.indexOf(dueMonth);
  const parsedDueYear = Number.parseInt(dueYear, 10);

  const hasMethodValue =
    method === "Tenor Tambahan"
      ? Number.parseInt(additionalTenor, 10) > 0
      : method === "Tenor Baru"
        ? Number.parseInt(newTenor, 10) > 0
        : method === "Jatuh Tempo Akhir Baru"
          ? parsedDueMonth >= 0 && Number.isFinite(parsedDueYear)
          : false;

  const isValid =
    hasMethodValue &&
    effectiveDate.trim().length > 0 &&
    reason.trim().length > 0;

  const simulation = React.useMemo(() => {
    let tenor = CURRENT_TENOR;
    let dueDate = CURRENT_DUE_DATE;

    if (method === "Tenor Tambahan") {
      const additionalMonths = Number.parseInt(additionalTenor, 10) || 0;
      tenor = CURRENT_TENOR + additionalMonths;
      dueDate = addMonths(CURRENT_DUE_DATE, additionalMonths);
    }

    if (method === "Tenor Baru") {
      tenor = Math.max(1, Number.parseInt(newTenor, 10) || CURRENT_TENOR);
      dueDate = addMonths(CURRENT_DUE_DATE, tenor - CURRENT_TENOR);
    }

    if (
      method === "Jatuh Tempo Akhir Baru" &&
      parsedDueMonth >= 0 &&
      Number.isFinite(parsedDueYear)
    ) {
      dueDate = new Date(parsedDueYear, parsedDueMonth, CURRENT_DUE_DATE.getDate());

      if (dueDate.getMonth() !== parsedDueMonth) dueDate.setDate(0);

      const monthDifference =
        (dueDate.getFullYear() - CURRENT_DUE_DATE.getFullYear()) * 12 +
        dueDate.getMonth() -
        CURRENT_DUE_DATE.getMonth();

      tenor = Math.max(1, CURRENT_TENOR + monthDifference);
    }

    const monthlyPrincipal = REMAINING_PRINCIPAL / tenor;
    const monthlyInterest = MONTHLY_INTEREST * (CURRENT_TENOR / tenor);

    const scheduleRows = Array.from({ length: tenor }, (_, index) => {
      const principal = Math.min(
        monthlyPrincipal,
        Math.max(0, REMAINING_PRINCIPAL - monthlyPrincipal * index),
      );
      const penalty = index < 3 ? 75_000 : 0;

      return {
        dueDate: formatDmy(addMonths(new Date(2026, 7, 7), index)),
        total: principal + monthlyInterest + penalty,
        principal,
        interest: monthlyInterest,
        remainingPrincipal: Math.max(
          0,
          REMAINING_PRINCIPAL - monthlyPrincipal * (index + 1),
        ),
        remainingInterest: 0,
        penalty,
      };
    });

    return {
      tenor,
      dueDate: formatDmy(dueDate),
      oldInstallment: REMAINING_PRINCIPAL / CURRENT_TENOR + MONTHLY_INTEREST,
      newInstallment: monthlyPrincipal + monthlyInterest,
      oldInterest: MONTHLY_INTEREST * CURRENT_TENOR,
      newInterest: monthlyInterest * tenor,
      scheduleRows,
    };
  }, [additionalTenor, method, newTenor, parsedDueMonth, parsedDueYear]);

  const methodValue =
    method === "Tenor Tambahan"
      ? `${additionalTenor} Bulan`
      : method === "Tenor Baru"
        ? `${simulation.tenor} Bulan`
        : simulation.dueDate;

  function continueWizard() {
    if (!isValid) {
      toast("Data perpanjangan belum lengkap", {
        description:
          "Lengkapi metode, nilai perpanjangan, tanggal efektif, dan alasan perpanjangan.",
      });
      return;
    }

    setStep(2);
  }

  return (
    <>
      <LoanExtensionHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        accountNo={accountNo}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          data-loan-extension-wizard="true"
          data-loan-extension-step={step}
          className="w-[calc(100vw-1rem)] max-w-[1040px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl sm:w-[1040px] [&>button[aria-label=Close]]:hidden"
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900">
              Perpanjangan Pinjaman
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
                <section className="loan-extension-account-info rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[14px] font-extrabold tracking-wide text-white">
                      INFORMASI REKENING PINJAMAN
                    </div>

                    <button
                      type="button"
                      onClick={() => setHistoryOpen(true)}
                      className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[5px] bg-white px-3 text-[12px] font-semibold text-[#168294] transition hover:bg-slate-50"
                    >
                      <Clock3 className="h-4 w-4" />
                      Lihat Riwayat Perubahan
                    </button>
                  </div>

                  <div className="loan-extension-account-grid mt-7 grid gap-x-8 gap-y-6">
                    {accountDetails.map(([label, value]) => (
                      <AccountField
                        key={label}
                        label={label}
                        value={label === "No. Rek. Pinjaman" ? accountNo : value}
                      />
                    ))}
                  </div>
                </section>

                <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                  <div className="bg-[#F9FAFF] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                    Data Perpanjangan Pinjaman
                  </div>

                  <div className="grid gap-5 p-5">
                    <FieldRow label="Metode Perpanjangan">
                      <RadioGroup
                        value={method}
                        onValueChange={(value) => {
                          setMethod(value as ExtensionMethod);
                          setAdditionalTenor("");
                          setNewTenor("");
                          setDueMonth("");
                          setDueYear("");
                        }}
                        className="flex flex-wrap items-center gap-x-6 gap-y-3"
                      >
                        {(
                          [
                            "Tenor Tambahan",
                            "Tenor Baru",
                            "Jatuh Tempo Akhir Baru",
                          ] as ExtensionMethod[]
                        ).map((option) => (
                          <label
                            key={option}
                            className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-normal text-slate-900"
                          >
                            <RadioGroupItem value={option} />
                            {option}
                          </label>
                        ))}
                      </RadioGroup>
                    </FieldRow>

                    {method === "Tenor Tambahan" ? (
                      <>
                        <ReadOnlyFieldRow label="Tenor Saat Ini">
                          <Input
                            value={`${CURRENT_TENOR} Bulan`}
                            readOnly
                            aria-readonly="true"
                            className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                          />
                        </ReadOnlyFieldRow>

                        <FieldRow label="Tenor Tambahan (Bulan)">
                          <Input
                            value={additionalTenor}
                            onChange={(event) =>
                              setAdditionalTenor(
                                event.target.value.replace(/[^\d]/g, ""),
                              )
                            }
                            inputMode="numeric"
                            placeholder="Masukkan tenor tambahan"
                            className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                          />
                        </FieldRow>

                        <ReadOnlyFieldRow label="Total Tenor Baru">
                          <Input
                            value={`${
                              CURRENT_TENOR +
                              (Number.parseInt(additionalTenor, 10) || 0)
                            } Bulan`}
                            readOnly
                            aria-readonly="true"
                            className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                          />
                        </ReadOnlyFieldRow>
                      </>
                    ) : null}

                    {method === "Tenor Baru" ? (
                      <FieldRow label="Tenor Baru (Bulan)">
                        <Input
                          value={newTenor}
                          onChange={(event) =>
                            setNewTenor(
                              event.target.value.replace(/[^\d]/g, ""),
                            )
                          }
                          inputMode="numeric"
                          placeholder="Masukkan tenor baru"
                          className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        />
                      </FieldRow>
                    ) : null}

                    {method === "Jatuh Tempo Akhir Baru" ? (
                      <>
                        <ReadOnlyFieldRow label="Jatuh Tempo Saat Ini">
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              value={CURRENT_DUE_MONTH}
                              readOnly
                              aria-readonly="true"
                              className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                            />
                            <Input
                              value={CURRENT_DUE_YEAR}
                              readOnly
                              aria-readonly="true"
                              className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                            />
                          </div>
                        </ReadOnlyFieldRow>

                        <FieldRow label="Jatuh Tempo Akhir Baru">
                          <div className="grid grid-cols-2 gap-3">
                            <Select value={dueMonth} onValueChange={setDueMonth}>
                              <SelectTrigger className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0">
                                <SelectValue placeholder="Pilih Bulan" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[240px] rounded-[5px] border-slate-200">
                                {months.map((month) => (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Select value={dueYear} onValueChange={setDueYear}>
                              <SelectTrigger className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0">
                                <SelectValue placeholder="Pilih Tahun" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[240px] rounded-[5px] border-slate-200">
                                {years.map((year) => (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </FieldRow>
                      </>
                    ) : null}

                    <FieldRow label="Tanggal Efektif">
                      <DatePickerDmyField
                        value={effectiveDate}
                        onChange={setEffectiveDate}
                        inputClassName="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        placeholder="DD-MM-YYYY"
                      />
                    </FieldRow>

                    <FieldRow label="Alasan Perpanjangan" top>
                      <Textarea
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        className="min-h-[112px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        placeholder="Masukkan alasan perpanjangan pinjaman"
                      />
                    </FieldRow>
                  </div>
                </section>
              </div>
            ) : (
              <div className="grid gap-6">
                <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                  <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                    Ringkasan Perpanjangan Pinjaman
                  </div>

                  <div className="safe-x-scroll">
                    <table className="w-full min-w-[650px] border-collapse">
                      <thead className="bg-white">
                        <tr className="border-b border-slate-200 text-left text-[12px] font-bold uppercase tracking-wide text-black">
                          <th className="w-[40%] px-4 py-3">Informasi</th>
                          <th className="w-[30%] px-4 py-3">Sebelum Perpanjangan</th>
                          <th className="w-[30%] px-4 py-3">Sesudah Perpanjangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100 bg-white text-[12px] text-black">
                          <td className="px-4 py-3 font-medium">
                            Metode Perpanjangan
                          </td>
                          <td className="px-4 py-3 text-slate-400">-</td>
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">
                            {method}
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 bg-slate-50/60 text-[12px] text-black">
                          <td className="px-4 py-3 font-medium">
                            Detail Perpanjangan
                          </td>
                          <td className="px-4 py-3 text-slate-400">-</td>
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">
                            {methodValue}
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 bg-white text-[12px] text-black">
                          <td className="px-4 py-3 font-medium">Tanggal Efektif</td>
                          <td className="px-4 py-3 text-slate-400">-</td>
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">
                            {effectiveDate}
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 bg-slate-50/60 text-[12px] text-black">
                          <td className="px-4 py-3 font-medium">Tenor</td>
                          <td className="px-4 py-3">{CURRENT_TENOR} Bulan</td>
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">
                            {simulation.tenor} Bulan
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 bg-white text-[12px] text-black">
                          <td className="px-4 py-3 font-medium">
                            Tanggal Jatuh Tempo Akhir
                          </td>
                          <td className="px-4 py-3">07-04-2027</td>
                          <td className="px-4 py-3 font-semibold text-[#2563EB]">
                            {simulation.dueDate}
                          </td>
                        </tr>
                        <tr className="border-b border-slate-100 bg-slate-50/60 text-[12px] text-black">
                          <td className="px-4 py-3 font-medium">Alasan Perpanjangan</td>
                          <td className="px-4 py-3 text-slate-400">-</td>
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {reason}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <LoanExtensionPaymentSchedule rows={simulation.scheduleRows} />
              </div>
            )}
          </main>

          <footer className="flex items-center gap-[10px] border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => {
                if (step === 1) {
                  onOpenChange(false);
                  return;
                }

                setStep(1);
              }}
              className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
            >
              {step === 1 ? (
                <X className="h-4 w-4" strokeWidth={3} />
              ) : (
                <ChevronLeft className="h-4 w-4" strokeWidth={3} />
              )}
              {step === 1 ? "Batal" : "Kembali"}
            </button>

            {step === 2 ? (
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
              disabled={step === 1 && !isValid}
              onClick={step === 1 ? continueWizard : undefined}
              className={cn(
                "ml-auto inline-flex h-10 items-center justify-center rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
                step === 2
                  ? "min-w-[177px] gap-[8px] bg-[#28b800] hover:bg-[#239f00]"
                  : !isValid
                    ? "min-w-[145px] cursor-not-allowed gap-2 bg-slate-300 text-slate-500"
                    : "min-w-[145px] gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]",
              )}
            >
              {step === 2 ? "Simpan Perubahan" : "Lanjutkan"}
              {step === 2 ? (
                <Check className="h-5 w-5" strokeWidth={3.5} />
              ) : (
                <ChevronRight className="h-4 w-4" strokeWidth={3} />
              )}
            </button>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
}