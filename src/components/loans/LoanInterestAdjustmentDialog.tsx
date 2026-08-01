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

const adjustmentOptions: InterestAdjustmentType[] = [
  "Pengurangan Bunga",
  "Pembebasan Seluruh Bunga",
  "Penambahan Bunga",
];

function parseIdr(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString("id-ID").replace(/,/g, ".");
}

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
      <DialogContent
        className="w-[calc(100vw-2rem)] max-w-[528px] overflow-hidden rounded-[5px] border-slate-200 bg-white p-0 shadow-2xl [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden"
      >
        <div className="px-8 pb-5 pt-10 text-center sm:px-10">
          <div className="mx-auto grid h-[92px] w-[92px] place-items-center rounded-full border-[4px] border-[#f7c8a6]">
            <span className="text-[54px] font-light leading-none text-[#f2b98f]">
              !
            </span>
          </div>

          <h3 className="mt-7 text-[28px] font-extrabold leading-tight tracking-tight text-[#3b4863]">
            Yakin untuk melakukan penyesuaian bunga?
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
      <DialogContent
        className="h-[300px] w-[calc(100vw-2rem)] max-w-[519px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden"
      >
        <div className="flex h-full flex-col items-center justify-center px-6 py-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white ring-2 ring-[#b9dfa2]">
            <Check className="h-12 w-12 text-[#33aa00]" strokeWidth={3} />
          </div>
          <h3 className="mt-6 text-[20px] font-semibold leading-tight tracking-tight text-slate-900">
            Berhasil Melakukan Penyesuaian Bunga
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

function SimulationTable({
  dueDate,
  currentInterest,
  currentTotal,
  adjustmentType,
  amount,
}: {
  dueDate: string;
  currentInterest: string;
  currentTotal: string;
  adjustmentType: InterestAdjustmentType;
  amount: string;
}) {
  const beforeInterest = parseIdr(currentInterest);
  const beforeTotal = parseIdr(currentTotal);
  const adjustmentAmount = parseIdr(amount);

  const afterInterest =
    adjustmentType === "Pembebasan Seluruh Bunga"
      ? 0
      : adjustmentType === "Penambahan Bunga"
        ? beforeInterest + adjustmentAmount
        : Math.max(0, beforeInterest - adjustmentAmount);

  const afterTotal = Math.max(0, beforeTotal - beforeInterest + afterInterest);

  return (
    <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
      <div className="bg-[#F9FAFF] px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-black">
        Simulasi Penyesuaian Bunga
      </div>

      <div className="safe-x-scroll">
        <table className="w-full min-w-[880px] border-collapse">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-left text-[11px] font-bold uppercase tracking-wide text-black">
              <th className="w-[120px] px-3 py-3">Jatuh Tempo</th>
              <th className="w-[155px] px-3 py-3 text-right">
                Tunggakan Bunga Sebelum
              </th>
              <th className="w-[175px] px-3 py-3">Jenis Penyesuaian</th>
              <th className="w-[145px] px-3 py-3 text-right">
                Nominal Penyesuaian
              </th>
              <th className="w-[155px] px-3 py-3 text-right">
                Tunggakan Bunga Setelah
              </th>
              <th className="w-[155px] px-3 py-3 text-right">
                Total Kewajiban Sebelum
              </th>
              <th className="w-[155px] px-3 py-3 text-right">
                Total Kewajiban Setelah
              </th>
            </tr>
          </thead>

          <tbody className="text-[12px] text-black">
            <tr className="border-b border-slate-100 bg-white">
              <td className="px-3 py-3 font-semibold tabular-nums">{dueDate}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {formatIdr(beforeInterest)}
              </td>
              <td className="px-3 py-3 font-semibold">{adjustmentType}</td>
              <td className="px-3 py-3 text-right tabular-nums">
                {adjustmentType === "Pembebasan Seluruh Bunga"
                  ? formatIdr(beforeInterest)
                  : formatIdr(adjustmentAmount)}
              </td>
              <td className="px-3 py-3 text-right font-bold tabular-nums text-[#5B3DF5]">
                {formatIdr(afterInterest)}
              </td>
              <td className="px-3 py-3 text-right tabular-nums">
                {formatIdr(beforeTotal)}
              </td>
              <td className="px-3 py-3 text-right font-bold tabular-nums text-[#5B3DF5]">
                {formatIdr(afterTotal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function LoanInterestAdjustmentDialog({
  open,
  onOpenChange,
  dueDate,
  currentInterest = "0,00",
  currentTotal = "0,00",
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dueDate: string;
  currentInterest?: string;
  currentTotal?: string;
  onSave?: (adjustment: InterestAdjustment) => void;
}) {
  const [adjustmentType, setAdjustmentType] = React.useState<
    InterestAdjustmentType | ""
  >("");
  const [amount, setAmount] = React.useState("");
  const [effectiveDate, setEffectiveDate] = React.useState("");
  const [interestPeriod, setInterestPeriod] = React.useState("");
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
    setInterestPeriod("");
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
    if (isAdditionalInterest && !interestPeriod.trim()) {
      toast("Periode bunga wajib diisi");
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
      interestPeriod,
      reason,
      previousInterest: currentInterest,
    });
    setConfirmOpen(false);
    setSuccessOpen(true);
  }

  const inputClassName = cn(
    "h-[32px] rounded-[5px] border-[#CBD5E1] bg-white px-3",
    "text-[14px] font-normal text-slate-900 shadow-none",
    "placeholder:text-[#64748B] focus-visible:ring-0 focus-visible:ring-offset-0",
  );

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
          className="w-[calc(100vw-1rem)] max-w-[880px] overflow-hidden rounded-[14px] border-slate-200 bg-white p-0 shadow-2xl sm:w-[880px] [&>button[aria-label=Close]]:hidden [&>button.absolute.right-4.top-4]:hidden [&_[data-slot=dialog-close]]:hidden"
        >
          <header className="flex items-center justify-between border-b border-[#CBD5E1] px-6 py-4">
            <h2 className="text-[18px] font-extrabold leading-tight text-[#1F2A3D]">
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

          <main className="max-h-[65vh] overflow-auto px-6 py-6">
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
                        className={cn(inputClassName, "text-left tabular-nums")}
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

                  <SimulationTable
                    dueDate={dueDate}
                    currentInterest={currentInterest}
                    currentTotal={currentTotal}
                    adjustmentType={adjustmentType}
                    amount={amount}
                  />
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