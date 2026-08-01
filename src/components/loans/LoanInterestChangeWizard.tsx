"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import LoanInterestHistoryDialog from "@/components/loans/LoanInterestHistoryDialog";

const steps = [
  { id: 1, label: "Informasi & Perubahan" },
  { id: 2, label: "Simulasi" },
  { id: 3, label: "Simpan Perubahan" },
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
          <thead className="bg-white">
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

function ChangeConfirmDialog({
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
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[528px]",
          "max-w-[528px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h3 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin untuk melakukan perubahan?
          </h3>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="h-[48px] w-[104px] rounded-[5px] bg-[#2f80ed] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/35 transition hover:bg-[#266ed0]"
            >
              Yes
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="h-[48px] w-[126px] rounded-[5px] bg-[#a6a6a6] text-[16px] font-semibold text-white ring-2 ring-[#a6a6a6]/25 transition hover:bg-[#969696]"
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setNewRate("");
    setEffectiveDate("");
    setReason("");
    setConfirmOpen(false);
    setHistoryOpen(false);
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

  function goToSimulation() {
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

    setStep(2);
  }

  function save() {
    setConfirmOpen(false);
    setStep(3);

    toast.success("Perubahan bunga tersimpan (prototype)", {
      description: `Bunga baru ${simulation.rate.toFixed(2)}% per tahun.`,
    });

    onOpenChange(false);
  }

  const isSimulationStep = step === 2;

  return (
    <>
      <LoanInterestHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        accountNo={accountNo}
      />

      <ChangeConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={save}
      />

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
                        onClick={() => setHistoryOpen(true)}
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

                  <div className="overflow-hidden rounded-[12px] bg-white pb-4 ring-1 ring-slate-200">
                    <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                      Alasan Perubahan
                    </div>
                    <p className="px-4 pt-4 text-[14px] leading-relaxed text-black">
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
                              Total Tagihan Sebelum Penyesuaian
                            </th>
                            <th className="w-[200px] px-3 py-3 text-right">
                              Total Tagihan Sesudah Penyesuaian
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
            </main>

            <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
              {isSimulationStep ? (
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6b768c]"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={3} />
                    Kembali
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="text-[13px] font-semibold text-[#DC3545] transition hover:text-[#b91c1c]"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6b768c]"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={3} />
                  Batal
                </button>
              )}

              <button
                type="button"
                onClick={isSimulationStep ? () => setConfirmOpen(true) : goToSimulation}
                className={cn(
                  "inline-flex h-10 min-w-[150px] items-center justify-center gap-2 rounded-[5px] px-5 text-[13px] font-semibold text-white transition",
                  isSimulationStep
                    ? "bg-[#2fb300] hover:bg-[#279800]"
                    : "bg-[#5B3DF5] hover:bg-[#4C32D9]",
                )}
              >
                {isSimulationStep ? "Simpan Perubahan" : "Lanjutkan"}
                {isSimulationStep ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </footer>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}