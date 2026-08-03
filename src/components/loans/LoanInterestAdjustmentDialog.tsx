"use client";

import * as React from "react";
import { Check, CheckSquare, X } from "lucide-react";
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
  previousInterest?: string;
};

export type InterestAdjustmentBillingRow = {
  totalBelumDibayar: string;
  tagihanPokok: string;
  tagihanBunga: string;
  sisaPokok: string;
  sisaBunga: string;
  tagihanDenda: string;
};

const adjustmentOptions: InterestAdjustmentType[] = [
  "Pengurangan Bunga",
  "Pembebasan Seluruh Bunga",
  "Penambahan Bunga",
];

function AdjustmentConfirmDialog({
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
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[528px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden">
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <div className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </div>
          </div>

          <h3 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin Melakukan Perubahan Bunga?
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

function AdjustmentSuccessDialog({
  open,
  onOk,
}: {
  open: boolean;
  onOk: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (!nextOpen ? onOk() : null)}>
      <DialogContent className="h-[300px] w-[calc(100vw-2rem)] max-w-[519px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden">
        <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
            <Check className="h-12 w-12 text-[#33aa00]" strokeWidth={3} />
          </div>

          <h3 className="mt-6 text-[20px] font-semibold leading-tight tracking-tight text-slate-900">
            Berhasil Melakukan Perubahan Bunga
          </h3>

          <button
            type="button"
            onClick={onOk}
            className="mt-7 h-[60px] w-[190px] rounded-[10px] bg-[#2f80ed] text-[16px] font-semibold text-white ring-2 ring-[#2f80ed]/30 transition hover:bg-[#266ed0]"
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LoanInterestAdjustmentDialog({
  open,
  onOpenChange,
  dueDate,
  currentInterest = "0,00",
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dueDate: string;
  currentInterest?: string;
  currentTotal?: string;
  billingRow?: InterestAdjustmentBillingRow;
  onSave?: (adjustment: InterestAdjustment) => void;
}) {
  const [adjustmentType, setAdjustmentType] = React.useState<
    InterestAdjustmentType | ""
  >("");
  const [amount, setAmount] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);

  const isAdditionalInterest = adjustmentType === "Penambahan Bunga";
  const amountLabel = isAdditionalInterest
    ? "Nominal Bunga Tambahan"
    : "Nominal Pengurangan";

  React.useEffect(() => {
    if (!open) return;

    setAdjustmentType("");
    setAmount("");
    setEffectiveDate("");
    setReason("");
    setConfirmOpen(false);
    setSuccessOpen(false);
  }, [open]);

  function validateAdjustment() {
    if (!adjustmentType) {
      toast("Jenis penyesuaian wajib dipilih");
      return false;
    }

    if (adjustmentType !== "Pembebasan Seluruh Bunga" && !amount.trim()) {
      toast("Nominal penyesuaian wajib diisi");
      return false;
    }

    if (isAdditionalInterest && !effectiveDate.trim()) {
      toast("Tanggal efektif wajib diisi");
      return false;
    }

    if (!reason.trim()) {
      toast(
        isAdditionalInterest
          ? "Alasan penambahan wajib diisi"
          : "Alasan penyesuaian wajib diisi",
      );
      return false;
    }

    return true;
  }

  function confirmSave() {
    if (!adjustmentType) return;

    onSave?.({
      type: adjustmentType,
      amount,
      effectiveDate,
      interestPeriod: "",
      reason,
      previousInterest: currentInterest,
    });

    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  const inputClassName = cn(
    "h-[32px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
    "text-[14px] font-normal text-slate-900 shadow-none",
    "placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const mutedClassName = cn(inputClassName, "interest-adjustment-muted-field");
  const activeClassName = cn(inputClassName, "interest-adjustment-active-field");

  return (
    <>
      <AdjustmentConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmSave}
      />

      <AdjustmentSuccessDialog
        open={successOpen}
        onOk={() => {
          setSuccessOpen(false);
          onOpenChange(false);
        }}
      />

      <Dialog open={open && !successOpen} onOpenChange={onOpenChange}>
        <DialogContent
          data-interest-adjustment-dialog="true"
          className="w-[calc(100vw-1rem)] max-w-[800px] overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl sm:w-[800px] [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden [&_[data-radix-dialog-close]]:hidden"
        >
          <style>
            {`
              [data-interest-adjustment-dialog="true"] .interest-adjustment-muted-field,
              [data-interest-adjustment-dialog="true"] .interest-adjustment-muted-field::placeholder {
                color: #94a3b8 !important;
                opacity: 1 !important;
              }

              [data-interest-adjustment-dialog="true"] .interest-adjustment-active-field {
                color: #0f172a !important;
              }

              [data-interest-adjustment-dialog="true"] input:focus,
              [data-interest-adjustment-dialog="true"] input:focus-visible,
              [data-interest-adjustment-dialog="true"] textarea:focus,
              [data-interest-adjustment-dialog="true"] textarea:focus-visible,
              [data-interest-adjustment-dialog="true"] button[role="combobox"]:focus,
              [data-interest-adjustment-dialog="true"] button[role="combobox"]:focus-visible,
              [data-interest-adjustment-dialog="true"] button[role="combobox"][data-state="open"],
              [data-interest-adjustment-dialog="true"] [data-slot="select-trigger"]:focus,
              [data-interest-adjustment-dialog="true"] [data-slot="select-trigger"]:focus-visible,
              [data-interest-adjustment-dialog="true"] [data-slot="select-trigger"][data-state="open"],
              [data-interest-adjustment-dialog="true"] [data-slot="popover-trigger"]:focus,
              [data-interest-adjustment-dialog="true"] [data-slot="popover-trigger"]:focus-visible,
              [data-interest-adjustment-dialog="true"] [data-slot="popover-trigger"][data-state="open"] {
                border-color: #cbd5e1 !important;
                outline: 0 !important;
                box-shadow: none !important;
                --tw-ring-color: transparent !important;
                --tw-ring-shadow: 0 0 #0000 !important;
                --tw-ring-offset-shadow: 0 0 #0000 !important;
                --tw-ring-offset-width: 0px !important;
              }
            `}
          </style>

          <header className="flex items-center justify-between border-b border-[#CBD5E1] px-6 py-4">
            <h2 className="text-[18px] font-extrabold tracking-tight text-[#1F2A3D]">
              Penyesuaian Bunga
            </h2>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="max-h-[65vh] overflow-auto px-6 py-6">
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

              <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                <label className="text-[14px] font-normal text-[#002060]">
                  Tanggal Transaksi
                </label>
                <Input
                  value={dueDate}
                  readOnly
                  aria-readonly="true"
                  className={cn(
                    inputClassName,
                    "cursor-not-allowed bg-slate-200/80 text-left tabular-nums text-slate-700",
                  )}
                />
              </div>

              {adjustmentType ? (
                <>
                  <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                    <label className="text-[14px] font-normal text-[#002060]">
                      Nominal Bunga Saat Ini
                    </label>
                    <Input
                      value={currentInterest}
                      readOnly
                      aria-readonly="true"
                      className={cn(
                        inputClassName,
                        "cursor-not-allowed bg-slate-200/80 text-left tabular-nums text-slate-700",
                      )}
                    />
                  </div>

                  {adjustmentType !== "Pembebasan Seluruh Bunga" ? (
                    <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                      <label className="text-[14px] font-normal text-[#002060]">
                        {amountLabel}<span className="text-rose-600"> *</span>
                      </label>
                      <FormattedNominalInput
                        value={amount}
                        onChange={setAmount}
                        placeholder="0,00"
                        inputMode="numeric"
                        selectOnFocus
                        mutedWhenDefault
                        className={cn(inputClassName, "text-left tabular-nums")}
                      />
                    </div>
                  ) : null}

                  {isAdditionalInterest ? (
                    <div className="grid gap-2 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
                      <label className="text-[14px] font-normal text-[#002060]">
                        Tanggal Efektif<span className="text-rose-600"> *</span>
                      </label>
                      <DatePickerDmyField
                        value={effectiveDate}
                        onChange={setEffectiveDate}
                        inputClassName={cn(
                          !effectiveDate.trim()
                            ? mutedClassName
                            : activeClassName,
                        )}
                        placeholder="DD-MM-YYYY"
                      />
                    </div>
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
                      className={cn(
                        "min-h-[112px] rounded-[5px] border-[#CBD5E1] bg-white text-[14px] shadow-none",
                        "focus-visible:ring-0",
                        reason.trim()
                          ? "interest-adjustment-active-field"
                          : "interest-adjustment-muted-field",
                      )}
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>

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
              onClick={() => {
                if (validateAdjustment()) setConfirmOpen(true);
              }}
              className="inline-flex h-[32px] min-w-[90px] items-center justify-center gap-2 rounded-[6px] bg-[#2fb300] px-3 text-[12px] font-bold text-white transition hover:bg-[#279800]"
            >
              <CheckSquare className="h-4 w-4" strokeWidth={3} />
              Simpan
            </button>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
}