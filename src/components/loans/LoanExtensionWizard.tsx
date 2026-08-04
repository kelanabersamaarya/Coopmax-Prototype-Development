"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import LoanExtensionHistoryDialog from "@/components/loans/LoanExtensionHistoryDialog";
import LoanExtensionPaymentSchedule from "@/components/loans/LoanExtensionPaymentSchedule";
import { addLoanExtensionHistory } from "@/lib/loanExtensionHistoryStore";

type Step = 1 | 2;
type ExtensionMethod =
  | "Tenor Tambahan"
  | "Tenor Baru"
  | "Jatuh Tempo Akhir Baru";

const CURRENT_TENOR = 12;
const CURRENT_DUE_DATE = new Date(2027, 3, 7);
const REMAINING_PRINCIPAL = 10_553_571;
const MONTHLY_INTEREST = 120_000;

const methods: ExtensionMethod[] = [
  "Tenor Tambahan",
  "Tenor Baru",
  "Jatuh Tempo Akhir Baru",
];

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

function formatDmy(date: Date) {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function addMonths(date: Date, amount: number) {
  const result = new Date(date);
  const day = result.getDate();
  result.setMonth(result.getMonth() + amount);

  if (result.getDate() !== day) result.setDate(0);

  return result;
}

function AccountField({ label, value }: { label: string; value: string }) {
  const isStatus = label === "Status Pinjaman";

  return (
    <div className="loan-extension-account-field min-w-0">
      <div className="text-[12px] font-semibold text-white/85">{label}</div>
      <div className="mt-1.5 text-[14px] font-extrabold leading-snug text-white">
        {isStatus ? (
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
  required = true,
}: {
  label: string;
  children: React.ReactNode;
  top?: boolean;
  required?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)]",
        top ? "sm:items-start" : "sm:items-center",
      )}
    >
      <label className={cn("text-[14px] font-normal text-[#002060]", top && "pt-2")}>
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

function ReadOnlyRow({
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

function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onCancel() : null)}>
      <DialogContent
        data-loan-extension-confirm-dialog="true"
        className={cn(
          "h-[300px] w-[calc(100vw-1.5rem)] max-w-[580px] overflow-hidden",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col items-center px-8 pb-[18px] pt-[26px] text-center">
          <div className="grid h-[74px] w-[74px] place-items-center rounded-full border-[3px] border-[#f7c8a6]">
            <span className="text-[42px] font-light leading-none text-[#f2b98f]">!</span>
          </div>

          <h2 className="mt-[16px] text-[23px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#3b4863]">
            Yakin untuk melakukan perubahan?
          </h2>

          <div className="mt-[18px] flex items-center justify-center gap-[9px]">
            <button
              type="button"
              onClick={onConfirm}
              className="h-[42px] w-[100px] rounded-[5px] bg-[#3380e8] text-[14px] font-semibold text-white transition hover:bg-[#266ed0]"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="h-[42px] w-[118px] rounded-[5px] bg-[#a6a6a6] text-[14px] font-semibold text-white transition hover:bg-[#969696]"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SuccessDialog({
  open,
  onOk,
}: {
  open: boolean;
  onOk: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onOk() : null)}>
      <DialogContent
        className={cn(
          "h-[330px] w-[calc(100vw-2rem)] max-w-[580px] overflow-hidden",
          "rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
          <div className="flex h-[102px] w-[102px] items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
            <Check className="h-[58px] w-[58px] text-[#33aa00]" strokeWidth={3} />
          </div>

          <h2 className="mt-7 text-[21px] font-semibold leading-tight tracking-tight text-slate-900">
            Berhasil Melakukan Perpanjangan Pinjaman
          </h2>

          <button
            type="button"
            onClick={onOk}
            className="mt-8 h-[68px] w-[214px] rounded-[10px] bg-[#2f80ed] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/30 transition hover:bg-[#266ed0]"
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
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
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

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
    setConfirmOpen(false);
    setSuccessOpen(false);
  }, [open]);

  const dueMonthIndex = months.indexOf(dueMonth);
  const dueYearNumber = Number.parseInt(dueYear, 10);
  const additionalTenorValue = Number.parseInt(additionalTenor, 10) || 0;
  const totalTenorValue =
    additionalTenorValue > 0 ? CURRENT_TENOR + additionalTenorValue : 0;

  const hasExtensionValue =
    method === "Tenor Tambahan"
      ? additionalTenorValue > 0
      : method === "Tenor Baru"
        ? Number.parseInt(newTenor, 10) > 0
        : method === "Jatuh Tempo Akhir Baru"
          ? dueMonthIndex >= 0 && Number.isFinite(dueYearNumber)
          : false;

  const isValid =
    Boolean(method) &&
    hasExtensionValue &&
    Boolean(effectiveDate.trim()) &&
    Boolean(reason.trim());

  const simulation = React.useMemo(() => {
    let tenor = CURRENT_TENOR;
    let dueDate = CURRENT_DUE_DATE;

    if (method === "Tenor Tambahan") {
      tenor = CURRENT_TENOR + additionalTenorValue;
      dueDate = addMonths(CURRENT_DUE_DATE, additionalTenorValue);
    }

    if (method === "Tenor Baru") {
      tenor = Math.max(1, Number.parseInt(newTenor, 10) || CURRENT_TENOR);
      dueDate = addMonths(CURRENT_DUE_DATE, tenor - CURRENT_TENOR);
    }

    if (
      method === "Jatuh Tempo Akhir Baru" &&
      dueMonthIndex >= 0 &&
      Number.isFinite(dueYearNumber)
    ) {
      dueDate = new Date(dueYearNumber, dueMonthIndex, CURRENT_DUE_DATE.getDate());

      if (dueDate.getMonth() !== dueMonthIndex) dueDate.setDate(0);

      const monthDifference =
        (dueDate.getFullYear() - CURRENT_DUE_DATE.getFullYear()) * 12 +
        dueDate.getMonth() -
        CURRENT_DUE_DATE.getMonth();

      tenor = Math.max(1, CURRENT_TENOR + monthDifference);
    }

    const monthlyPrincipal = REMAINING_PRINCIPAL / tenor;
    const monthlyInterest = MONTHLY_INTEREST * (CURRENT_TENOR / tenor);

    const rows = Array.from({ length: tenor }, (_, index) => {
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
      rows,
    };
  }, [additionalTenorValue, dueMonthIndex, dueYearNumber, method, newTenor]);

  function selectMethod(nextMethod: ExtensionMethod) {
    setMethod(nextMethod);
    setAdditionalTenor("");
    setNewTenor("");
    setDueMonth("");
    setDueYear("");
  }

  function saveExtension() {
    addLoanExtensionHistory(accountNo, {
      method,
      effectiveDate,
      previousTenor: `${CURRENT_TENOR} Bulan`,
      newTenor: `${simulation.tenor} Bulan`,
    });

    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  return (
    <>
      <LoanExtensionHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        accountNo={accountNo}
      />

      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={saveExtension}
      />

      <SuccessDialog
        open={successOpen}
        onOk={() => {
          setSuccessOpen(false);
          onOpenChange(false);
        }}
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
                      <div className="flex min-h-[31px] flex-wrap items-center gap-x-6 gap-y-3">
                        {methods.map((option) => (
                          <label
                            key={option}
                            className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-normal text-slate-900"
                          >
                            <input
                              type="radio"
                              name="loan-extension-method"
                              checked={method === option}
                              onChange={() => selectMethod(option)}
                              className="h-4 w-4 accent-[#2563EB]"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </FieldRow>

                    {method === "Tenor Tambahan" ? (
                      <>
                        <ReadOnlyRow label="Tenor Saat Ini (Bulan)">
                          <Input
                            value={String(CURRENT_TENOR)}
                            readOnly
                            className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                          />
                        </ReadOnlyRow>

                        <FieldRow label="Tenor Tambahan (Bulan)">
                          <Input
                            value={additionalTenor}
                            onChange={(event) =>
                              setAdditionalTenor(event.target.value.replace(/[^\d]/g, ""))
                            }
                            inputMode="numeric"
                            placeholder="Masukkan tenor tambahan"
                            className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                          />
                        </FieldRow>

                        <ReadOnlyRow label="Total Tenor Baru (Bulan)">
                          <Input
                            value={String(totalTenorValue)}
                            readOnly
                            className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                          />
                        </ReadOnlyRow>
                      </>
                    ) : null}

                    {method === "Tenor Baru" ? (
                      <FieldRow label="Tenor Baru (Bulan)">
                        <Input
                          value={newTenor}
                          onChange={(event) =>
                            setNewTenor(event.target.value.replace(/[^\d]/g, ""))
                          }
                          inputMode="numeric"
                          placeholder="Masukkan tenor baru"
                          className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        />
                      </FieldRow>
                    ) : null}

                    {method === "Jatuh Tempo Akhir Baru" ? (
                      <>
                        <ReadOnlyRow label="Jatuh Tempo Saat Ini">
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              value="April"
                              readOnly
                              className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                            />
                            <Input
                              value="2027"
                              readOnly
                              className="h-[31px] cursor-not-allowed rounded-[5px] border-[#CBD5E1] bg-slate-200/80 text-[14px] text-slate-700 shadow-none"
                            />
                          </div>
                        </ReadOnlyRow>

                        <FieldRow label="Jatuh Tempo Akhir Baru">
                          <div className="grid grid-cols-2 gap-3">
                            <select
                              value={dueMonth}
                              onChange={(event) => setDueMonth(event.target.value)}
                              className="h-[31px] w-full rounded-[5px] border border-[#CBD5E1] bg-white px-3 text-[14px] text-slate-900 outline-none"
                            >
                              <option value="">Pilih Bulan</option>
                              {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                              ))}
                            </select>
                            <select
                              value={dueYear}
                              onChange={(event) => setDueYear(event.target.value)}
                              className="h-[31px] w-full rounded-[5px] border border-[#CBD5E1] bg-white px-3 text-[14px] text-slate-900 outline-none"
                            >
                              <option value="">Pilih Tahun</option>
                              {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
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
                        {[
                          ["Metode Perpanjangan", "-", method],
                          ["Tanggal Efektif", "-", effectiveDate],
                          ["Tenor", `${CURRENT_TENOR} Bulan`, `${simulation.tenor} Bulan`],
                          ["Tanggal Jatuh Tempo Akhir", "07-04-2027", simulation.dueDate],
                          ["Alasan Perpanjangan", "-", reason],
                        ].map(([label, before, after], index) => (
                          <tr
                            key={label}
                            className={cn(
                              "border-b border-slate-100 text-[12px] text-black",
                              index % 2 ? "bg-slate-50/60" : "bg-white",
                            )}
                          >
                            <td className="px-4 py-3 font-medium">{label}</td>
                            <td className="px-4 py-3">{before}</td>
                            <td className="px-4 py-3 font-semibold text-[#2563EB]">{after}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <LoanExtensionPaymentSchedule rows={simulation.rows} />
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
              {step === 1 ? <X className="h-4 w-4" strokeWidth={3} /> : <ChevronLeft className="h-4 w-4" strokeWidth={3} />}
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
              onClick={() => {
                if (step === 1) {
                  setStep(2);
                  return;
                }
                setConfirmOpen(true);
              }}
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
              {step === 2 ? <Check className="h-5 w-5" strokeWidth={3.5} /> : <ChevronRight className="h-4 w-4" strokeWidth={3} />}
            </button>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
}