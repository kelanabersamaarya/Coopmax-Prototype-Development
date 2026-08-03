"use client";

import * as React from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const accountInfo = [
  ["Nomor Rekening Pinjaman", "SMG260004"],
  ["Nama Anggota / Debitur", "Bapak Bagus"],
  ["Nama Produk", "Pinjaman Billing"],
  ["Status Pinjaman", "Aktif / Sudah Dicairkan"],
  ["Baki Debet Pokok", "10.553.571,00"],
  ["Sisa Tenor", "12 Bulan"],
  ["Tanggal Jatuh Tempo Akhir", "07-04-2027"],
  ["Nominal Angsuran", "1.120.000,00"],
  ["Suku Bunga", "12,00% per tahun"],
] as const;

const bills = [
  ["1", "25-01-2026", "916.667,00", "833.333,00", "83.333,00", "75.000,00"],
  ["2", "25-02-2026", "916.667,00", "833.333,00", "83.333,00", "75.000,00"],
  ["3", "25-03-2026", "916.667,00", "916.667,00", "83.333,00", "0,00"],
];

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

function StepIndicator({ step }: { step: Step }) {
  const steps = ["Informasi Pinjaman", "Simulasi Perpanjangan", "Simpan Perubahan"];

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

function BillingTable() {
  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Tagihan dan Tunggakan
      </div>
      <div className="safe-x-scroll">
        <table className="w-full min-w-[850px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
              <th className="px-4 py-3">Angsuran Ke</th>
              <th className="px-4 py-3">Jatuh Tempo</th>
              <th className="px-4 py-3 text-right">Total Tagihan</th>
              <th className="px-4 py-3 text-right">Tagihan Pokok</th>
              <th className="px-4 py-3 text-right">Tagihan Bunga</th>
              <th className="px-4 py-3 text-right">Tagihan Denda</th>
            </tr>
          </thead>
          <tbody className="text-[12px] text-black">
            {bills.map((bill, index) => (
              <tr
                key={bill[0]}
                className={cn(
                  "border-b border-slate-100 last:border-b-0",
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/60",
                )}
              >
                <td className="px-4 py-3">{bill[0]}</td>
                <td className="px-4 py-3 tabular-nums">{bill[1]}</td>
                <td className="px-4 py-3 text-right tabular-nums">{bill[2]}</td>
                <td className="px-4 py-3 text-right tabular-nums">{bill[3]}</td>
                <td className="px-4 py-3 text-right tabular-nums">{bill[4]}</td>
                <td className="px-4 py-3 text-right tabular-nums">{bill[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  const [additionalTenor, setAdditionalTenor] = React.useState("12");
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setAdditionalTenor("12");
    setReason("");
  }, [open]);

  const parsedTenor = Number.parseInt(additionalTenor, 10);
  const validSimulation =
    Number.isFinite(parsedTenor) && parsedTenor > 0 && reason.trim().length > 0;
  const newDueDate = `07-04-${2027 + Math.ceil((Number.isFinite(parsedTenor) ? parsedTenor : 0) / 12)}`;

  function nextStep() {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!validSimulation) {
        toast("Data perpanjangan belum lengkap", {
          description: "Isi tambahan tenor dan alasan perpanjangan terlebih dahulu.",
        });
        return;
      }
      setStep(3);
      return;
    }

    toast.success("Perpanjangan pinjaman tersimpan", {
      description: `${accountNo} diperpanjang ${additionalTenor} bulan.`,
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
                  {accountInfo.map(([label, value]) => (
                    <AccountField
                      key={label}
                      label={label}
                      value={label === "Nomor Rekening Pinjaman" ? accountNo : value}
                    />
                  ))}
                </div>
              </div>

              <BillingTable />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-6">
              <div className="rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  Simulasi Perpanjangan Pinjaman
                </div>
                <div className="grid gap-5 p-5">
                  <div className="grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)] sm:items-center">
                    <label className="text-[14px] font-normal text-[#002060]">
                      Tambahan Tenor (Bulan)<span className="text-rose-600"> *</span>
                    </label>
                    <Input
                      value={additionalTenor}
                      onChange={(event) =>
                        setAdditionalTenor(event.target.value.replace(/[^\d]/g, ""))
                      }
                      className="h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      inputMode="numeric"
                      placeholder="Masukkan tambahan tenor"
                    />
                  </div>

                  <div className="grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)] sm:items-start">
                    <label className="pt-2 text-[14px] font-normal text-[#002060]">
                      Alasan Perpanjangan<span className="text-rose-600"> *</span>
                    </label>
                    <Textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      className="min-h-[112px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      placeholder="Masukkan alasan perpanjangan pinjaman"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] border border-slate-200 bg-[#F9FAFF] p-5">
                <div className="text-[14px] font-bold uppercase tracking-wide text-black">
                  Ringkasan Perpanjangan
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[12px] font-semibold text-slate-500">
                      Sisa Tenor Saat Ini
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                      12 Bulan
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-slate-500">
                      Tenor Setelah Perpanjangan
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-[#2563EB]">
                      {12 + (Number.isFinite(parsedTenor) ? parsedTenor : 0)} Bulan
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-slate-500">
                      Jatuh Tempo Akhir Sebelum Perpanjangan
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                      07-04-2027
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-slate-500">
                      Jatuh Tempo Akhir Setelah Perpanjangan
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-[#2563EB]">
                      {newDueDate}
                    </div>
                  </div>
                </div>
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
                    <span className="font-extrabold text-slate-900">{accountNo}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Tambahan Tenor</span>
                    <span className="font-extrabold text-[#2563EB]">
                      {additionalTenor} Bulan
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Jatuh Tempo Akhir Baru</span>
                    <span className="font-extrabold text-[#2563EB]">{newDueDate}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4 text-slate-600">
                    Alasan: <span className="font-semibold text-slate-900">{reason}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>

        <footer className="flex items-center gap-[10px] border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={() => (step === 1 ? onOpenChange(false) : setStep((current) => (current - 1) as Step))}
            className="inline-flex h-10 min-w-[105px] items-center justify-center gap-2 rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
          >
            {step === 1 ? <X className="h-4 w-4" strokeWidth={3} /> : <ChevronLeft className="h-4 w-4" strokeWidth={3} />}
            {step === 1 ? "Batal" : "Kembali"}
          </button>

          <button
            type="button"
            onClick={nextStep}
            className={cn(
              "ml-auto inline-flex h-10 min-w-[150px] items-center justify-center gap-2 rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
              step === 3 ? "bg-[#2fb300] hover:bg-[#279800]" : "bg-[#2563EB] hover:bg-[#1D4ED8]",
            )}
          >
            {step === 3 ? "Simpan Perpanjangan" : "Lanjutkan"}
            {step === 3 ? <Check className="h-4 w-4" strokeWidth={3} /> : <ChevronRight className="h-4 w-4" strokeWidth={3} />}
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}