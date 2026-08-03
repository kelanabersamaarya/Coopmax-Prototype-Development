"use client";

import * as React from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";

type Step = 1 | 2 | 3;
type ExtensionMethod =
  | "Tenor Tambahan"
  | "Tenor Baru"
  | "Jatuh Tempo Akhir Baru";

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

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)] sm:items-center">
      <Label className="text-[14px] font-normal text-[#002060]">
        {label}
        <span className="text-rose-600"> *</span>
      </Label>
      {children}
    </div>
  );
}

function getTenorAfterExtension(
  method: ExtensionMethod,
  additionalTenor: string,
  newTenor: string,
) {
  const addition = Number.parseInt(additionalTenor, 10) || 0;
  const replacement = Number.parseInt(newTenor, 10) || 0;

  return method === "Tenor Baru" ? replacement : 12 + addition;
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
  const [method, setMethod] =
    React.useState<ExtensionMethod>("Tenor Tambahan");
  const [additionalTenor, setAdditionalTenor] = React.useState("");
  const [newTenor, setNewTenor] = React.useState("");
  const [newDueMonth, setNewDueMonth] = React.useState("");
  const [newDueYear, setNewDueYear] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [reason, setReason] = React.useState("");

  React.useEffect(() => {
    if (!open) return;

    setStep(1);
    setMethod("Tenor Tambahan");
    setAdditionalTenor("");
    setNewTenor("");
    setNewDueMonth("");
    setNewDueYear("");
    setEffectiveDate("");
    setReason("");
  }, [open]);

  const hasMethodValue =
    method === "Tenor Tambahan"
      ? Number.parseInt(additionalTenor, 10) > 0
      : method === "Tenor Baru"
        ? Number.parseInt(newTenor, 10) > 0
        : Number.parseInt(newDueMonth, 10) >= 1 &&
          Number.parseInt(newDueMonth, 10) <= 12 &&
          Number.parseInt(newDueYear, 10) >= 2027;

  const isValid =
    hasMethodValue &&
    effectiveDate.trim().length > 0 &&
    reason.trim().length > 0;

  const tenorAfterExtension = getTenorAfterExtension(
    method,
    additionalTenor,
    newTenor,
  );

  const newDueDate =
    method === "Jatuh Tempo Akhir Baru"
      ? `07-${String(newDueMonth).padStart(2, "0")}-${newDueYear || "----"}`
      : `07-04-${2026 + Math.ceil(tenorAfterExtension / 12)}`;

  function nextStep() {
    if (step === 1) {
      if (!isValid) {
        toast("Data perpanjangan belum lengkap", {
          description:
            "Lengkapi metode, nilai perpanjangan, tanggal efektif, dan alasan perpanjangan.",
        });
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    toast.success("Perpanjangan pinjaman tersimpan", {
      description: `${accountNo} diperpanjang dengan metode ${method}.`,
    });
    onOpenChange(false);
  }

  const inputClassName =
    "h-[31px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0";

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
                      value={
                        label === "Nomor Rekening Pinjaman" ? accountNo : value
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
                <div className="bg-[#F9FAFF] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
                  Form Perpanjangan Pinjaman
                </div>

                <div className="grid gap-5 p-5">
                  <FormRow label="Metode Perpanjangan">
                    <Select
                      value={method}
                      onValueChange={(value) =>
                        setMethod(value as ExtensionMethod)
                      }
                    >
                      <SelectTrigger className={inputClassName}>
                        <SelectValue />
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
                        className={inputClassName}
                        inputMode="numeric"
                        placeholder="Masukkan tenor tambahan"
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
                        className={inputClassName}
                        inputMode="numeric"
                        placeholder="Masukkan tenor baru"
                      />
                    </FormRow>
                  ) : null}

                  {method === "Jatuh Tempo Akhir Baru" ? (
                    <FormRow label="Jatuh Tempo Akhir Baru">
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          value={newDueMonth}
                          onChange={(event) =>
                            setNewDueMonth(
                              event.target.value
                                .replace(/[^\d]/g, "")
                                .slice(0, 2),
                            )
                          }
                          className={inputClassName}
                          inputMode="numeric"
                          placeholder="Bulan (01-12)"
                        />
                        <Input
                          value={newDueYear}
                          onChange={(event) =>
                            setNewDueYear(
                              event.target.value
                                .replace(/[^\d]/g, "")
                                .slice(0, 4),
                            )
                          }
                          className={inputClassName}
                          inputMode="numeric"
                          placeholder="Tahun"
                        />
                      </div>
                    </FormRow>
                  ) : null}

                  <FormRow label="Tanggal Efektif">
                    <DatePickerDmyField
                      value={effectiveDate}
                      onChange={setEffectiveDate}
                      inputClassName={inputClassName}
                      placeholder="DD-MM-YYYY"
                    />
                  </FormRow>

                  <FormRow label="Alasan Perpanjangan">
                    <Textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      className="min-h-[112px] rounded-[5px] border-[#CBD5E1] text-[14px] shadow-none focus-visible:ring-0"
                      placeholder="Masukkan alasan perpanjangan pinjaman"
                    />
                  </FormRow>
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-6">
              <div className="rounded-[12px] border border-slate-200 bg-[#F9FAFF] p-5">
                <div className="text-[14px] font-bold uppercase tracking-wide text-black">
                  Simulasi Perpanjangan
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-[12px] font-semibold text-slate-500">
                      Metode Perpanjangan
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                      {method}
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
                      {method === "Jatuh Tempo Akhir Baru"
                        ? "Menyesuaikan jatuh tempo"
                        : `${tenorAfterExtension} Bulan`}
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
                      Jatuh Tempo Akhir Baru
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-[#2563EB]">
                      {newDueDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] border border-slate-200 bg-white p-5">
                <div className="text-[14px] font-bold uppercase tracking-wide text-black">
                  Alasan Perpanjangan
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
                  {reason}
                </p>
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
                    <span className="font-extrabold text-slate-900">
                      {accountNo}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Metode Perpanjangan</span>
                    <span className="font-extrabold text-[#2563EB]">
                      {method}
                    </span>
                  </div>

                  {method === "Tenor Tambahan" ? (
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-600">Tenor Tambahan</span>
                      <span className="font-extrabold text-[#2563EB]">
                        {additionalTenor} Bulan
                      </span>
                    </div>
                  ) : null}

                  {method === "Tenor Baru" ? (
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-600">Tenor Baru</span>
                      <span className="font-extrabold text-[#2563EB]">
                        {newTenor} Bulan
                      </span>
                    </div>
                  ) : null}

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Tanggal Efektif</span>
                    <span className="font-extrabold text-slate-900">
                      {effectiveDate}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">
                      Jatuh Tempo Akhir Baru
                    </span>
                    <span className="font-extrabold text-[#2563EB]">
                      {newDueDate}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-4 text-slate-600">
                    Alasan:{" "}
                    <span className="font-semibold text-slate-900">
                      {reason}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
            onClick={nextStep}
            className={cn(
              "ml-auto inline-flex h-10 min-w-[150px] items-center justify-center gap-2 rounded-[5px] px-5 text-[12px] font-semibold text-white transition",
              step === 3
                ? "bg-[#2fb300] hover:bg-[#279800]"
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