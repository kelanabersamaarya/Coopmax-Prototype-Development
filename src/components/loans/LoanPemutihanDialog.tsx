"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { X, CheckSquare } from "lucide-react";
import { toast } from "sonner";

function RowKV({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid items-center gap-3 py-1.5 [grid-template-columns:170px_minmax(0,1fr)]">
      <div className="text-sm font-semibold text-slate-700">{label}</div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-semibold text-slate-700">{children}</div>;
}

const TIPE_TRANSAKSI = "Pemutihan Pinjaman";

export default function LoanPemutihanDialog({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accountNo: string;
}) {
  const [tanggal, setTanggal] = React.useState("20-04-2026");
  const [tipeTransaksi, setTipeTransaksi] = React.useState(TIPE_TRANSAKSI);
  const [keterangan, setKeterangan] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    // reset ringan saat dibuka supaya konsisten
    setTanggal("20-04-2026");
    setTipeTransaksi(TIPE_TRANSAKSI);
    setKeterangan("");
    setConfirm(false);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[920px]",
          "max-w-[920px]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // hide default close (kita pakai tombol sendiri)
          "[&>button[aria-label=Close]]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Pemutihan Pinjaman
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-5">
            {/* Summary */}
            <div className="rounded-2xl bg-white">
              <div className="grid gap-1">
                <RowKV label="Total Pinjaman" value="12.000.000,00" />
                <RowKV label="Sisa Pinjaman" value="10.553.571,00" />
                <RowKV label="Angsuran Pokok" value="1.000.000,00" />
                <RowKV label="Angsuran Bunga" value="120.000,00" />
                <RowKV label="Hutang Pokok" value="0,00" />
                <RowKV label="Hutang Bunga" value="0,00" />
              </div>
            </div>

            <Separator className="my-5 bg-slate-200/80" />

            {/* Form */}
            <div className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>
                  Tanggal<span className="text-rose-600"> *</span>
                </FieldLabel>
                <Input
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="h-10 rounded-xl border-slate-200 bg-white"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>
                  Tipe Transaksi<span className="text-rose-600"> *</span>
                </FieldLabel>
                <div className="relative">
                  <select
                    value={tipeTransaksi}
                    onChange={(e) => setTipeTransaksi(e.target.value)}
                    className={cn(
                      "h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900",
                      "shadow-sm outline-none transition focus:border-[hsl(var(--app-accent))] focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20",
                    )}
                  >
                    <option value={TIPE_TRANSAKSI}>{TIPE_TRANSAKSI}</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Nominal</FieldLabel>
                <Input
                  value="11.820.000,00"
                  readOnly
                  className="h-10 rounded-xl border-slate-200 bg-slate-200/70 text-slate-800"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Bayar Pokok</FieldLabel>
                <div className="text-sm font-semibold text-slate-700">
                  10.553.571,00
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Bayar Bunga</FieldLabel>
                <div className="text-sm font-semibold text-slate-700">
                  1.266.429,00
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Bayar Hutang Bunga</FieldLabel>
                <div className="text-sm font-semibold text-slate-700">0,00</div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start">
                <FieldLabel>
                  Keterangan<span className="text-rose-600"> *</span>
                </FieldLabel>
                <Textarea
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="min-h-[140px] rounded-xl border-slate-200 bg-white"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className="hidden sm:block" />
                <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <Checkbox checked={confirm} onCheckedChange={(v) => setConfirm(!!v)} />
                  Yakin untuk melunasi pemutihan pinjaman ini
                </label>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-500 px-5 text-sm font-semibold text-white ring-1 ring-slate-500/20 transition hover:bg-slate-600"
            >
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/15">
                ×
              </span>
              Tutup
            </button>

            <button
              type="button"
              onClick={() => {
                if (!keterangan.trim()) {
                  toast("Keterangan wajib diisi", { description: "Mohon isi keterangan terlebih dahulu." });
                  return;
                }
                if (!confirm) {
                  toast("Konfirmasi diperlukan", {
                    description: "Centang persetujuan sebelum menyimpan.",
                  });
                  return;
                }
                toast.success("Pemutihan tersimpan (prototype)", {
                  description: `Rekening: ${accountNo} • Tanggal: ${tanggal}`,
                });
                onOpenChange(false);
              }}
              className={cn(
                "inline-flex h-10 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white",
                "bg-green-600 ring-1 ring-green-600/20 transition hover:bg-green-700",
              )}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Simpan
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}