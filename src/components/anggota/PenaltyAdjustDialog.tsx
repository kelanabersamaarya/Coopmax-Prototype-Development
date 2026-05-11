"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Minus, Plus, Trash2, X } from "lucide-react";

type Mode = "add" | "subtract";

function parseIdrLike(input: string) {
  const s = (input ?? "").trim();
  if (!s) return 0;

  const normalized = s.replace(/\./g, "").replace(",", ".");
  const cleaned = normalized.replace(/[^\d.-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatIdr0(n: number) {
  const rounded = Math.round(Number.isFinite(n) ? n : 0);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function clampNonNegative(n: number) {
  return Math.max(0, Number.isFinite(n) ? n : 0);
}

export default function PenaltyAdjustDialog({
  open,
  onOpenChange,
  basePenalty = 75000,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  basePenalty?: number;
}) {
  const [mode, setMode] = React.useState<Mode>("add");
  const [amount, setAmount] = React.useState<string>("");
  const [reason, setReason] = React.useState<string>("");

  React.useEffect(() => {
    if (!open) return;
    setMode("add");
    setAmount("");
    setReason("");
  }, [open]);

  const delta = React.useMemo(() => {
    const n = parseIdrLike(amount);
    if (n <= 0) return 0;
    return mode === "subtract" ? -n : n;
  }, [amount, mode]);

  const after = React.useMemo(
    () => clampNonNegative(basePenalty + delta),
    [basePenalty, delta],
  );

  const deltaText = React.useMemo(() => {
    if (delta === 0) return "Rp 0";
    const abs = formatIdr0(Math.abs(delta));
    return delta > 0 ? `+ Rp ${abs}` : `- Rp ${abs}`;
  }, [delta]);

  const canApply = reason.trim().length > 0 && delta !== 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[760px]",
          "max-w-[760px]",
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
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Ubah denda
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

          {/* Body */}
          <div className="px-6 py-5">
            {/* Mode buttons */}
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setMode("add")}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-[14px] font-semibold transition",
                  mode === "add"
                    ? "bg-emerald-600 text-white ring-1 ring-emerald-600/25 hover:bg-emerald-700"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
                )}
              >
                <Plus className="h-5 w-5" />
                Tambah
              </button>

              <button
                type="button"
                onClick={() => setMode("subtract")}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-[14px] font-semibold transition",
                  mode === "subtract"
                    ? "bg-amber-500 text-white ring-1 ring-amber-500/25 hover:bg-amber-600"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
                )}
              >
                <Minus className="h-5 w-5" />
                Kurangi
              </button>

              <button
                type="button"
                onClick={() => {
                  setAmount(String(basePenalty));
                  setMode("subtract");
                }}
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-[14px] font-semibold transition",
                  "bg-rose-600 text-white ring-1 ring-rose-600/25 hover:bg-rose-700",
                )}
              >
                <Trash2 className="h-5 w-5" />
                Hapus semua
              </button>
            </div>

            <div className="mt-5 grid gap-2">
              <div className="text-[13px] font-semibold text-slate-700">
                Jumlah (Rp)
              </div>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Masukkan jumlah..."
                inputMode="decimal"
                className={cn(
                  "h-11 rounded-2xl border-slate-200 bg-white",
                  "text-slate-900 placeholder:text-slate-400",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              />
            </div>

            <div className="mt-5 grid gap-2">
              <div className="text-[13px] font-semibold text-slate-700">
                Alasan penyesuaian <span className="text-rose-600">*</span>
              </div>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Wajib diisi. Jelaskan alasan penyesuaian denda..."
                className={cn(
                  "min-h-[120px] rounded-2xl border-slate-200 bg-white",
                  "text-slate-900 placeholder:text-slate-400",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              />
            </div>

            <div className="mt-5 overflow-hidden rounded-3xl bg-slate-50 ring-1 ring-slate-200">
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[13px] font-semibold text-slate-700">
                    <div>Denda sebelum</div>
                    <div>Penyesuaian</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[16px] font-extrabold text-slate-900">
                      Rp {formatIdr0(basePenalty)}
                    </div>
                    <div
                      className={cn(
                        "mt-1 text-[14px] font-extrabold",
                        delta > 0
                          ? "text-emerald-700"
                          : delta < 0
                            ? "text-amber-700"
                            : "text-slate-400",
                      )}
                    >
                      {deltaText}
                    </div>
                  </div>
                </div>

                <div className="my-4 h-px w-full bg-slate-200" />

                <div className="flex items-center justify-between gap-4">
                  <div className="text-[15px] font-extrabold text-slate-900">
                    Total setelah
                  </div>
                  <div className="text-[18px] font-extrabold text-slate-900">
                    Rp {formatIdr0(after)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "h-11 w-full rounded-full px-6 text-[14px] font-semibold sm:w-auto",
                  "bg-white text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50",
                )}
              >
                Batal
              </button>

              <button
                type="button"
                disabled={!canApply}
                onClick={() => {
                  if (!reason.trim()) {
                    toast("Alasan wajib diisi", {
                      description:
                        "Mohon isi alasan penyesuaian denda terlebih dahulu.",
                    });
                    return;
                  }
                  if (delta === 0) {
                    toast("Jumlah belum diisi", {
                      description: "Mohon masukkan jumlah penyesuaian.",
                    });
                    return;
                  }

                  toast.success("Denda berhasil diubah (prototype)", {
                    description: `Sebelum: Rp ${formatIdr0(basePenalty)} • Sesudah: Rp ${formatIdr0(after)}`,
                  });
                  onOpenChange(false);
                }}
                className={cn(
                  "h-11 w-full rounded-full px-6 text-[14px] font-semibold sm:w-auto transition",
                  canApply
                    ? "bg-emerald-600 text-white ring-1 ring-emerald-600/25 hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-500 ring-1 ring-slate-200 pointer-events-none",
                )}
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}