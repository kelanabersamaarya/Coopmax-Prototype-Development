"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const R = "rounded-[5px]";

const TX_TYPES = ["Bayar Angsuran"] as const;
const COLLECTORS = ["Pilih Kolektor", "Dinda Sudiati", "Kolektor A", "Kolektor B"] as const;

function toDmyFromIso(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec((iso ?? "").trim());
  if (!m) return "";
  return `${m[3]}-${m[2]}-${m[1]}`;
}

export default function LoanInstallmentPaymentDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [tanggal, setTanggal] = React.useState("06-05-2026");
  const [jenis, setJenis] = React.useState<(typeof TX_TYPES)[number]>("Bayar Angsuran");
  const [kolektor, setKolektor] = React.useState<(typeof COLLECTORS)[number]>("Pilih Kolektor");

  React.useEffect(() => {
    if (!open) return;
    const todayIso = new Date().toISOString().slice(0, 10);
    setTanggal(toDmyFromIso(todayIso) || "06-05-2026");
    setJenis("Bayar Angsuran");
    setKolektor("Pilih Kolektor");
  }, [open]);

  const selectTriggerCls = cn(
    "h-11 w-full border border-slate-200 bg-white px-3 text-[14px] font-medium text-slate-900 shadow-sm",
    R,
    "justify-between",
    "[&>svg]:text-slate-400",
  );

  const labelCls = "text-[14px] font-semibold text-slate-900";
  const requiredStar = <span className="text-blue-600">*</span>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[980px]",
          "max-w-[980px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // hide default close button
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="px-6 py-5 sm:px-8">
            <div className="text-xl font-semibold tracking-tight text-slate-900">
              Pembayaran Angsuran
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Lengkapi informasi berikut untuk melanjutkan (prototype).
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-6 sm:px-8">
            <div className="grid gap-6">
              <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className={labelCls}>
                  Tanggal{requiredStar}
                </div>
                <DatePickerDmyField
                  value={tanggal}
                  onChange={setTanggal}
                  inputClassName={cn("h-11", R, "border-slate-200 bg-white text-[14px]")}
                  popoverAlign="end"
                  placeholder="DD-MM-YYYY"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className={labelCls}>
                  Jenis Transaksi{requiredStar}
                </div>
                <Select value={jenis} onValueChange={(v) => setJenis(v as any)}>
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    {TX_TYPES.map((t) => (
                      <SelectItem key={t} value={t} className="rounded-lg">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className={labelCls}>
                  Kolektor{requiredStar}
                </div>
                <Select
                  value={kolektor}
                  onValueChange={(v) => setKolektor(v as any)}
                >
                  <SelectTrigger className={selectTriggerCls}>
                    <SelectValue placeholder="Pilih Kolektor" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    {COLLECTORS.map((k) => (
                      <SelectItem key={k} value={k} className="rounded-lg">
                        {k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* keep Input imported (shadcn style parity) */}
              <div className="sr-only">
                <Input />
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "h-11 w-full px-6 text-sm font-semibold text-slate-700 sm:w-auto",
                  "bg-white ring-1 ring-slate-200 transition hover:bg-slate-50",
                  "rounded-full",
                )}
              >
                Batalkan
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!tanggal.trim()) {
                    toast("Tanggal wajib diisi", {
                      description: "Silakan pilih tanggal transaksi.",
                    });
                    return;
                  }
                  if (kolektor === "Pilih Kolektor") {
                    toast("Kolektor wajib dipilih", {
                      description: "Silakan pilih kolektor terlebih dahulu.",
                    });
                    return;
                  }

                  toast.success("Pembayaran Angsuran tersimpan (prototype)", {
                    description: `${tanggal} • ${jenis} • ${kolektor}`,
                  });
                  onOpenChange(false);
                }}
                className={cn(
                  "h-11 w-full px-6 text-sm font-semibold text-slate-700 sm:w-auto",
                  "bg-white ring-1 ring-slate-200 transition hover:bg-slate-50",
                  "rounded-full",
                )}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}