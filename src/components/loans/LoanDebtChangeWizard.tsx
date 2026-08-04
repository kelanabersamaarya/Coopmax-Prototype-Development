"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import LoanBillingTablePreview, {
  type SavedBillingInterestAdjustment,
} from "@/components/loans/LoanBillingTablePreview";
import LoanDebtAdjustmentHistoryDialog from "@/components/loans/LoanDebtAdjustmentHistoryDialog";

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

function parseIdr(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return Math.max(0, Math.round(value))
    .toLocaleString("id-ID")
    .replace(/,/g, ".");
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
  const steps = ["Informasi & Tagihan", "Pratinjau dan Simulasi"];

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
  adjustedBill,
}: {
  adjustedBill: SavedBillingInterestAdjustment;
}) {
  const [page, setPage] = React.useState(1);
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(billingRows.length / pageSize));
  const start = (page - 1) * pageSize;
  const pagedRows = billingRows.slice(start, start + pageSize);

  const previousInterest = parseIdr(
    adjustedBill.adjustment.previousInterest ?? "0",
  );

  const adjustedInterest =
    adjustedBill.adjustment.type === "Pembebasan Seluruh Bunga"
      ? 0
      : adjustedBill.adjustment.type === "Penambahan Bunga"
        ? previousInterest + parseIdr(adjustedBill.adjustment.amount)
        : Math.max(0, previousInterest - parseIdr(adjustedBill.adjustment.amount));

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Simulasi Perubahan Nominal Bunga
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[1880px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
              <th className="w-[86px] px-3 py-3">Angsuran Ke</th>
              <th className="w-[112px] px-3 py-3">Jatuh Tempo</th>
              <th className="w-[132px] px-3 py-3 text-right">
                Tagihan
                <br />
                Pokok
              </th>
              <th className="w-[146px] px-3 py-3 text-right">
                Sisa Tagihan
                <br />
                Pokok
              </th>
              <th className="w-[120px] px-3 py-3 text-right">
                Tagihan
                <br />
                Denda
              </th>
              <th className="w-[160px] px-3 py-3 text-right">
                Total Tagihan
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[160px] px-3 py-3 text-right">
                Tagihan Bunga
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[175px] px-3 py-3 text-right">
                Sisa Tagihan Bunga
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[160px] px-3 py-3 text-right">
                Tagihan Bunga
                <br />
                Sesudah Penyesuaian
              </th>
              <th className="w-[175px] px-3 py-3 text-right">
                Sisa Tagihan Bunga
                <br />
                Sesudah Penyesuaian
              </th>
              <th className="w-[160px] px-3 py-3 text-right">
                Total Tagihan
                <br />
                Sesudah Penyesuaian
              </th>
            </tr>
          </thead>

          <tbody>
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
              const isAdjustedRow = installmentNo === adjustedBill.installmentNo;
              const totalBefore = parseIdr(totalBill);
              const totalAfter = isAdjustedRow
                ? totalBefore - previousInterest + adjustedInterest
                : totalBefore;
              const interestAfter = isAdjustedRow
                ? adjustedInterest
                : parseIdr(interestBill);
              const remainingInterestAfter = isAdjustedRow
                ? Math.max(
                    0,
                    parseIdr(remainingInterest) - previousInterest + adjustedInterest,
                  )
                : parseIdr(remainingInterest);

              const adjustmentData = isAdjustedRow
                ? {
                    "data-adjustment-type": adjustedBill.adjustment.type,
                    "data-adjustment-reason":
                      adjustedBill.adjustment.reason || "Tidak ada alasan.",
                  }
                : {};

              return (
                <tr
                  key={`${dueDate}-${installmentNo}`}
                  className={cn(
                    "border-b border-slate-100 text-[12px] font-normal text-black",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                  )}
                >
                  <td className="px-3 py-3 text-left tabular-nums">
                    {installmentNo}
                  </td>
                  <td className="px-3 py-3 tabular-nums whitespace-nowrap">
                    {dueDate}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {principalBill}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {remainingPrincipal}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {penalty}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {formatIdr(totalBefore)}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {interestBill}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">
                    {remainingInterest}
                  </td>
                  <td
                    {...adjustmentData}
                    className={cn(
                      "px-3 py-3 text-right tabular-nums",
                      isAdjustedRow ? "font-semibold text-[#2563EB]" : "",
                    )}
                  >
                    {formatIdr(interestAfter)}
                  </td>
                  <td
                    {...adjustmentData}
                    className={cn(
                      "px-3 py-3 text-right tabular-nums",
                      isAdjustedRow ? "font-semibold text-[#2563EB]" : "",
                    )}
                  >
                    {formatIdr(remainingInterestAfter)}
                  </td>
                  <td
                    className={cn(
                      "px-3 py-3 text-right tabular-nums",
                      isAdjustedRow ? "font-semibold text-[#2563EB]" : "",
                    )}
                  >
                    {formatIdr(totalAfter)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[12px] text-slate-600">
          Menampilkan {start + 1} sampai{" "}
          {Math.min(billingRows.length, start + pageSize)} dari{" "}
          {billingRows.length} entri
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
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
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
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [savedAdjustment, setSavedAdjustment] =
    React.useState<SavedBillingInterestAdjustment | null>(null);

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setHistoryOpen(false);
    setSavedAdjustment(null);
  }, [open]);

  function nextStep() {
    if (step === 1) {
      if (!savedAdjustment) {
        return;
      }

      setStep(2);
      return;
    }

    onOpenChange(false);
  }

  return (
    <>
      <LoanDebtAdjustmentHistoryDialog
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        accountNo={accountNo}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          data-loan-debt-wizard="true"
          data-loan-debt-step={step}
          className="w-[calc(100vw-1rem)] max-w-[1040px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl sm:w-[1040px] [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden"
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900">
              Ubah Nominal Bunga Pinjaman
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
                      onClick={() => setHistoryOpen(true)}
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
                        value={
                          field[0] === "No. Rek. Pinjaman"
                            ? accountNo
                            : field[1]
                        }
                      />
                    ))}
                  </div>
                </div>

                <LoanBillingTablePreview
                  accountNo={accountNo}
                  onInterestAdjustmentSaved={setSavedAdjustment}
                />

                {savedAdjustment ? (
                  <div className="rounded-[8px] bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
                    Penyesuaian bunga pada angsuran ke-
                    {savedAdjustment.installmentNo} ({savedAdjustment.dueDate})
                    sudah disimpan.
                  </div>
                ) : (
                  <div className="rounded-[8px] bg-amber-50 px-4 py-3 text-[13px] font-semibold text-amber-800 ring-1 ring-amber-200">
                    Simpan satu penyesuaian pada kolom Tagihan Bunga untuk
                    melanjutkan ke pratinjau.
                  </div>
                )}
              </div>
            ) : null}

            {step === 2 && savedAdjustment ? (
              <UnifiedBillingSimulationTable adjustedBill={savedAdjustment} />
            ) : null}
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
              disabled={step === 1 && !savedAdjustment}
              onClick={nextStep}
              className={cn(
                "ml-auto inline-flex h-10 items-center justify-center rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
                step === 2
                  ? "min-w-[172px] gap-[9px] bg-[#2fb300] hover:bg-[#279800]"
                  : savedAdjustment
                    ? "min-w-[145px] gap-2 bg-[#2563EB] hover:bg-[#1D4ED8]"
                    : "min-w-[145px] cursor-not-allowed gap-2 bg-slate-300 text-slate-500",
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