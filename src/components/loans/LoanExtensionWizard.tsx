"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import LoanExtensionMethodSummarySection from "@/components/loans/LoanExtensionMethodSummarySection";

type Step = 1 | 2 | 3;
type ExtensionMethod = "Tenor Tambahan" | "Tenor Baru" | "Jatuh Tempo Akhir Baru";

const OLD_TENOR = 12;
const REMAINING_PRINCIPAL = 10_553_571;
const MONTHLY_INTEREST = 120_000;
const OLD_DUE_DATE = "07-04-2027";

const accountDetails = [
  ["No. Rek. Pinjaman", "SMG260004"],
  ["Nama Anggota", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Billing"],
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
  return Math.max(0, Math.round(value)).toLocaleString("id-ID").replace(/,/g, ".");
}

function parseDmy(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!match) return null;

  const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
  return date.getDate() === Number(match[1]) ? date : null;
}

function formatDmy(date: Date) {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  const currentDay = result.getDate();
  result.setMonth(result.getMonth() + months);

  if (result.getDate() !== currentDay) result.setDate(0);
  return result;
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
      <label className={cn("text-[14px] font-normal text-[#002060]", top && "pt-2")}>
        {label} <span className="text-rose-600">*</span>
      </label>
      {children}
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
      <DialogContent className="h-[365px] w-[calc(100vw-1.5rem)] max-w-[580px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl [&>button[aria-label=Close]]:hidden">
        <div className="flex h-full flex-col items-center px-8 pb-[22px] pt-[42px] text-center">
          <div className="grid h-[102px] w-[102px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[58px] font-light leading-none text-[#f2b98f]">!</span>
          </div>
          <h2 className="mt-[32px] text-[30px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#3b4863]">
            Yakin untuk melakukan perubahan?
          </h2>
          <div className="mt-[34px] flex items-center justify-center gap-[9px]">
            <button
              type="button"
              onClick={onConfirm}
              className="h-[53px] w-[114px] rounded-[5px] bg-[#3380e8] text-[16px] font-semibold text-white transition hover:bg-[#266ed0]"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="h-[53px] w-[138px] rounded-[5px] bg-[#a6a6a6] text-[16px] font-semibold text-white transition hover:bg-[#969696]"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SuccessDialog({ open, onOk }: { open: boolean; onOk: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onOk() : null)}>
      <DialogContent className="h-[330px] w-[calc(100vw-2rem)] max-w-[580px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl [&>button[aria-label=Close]]:hidden">
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
    setConfirmOpen(false);
    setSuccessOpen(false);
  }, [open]);

  const oldDueDate = React.useMemo(
    () => parseDmy(OLD_DUE_DATE) ?? new Date(2027, 3, 7),
    [],
  );

  const dueMonthNumber = Number.parseInt(dueMonth, 10);
  const dueYearNumber = Number.parseInt(dueYear, 10);

  const hasMethodValue =
    method === "Tenor Tambahan"
      ? Number.parseInt(additionalTenor, 10) > 0
      : method === "Tenor Baru"
        ? Number.parseInt(newTenor, 10) > 0
        : method === "Jatuh Tempo Akhir Baru"
          ? dueMonthNumber >= 1 &&
            dueMonthNumber <= 12 &&
            dueYearNumber >= oldDueDate.getFullYear()
          : false;

  const validEffectiveDate = parseDmy(effectiveDate);
  const isValid =
    hasMethodValue && validEffectiveDate !== null && reason.trim().length > 0;

  const simulation = React.useMemo(() => {
    let tenor = OLD_TENOR;
    let dueDate = oldDueDate;

    if (method === "Tenor Tambahan") {
      const extraMonths = Number.parseInt(additionalTenor, 10) || 0;
      tenor = OLD_TENOR + extraMonths;
      dueDate = addMonths(oldDueDate, extraMonths);
    }

    if (method === "Tenor Baru") {
      tenor = Math.max(1, Number.parseInt(newTenor, 10) || OLD_TENOR);
      dueDate = addMonths(oldDueDate, Math.max(0, tenor - OLD_TENOR));
    }

    if (
      method === "Jatuh Tempo Akhir Baru" &&
      dueMonthNumber >= 1 &&
      dueMonthNumber <= 12 &&
      dueYearNumber >= oldDueDate.getFullYear()
    ) {
      dueDate = new Date(dueYearNumber, dueMonthNumber - 1, oldDueDate.getDate());
      if (dueDate.getMonth() !== dueMonthNumber - 1) dueDate.setDate(0);

      const difference =
        (dueDate.getFullYear() - oldDueDate.getFullYear()) * 12 +
        dueDate.getMonth() -
        oldDueDate.getMonth();

      tenor = Math.max(1, OLD_TENOR + difference);
    }

    const monthlyPrincipal = REMAINING_PRINCIPAL / tenor;
    const interestFactor =
      tenor > OLD_TENOR ? 1 + (tenor - OLD_TENOR) * 0.025 : 1;
    const monthlyInterest = MONTHLY_INTEREST * interestFactor;

    return {
      tenor,
      dueDate: formatDmy(dueDate),
      oldInstallment: REMAINING_PRINCIPAL / OLD_TENOR + MONTHLY_INTEREST,
      newInstallment: monthlyPrincipal + monthlyInterest,
      oldInterest: MONTHLY_INTEREST * OLD_TENOR,
      newInterest: monthlyInterest * tenor,
    };
  }, [additionalTenor, dueMonthNumber, dueYearNumber, method, newTenor, oldDueDate]);

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

    setConfirmOpen(true);
  }

  return (
    <>
      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          setSuccessOpen(true);
        }}
      />
      <SuccessDialog
        open={successOpen}
        onOk={() => {
          setSuccessOpen(false);
          onOpenChange(false);
        }}
      />

      <Dialog open={open && !successOpen} onOpenChange={onOpenChange}>
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
                  <div className="text-[14px] font-extrabold tracking-wide text-white">
                    INFORMASI REKENING PINJAMAN
                  </div>

                  <div className="loan-extension-account-grid mt-7 grid gap-x-8 gap-y-6">
                    {accountDetails.map(([label, value]) => (
                      <div key={label} className="loan-extension-account-field min-w-0">
                        <div className="text-[12px] font-semibold text-white/85">
                          {label}
                        </div>
                        <div className="mt-1.5 text-[14px] font-extrabold leading-snug text-white">
                          {label === "No. Rek. Pinjaman" ? accountNo : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                  <div className="bg-[#F9FAFF] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                    Data Perpanjangan Pinjaman
                  </div>

                  <div className="grid gap-5 p-5">
                    <FieldRow label="Metode Perpanjangan">
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
                          <SelectItem value="Tenor Tambahan">Tenor Tambahan</SelectItem>
                          <SelectItem value="Tenor Baru">Tenor Baru</SelectItem>
                          <SelectItem value="Jatuh Tempo Akhir Baru">
                            Jatuh Tempo Akhir Baru
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldRow>

                    {method === "Tenor Tambahan" ? (
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
                      <FieldRow label="Jatuh Tempo Akhir Baru">
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            value={dueMonth}
                            onChange={(event) =>
                              setDueMonth(event.target.value.replace(/[^\d]/g, "").slice(0, 2))
                            }
                            inputMode="numeric"
                            placeholder="Bulan (01-12)"
                            className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                          />
                          <Input
                            value={dueYear}
                            onChange={(event) =>
                              setDueYear(event.target.value.replace(/[^\d]/g, "").slice(0, 4))
                            }
                            inputMode="numeric"
                            placeholder="Tahun"
                            className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                          />
                        </div>
                      </FieldRow>
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

                <LoanExtensionMethodSummarySection
                  method={method || "Tenor Baru"}
                  additionalTenor={additionalTenor}
                  newTenor={simulation.tenor}
                  newDueDate={simulation.dueDate}
                />
              </div>
            ) : null}

            {step === 3 ? (
              <section className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  Simpan Perubahan Perpanjangan
                </div>
                <div className="grid gap-4 p-5 text-[14px]">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">Rekening Pinjaman</span>
                    <span className="font-extrabold text-slate-900">{accountNo}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">Metode Perpanjangan</span>
                    <span className="font-extrabold text-[#2563EB]">{method}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">Tenor Baru</span>
                    <span className="font-extrabold text-[#2563EB]">
                      {simulation.tenor} Bulan
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">Jatuh Tempo Baru</span>
                    <span className="font-extrabold text-[#2563EB]">
                      {simulation.dueDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">Tanggal Efektif</span>
                    <span className="font-extrabold text-slate-900">{effectiveDate}</span>
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
              onClick={continueWizard}
              className={cn(
                "ml-auto inline-flex h-10 items-center justify-center rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
                step === 3
                  ? "min-w-[172px] gap-[9px] bg-[#2fb300] hover:bg-[#279800]"
                  : step === 1 && !isValid
                    ? "min-w-[145px] cursor-not-allowed gap-2 bg-slate-300 text-slate-500"
                    : "min-w-[145px] gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]",
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
    </>
  );
}