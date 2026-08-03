"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";

type Step = 1 | 2 | 3;
type ExtensionMethod =
  | "Tenor Tambahan"
  | "Tenor Baru"
  | "Jatuh Tempo Akhir Baru";

type ScheduleRow = {
  dueDate: string;
  total: number;
  principal: number;
  interest: number;
  remainingPrincipal: number;
  remainingInterest: number;
  penalty: number;
};

const OLD_TENOR = 12;
const REMAINING_PRINCIPAL = 10_553_571;
const MONTHLY_INTEREST = 120_000;
const OLD_DUE_DATE = "07-04-2027";
const SCHEDULE_PAGE_SIZE = 15;

const accountDetails = [
  ["Nomor Rekening Pinjaman", "SMG260004"],
  ["Nama Anggota / Debitur", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Billing"],
  ["Status Pinjaman", "Aktif / Sudah Dicairkan"],
  ["Baki Debet Pokok", "10.553.571,00"],
  ["Tunggakan Pokok", "0,00"],
  ["Tunggakan Bunga", "125.000,00"],
  ["Denda dan Biaya Lainnya", "0,00"],
  ["Total Kewajiban", "10.678.571,00"],
] as const;

function formatIdr(value: number) {
  return Math.max(0, Math.round(value))
    .toLocaleString("id-ID")
    .replace(/,/g, ".");
}

function parseDmy(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!match) return null;

  const date = new Date(
    Number(match[3]),
    Number(match[2]) - 1,
    Number(match[1]),
  );

  return date.getDate() === Number(match[1]) ? date : null;
}

function formatDmy(date: Date) {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  const originalDay = result.getDate();

  result.setMonth(result.getMonth() + months);

  if (result.getDate() !== originalDay) {
    result.setDate(0);
  }

  return result;
}

function AccountField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="loan-extension-account-field min-w-0">
      <div className="text-[12px] font-semibold text-white/85">{label}</div>
      <div className="mt-1.5 text-[14px] font-extrabold leading-snug text-white">
        {value}
      </div>
    </div>
  );
}

