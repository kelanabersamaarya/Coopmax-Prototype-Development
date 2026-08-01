"use client";

import * as React from "react";
import { CheckSquare, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import FormattedNominalInput from "@/components/loans/FormattedNominalInput";

export type InterestAdjustmentType =
  | "Pengurangan Bunga"
  | "Pembebasan Seluruh Bunga"
  | "Penambahan Bunga";

export type InterestAdjustment = {
  type: InterestAdjustmentType;
  amount: string;
  effectiveDate: string;
  interestPeriod: string;
  reason: string;
};

const adjustmentOptions: InterestAdjustmentType[] = [
  "Pengurangan Bunga",
  "Pembebasan Seluruh Bunga",
  "Penambahan Bunga",
];

export default function LoanInterestAdjustmentDialog({
  open,
  onOpenChange,
  dueDate,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dueDate: string;
  onSave?: (adjustment: InterestAdjustment) => void;
}) {
  const [adjustmentType, setAdjustmentType] = React.useState<
    InterestAdjustmentType | ""
  >("");
  const [amount, setAmount] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [interestPeriod, setInterestPeriod] = React.useState("");
  const [reason, setReason] = React.useState("");

  const isAdditionalInterest = adjustmentType === "Penambahan Bunga";

  React.useEffect(() => {
    if (!open) return;

    setAdjustmentType("");
    setAmount("");
    setEffectiveDate("");
    setInterestPeriod("");
    setReason("");
  }, [open]);

  function saveAdjustment() {
    if (!adjustmentType) {
      toast("Jenis penyesuaian wajib dipilih");
      return;
    }

    if (adjustmentType !== "Pembebasan Seluruh Bunga" && !amount.trim()) {
      toast("Nominal penyesuaian wajib diisi");
      return;
    }

    if (isAdditionalInterest && !effectiveDate.trim()) {
      toast("Tanggal efektif wajib diisi");
      return;
    }

    if (isAdditionalInterest && !interestPeriod.trim()) {
      toast("Periode bunga wajib diisi");
      return;
    }

    if (!reason.trim()) {
      toast(
        isAdditionalInterest
          ? "Alasan penambahan wajib diisi"
          : "Alasan penyesuaian wajib diisi",
      );
      return;
    }

    onSave?.({
      type: adjustmentType,
      amount,
      effectiveDate,
      interestPeriod,
      reason,
    });

    toast.success("Penyesuaian bunga tersimpan", {
      description: `${adjustmentType} • Tagihan ${dueDate}`,
    });
    onOpenChange(false);
  }

  const inputClassName = cn(
    "h-[32px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
    "text-[14px] font-normal text-slate-900 shadow-none",
    "placeholder:text-[#64748B]",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const readOnlyInputClassName = cn(
    inputClassName,
    "cursor-not-allowed bg-slate-200/80 text-slate-700",
  );

  const nominalInputClassName = cn(inputClassName, "text-left tabular-nums");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[720px]",
          "max-w-[720px] overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <header className="flex items-center justify-between border-b border-[#CBD5E1] px-6 py-4">
            <h2 className="text-[18px] font-extrabold leading-tight text-[#1F2A3D]">
              Penyesuaian Bunga
            </h2>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <main className="max-h-[60vh] overflow-auto px-6 py-6">
            <div className="grid gap-5">
              <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                <label className="text-[14px] font-normal text-[#002060]">
                  Jenis Penyesuaian<span className="text-rose-600"> *</span>
                </label>

                <Select
                  value={adjustmentType}
                  onValueChange={(value) => {
                    setAdjustmentType(value as InterestAdjustmentType);
                    setAmount("");
                    setEffectiveDate("");
                    setInterestPeriod("");
                    setReason("");
                  }}
                >
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="Pilih Jenis Penyesuaian" />
                  </SelectTrigger>
                  <SelectContent className="rounded-[5px] border-slate-200">
                    {adjustmentOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {adjustmentType ? (
                <>
                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                    <label className="text-[14px] font-normal text-[#002060]">
                      Nominal Bunga Saat Ini
                    </label>
                    <Input
                      value="83.333,00"
                      readOnly
                      aria-readonly="true"
                      className={cn(
                        readOnlyInputClassName,
                        "text-left tabular-nums",
                      )}
                    />
                  </div>

                  {adjustmentType !== "Pembebasan Seluruh Bunga" ? (
                    <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                      <label className="text-[14px] font-normal text-[#002060]">
                        {isAdditionalInterest
                          ? "Nominal Bunga Tambahan"
                          : "Nominal Penyesuaian"}
                        <span className="text-rose-600"> *</span>
                      </label>
                      <FormattedNominalInput
                        value={amount}
                        onChange={setAmount}
                        placeholder="0,00"
                        inputMode="numeric"
                        selectOnFocus
                        className={nominalInputClassName}
                      />
                    </div>
                  ) : null}

                  {isAdditionalInterest ? (
                    <>
                      <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                        <label className="text-[14px] font-normal text-[#002060]">
                          Tanggal Efektif<span className="text-rose-600"> *</span>
                        </label>
                        <DatePickerDmyField
                          value={effectiveDate}
                          onChange={setEffectiveDate}
                          inputClassName={inputClassName}
                          placeholder="DD-MM-YYYY"
                        />
                      </div>

                      <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                        <label className="text-[14px] font-normal text-[#002060]">
                          Periode Bunga<span className="text-rose-600"> *</span>
                        </label>
                        <Input
                          value={interestPeriod}
                          onChange={(event) => setInterestPeriod(event.target.value)}
                          placeholder="Masukkan periode bunga"
                          className={inputClassName}
                        />
                      </div>
                    </>
                  ) : null}

                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-start">
                    <label className="pt-2 text-[14px] font-normal text-[#002060]">
                      {isAdditionalInterest
                        ? "Alasan Penambahan"
                        : "Alasan Penyesuaian"}
                      <span className="text-rose-600"> *</span>
                    </label>
                    <Textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      placeholder={
                        isAdditionalInterest
                          ? "Masukkan alasan penambahan bunga"
                          : "Masukkan alasan penyesuaian bunga"
                      }
                      className="min-h-[112px] rounded-[5px] border-[#CBD5E1] bg-white text-[14px] shadow-none focus-visible:ring-0"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </main>

          <footer className="flex justify-end gap-3 border-t border-[#CBD5E1] px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-[32px] min-w-[90px] items-center justify-center gap-2 rounded-[6px] bg-[#77839A] px-3 text-[12px] font-bold text-white transition hover:bg-[#6b768c]"
            >
              <X className="h-4 w-4" strokeWidth={3} />
              Batal
            </button>

            <button
              type="button"
              onClick={saveAdjustment}
              className="inline-flex h-[32px] min-w-[90px] items-center justify-center gap-2 rounded-[6px] bg-[#2fb300] px-3 text-[12px] font-bold text-white transition hover:bg-[#279800]"
            >
              <CheckSquare className="h-4 w-4" strokeWidth={3} />
              Simpan
            </button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}