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
  { id: 1, label: "Informasi Pinjaman" },
  { id: 2, label: "Perubahan Suku Bunga" },
  { id: 3, label: "Simulasi" },
] as const;

const accountDetails = [
  ["No.Rek. Pinjaman", "SMG260004"],
  ["Nama Anggota", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Bulanan"],
  ["Suku Bunga Saat Ini", "12,00% per tahun"],
  ["Baki Debet", "10.553.571,00"],
  ["Sisa Tenor", "10 Bulan"],
  ["Angsuran Berjalan", "1.120.000,00"],
  ["Tanggal Jatuh Tempo Berikutnya", "07-08-2026"],
] as const;

const interestHistory = [
  {
    id: "rate-1",
    oldRate: "10,00%",
    newRate: "12,00%",
    effectiveDate: "01-06-2026",
    reason: "Penyesuaian kebijakan bunga pinjaman.",
    changedAt: "30-05-2026 10:15:24",
  },
  {
    id: "rate-2",
    oldRate: "9,50%",
    newRate: "10,00%",
    effectiveDate: "01-01-2026",
    reason: "Penyesuaian suku bunga periode awal tahun.",
    changedAt: "28-12-2025 14:42:11",
  },
];

const currentRate = 12;
const remainingPrincipal = 10_553_571;
const remainingTenor = 10;
const currentInstallment = 1_120_000;

function formatIdr(value: number) {
  return `${Math.round(value).toLocaleString("id-ID")},00`;
}

function formatDmy(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

function parseDmy(value: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!match) return new Date(2026, 7, 7);

  return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function LoanInfoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[14px] font-semibold leading-tight text-white/85">
        {label}
      </div>
      <div className="mt-1 break-words text-[16px] font-extrabold leading-snug tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}

function WizardStepper({ step }: { step: number }) {
  return (
    <div className="overflow-x-auto px-6 py-5">
      <div className="flex min-w-[560px] items-start">
        {steps.map((item, index) => {
          const active = item.id === step;
          const completed = item.id < step;

          return (
            <React.Fragment key={item.id}>
              <div className="flex w-[160px] shrink-0 flex-col items-center">
                <div
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full text-[18px] font-extrabold",
                    active || completed
                      ? "bg-[#5B3DF5] text-white shadow-[0_4px_10px_rgba(91,61,245,0.28)]"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  {item.id}
                </div>

                <div
                  className={cn(
                    "mt-2 text-center text-[14px] font-semibold leading-tight",
                    active ? "text-slate-900" : "text-slate-600",
                  )}
                >
                  {item.label}
                </div>
              </div>

              {index < steps.length - 1 ? (
                <div className="mt-[19px] h-[2px] flex-1 bg-slate-200">
                  <div
                    className={cn(
                      "h-full bg-[#5B3DF5] transition-all duration-300",
                      completed ? "w-full" : "w-0",
                    )}
                  />
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ChangeFieldRow({
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
          "text-[14px] font-normal leading-snug text-[#002060]",
          textarea ? "sm:pt-1" : "",
        )}
      >
        {label}
        <span className="text-rose-600"> *</span>
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function SummaryTile({
  label,
  before,
  after,
}: {
  label: string;
  before: string;
  after: string;
}) {
  return (
    <div className="rounded-[12px] bg-slate-50 p-4 ring-1 ring-slate-200">
      <div className="text-[12px] font-semibold text-slate-500">{label}</div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-500">Sebelum</div>
          <div className="mt-1 text-[14px] font-bold text-slate-700">{before}</div>
        </div>
        <div className="border-l border-slate-200 pl-3">
          <div className="text-[11px] font-medium text-[#5B3DF5]">Sesudah</div>
          <div className="mt-1 text-[14px] font-extrabold text-[#5B3DF5]">
            {after}
          </div>
        </div>
      </div>
    </div>
  );
}

function InterestHistoryDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[940px]",
          "max-w-[940px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
              Riwayat Perubahan Suku Bunga
            </h3>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="max-h-[65vh] overflow-auto px-6 py-5">
            <div className="overflow-hidden rounded-[5px] border border-slate-200">
              <div className="safe-x-scroll">
                <table className="w-full min-w-[860px] border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200 text-left text-[12px] font-extrabold uppercase tracking-wide text-slate-700">
                      <th className="w-[150px] px-4 py-3">Suku Bunga Lama</th>
                      <th className="w-[150px] px-4 py-3">Suku Bunga Baru</th>
                      <th className="w-[150px] px-4 py-3">Tanggal Efektif</th>
                      <th className="min-w-[270px] px-4 py-3">Alasan Perubahan</th>
                      <th className="w-[190px] px-4 py-3">
                        Tanggal & Waktu Perubahan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {interestHistory.map((history, index) => (
                      <tr
                        key={history.id}
                        className={cn(
                          "border-b border-slate-200 text-[13px] last:border-b-0",
                          index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                        )}
                      >
                        <td className="px-4 py-3 font-semibold tabular-nums text-slate-900">
                          {history.oldRate}
                        </td>
                        <td className="px-4 py-3 font-semibold tabular-nums text-[#5B3DF5]">
                          {history.newRate}
                        </td>
                        <td className="px-4 py-3 tabular-nums text-slate-800">
                          {history.effectiveDate}
                        </td>
                        <td className="px-4 py-3 leading-relaxed text-slate-700">
                          {history.reason}
                        </td>
                        <td className="px-4 py-3 tabular-nums text-slate-700">
                          {history.changedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <footer className="flex justify-end border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6b768c]"
            >
              <X className="h-4 w-4" strokeWidth={3} />
              Tutup
            </button>
          </footer>
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
  const [changeReason, setChangeReason] = React.useState("");
  const [historyOpen, setHistoryOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setNewRate("");
    setEffectiveDate("");
    setChangeReason("");
    setHistoryOpen(false);
  }, [open]);

  const simulation = React.useMemo(() => {
    const parsedRate = Number(newRate.replace(",", ".")) || currentRate;
    const beforeMonthlyInterest = (remainingPrincipal * (currentRate / 100)) / 12;
    const afterMonthlyInterest = (remainingPrincipal * (parsedRate / 100)) / 12;
    const beforeInstallment = currentInstallment;
    const afterInstallment = Math.max(
      0,
      beforeInstallment - beforeMonthlyInterest + afterMonthlyInterest,
    );
    const beforeTotalInterest = beforeMonthlyInterest * remainingTenor;
    const afterTotalInterest = afterMonthlyInterest * remainingTenor;
    const scheduleStart = parseDmy(effectiveDate || "07-08-2026");
    const lastDueDate = addMonths(scheduleStart, remainingTenor - 1);

    const schedule = Array.from({ length: remainingTenor }, (_, index) => {
      const dueDate = addMonths(scheduleStart, index);
      const principal = remainingPrincipal / remainingTenor;
      const interest = afterMonthlyInterest * Math.max(1, 1 - index / remainingTenor);
      const installment = principal + interest;

      return {
        installmentNo: index + 1,
        dueDate: formatDmy(dueDate),
        principal: formatIdr(principal),
        interest: formatIdr(interest),
        total: formatIdr(installment),
      };
    });

    return {
      rate: parsedRate,
      beforeInstallment: formatIdr(beforeInstallment),
      afterInstallment: formatIdr(afterInstallment),
      beforeTotalInterest: formatIdr(beforeTotalInterest),
      afterTotalInterest: formatIdr(afterTotalInterest),
      tenor: `${remainingTenor} Bulan`,
      lastDueDate: formatDmy(lastDueDate),
      schedule,
    };
  }, [effectiveDate, newRate]);

  function next() {
    if (step === 2) {
      if (!newRate.trim() || Number(newRate.replace(",", ".")) <= 0) {
        toast("Suku bunga baru belum valid", {
          description: "Masukkan suku bunga baru yang lebih dari 0.",
        });
        return;
      }

      if (!effectiveDate.trim()) {
        toast("Tanggal efektif wajib diisi", {
          description: "Silakan pilih tanggal efektif perubahan bunga.",
        });
        return;
      }

      if (!changeReason.trim()) {
        toast("Alasan perubahan wajib diisi", {
          description: "Mohon isi alasan perubahan suku bunga.",
        });
        return;
      }
    }

    setStep((current) => Math.min(3, current + 1));
  }

  function save() {
    toast.success("Perubahan bunga tersimpan (prototype)", {
      description: `Rekening ${accountNo} menggunakan bunga baru ${simulation.rate.toFixed(2)}% mulai ${effectiveDate}.`,
    });
    onOpenChange(false);
  }

  const footerButtonClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-[5px] px-5 text-[13px] font-semibold transition";

  const fieldClassName =
    "h-[31px] w-full rounded-[5px] border-[#CBD5E1] bg-white px-3 text-[14px] font-normal text-[#526685] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  const textareaClassName =
    "min-h-[110px] w-full resize-none rounded-[5px] border-[#CBD5E1] bg-white px-3 py-2 text-[14px] font-normal text-[#526685] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0";

  return (
    <>
      <InterestHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
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

            <main className="max-h-[60vh] overflow-auto border-t border-slate-100 px-6 py-6">
              {step === 1 ? (
                <div className="mt-1 overflow-hidden rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm ring-1 ring-white/10 md:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="text-[16px] font-extrabold tracking-wide text-white/90">
                      INFORMASI REKENING PINJAMAN
                    </div>
                    <button
                      type="button"
                      onClick={() => setHistoryOpen(true)}
                      className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-[5px] bg-white px-3 text-[12px] font-semibold text-[#168294] shadow-sm transition hover:bg-slate-100"
                    >
                      <Eye className="h-4 w-4" />
                      Riwayat Perubahan Suku Bunga
                    </button>
                  </div>

                  <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                    {accountDetails.map(([label, value]) => (
                      <LoanInfoField
                        key={label}
                        label={label}
                        value={label === "No.Rek. Pinjaman" ? accountNo : value}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="mx-auto max-w-[730px]">
                  <div className="grid gap-5">
                    <ChangeFieldRow label="Suku Bunga Baru">
                      <Input
                        value={newRate}
                        onChange={(event) => setNewRate(event.target.value)}
                        placeholder="Masukkan suku bunga baru"
                        inputMode="decimal"
                        className={fieldClassName}
                      />
                    </ChangeFieldRow>

                    <ChangeFieldRow label="Tanggal Efektif">
                      <DatePickerDmyField
                        value={effectiveDate}
                        onChange={setEffectiveDate}
                        inputClassName={fieldClassName}
                        placeholder="Pilih Tanggal Efektif"
                      />
                    </ChangeFieldRow>

                    <ChangeFieldRow label="Alasan Perubahan" textarea>
                      <Textarea
                        value={changeReason}
                        onChange={(event) => setChangeReason(event.target.value)}
                        placeholder="Masukkan alasan perubahan suku bunga"
                        className={textareaClassName}
                      />
                    </ChangeFieldRow>
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="mx-auto max-w-[780px]">
                  <div className="text-[18px] font-extrabold text-slate-900">
                    Simulasi Perubahan Bunga
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    Perbandingan ini memperlihatkan estimasi pembaruan angsuran berdasarkan suku bunga baru{" "}
                    <span className="font-bold text-[#5B3DF5]">
                      {simulation.rate.toFixed(2)}% per tahun
                    </span>
                    .
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <SummaryTile
                      label="Angsuran Bulanan"
                      before={simulation.beforeInstallment}
                      after={simulation.afterInstallment}
                    />
                    <SummaryTile
                      label="Total Bunga Sisa Tenor"
                      before={simulation.beforeTotalInterest}
                      after={simulation.afterTotalInterest}
                    />
                    <SummaryTile
                      label="Sisa Tenor"
                      before={`${remainingTenor} Bulan`}
                      after={simulation.tenor}
                    />
                    <SummaryTile
                      label="Tanggal Jatuh Tempo Terakhir"
                      before="07-05-2027"
                      after={simulation.lastDueDate}
                    />
                  </div>

                  <div className="mt-6 rounded-[12px] border border-[#D8E8FF] bg-[#F6FAFF] px-4 py-3 text-[13px] leading-relaxed text-[#315E8F]">
                    Jadwal pembayaran diperbarui mulai tanggal efektif{" "}
                    <span className="font-bold">{effectiveDate}</span>. Nilai
                    simulasi dapat berubah apabila terdapat pembayaran, denda, atau
                    penyesuaian pokok lainnya.
                  </div>

                  <div className="mt-6">
                    <div className="text-[15px] font-extrabold text-slate-900">
                      Jadwal Pembayaran yang Diperbarui
                    </div>

                    <div className="mt-3 overflow-hidden rounded-[8px] border border-slate-200">
                      <div className="safe-x-scroll">
                        <table className="w-full min-w-[680px] border-collapse">
                          <thead className="bg-slate-50">
                            <tr className="border-b border-slate-200 text-left text-[11px] font-extrabold uppercase tracking-wide text-slate-600">
                              <th className="w-[100px] px-4 py-3">Angsuran Ke</th>
                              <th className="w-[160px] px-4 py-3">Jatuh Tempo</th>
                              <th className="px-4 py-3 text-right">Pokok</th>
                              <th className="px-4 py-3 text-right">Bunga</th>
                              <th className="px-4 py-3 text-right">
                                Total Angsuran
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {simulation.schedule.map((item, index) => (
                              <tr
                                key={item.installmentNo}
                                className={cn(
                                  "border-b border-slate-100 text-[13px] last:border-b-0",
                                  index % 2 === 0 ? "bg-white" : "bg-slate-50/50",
                                )}
                              >
                                <td className="px-4 py-3 font-semibold tabular-nums text-slate-900">
                                  {item.installmentNo}
                                </td>
                                <td className="px-4 py-3 tabular-nums text-slate-700">
                                  {item.dueDate}
                                </td>
                                <td className="px-4 py-3 text-right tabular-nums text-slate-700">
                                  {item.principal}
                                </td>
                                <td className="px-4 py-3 text-right tabular-nums text-[#5B3DF5]">
                                  {item.interest}
                                </td>
                                <td className="px-4 py-3 text-right font-extrabold tabular-nums text-slate-900">
                                  {item.total}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </main>

            <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    step === 1 ? onOpenChange(false) : setStep(step - 1)
                  }
                  className={cn(
                    footerButtonClass,
                    "min-w-[105px] bg-[#77839A] text-white hover:bg-[#6b768c]",
                  )}
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={3} />
                  Kembali
                </button>

                {step >= 2 ? (
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="h-10 px-2 text-[13px] font-semibold text-rose-600 transition hover:text-rose-700"
                  >
                    Batal
                  </button>
                ) : null}
              </div>

              <button
                type="button"
                onClick={step === 3 ? save : next}
                className={cn(
                  footerButtonClass,
                  "min-w-[130px] bg-[#5B3DF5] text-white hover:bg-[#4C32D9]",
                )}
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
    </>
  );
}