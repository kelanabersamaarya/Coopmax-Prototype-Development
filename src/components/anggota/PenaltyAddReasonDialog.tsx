"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckSquare, X } from "lucide-react";
import { toast } from "sonner";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import RupiahMoneyInput from "@/components/anggota/RupiahMoneyInput";

const R = "rounded-[5px]";

function toDmyFromIso(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso ?? "").trim());
  if (!m) return "";
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function getTodayDmy() {
  const todayIso = new Date().toISOString().slice(0, 10);
  return toDmyFromIso(todayIso);
}

function parseIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;
  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function FieldRow({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] sm:items-start">
      <div className="pt-2 text-[14px] font-normal text-slate-900">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function PenaltyAddReasonDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: (reason: string, date: string, nominalDenda: string) => void;
}) {
  const [reason, setReason] = React.useState("");
  const [date, setDate] = React.useState(getTodayDmy());
  const [nominalDenda, setNominalDenda] = React.useState<string>("0,00");

  React.useEffect(() => {
    if (!open) return;
    setReason("");
    setDate(getTodayDmy());
    setNominalDenda("0,00");
  }, [open]);

  const footerBtnBase = cn(
    "inline-flex items-center justify-center gap-2",
    "w-[90px] h-[28px] px-2",
    "rounded-[6px]",
    "text-[11px] font-bold tracking-tight text-white",
    "ring-1 transition",
    "leading-none",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[760px]",
          "max-w-[760px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="min-w-0">
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                Tambah Denda
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center",
                R,
                "text-slate-700 transition hover:bg-slate-100",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-6">
            <div className="grid gap-5">
              <FieldRow label="Tanggal denda" required>
                <DatePickerDmyField
                  value={date}
                  onChange={setDate}
                  inputClassName={cn(
                    "h-11 w-full rounded-[5px] border-slate-200 bg-white pr-11 text-[14px] font-normal text-slate-900",
                  )}
                  popoverAlign="end"
                  placeholder="DD-MM-YYYY"
                />
              </FieldRow>

              <FieldRow label="Nominal denda" required>
                <RupiahMoneyInput
                  value={nominalDenda}
                  onChange={setNominalDenda}
                  placeholder="0,00"
                  aria-label="Nominal denda"
                />
              </FieldRow>

              <FieldRow label="Alasan penambahan" required>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Wajib diisi. Jelaskan alasan penambahan denda..."
                  className={cn(
                    "min-h-[180px] w-full",
                    R,
                    "border-slate-200 bg-white text-[14px] font-normal text-slate-900",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                />
              </FieldRow>

              {/* keep Input import used */}
              <div className="sr-only">
                <Input />
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  footerBtnBase,
                  "bg-[#6B7A90] ring-1 ring-[#6B7A90]/25 hover:bg-[#5f6d82]",
                )}
              >
                <X className="h-4 w-4" strokeWidth={3} />
                Batalkan
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!date.trim()) {
                    toast("Tanggal denda wajib diisi", {
                      description: "Mohon pilih tanggal denda terlebih dahulu.",
                    });
                    return;
                  }

                  if (parseIdrLike(nominalDenda) <= 0) {
                    toast("Nominal denda wajib diisi", {
                      description: "Mohon masukkan nominal denda (> 0).",
                    });
                    return;
                  }

                  if (!reason.trim()) {
                    toast("Alasan wajib diisi", {
                      description:
                        "Mohon isi alasan penambahan denda sebelum menyimpan.",
                    });
                    return;
                  }

                  onConfirm(reason.trim(), date.trim(), nominalDenda.trim());
                  onOpenChange(false);
                  // ❌ sengaja tidak menampilkan toast sukses (sesuai request)
                }}
                className={cn(
                  footerBtnBase,
                  "bg-emerald-600 ring-1 ring-emerald-600/20 hover:bg-emerald-700",
                )}
              >
                <CheckSquare className="h-4 w-4" strokeWidth={3} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}