"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";

const steps = [
  { id: 1, label: "Informasi & Perubahan" },
  { id: 2, label: "Simulasi" },
  { id: 3, label: "Pratinjau" },
] as const;

const currentRate = 12;
const remainingPrincipal = 10_553_571;
const remainingTenor = 10;
const currentInstallment = 1_120_000;

const accountDetails = [
  ["No. Rek. Pinjaman", "SMG260004"],
  ["Nama Anggota", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Bulanan"],
  ["Suku Bunga Saat Ini", "12,00% per tahun"],
  ["Baki Debet", "10.553.571,00"],
  ["Sisa Tenor", "10 Bulan"],
  ["Angsuran Berjalan", "1.120.000,00"],
  ["Tanggal Jatuh Tempo Berikutnya", "07-08-2026"],
] as const;

function formatIdr(value: number) {
  return `${Math.round(value).toLocaleString("id-ID")},00`;
}

function formatDueDate(monthOffset: number) {
  const date = new Date(2026, 7 + monthOffset, 7);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}-${month}-${date.getFullYear()}`;
}

function FieldRow({
  label,
  children,
  textarea = false,
}: {
  label: string;
  children: React.ReactNode;
  textarea?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)]",
        textarea ? "sm:items-start" : "sm:items-center",
      )}
    >
      <label
        className={cn(
          "text-[14px] font-normal text-[#002060]",
          textarea && "sm:pt-1",
        )}
      >
        {label} <span className="text-rose-600">*</span>
      </label>
      {children}
    </div>
  );
}

function FormChangeInterestHeader() {
  return (
    <div className="bg-[#F9FAFF] px-5 py-3 text-[16px] font-extrabold uppercase tracking-[0.025em] text-slate-900">
      Form Perubahan Suku Bunga
    </div>
  );
}

function AccountField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 text-[14px] font-extrabold text-white">{value}</div>
    </div>
  );
}

function WizardStepper({ step }: { step: number }) {
  return (
    <div className="overflow-x-auto px-6 py-5">
      <div className="flex min-w-[560px] items-start">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex w-[160px] shrink-0 flex-col items-center">
              <div
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full text-[18px] font-extrabold",
                  item.id <= step
                    ? "bg-[#5B3DF5] text-white"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {item.id}
              </div>
              <div
                className={cn(
                  "mt-2 text-center text-[14px] font-semibold",
                  item.id === step ? "text-slate-900" : "text-slate-600",
                )}
              >
                {item.label}
              </div>
            </div>

            {index < steps.length - 1 ? (
              <div className="mt-[19px] h-[2px] flex-1 bg-slate-200">
                <div
                  className={cn(
                    "h-full bg-[#5B3DF5]",
                    item.id < step ? "w-full" : "w-0",
                  )}
                />
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ComparisonTable({
  rate,
  beforeInstallment,
  afterInstallment,
  beforeTotalInterest,
  afterTotalInterest,
}: {
  rate: number;
  beforeInstallment: string;
  afterInstallment: string;
  beforeTotalInterest: string;
  afterTotalInterest: string;
}) {
  const rows = [
    {
      label: "Suku Bunga",
      before: `${currentRate.toFixed(2)}% per tahun`,
      after: `${rate.toFixed(2)}% per tahun`,
    },
    {
      label: "Angsuran",
      before: beforeInstallment,
      after: afterInstallment,
    },
    {
      label: "Total Nominal Pembayaran Bunga",
      before: beforeTotalInterest,
      after: afterTotalInterest,
    },
  ];

  return (
    <div className="loan-interest-summary overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="loan-interest-summary-title bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold text-black">
        Ringkasan Perubahan Suku Bunga
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[620px] border-collapse">
          <thead className="bg-[#F9FAFF]">
            <tr className="border-b border-slate-200 text-left text-[12px] font-bold uppercase tracking-wide text-black">
              <th className="px-4 py-3">Informasi</th>
              <th className="px-4 py-3">Sebelum Perubahan</th>
              <th className="px-4 py-3">Sesudah Perubahan</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={cn(
                  "border-b border-slate-100 text-[12px]",
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                )}
              >
                <td className="px-4 py-3 font-normal text-black">
                  {row.label}
                </td>
                <td className="px-4 py-3 font-normal tabular-nums text-black">
                  {row.before}
                </td>
                <td className="px-4 py-3 font-normal tabular-nums text-[#5B3DF5]">
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

export default function LoanInterestChangeWizard({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [step, setStep] = React.useState(1);
  const [newRate, setNewRate] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setNewRate("");
    setEffectiveDate("");
    setReason("");
  }, [open]);

  const simulation = React.useMemo(() => {
    const rate = Number(newRate.replace(",", ".")) || currentRate;
    const beforeInterest = (remainingPrincipal * currentRate) / 100 / 12;
    const afterInterest = (remainingPrincipal * rate) / 100 / 12;
    const afterInstallment = currentInstallment - beforeInterest + afterInterest;
    const monthlyPrincipal = remainingPrincipal / remainingTenor;

    let beforeOutstanding = remainingPrincipal;
    let afterOutstanding = remainingPrincipal;

    const installments = Array.from({ length: remainingTenor }, (_, index) => {
      const principal = Math.min(monthlyPrincipal, beforeOutstanding);
      const interestBefore = (beforeOutstanding * currentRate) / 100 / 12;
      const interestAfter = (afterOutstanding * rate) / 100 / 12;
      const totalBefore = principal + interestBefore;
      const totalAfter = principal + interestAfter;
      const remaining = Math.max(0, beforeOutstanding - principal);

      beforeOutstanding = remaining;
      afterOutstanding = remaining;

      return {
        installmentNo: index + 1,
        dueDate: formatDueDate(index),
        principal,
        interestBefore,
        interestAfter,
        totalBefore,
        totalAfter,
        remaining,
      };
    });

    return {
      rate,
      beforeInstallment: formatIdr(currentInstallment),
      afterInstallment: formatIdr(afterInstallment),
      beforeTotalInterest: formatIdr(beforeInterest * remainingTenor),
      afterTotalInterest: formatIdr(afterInterest * remainingTenor),
      installments,
    };
  }, [newRate]);

  function next() {
    if (step === 1) {
      if (!newRate.trim() || Number(newRate.replace(",", ".")) <= 0) {
        toast("Suku bunga baru belum valid", {
          description: "Masukkan suku bunga baru yang lebih dari 0.",
        });
        return;
      }

      if (!effectiveDate.trim()) {
        toast("Tanggal efektif wajib diisi");
        return;
      }

      if (!reason.trim()) {
        toast("Alasan perubahan wajib diisi");
        return;
      }
    }

    setStep((current) => Math.min(3, current + 1));
  }

  function save() {
    toast.success("Perubahan bunga tersimpan (prototype)", {
      description: `Bunga baru ${simulation.rate.toFixed(2)}% per tahun.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-loan-interest-wizard="true"
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[860px]",
          "max-w-[860px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Ubah Suku Bunga Pinjaman
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

          <WizardStepper step={step} />

          <main className="max-h-[60vh] overflow-auto border-t border-slate-100 px-6 py-6 sm:px-8">
            {step === 1 ? (
              <div className="grid gap-7">
                <div className="rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm md:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[16px] font-extrabold tracking-wide">
                      INFORMASI REKENING PINJAMAN
                    </div>
                    <button
                      type="button"
                      onClick={() => toast("Riwayat perubahan bunga (prototype)")}
                      className="inline-flex h-9 items-center gap-2 rounded-[5px] bg-white px-3 text-[12px] font-semibold text-[#168294]"
                    >
                      <Eye className="h-4 w-4" />
                      Riwayat Perubahan Suku Bunga
                    </button>
                  </div>

                  <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                    {accountDetails.map(([label, value]) => (
                      <AccountField
                        key={label}
                        label={label}
                        value={label === "No. Rek. Pinjaman" ? accountNo : value}
                      />
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[12px] bg-white pb-5 ring-1 ring-slate-200">
                  <FormChangeInterestHeader />

                  <div className="grid gap-5 px-5 pt-5">
                    <FieldRow label="Suku Bunga Baru">
                      <Input
                        value={newRate ? `${newRate}%` : ""}
                        onChange={(event) =>
                          setNewRate(
                            event.target.value
                              .replace("%", "")
                              .replace(/[^\d,.-]/g, ""),
                          )
                        }
                        placeholder="%"
                        inputMode="decimal"
                        className="h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3 text-[14px] text-[#526685] shadow-none focus-visible:ring-0"
                      />
                    </FieldRow>

                    <FieldRow label="Tanggal Efektif">
                      <DatePickerDmyField
                        value={effectiveDate}
                        onChange={setEffectiveDate}
                        inputClassName="h-[31px] rounded-[5px] border-[#CBD5E1] bg-white px-3 text-[14px] text-[#526685] shadow-none focus-visible:ring-0"
                        placeholder="Pilih Tanggal Efektif"
                      />
                    </FieldRow>

                    <FieldRow label="Alasan Perubahan" textarea>
                      <Textarea
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                        placeholder="Masukkan alasan perubahan suku bunga"
                        className="min-h-[110px] rounded-[5px] border-[#CBD5E1] text-[14px] text-[#526685] shadow-none focus-visible:ring-0"
                      />
                    </FieldRow>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-5">
                <ComparisonTable
                  rate={simulation.rate}
                  beforeInstallment={simulation.beforeInstallment}
                  afterInstallment={simulation.afterInstallment}
                  beforeTotalInterest={simulation.beforeTotalInterest}
                  afterTotalInterest={simulation.afterTotalInterest}
                />

                <div className="rounded-[12px] bg-[#F6FAFF] px-4 py-4 ring-1 ring-[#D8E8FF]">
                  <div className="text-[12px] font-extrabold uppercase tracking-wide text-[#315E8F]">
                    Alasan Perubahan
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
                    {reason}
                  </p>
                </div>

                <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 bg-[#F9FAFF] px-4 py-3 text-[14px] font-extrabold uppercase tracking-wide text-slate-900">
                    Simulasi Angsuran Setelah Perubahan Suku Bunga
                  </div>

                  <div className="safe-x-scroll">
                    <table className="w-full min-w-[1180px] border-collapse">
                      <thead className="bg-white">
                        <tr className="border-b border-slate-200 text-left text-[14px] font-extrabold uppercase tracking-wide text-slate-600">
                          <th className="w-[90px] px-3 py-3">Angsuran Ke</th>
                          <th className="w-[120px] px-3 py-3">Jatuh Tempo</th>
                          <th className="w-[150px] px-3 py-3 text-right">
                            Tagihan Pokok
                          </th>
                          <th className="w-[190px] px-3 py-3 text-right">
                            Tagihan Bunga Sebelum Penyesuaian
                          </th>
                          <th className="w-[190px] px-3 py-3 text-right">
                            Tagihan Bunga Sesudah Penyesuaian
                          </th>
                          <th className="w-[200px] px-3 py-3 text-right">
                            Total Angsuran Sebelum Penyesuaian
                          </th>
                          <th className="w-[200px] px-3 py-3 text-right">
                            Total Angsuran Sesudah Penyesuaian
                          </th>
                          <th className="w-[160px] px-3 py-3 text-right">
                            Sisa Pinjaman
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {simulation.installments.map((installment, index) => (
                          <tr
                            key={installment.installmentNo}
                            className={cn(
                              "border-b border-slate-100 text-[14px]",
                              index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                            )}
                          >
                            <td className="px-3 py-2.5 font-semibold tabular-nums text-slate-900">
                              {installment.installmentNo}
                            </td>
                            <td className="px-3 py-2.5 tabular-nums text-slate-700">
                              {installment.dueDate}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-slate-900">
                              {formatIdr(installment.principal)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">
                              {formatIdr(installment.interestBefore)}
                            </td>
                            <td className="px-3 py-2.5 text-right font-semibold tabular-nums text-[#5B3DF5]">
                              {formatIdr(installment.interestAfter)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">
                              {formatIdr(installment.totalBefore)}
                            </td>
                            <td className="px-3 py-2.5 text-right font-extrabold tabular-nums text-[#5B3DF5]">
                              {formatIdr(installment.totalAfter)}
                            </td>
                            <td className="px-3 py-2.5 text-right tabular-nums text-slate-700">
                              {formatIdr(installment.remaining)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-5">
                <div>
                  <h3 className="text-[18px] font-extrabold text-slate-900">
                    Pratinjau Perubahan
                  </h3>
                  <p className="mt-2 text-[13px] text-slate-600">
                    Tinjau perubahan sebelum disimpan.
                  </p>
                </div>

                <div className="overflow-hidden rounded-[12px] border border-slate-200">
                  <div className="grid bg-[#F9FAFF] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wide text-slate-500 sm:grid-cols-[180px_1fr_1fr]">
                    <div>Informasi</div>
                    <div>Sebelum</div>
                    <div>Sesudah</div>
                  </div>
                  <div className="grid gap-2 px-4 py-4 text-[13px] sm:grid-cols-[180px_1fr_1fr]">
                    <div className="font-semibold text-slate-700">Suku Bunga</div>
                    <div className="rounded-[8px] bg-slate-100 px-3 py-2">
                      {currentRate.toFixed(2)}% per tahun
                    </div>
                    <div className="rounded-[8px] bg-violet-50 px-3 py-2 font-extrabold text-[#5B3DF5]">
                      {simulation.rate.toFixed(2)}% per tahun
                    </div>
                  </div>
                </div>

                <div className="rounded-[12px] bg-[#F6FAFF] px-4 py-4 ring-1 ring-[#D8E8FF]">
                  <div className="text-[12px] font-extrabold uppercase tracking-wide text-[#315E8F]">
                    Alasan Perubahan
                  </div>
                  <p className="mt-2 text-[14px] text-slate-700">{reason}</p>
                </div>
              </div>
            ) : null}
          </main>

          <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() =>
                step === 1 ? onOpenChange(false) : setStep(step - 1)
              }
              className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6b768c]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={3} />
              {step === 1 ? "Batal" : "Kembali"}
            </button>

            <button
              type="button"
              onClick={step === 3 ? save : next}
              className="inline-flex h-10 min-w-[130px] items-center justify-center gap-2 rounded-[5px] bg-[#5B3DF5] px-5 text-[13px] font-semibold text-white transition hover:bg-[#4C32D9]"
            >
              {step === 3 ? "Simpan Perubahan" : "Lanjutkan"}
              {step === 3 ? (
                <Check className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}