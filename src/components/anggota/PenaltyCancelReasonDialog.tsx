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
    <div className="grid gap-3 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-start">
      <div className="pt-2 text-[14px] font-normal text-slate-900">
        {label}
        {required ? <span className="text-rose-600"> *</span> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function PenaltyCancelReasonDialog({
  open,
  onOpenChange,
  tanggal,
  nominal,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tanggal: string;
  nominal: string;
  onConfirm: (reason: string, cancelDate: string) => void;
}) {
  const [reason, setReason] = React.useState("");
  const [cancelDate, setCancelDate] = React.useState(getTodayDmy());

  React.useEffect(() => {
    if (!open) return;
    setReason("");
    setCancelDate(getTodayDmy());
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[700px]",
          "max-w-[700px]",
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
                Pembatalan Denda
              </div>

              {/* Keep props used but hidden (info tidak tampil di header sesuai request) */}
              <div className="sr-only">
                {tanggal} • {nominal}
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
              <FieldRow label="Tanggal pembatalan" required>
                <DatePickerDmyField
                  value={cancelDate}
                  onChange={setCancelDate}
                  inputClassName={cn(
                    "h-11 rounded-[5px] border-slate-200 bg-white pr-11 text-[14px] font-normal text-slate-900",
                  )}
                  popoverAlign="end"
                  placeholder="DD-MM-YYYY"
                />
              </FieldRow>

              <FieldRow label="Alasan pembatalan" required>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Wajib diisi. Jelaskan alasan pembatalan denda..."
                  className={cn(
                    "min-h-[160px]",
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
            <div className="flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-11 items-center justify-center px-5 text-[14px] font-semibold",
                  R,
                  "bg-slate-600 text-white ring-1 ring-slate-600/20 transition hover:bg-slate-700",
                )}
              >
                <X className="mr-2 h-4 w-4" strokeWidth={3} />
                Batalkan
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!cancelDate.trim()) {
                    toast("Tanggal pembatalan wajib diisi", {
                      description: "Mohon pilih tanggal pembatalan terlebih dahulu.",
                    });
                    return;
                  }
                  if (!reason.trim()) {
                    toast("Alasan wajib diisi", {
                      description:
                        "Mohon isi alasan pembatalan denda sebelum menyimpan.",
                    });
                    return;
                  }
                  onConfirm(reason.trim(), cancelDate.trim());
                  onOpenChange(false);
                  toast.success("Denda dibatalkan (prototype)", {
                    description: `Tanggal pembatalan: ${cancelDate}`,
                  });
                }}
                className={cn(
                  "inline-flex h-11 items-center justify-center px-5 text-[14px] font-semibold",
                  R,
                  "bg-emerald-600 text-white ring-1 ring-emerald-600/20 transition hover:bg-emerald-700",
                )}
              >
                <CheckSquare className="mr-2 h-4 w-4" strokeWidth={3} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}