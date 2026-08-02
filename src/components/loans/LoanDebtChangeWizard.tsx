"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Clock3, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import LoanBillingTablePreview from "@/components/loans/LoanBillingTablePreview";

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

const billingRow = {
  jatuhTempo: "25-07-2026",
  totalBelumDibayar: "1.120.000,00",
  tagihanPokok: "1.000.000,00",
  tagihanBunga: "120.000,00",
  sisaPokok: "10.553.571,00",
  sisaBunga: "1.266.429,00",
  tagihanDenda: "0,00",
};

function parseIdr(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString("id-ID").replace(/,/g, ".");
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
  const steps = ["Informasi & Tagihan", "Simulasi", "Simpan Perubahan"];

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

function DebtSimulationBillingTable({
  principalDebt,
  interestDebt,
  otherDebt,
}: {
  principalDebt: string;
  interestDebt: string;
  otherDebt: string;
}) {
  const previousPrincipalDebt = 0;
  const previousInterestDebt = 125_000;
  const previousOtherDebt = 0;

  const nextPrincipalDebt = parseIdr(principalDebt);
  const nextInterestDebt = parseIdr(interestDebt);
  const nextOtherDebt = parseIdr(otherDebt);

  const previousTotalObligation =
    parseIdr(billingRow.totalBelumDibayar) +
    previousPrincipalDebt +
    previousInterestDebt +
    previousOtherDebt;

  const nextTotalObligation =
    parseIdr(billingRow.totalBelumDibayar) +
    nextPrincipalDebt +
    nextInterestDebt +
    nextOtherDebt;

  const adjustmentAmount = Math.abs(nextInterestDebt - previousInterestDebt);
  const adjustmentType =
    nextInterestDebt > previousInterestDebt
      ? "Penambahan Hutang Bunga"
      : nextInterestDebt < previousInterestDebt
        ? "Pengurangan Hutang Bunga"
        : "Tidak Ada Perubahan";

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Simulasi Perubahan Hutang Bunga
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[2050px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
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
              <th className="w-[175px] px-3 py-3 text-right">
                Tunggakan Bunga
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[190px] px-3 py-3">
                Jenis Penyesuaian
              </th>
              <th className="w-[155px] px-3 py-3 text-right">
                Nominal
                <br />
                Penyesuaian
              </th>
              <th className="w-[175px] px-3 py-3 text-right">
                Tunggakan Bunga
                <br />
                Setelah Penyesuaian
              </th>
              <th className="w-[175px] px-3 py-3 text-right">
                Total Kewajiban
                <br />
                Sebelum Penyesuaian
              </th>
              <th className="w-[175px] px-3 py-3 text-right">
                Total Kewajiban
                <br />
                Setelah Penyesuaian
              </th>
            </tr>
          </thead>

          <tbody className="text-[12px] text-black">
            <tr className="border-b border-slate-100 bg-white">
              <td className="px-3 py-3 font-semibold tabular-nums">
                {billingRow.jatuhTempo}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {billingRow.totalBelumDibayar}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {billingRow.tagihanPokok}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {billingRow.tagihanBunga}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {billingRow.sisaPokok}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {billingRow.sisaBunga}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {billingRow.tagihanDenda}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {formatIdr(previousInterestDebt)}
              </td>
              <td className="px-3 py-3 font-semibold">{adjustmentType}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {formatIdr(adjustmentAmount)}
              </td>
              <td className="px-3 py-3 text-right font-bold tabular-nums text-[#2563EB]">
                {formatIdr(nextInterestDebt)}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {formatIdr(previousTotalObligation)}
              </td>
              <td className="px-3 py-3 text-right font-bold tabular-nums text-[#2563EB]">
                {formatIdr(nextTotalObligation)}
              </td>
            </tr>
          </tbody>
        </table>
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
  const [principalDebt, setPrincipalDebt] = React.useState("0,00");
  const [interestDebt, setInterestDebt] = React.useState("125.000,00");
  const [otherDebt, setOtherDebt] = React.useState("0,00");

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setPrincipalDebt("0,00");
    setInterestDebt("125.000,00");
    setOtherDebt("0,00");
  }, [open]);

  function nextStep() {
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }

    toast.success("Perubahan hutang tersimpan", {
      description: `Rekening ${accountNo} berhasil diperbarui.`,
    });
    onOpenChange(false);
  }

  const simulationRows = [
    { label: "Tunggakan Pokok", value: principalDebt },
    { label: "Tunggakan Bunga", value: interestDebt },
    { label: "Denda dan Biaya Lainnya", value: otherDebt },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-loan-debt-wizard="true"
        className="w-[calc(100vw-1rem)] max-w-[1040px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl sm:w-[1040px] [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900">
            Ubah Hutang Bunga
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
                    onClick={() =>
                      toast("Riwayat Perubahan Hutang (prototype)", {
                        description: `Rekening: ${accountNo}`,
                      })
                    }
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

              <LoanBillingTablePreview accountNo={accountNo} />
            </div>
          ) : null}

          {step === 2 ? (
            <DebtSimulationBillingTable
              principalDebt={principalDebt}
              interestDebt={interestDebt}
              otherDebt={otherDebt}
            />
          ) : null}

          {step === 3 ? (
            <div className="grid gap-5">
              <div>
                <h3 className="text-[14px] font-bold uppercase tracking-wide text-black">
                  Simpan Perubahan Hutang
                </h3>
                <p className="mt-2 text-[13px] text-slate-600">
                  Periksa kembali penyesuaian berikut sebelum menyimpan.
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
                      Nama Debitur
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                      Bapak Bagus
                    </div>
                  </div>
                </div>

                <Separator className="my-5 bg-slate-200" />

                <div className="grid gap-4">
                  {simulationRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 text-[14px]"
                    >
                      <span className="text-slate-600">{row.label}</span>
                      <span className="font-extrabold tabular-nums text-[#2563EB]">
                        {row.value || "0,00"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </main>

        <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={() =>
              step === 1 ? onOpenChange(false) : setStep((current) => current - 1)
            }
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

          <button
            type="button"
            onClick={nextStep}
            className="inline-flex h-10 min-w-[145px] items-center justify-center gap-2 rounded-[5px] bg-[#2563EB] px-5 text-[12px] font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            {step === 3 ? "Simpan Perubahan" : "Lanjutkan"}
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