function FormRow({
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
      <label className={cn("text-[14px] font-normal text-[#002060]", top && "pt-2")}>
        {label} <span className="text-rose-600">*</span>
      </label>
      {children}
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

function PaymentScheduleTable({ rows }: { rows: ScheduleRow[] }) {
  const [page, setPage] = React.useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / SCHEDULE_PAGE_SIZE));
  const start = (page - 1) * SCHEDULE_PAGE_SIZE;
  const pagedRows = rows.slice(start, start + SCHEDULE_PAGE_SIZE);

  React.useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const showingStart = rows.length === 0 ? 0 : start + 1;
  const showingEnd = Math.min(rows.length, start + SCHEDULE_PAGE_SIZE);

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Jadwal Pembayaran Baru
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[1080px] border-collapse text-[13px]">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[10.5px] font-extrabold uppercase tracking-wide text-slate-700">
              <th className="w-[72px] px-3 py-3">Angsuran<br />Ke</th>
              <th className="w-[96px] px-3 py-3">Jatuh<br />Tempo</th>
              <th className="w-[120px] px-3 py-3 text-right">Total Tagihan<br />Belum Dibayar</th>
              <th className="w-[145px] px-3 py-3 text-right">Tagihan<br />Pokok</th>
              <th className="w-[145px] px-3 py-3 text-right">Tagihan<br />Bunga</th>
              <th className="w-[165px] px-3 py-3 text-right">Sisa Tagihan<br />Pokok</th>
              <th className="w-[165px] px-3 py-3 text-right">Sisa Tagihan<br />Bunga</th>
              <th className="w-[145px] px-3 py-3 text-right">Tagihan<br />Denda</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row, index) => (
              <tr
                key={row.dueDate}
                className={cn(
                  "border-b border-slate-100 text-[13px] text-slate-900 last:border-b-0",
                  index % 2 === 1 ? "bg-slate-50/60" : "bg-white",
                )}
              >
                <td className="px-3 py-3 text-center tabular-nums">{start + index + 1}</td>
                <td className="px-3 py-3 font-semibold tabular-nums whitespace-nowrap">{row.dueDate}</td>
                <td className="px-3 py-3 text-right tabular-nums">{formatIdr(row.total)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{formatIdr(row.principal)}</td>
                <td className="px-3 py-3 text-right tabular-nums text-[#2563EB]">{formatIdr(row.interest)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{formatIdr(row.remainingPrincipal)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{formatIdr(row.remainingInterest)}</td>
                <td className="px-3 py-3 text-right tabular-nums">{formatIdr(row.penalty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-slate-600">
          Menampilkan {showingStart} sampai {showingEnd} dari {rows.length} jadwal pembayaran
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="inline-flex h-9 items-center gap-1 rounded-[5px] bg-slate-100 px-3 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
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
            className="inline-flex h-9 items-center gap-1 rounded-[5px] bg-slate-100 px-3 text-[12px] font-semibold text-slate-600 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
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
  const [dueMonth, setDueMonth] = React.useState("");
  const [dueYear, setDueYear] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [reason, setReason] = React.useState("");

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
  }, [open]);

  const oldDueDate = React.useMemo(
    () => parseDmy(OLD_DUE_DATE) ?? new Date(2027, 3, 7),
    [],
  );

  const parsedDueMonth = Number.parseInt(dueMonth, 10);
  const parsedDueYear = Number.parseInt(dueYear, 10);

  const hasMethodValue =
    method === "Tenor Tambahan"
      ? Number.parseInt(additionalTenor, 10) > 0
      : method === "Tenor Baru"
        ? Number.parseInt(newTenor, 10) > 0
        : method === "Jatuh Tempo Akhir Baru"
          ? parsedDueMonth >= 1 && parsedDueMonth <= 12 && parsedDueYear >= oldDueDate.getFullYear()
          : false;

  const isValid =
    hasMethodValue &&
    effectiveDate.trim().length > 0 &&
    reason.trim().length > 0;

  const simulation = React.useMemo(() => {
    let tenor = OLD_TENOR;
    let dueDate = oldDueDate;

    if (method === "Tenor Tambahan") {
      const addedMonths = Number.parseInt(additionalTenor, 10) || 0;
      tenor = OLD_TENOR + addedMonths;
      dueDate = addMonths(oldDueDate, addedMonths);
    }

    if (method === "Tenor Baru") {
      tenor = Math.max(1, Number.parseInt(newTenor, 10) || OLD_TENOR);
      dueDate = addMonths(oldDueDate, Math.max(0, tenor - OLD_TENOR));
    }

    if (
      method === "Jatuh Tempo Akhir Baru" &&
      parsedDueMonth >= 1 &&
      parsedDueMonth <= 12 &&
      parsedDueYear >= oldDueDate.getFullYear()
    ) {
      dueDate = new Date(parsedDueYear, parsedDueMonth - 1, oldDueDate.getDate());

      if (dueDate.getMonth() !== parsedDueMonth - 1) {
        dueDate.setDate(0);
      }

      const monthDifference =
        (dueDate.getFullYear() - oldDueDate.getFullYear()) * 12 +
        dueDate.getMonth() -
        oldDueDate.getMonth();

      tenor = Math.max(1, OLD_TENOR + monthDifference);
    }

    const monthlyPrincipal = REMAINING_PRINCIPAL / tenor;
    const interestFactor =
      tenor > OLD_TENOR
        ? 1 + (tenor - OLD_TENOR) * 0.025
        : tenor < OLD_TENOR
          ? Math.max(0.7, 1 - (OLD_TENOR - tenor) * 0.025)
          : 1;
    const monthlyNewInterest = MONTHLY_INTEREST * interestFactor;

    const scheduleRows: ScheduleRow[] = Array.from({ length: tenor }, (_, index) => {
      const principal = Math.min(
        monthlyPrincipal,
        Math.max(0, REMAINING_PRINCIPAL - monthlyPrincipal * index),
      );
      const remainingPrincipal = Math.max(
        0,
        REMAINING_PRINCIPAL - monthlyPrincipal * (index + 1),
      );
      const penalty = index < 3 ? 75_000 : 0;

      return {
        dueDate: formatDmy(addMonths(new Date(2026, 7, 7), index)),
        total: principal + monthlyNewInterest + penalty,
        principal,
        interest: monthlyNewInterest,
        remainingPrincipal,
        remainingInterest: remainingPrincipal * 0.01,
        penalty,
      };
    });

    return {
      tenor,
      dueDate: formatDmy(dueDate),
      oldInstallment: REMAINING_PRINCIPAL / OLD_TENOR + MONTHLY_INTEREST,
      newInstallment: monthlyPrincipal + monthlyNewInterest,
      oldInterest: MONTHLY_INTEREST * OLD_TENOR,
      newInterest: monthlyNewInterest * tenor,
      scheduleRows,
    };
  }, [
    additionalTenor,
    method,
    newTenor,
    oldDueDate,
    parsedDueMonth,
    parsedDueYear,
  ]);

  function continueWizard() {
    if (step === 1 && !isValid) {
      toast("Data perpanjangan belum lengkap", {
        description:
          "Lengkapi metode, nilai perpanjangan, tanggal efektif, dan alasan perpanjangan.",
      });
      return;
    }

    if (step < 3) {
      setStep((current) => (current + 1) as Step);
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
              <section className="loan-extension-account-info rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm">
                <div className="text-[14px] font-extrabold tracking-wide text-white">
                  INFORMASI REKENING PINJAMAN
                </div>

                <div className="loan-extension-account-grid mt-7 grid gap-x-8 gap-y-6">
                  {accountDetails.map(([label, value]) => (
                    <AccountField
                      key={label}
                      label={label}
                      value={
                        label === "Nomor Rekening Pinjaman" ? accountNo : value
                      }
                    />
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  Data Perpanjangan Pinjaman
                </div>

                <div className="grid gap-5 p-5">
                  <FormRow label="Metode Perpanjangan">
                    <Select
                      value={method}
                      onValueChange={(value) => {
                        setMethod(value as ExtensionMethod);
                        setAdditionalTenor("");
                        setNewTenor("");
                        setDueMonth("");
                        setDueYear("");
                      }}
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
                        inputMode="numeric"
                        placeholder="Masukkan tenor tambahan"
                        className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
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
                        inputMode="numeric"
                        placeholder="Masukkan tenor baru"
                        className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      />
                    </FormRow>
                  ) : null}

                  {method === "Jatuh Tempo Akhir Baru" ? (
                    <FormRow label="Jatuh Tempo Akhir Baru">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          value={dueMonth}
                          onChange={(event) =>
                            setDueMonth(
                              event.target.value.replace(/[^\d]/g, "").slice(0, 2),
                            )
                          }
                          inputMode="numeric"
                          placeholder="Bulan (01-12)"
                          className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        />
                        <Input
                          value={dueYear}
                          onChange={(event) =>
                            setDueYear(
                              event.target.value.replace(/[^\d]/g, "").slice(0, 4),
                            )
                          }
                          inputMode="numeric"
                          placeholder="Tahun"
                          className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
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

                  <FormRow label="Alasan Perpanjangan" top>
                    <Textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      className="min-h-[112px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      placeholder="Masukkan alasan perpanjangan pinjaman"
                    />
                  </FormRow>
                </div>
              </section>
            </div>
          ) : null}

          {step === 2 ? (
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
                        ["Tenor", `${OLD_TENOR} Bulan`, `${simulation.tenor} Bulan`],
                        ["Tanggal Jatuh Tempo Akhir", OLD_DUE_DATE, simulation.dueDate],
                        ["Angsuran", formatIdr(simulation.oldInstallment), formatIdr(simulation.newInstallment)],
                        ["Total Bunga Masa Depan", formatIdr(simulation.oldInterest), formatIdr(simulation.newInterest)],
                      ].map(([label, before, after], index) => (
                        <tr
                          key={label}
                          className={cn(
                            "border-b border-slate-100 text-[12px] text-black last:border-b-0",
                            index % 2 ? "bg-slate-50/60" : "bg-white",
                          )}
                        >
                          <td className="px-4 py-3">{label}</td>
                          <td className="px-4 py-3 tabular-nums">{before}</td>
                          <td className="px-4 py-3 font-semibold tabular-nums text-[#2563EB]">
                            {after}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  Alasan Perpanjangan
                </div>
                <p className="px-4 py-4 text-[14px] leading-relaxed text-black">
                  {reason}
                </p>
              </section>

              <PaymentScheduleTable rows={simulation.scheduleRows} />
            </div>
          ) : null}

          {step === 3 ? (
            <section className="rounded-[12px] border border-slate-200 bg-[#F9FAFF] p-5">
              <h3 className="text-[14px] font-bold uppercase tracking-wide text-black">
                Simpan Perpanjangan Pinjaman
              </h3>

              <div className="mt-5 grid gap-4 text-[14px]">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">Rekening Pinjaman</span>
                  <span className="font-extrabold text-slate-900">{accountNo}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">Metode Perpanjangan</span>
                  <span className="font-extrabold text-[#2563EB]">{method}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">Tenor Baru</span>
                  <span className="font-extrabold text-[#2563EB]">
                    {simulation.tenor} Bulan
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">Tanggal Efektif</span>
                  <span className="font-extrabold text-slate-900">{effectiveDate}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-600">Jatuh Tempo Akhir Baru</span>
                  <span className="font-extrabold text-[#2563EB]">{simulation.dueDate}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 text-slate-600">
                  Alasan: <span className="font-semibold text-slate-900">{reason}</span>
                </div>
              </div>
            </section>
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
            onClick={continueWizard}
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