"use client";

import * as React from "react";
import { Check, ChevronRight, X } from "lucide-react";
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
          const hasNextStep = index < steps.length - 1;

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

              {hasNextStep ? (
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
        "grid gap-2 sm:grid-cols-[180px_minmax(0,1fr)]",
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
      </label>
      <div className="min-w-0">{children}</div>
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
  const [changeReason, setChangeReason] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setNewRate("");
    setEffectiveDate("");
    setChangeReason("");
  }, [open]);

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
      description: `Rekening ${accountNo} menggunakan bunga baru ${newRate}% mulai ${effectiveDate}.`,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[760px]",
          "max-w-[760px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Ubah Bunga Pinjaman
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

          <main className="border-t border-slate-100 px-6 py-6">
            {step === 1 ? (
              <div className="mt-1 overflow-hidden rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm ring-1 ring-white/10 md:p-6">
                <div className="text-[16px] font-extrabold tracking-wide text-white/90">
                  INFORMASI REKENING PINJAMAN
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
              <div className="mx-auto max-w-[700px]">
                <div className="grid gap-5">
                  <ChangeFieldRow label="Suku Bunga Baru">
                    <Input
                      value={newRate}
                      onChange={(event) => setNewRate(event.target.value)}
                      placeholder="Masukkan suku bunga baru"
                      inputMode="decimal"
                      className={fieldClassName}
                      autoFocus
                    />
                  </ChangeFieldRow>

                  <ChangeFieldRow label="Tanggal Efektif">
                    <DatePickerDmyField
                      value={effectiveDate}
                      onChange={setEffectiveDate}
                      inputClassName={fieldClassName}
                      placeholder="DD-MM-YYYY"
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
              <div className="mx-auto max-w-md text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </span>

                <div className="mt-5 text-[18px] font-extrabold text-slate-900">
                  Simulasi Perubahan Bunga
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  Suku bunga rekening{" "}
                  <span className="font-bold text-slate-900">{accountNo}</span>{" "}
                  berubah dari{" "}
                  <span className="font-bold text-slate-900">12,00%</span>{" "}
                  menjadi{" "}
                  <span className="font-bold text-slate-900">{newRate}%</span>{" "}
                  per tahun mulai{" "}
                  <span className="font-bold text-slate-900">
                    {effectiveDate}
                  </span>
                  .
                </p>

                <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 text-left ring-1 ring-slate-200">
                  <div className="flex items-center justify-between gap-4 text-[13px]">
                    <span className="text-slate-600">Baki Debet</span>
                    <span className="font-extrabold text-slate-900">
                      10.553.571,00
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 text-[13px]">
                    <span className="text-slate-600">Sisa Tenor</span>
                    <span className="font-extrabold text-slate-900">
                      10 Bulan
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3 text-[13px]">
                    <span className="font-bold text-slate-900">
                      Bunga Baru
                    </span>
                    <span className="font-extrabold text-[#5B3DF5]">
                      {newRate}% per tahun
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3 text-[13px]">
                    <div className="font-bold text-slate-900">
                      Alasan Perubahan
                    </div>
                    <div className="mt-1 leading-relaxed text-slate-600">
                      {changeReason}
                    </div>
                  </div>
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
              className={cn(
                footerButtonClass,
                "min-w-[105px] bg-[#77839A] text-white hover:bg-[#6b768c]",
              )}
            >
              <X className="h-4 w-4" strokeWidth={3} />
              {step === 1 ? "Batal" : "Kembali"}
            </button>

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
  );
}