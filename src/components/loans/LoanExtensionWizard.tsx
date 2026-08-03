"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";

type Step = 1 | 2 | 3;
type ExtensionMethod =
  | "Tenor Tambahan"
  | "Tenor Baru"
  | "Jatuh Tempo Akhir Baru";

type AccountDetail = {
  label: string;
  value: React.ReactNode;
};

type SimulationRow = {
  installmentNo: number;
  dueDate: string;
  principal: number;
  interest: number;
  installment: number;
  remainingPrincipal: number;
};

const OLD_TENOR = 12;
const OLD_DUE_DATE = "07-04-2027";
const REMAINING_PRINCIPAL = 10_553_571;
const MONTHLY_PRINCIPAL = 833_333;
const OLD_MONTHLY_INTEREST = 120_000;

const accountDetails: AccountDetail[] = [
  ["No. Rek. Pinjaman", "SMG260004"],
  ["Nama Anggota", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Billing"],
  ["Baki Debet", "10.553.571,00"],
  ["Sisa Tenor", "12 Bulan"],
  ["Tanggal Jatuh Tempo Akhir", OLD_DUE_DATE],
  ["Nominal Angsuran", "953.333,00"],
  ["Suku Bunga", "12,00% per tahun"],
  [
    "Status Pinjaman",
    <span className="inline-flex rounded-[5px] bg-[#31b900] px-3 py-1 text-[11px] font-extrabold leading-none text-white shadow-sm ring-1 ring-[#31b900]/30">
      Aktif / Sudah Dicairkan
    </span>,
  ],
];

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

function formatDmy(date: Date) {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  const originalDay = next.getDate();
  next.setMonth(next.getMonth() + months);

  if (next.getDate() !== originalDay) {
    next.setDate(0);
  }

  return next;
}

function AccountField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 text-[14px] font-extrabold leading-snug text-white">
        {value}
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const steps = ["Informasi & Perpanjangan", "Simulasi", "Simpan Perubahan"];

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

            {number < 3 ? (
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

function FormRow({
  label,
  children,
  align = "center",
}: {
  label: string;
  children: React.ReactNode;
  align?: "center" | "top";
}) {
  return (
    <div
      className={cn(
        "grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)]",
        align === "top" ? "sm:items-start" : "sm:items-center",
      )}
    >
      <Label
        className={cn(
          "text-[14px] font-normal text-[#002060]",
          align === "top" ? "pt-2" : "",
        )}
      >
        {label}
        <span className="text-rose-600"> *</span>
      </Label>
      {children}
    </div>
  );
}

function SimulationSummaryTable({
  method,
  oldTenor,
  newTenor,
  oldDueDate,
  newDueDate,
  oldInstallment,
  newInstallment,
  remainingPrincipal,
  oldFutureInterest,
  newFutureInterest,
}: {
  method: ExtensionMethod;
  oldTenor: number;
  newTenor: number;
  oldDueDate: string;
  newDueDate: string;
  oldInstallment: number;
  newInstallment: number;
  remainingPrincipal: number;
  oldFutureInterest: number;
  newFutureInterest: number;
}) {
  const rows = [
    {
      label: "Metode Perpanjangan",
      before: "-",
      after: method,
      isText: true,
    },
    {
      label: "Tenor",
      before: `${oldTenor} Bulan`,
      after: `${newTenor} Bulan`,
      isText: true,
    },
    {
      label: "Tanggal Jatuh Tempo Akhir",
      before: oldDueDate,
      after: newDueDate,
      isText: true,
    },
    {
      label: "Angsuran",
      before: formatIdr(oldInstallment),
      after: formatIdr(newInstallment),
    },
    {
      label: "Sisa Pokok",
      before: formatIdr(remainingPrincipal),
      after: formatIdr(remainingPrincipal),
    },
    {
      label: "Total Bunga Masa Depan",
      before: formatIdr(oldFutureInterest),
      after: formatIdr(newFutureInterest),
    },
  ];

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Ringkasan Perpanjangan Pinjaman
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[680px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[12px] font-bold uppercase tracking-wide text-black">
              <th className="w-[40%] px-4 py-3">Informasi</th>
              <th className="w-[30%] px-4 py-3">Sebelum Perpanjangan</th>
              <th className="w-[30%] px-4 py-3">Sesudah Perpanjangan</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={cn(
                  "border-b border-slate-100 text-[12px] text-black last:border-b-0",
                  index % 2 === 1 ? "bg-slate-50/60" : "bg-white",
                )}
              >
                <td className="px-4 py-3 font-normal">{row.label}</td>
                <td
                  className={cn(
                    "px-4 py-3 font-normal",
                    row.isText ? "" : "tabular-nums",
                  )}
                >
                  {row.before}
                </td>
                <td
                  className={cn(
                    "px-4 py-3 font-semibold text-[#2563EB]",
                    row.isText ? "" : "tabular-nums",
                  )}
                >
                  {row.after}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewPaymentScheduleTable({
  rows,
}: {
  rows: SimulationRow[];
}) {
  const pageSize = 6;
  const [page, setPage] = React.useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const start = (page - 1) * pageSize;
  const pagedRows = rows.slice(start, start + pageSize);

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Jadwal Pembayaran Baru
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[860px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
              <th className="w-[120px] px-4 py-3">Angsuran Ke</th>
              <th className="w-[150px] px-4 py-3">Jatuh Tempo</th>
              <th className="w-[160px] px-4 py-3 text-right">
                Angsuran Pokok
              </th>
              <th className="w-[160px] px-4 py-3 text-right">
                Angsuran Bunga
              </th>
              <th className="w-[180px] px-4 py-3 text-right">
                Total Angsuran
              </th>
              <th className="w-[180px] px-4 py-3 text-right">
                Sisa Pokok
              </th>
            </tr>
          </thead>

          <tbody>
            {pagedRows.map((row, index) => (
              <tr
                key={`${row.installmentNo}-${row.dueDate}`}
                className={cn(
                  "border-b border-slate-100 text-[12px] text-black last:border-b-0",
                  index % 2 === 1 ? "bg-slate-50/60" : "bg-white",
                )}
              >
                <td className="px-4 py-3 tabular-nums">{row.installmentNo}</td>
                <td className="px-4 py-3 tabular-nums">{row.dueDate}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatIdr(row.principal)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-[#2563EB]">
                  {formatIdr(row.interest)}
                </td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#2563EB]">
                  {formatIdr(row.installment)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatIdr(row.remainingPrincipal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-slate-600">
          Menampilkan {rows.length === 0 ? 0 : start + 1} sampai{" "}
          {Math.min(rows.length, start + pageSize)} dari {rows.length} jadwal
          pembayaran
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
  const [newDueMonth, setNewDueMonth] = React.useState("");
  const [newDueYear, setNewDueYear] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setMethod("");
    setAdditionalTenor("");
    setNewTenor("");
    setNewDueMonth("");
    setNewDueYear("");
    setEffectiveDate("");
    setReason("");
  }, [open]);

  const oldDueDate = React.useMemo(
    () => parseDmy(OLD_DUE_DATE) ?? new Date(2027, 3, 7),
    [],
  );

  const hasMethodValue =
    method === "Tenor Tambahan"
      ? Number.parseInt(additionalTenor, 10) > 0
      : method === "Tenor Baru"
        ? Number.parseInt(newTenor, 10) > 0
        : method === "Jatuh Tempo Akhir Baru"
          ? Number.parseInt(newDueMonth, 10) >= 1 &&
            Number.parseInt(newDueMonth, 10) <= 12 &&
            Number.parseInt(newDueYear, 10) >= 2027
          : false;

  const isValid =
    hasMethodValue &&
    effectiveDate.trim().length > 0 &&
    reason.trim().length > 0;

  const simulation = React.useMemo(() => {
    const extensionMonths =
      method === "Tenor Tambahan"
        ? Number.parseInt(additionalTenor, 10) || 0
        : method === "Tenor Baru"
          ? Math.max(0, (Number.parseInt(newTenor, 10) || 0) - OLD_TENOR)
          : method === "Jatuh Tempo Akhir Baru"
            ? Math.max(
                0,
                (Number.parseInt(newDueYear, 10) || oldDueDate.getFullYear()) *
                  12 +
                  ((Number.parseInt(newDueMonth, 10) || oldDueDate.getMonth() + 1) - 1) -
                  (oldDueDate.getFullYear() * 12 + oldDueDate.getMonth()),
              )
            : 0;

    const resolvedNewTenor =
      method === "Tenor Baru"
        ? Math.max(1, Number.parseInt(newTenor, 10) || OLD_TENOR)
        : OLD_TENOR + extensionMonths;

    const resolvedNewDueDate =
      method === "Jatuh Tempo Akhir Baru" &&
      Number.parseInt(newDueMonth, 10) >= 1 &&
      Number.parseInt(newDueYear, 10) >= 2027
        ? new Date(
            Number.parseInt(newDueYear, 10),
            Number.parseInt(newDueMonth, 10) - 1,
            oldDueDate.getDate(),
          )
        : addMonths(oldDueDate, extensionMonths);

    const oldFutureInterest = OLD_MONTHLY_INTEREST * OLD_TENOR;
    const oldInstallment = MONTHLY_PRINCIPAL + OLD_MONTHLY_INTEREST;
    const newMonthlyPrincipal = REMAINING_PRINCIPAL / resolvedNewTenor;
    const newInterestRateFactor =
      resolvedNewTenor > OLD_TENOR
        ? 1 + (resolvedNewTenor - OLD_TENOR) * 0.025
        : resolvedNewTenor < OLD_TENOR
          ? Math.max(0.7, 1 - (OLD_TENOR - resolvedNewTenor) * 0.025)
          : 1;
    const newMonthlyInterest = OLD_MONTHLY_INTEREST * newInterestRateFactor;
    const newInstallment = newMonthlyPrincipal + newMonthlyInterest;
    const newFutureInterest = newMonthlyInterest * resolvedNewTenor;

    const scheduleRows: SimulationRow[] = Array.from(
      { length: resolvedNewTenor },
      (_, index) => {
        const principal = Math.min(
          newMonthlyPrincipal,
          Math.max(0, REMAINING_PRINCIPAL - newMonthlyPrincipal * index),
        );
        const remainingPrincipal = Math.max(
          0,
          REMAINING_PRINCIPAL - newMonthlyPrincipal * (index + 1),
        );

        return {
          installmentNo: index + 1,
          dueDate: formatDmy(addMonths(new Date(2026, 7, 7), index)),
          principal,
          interest: newMonthlyInterest,
          installment: principal + newMonthlyInterest,
          remainingPrincipal,
        };
      },
    );

    return {
      newTenor: resolvedNewTenor,
      newDueDate: formatDmy(resolvedNewDueDate),
      oldInstallment,
      newInstallment,
      oldFutureInterest,
      newFutureInterest,
      scheduleRows,
    };
  }, [additionalTenor, method, newDueMonth, newDueYear, newTenor, oldDueDate]);

  function nextStep() {
    if (step === 1) {
      if (!isValid) {
        toast("Data perpanjangan belum lengkap", {
          description:
            "Lengkapi metode, nilai perpanjangan, tanggal efektif, dan alasan perpanjangan.",
        });
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    toast.success("Perpanjangan pinjaman tersimpan", {
      description: `${accountNo} diperpanjang dengan metode ${method}.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-loan-extension-wizard="true"
        className="w-[calc(100vw-1rem)] max-w-[1040px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl sm:w-[1040px] [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden"
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
              <div className="rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm">
                <div className="text-[14px] font-extrabold tracking-wide">
                  INFORMASI REKENING PINJAMAN
                </div>
                <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {accountDetails.map((field) => (
                    <AccountField
                      key={field.label}
                      label={field.label}
                      value={
                        field.label === "No. Rek. Pinjaman"
                          ? accountNo
                          : field.value
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  DATA PERPANJANGAN PINJAMAN
                </div>

                <div className="grid gap-5 p-5">
                  <FormRow label="Metode Perpanjangan">
                    <Select
                      value={method}
                      onValueChange={(value) =>
                        setMethod(value as ExtensionMethod)
                      }
                    >
                      <SelectTrigger className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0">
                        <SelectValue placeholder="Pilih Metode Perpanjangan" />
                      </SelectTrigger>
                      <SelectContent className="rounded-[5px] border-slate-200">
                        <SelectItem value="Tenor Tambahan">
                          Tenor Tambahan
                        </SelectItem>
                        <SelectItem value="Tenor Baru">Tenor Baru</SelectItem>
                        <SelectItem value="Jatuh Tempo Akhir Baru">
                          Jatuh Tempo Akhir Baru
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormRow>

                  {method === "Tenor Tambahan" ? (
                    <FormRow label="Tenor Tambahan (Bulan)">
                      <Input
                        value={additionalTenor}
                        onChange={(event) =>
                          setAdditionalTenor(
                            event.target.value.replace(/[^\d]/g, ""),
                          )
                        }
                        className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        inputMode="numeric"
                        placeholder="Masukkan tenor tambahan"
                      />
                    </FormRow>
                  ) : null}

                  {method === "Tenor Baru" ? (
                    <FormRow label="Tenor Baru (Bulan)">
                      <Input
                        value={newTenor}
                        onChange={(event) =>
                          setNewTenor(
                            event.target.value.replace(/[^\d]/g, ""),
                          )
                        }
                        className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        inputMode="numeric"
                        placeholder="Masukkan tenor baru"
                      />
                    </FormRow>
                  ) : null}

                  {method === "Jatuh Tempo Akhir Baru" ? (
                    <FormRow label="Jatuh Tempo Akhir Baru">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          value={newDueMonth}
                          onChange={(event) =>
                            setNewDueMonth(
                              event.target.value
                                .replace(/[^\d]/g, "")
                                .slice(0, 2),
                            )
                          }
                          className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                          inputMode="numeric"
                          placeholder="Bulan (01-12)"
                        />
                        <Input
                          value={newDueYear}
                          onChange={(event) =>
                            setNewDueYear(
                              event.target.value
                                .replace(/[^\d]/g, "")
                                .slice(0, 4),
                            )
                          }
                          className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                          inputMode="numeric"
                          placeholder="Tahun"
                        />
                      </div>
                    </FormRow>
                  ) : null}

                  <FormRow label="Tanggal Efektif">
                    <DatePickerDmyField
                      value={effectiveDate}
                      onChange={setEffectiveDate}
                      inputClassName="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      placeholder="DD-MM-YYYY"
                    />
                  </FormRow>

                  <FormRow label="Alasan Perpanjangan" align="top">
                    <Textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      className="min-h-[112px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      placeholder="Masukkan alasan perpanjangan pinjaman"
                    />
                  </FormRow>
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-6">
              <SimulationSummaryTable
                method={method as ExtensionMethod}
                oldTenor={OLD_TENOR}
                newTenor={simulation.newTenor}
                oldDueDate={OLD_DUE_DATE}
                newDueDate={simulation.newDueDate}
                oldInstallment={simulation.oldInstallment}
                newInstallment={simulation.newInstallment}
                remainingPrincipal={REMAINING_PRINCIPAL}
                oldFutureInterest={simulation.oldFutureInterest}
                newFutureInterest={simulation.newFutureInterest}
              />

              <NewPaymentScheduleTable rows={simulation.scheduleRows} />

              <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  Alasan Perpanjangan
                </div>
                <p className="px-4 py-4 text-[14px] leading-relaxed text-black">
                  {reason}
                </p>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-5">
              <div>
                <h3 className="text-[14px] font-bold uppercase tracking-wide text-black">
                  Simpan Perpanjangan Pinjaman
                </h3>
                <p className="mt-2 text-[13px] text-slate-600">
                  Periksa kembali informasi perpanjangan sebelum menyimpan.
                </p>
              </div>

              <div className="rounded-[12px] border border-slate-200 bg-[#F9FAFF] p-5">
                <div className="grid gap-4 text-[14px]">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Rekening Pinjaman</span>
                    <span className="font-extrabold text-slate-900">
                      {accountNo}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Metode Perpanjangan</span>
                    <span className="font-extrabold text-[#2563EB]">
                      {method}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Tenor Baru</span>
                    <span className="font-extrabold text-[#2563EB]">
                      {simulation.newTenor} Bulan
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Tanggal Efektif</span>
                    <span className="font-extrabold text-slate-900">
                      {effectiveDate}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">
                      Jatuh Tempo Akhir Baru
                    </span>
                    <span className="font-extrabold text-[#2563EB]">
                      {simulation.newDueDate}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-4 text-slate-600">
                    Alasan:{" "}
                    <span className="font-semibold text-slate-900">
                      {reason}
                    </span>
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
              step === 1
                ? onOpenChange(false)
                : setStep((current) => (current - 1) as Step)
            }
            className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
          >
            {step === 1 ? (
              <X className="h-4 w-4" strokeWidth={3} />
            ) : (
              <ChevronLeft className="h-4 w-4" strokeWidth={3} />
            )}
            {step === 1 ? "Batal" : "Kembali"}
          </button>

          <button
            type="button"
            disabled={step === 1 && !isValid}
            onClick={nextStep}
            className={cn(
              "ml-auto inline-flex h-10 min-w-[150px] items-center justify-center gap-2 rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
              step === 3
                ? "bg-[#2fb300] hover:bg-[#279800]"
                : step === 1 && !isValid
                  ? "cursor-not-allowed bg-slate-300 text-slate-500"
                  : "bg-[#2563EB] hover:bg-[#1D4ED8]",
            )}
          >
            {step === 3 ? "Simpan Perpanjangan" : "Lanjutkan"}
            {step === 3 ? (
              <Check className="h-4 w-4" strokeWidth={3} />
            ) : (
              <ChevronRight className="h-4 w-4" strokeWidth={3} />
            )}
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}