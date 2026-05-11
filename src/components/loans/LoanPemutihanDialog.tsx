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
import DatePickerDmyField from "@/components/loans/DatePickerDmyField";

function RowKV({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid items-center gap-3 py-1.5 [grid-template-columns:170px_minmax(0,1fr)]">
      <div className="text-sm font-normal text-slate-700">{label}</div>
      <div className="text-sm font-normal text-slate-900">{value}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-normal text-slate-700">{children}</div>;
}

function parseIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  // "11.820.000,00" -> 11820000
  // "11820000" -> 11820000
  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdr2(n: number) {
  const value = Number.isFinite(n) ? n : 0;
  return value.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const TIPE_TRANSAKSI = "Pemutihan Pinjaman";

const R5 = "rounded-[5px]";
const H30 = "h-[30px]";

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
  const [nominal, setNominal] = React.useState("11.820.000,00");
  const [keterangan, setKeterangan] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setTanggal("20-04-2026");
    setTipeTransaksi(TIPE_TRANSAKSI);
    setNominal("11.820.000,00");
    setKeterangan("");
    setConfirm(false);
  }, [open]);

  const footerH = 72; // kira-kira tinggi footer + separator

  const btnBase = cn(
    "inline-flex items-center justify-center gap-2",
    "w-[90px]",
    H30,
    "px-2",
    "rounded-[6px]",
    "text-[11px] font-bold tracking-tight text-white",
    "ring-1 transition",
    "leading-none",
    "focus:outline-none focus-visible:ring-4",
  );

  const nominalN = React.useMemo(() => parseIdrLike(nominal), [nominal]);

  // Rasio mengikuti contoh screenshot (±)
  const POKOK_RATIO = 0.893;
  const bungaN = React.useMemo(
    () => Math.max(0, Math.round(nominalN * (1 - POKOK_RATIO))),
    [nominalN],
  );
  const pokokN = React.useMemo(() => Math.max(0, nominalN - bungaN), [nominalN, bungaN]);
  const hutangBungaN = 0;

  const inputBase = cn(
    H30,
    R5,
    "border-slate-200 bg-white text-slate-900",
    "font-normal",
    "shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const selectBase = cn(
    H30,
    R5,
    "w-full border border-slate-200 bg-white px-3 text-sm font-normal text-slate-900",
    "shadow-sm outline-none transition",
    "focus:border-[hsl(var(--app-accent))] focus:ring-2 focus:ring-[hsl(var(--app-accent))]/20",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1.25rem)] sm:w-[760px]",
          "max-w-[760px]",
          "max-h-[85vh]",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          "overflow-hidden",
          // HIDE default shadcn/radix close button (biar X cuma 1)
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-lg font-semibold tracking-tight text-slate-900">
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

          {/* Body (scroll) */}
          <div
            className="overflow-auto px-6 py-5"
            style={{ maxHeight: `calc(85vh - 64px - ${footerH}px)` }}
          >
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
            <div className="grid gap-4 pb-6">
              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>
                  Tanggal<span className="text-rose-600"> *</span>
                </FieldLabel>

                <DatePickerDmyField
                  value={tanggal}
                  onChange={setTanggal}
                  inputClassName={cn(inputBase, "pr-11 text-sm")}
                  popoverAlign="end"
                  placeholder="DD-MM-YYYY"
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
                    className={selectBase}
                  >
                    <option value={TIPE_TRANSAKSI}>{TIPE_TRANSAKSI}</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Nominal</FieldLabel>
                <Input
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  className={cn(inputBase, "text-sm")}
                  placeholder="0,00"
                  inputMode="decimal"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Bayar Pokok</FieldLabel>
                <div className="text-sm font-normal text-slate-900">
                  {formatIdr2(pokokN)}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Bayar Bunga</FieldLabel>
                <div className="text-sm font-normal text-slate-900">
                  {formatIdr2(bungaN)}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <FieldLabel>Bayar Hutang Bunga</FieldLabel>
                <div className="text-sm font-normal text-slate-900">
                  {formatIdr2(hutangBungaN)}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start">
                <FieldLabel>
                  Keterangan<span className="text-rose-600"> *</span>
                </FieldLabel>
                <Textarea
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className={cn(R5, "min-h-[120px] border-slate-200 bg-white text-sm font-normal text-slate-900")}
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center">
                <div className="hidden sm:block" />
                <label className="flex items-center gap-3 text-sm font-normal text-slate-800">
                  <Checkbox
                    checked={confirm}
                    onCheckedChange={(v) => setConfirm(!!v)}
                  />
                  Yakin untuk melunasi pemutihan pinjaman ini
                </label>
              </div>
            </div>
          </div>

          {/* Divider di atas tombol */}
          <Separator className="bg-slate-200" />

          {/* Footer (sticky) */}
          <div className="sticky bottom-0 bg-white px-6 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  btnBase,
                  "bg-slate-500 ring-slate-500/20 hover:bg-slate-600 focus-visible:ring-slate-500/25",
                )}
              >
                <X className="h-4 w-4" strokeWidth={3} />
                Tutup
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!keterangan.trim()) {
                    toast("Keterangan wajib diisi", {
                      description: "Mohon isi keterangan terlebih dahulu.",
                    });
                    return;
                  }
                  if (!confirm) {
                    toast("Konfirmasi diperlukan", {
                      description: "Centang persetujuan sebelum menyimpan.",
                    });
                    return;
                  }
                  toast.success("Pemutihan Pinjaman Berhasil Dilakukan", {
                    description: `Rekening: ${accountNo} • Tanggal: ${tanggal} • Nominal: ${formatIdr2(nominalN)}`,
                  });
                  onOpenChange(false);
                }}
                className={cn(
                  btnBase,
                  "bg-green-600 ring-green-600/20 hover:bg-green-700 focus-visible:ring-green-600/25",
                )}
              >
                <CheckSquare className="h-4 w-4" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}