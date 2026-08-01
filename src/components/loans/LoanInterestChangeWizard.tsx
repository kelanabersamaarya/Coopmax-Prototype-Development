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
import LoanInterestChangeSuccessModal from "@/components/loans/LoanInterestChangeSuccessModal";
import { saveLoanInterestRate } from "@/lib/loanInterestStore";

const currentRate = 12;
const currentInstallment = 1_120_000;
const remainingPrincipal = 10_553_571;
const remainingTenor = 10;

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
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
      <label className="text-[14px] font-normal text-[#002060]">
        {label} <span className="text-rose-600">*</span>
      </label>
      {children}
    </div>
  );
}

function AccountField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 break-words text-[14px] font-extrabold leading-snug text-white">
        {value}
      </div>
    </div>
  );
}

function ConfirmationDialog({
  open,
  onCancel,
  onYes,
}: {
  open: boolean;
  onCancel: () => void;
  onYes: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onCancel() : null)}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] max-w-[528px] overflow-hidden rounded-[5px]",
          "border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <div className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </div>
          </div>

          <div className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin untuk melakukan perubahan?
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onYes}
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

function BillingSimulationTable({
  installments,
  adjustmentRate,
}: {
  installments: Array<{
    number: number;
    dueDate: string;
    principal: number;
    before: number;
    after: number;
    remaining: number;
  }>;
  adjustmentRate: number;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Simulasi Angsuran Setelah Perubahan Suku Bunga
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[2180px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
              <th className="w-[78px] px-3 py-3">Angsuran Ke</th>
              <th className="w-[115px] px-3 py-3">Jatuh Tempo</th>
              <th className="w-[145px] px-3 py-3 text-right">
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
              <th className="w-[165px] px-3 py-3 text-right">
                Tunggakan Bunga
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[175px] px-3 py-3">
                Jenis Penyesuaian
              </th>
              <th className="w-[145px] px-3 py-3 text-right">
                Nominal
                <br />
                Penyesuaian
              </th>
              <th className="w-[165px] px-3 py-3 text-right">
                Tunggakan Bunga
                <br />
                Setelah Penyesuaian
              </th>
              <th className="w-[165px] px-3 py-3 text-right">
                Total Kewajiban
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[165px] px-3 py-3 text-right">
                Total Kewajiban
                <br />
                Setelah Penyesuaian
              </th>
            </tr>
          </thead>

          <tbody className="text-[12px] text-black">
            {installments.map((item, index) => {
              const beforeInterest = Math.max(0, item.before - item.principal);
              const afterInterest = Math.max(0, item.after - item.principal);
              const interestAdjustment = afterInterest - beforeInterest;
              const beforeTotal = item.before;
              const afterTotal = item.after;
              const remainingInterestBefore = beforeInterest * (remainingTenor - index);
              const remainingInterestAfter = afterInterest * (remainingTenor - index);
              const adjustmentType =
                interestAdjustment > 0
                  ? "Penambahan Bunga"
                  : interestAdjustment < 0
                    ? "Pengurangan Bunga"
                    : "Tidak Ada Perubahan";

              return (
                <tr
                  key={item.number}
                  className={cn(
                    "border-b border-slate-100",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                  )}
                >
                  <td className="px-3 py-2.5 tabular-nums">{item.number}</td>
                  <td className="px-3 py-2.5 tabular-nums whitespace-nowrap">
                    {item.dueDate}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(beforeTotal)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(item.principal)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(beforeInterest)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(item.remaining)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(remainingInterestBefore)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">0,00</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(beforeInterest)}
                  </td>
                  <td className="px-3 py-2.5 font-semibold">
                    {adjustmentType}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(Math.abs(interestAdjustment))}
                  </td>
                  <td className="px-3 py-2.5 text-right font-bold tabular-nums text-[#5B3DF5]">
                    {formatIdr(afterInterest)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {formatIdr(beforeTotal)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-bold tabular-nums text-[#5B3DF5]">
                    {formatIdr(afterTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-[12px] font-medium text-slate-600">
        Simulasi menggunakan suku bunga baru {adjustmentRate.toFixed(2)}% per tahun.
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
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setNewRate("");
    setEffectiveDate("");
    setReason("");
    setConfirmOpen(false);
    setSuccessOpen(false);
    setHistoryOpen(false);
  }, [open]);

  const simulation = React.useMemo(() => {
    const rate = Number(newRate.replace(",", ".")) || currentRate;
    const beforeInterest = (remainingPrincipal * currentRate) / 100 / 12;
    const afterInterest = (remainingPrincipal * rate) / 100 / 12;
    const afterInstallment = currentInstallment - beforeInterest + afterInterest;
    const monthlyPrincipal = remainingPrincipal / remainingTenor;

    return {
      rate,
      beforeInstallment: formatIdr(currentInstallment),
      afterInstallment: formatIdr(afterInstallment),
      beforeTotalInterest: formatIdr(beforeInterest * remainingTenor),
      afterTotalInterest: formatIdr(afterInterest * remainingTenor),
      installments: Array.from({ length: remainingTenor }, (_, index) => {
        const remaining = Math.max(
          0,
          remainingPrincipal - monthlyPrincipal * (index + 1),
        );
        const interestBefore =
          (Math.max(remaining, 0) * currentRate) / 100 / 12;
        const interestAfter = (Math.max(remaining, 0) * rate) / 100 / 12;

        return {
          number: index + 1,
          dueDate: formatDueDate(index),
          principal: monthlyPrincipal,
          before: monthlyPrincipal + interestBefore,
          after: monthlyPrincipal + interestAfter,
          remaining,
        };
      }),
    };
  }, [newRate]);

  function continueToSimulation() {
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

  function confirmSave() {
    saveLoanInterestRate(accountNo, simulation.rate);
    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  function closeSuccess() {
    setSuccessOpen(false);
    toast.success("Perubahan bunga tersimpan", {
      description: `Bunga baru ${simulation.rate.toFixed(2)}% per tahun.`,
    });
    onOpenChange(false);
  }

  return (
    <>
      <LoanInterestHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        accountNo={accountNo}
      />

      <ConfirmationDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onYes={confirmSave}
      />

      <LoanInterestChangeSuccessModal open={successOpen} onOk={closeSuccess} />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          data-loan-interest-wizard="true"
          className={cn(
            "w-[calc(100vw-1rem)] sm:w-[1180px] max-w-[1180px]",
            "overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
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

            <div className="flex items-center justify-center gap-3 overflow-x-auto px-6 py-5">
              {[1, 2, 3].map((number) => (
                <React.Fragment key={number}>
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-full text-[18px] font-extrabold",
                        number <= step
                          ? "bg-[#5B3DF5] text-white"
                          : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {number}
                    </span>
                    <span className="mt-2 whitespace-nowrap text-[12px] font-semibold text-slate-700">
                      {number === 1
                        ? "Informasi & Perubahan"
                        : number === 2
                          ? "Simulasi"
                          : "Simpan Perubahan"}
                    </span>
                  </div>
                  {number < 3 ? (
                    <div
                      className={cn(
                        "mb-5 h-[2px] min-w-10 flex-1",
                        number < step ? "bg-[#5B3DF5]" : "bg-slate-200",
                      )}
                    />
                  ) : null}
                </React.Fragment>
              ))}
            </div>

            <main className="max-h-[60vh] overflow-auto border-t border-slate-100 px-6 py-6 sm:px-8">
              {step === 1 ? (
                <div className="grid gap-7">
                  <div className="rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[14px] font-extrabold tracking-wide">
                        INFORMASI REKENING PINJAMAN
                      </div>
                      <button
                        type="button"
                        onClick={() => setHistoryOpen(true)}
                        className="inline-flex h-9 items-center gap-2 rounded-[5px] bg-white px-3 text-[12px] font-semibold text-[#168294]"
                      >
                        <Eye className="h-4 w-4" />
                        Lihat Riwayat Perubahan Suku Bunga
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

                  <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                    <div className="bg-[#F9FAFF] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                      Form Perubahan Suku Bunga
                    </div>

                    <div className="grid gap-5 px-5 py-5">
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
                          className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        />
                      </FieldRow>

                      <FieldRow label="Tanggal Efektif">
                        <DatePickerDmyField
                          value={effectiveDate}
                          onChange={setEffectiveDate}
                          inputClassName="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                          placeholder="Pilih Tanggal Efektif"
                        />
                      </FieldRow>

                      <FieldRow label="Alasan Perubahan">
                        <Textarea
                          value={reason}
                          onChange={(event) => setReason(event.target.value)}
                          placeholder="Masukkan alasan perubahan suku bunga"
                          className="min-h-[110px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                        />
                      </FieldRow>
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-5">
                  <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                    <div className="loan-interest-summary-title px-4 py-3">
                      Ringkasan Perubahan Suku Bunga
                    </div>
                    <div className="safe-x-scroll">
                      <table className="loan-interest-summary w-full min-w-[620px] border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-left">
                            <th className="px-4 py-3">Informasi</th>
                            <th className="px-4 py-3">Sebelum Perubahan</th>
                            <th className="px-4 py-3">Sesudah Perubahan</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100">
                            <td className="px-4 py-3">Suku Bunga</td>
                            <td className="px-4 py-3">12,00% per tahun</td>
                            <td className="px-4 py-3 font-semibold text-[#5B3DF5]">
                              {simulation.rate.toFixed(2)}% per tahun
                            </td>
                          </tr>
                          <tr className="border-b border-slate-100 bg-slate-50/60">
                            <td className="px-4 py-3">Angsuran</td>
                            <td className="px-4 py-3">
                              {simulation.beforeInstallment}
                            </td>
                            <td className="px-4 py-3 font-semibold text-[#5B3DF5]">
                              {simulation.afterInstallment}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">
                              Total Nominal Pembayaran Bunga
                            </td>
                            <td className="px-4 py-3">
                              {simulation.beforeTotalInterest}
                            </td>
                            <td className="px-4 py-3 font-semibold text-[#5B3DF5]">
                              {simulation.afterTotalInterest}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                    <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                      Alasan Perubahan
                    </div>
                    <p className="px-4 py-4 text-[14px] text-black">{reason}</p>
                  </div>

                  <BillingSimulationTable
                    installments={simulation.installments}
                    adjustmentRate={simulation.rate}
                  />
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-5">
                  <div>
                    <h3 className="text-[14px] font-bold uppercase tracking-wide text-black">
                      Konfirmasi Perubahan Suku Bunga
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600">
                      Pastikan semua nilai simulasi sudah sesuai sebelum menyimpan.
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
                          Suku Bunga Baru
                        </div>
                        <div className="mt-1 text-[14px] font-extrabold text-[#5B3DF5]">
                          {simulation.rate.toFixed(2)}% per tahun
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold text-slate-500">
                          Tanggal Efektif
                        </div>
                        <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                          {effectiveDate}
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold text-slate-500">
                          Alasan Perubahan
                        </div>
                        <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                          {reason}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </main>

            <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6b768c]"
                >
                  <X className="h-4 w-4" strokeWidth={3} />
                  Batal
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep((current) => current - 1)}
                  className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[13px] font-semibold text-white transition hover:bg-[#6b768c]"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={3} />
                  Kembali
                </button>
              )}

              <button
                type="button"
                onClick={
                  step === 1
                    ? continueToSimulation
                    : step === 2
                      ? () => setStep(3)
                      : () => setConfirmOpen(true)
                }
                className={cn(
                  "inline-flex h-10 min-w-[150px] items-center justify-center gap-2 rounded-[5px] px-5 text-[13px] font-semibold text-white transition",
                  step === 3
                    ? "bg-[#2fb300] hover:bg-[#279800]"
                    : "bg-[#5B3DF5] hover:bg-[#4C32D9]",
                )}
              >
                {step === 3 ? "Simpan Perubahan" : "Lanjutkan"}
                {step === 3 ? (
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