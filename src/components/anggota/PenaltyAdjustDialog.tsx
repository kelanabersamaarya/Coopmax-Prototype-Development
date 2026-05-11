"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Minus, Plus, SlidersHorizontal, Trash2, X } from "lucide-react";

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

const R = "rounded-[5px]";

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

  const after = React.useMemo(() => clampNonNegative(basePenalty + delta), [basePenalty, delta]);

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
        <div className="bg-[#2f2f2f] text-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/10 ring-1 ring-white/10">
                <SlidersHorizontal className="h-5 w-5 text-white/90" />
              </span>
              <div className="text-lg font-extrabold tracking-tight">Ubah denda</div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-white/10" />

          {/* Body */}
          <div className="px-6 py-5">
            {/* Mode buttons */}
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setMode("add")}
                className={cn(
                  "inline-flex h-[44px] items-center justify-center gap-2 rounded-[10px] px-4 text-[14px] font-semibold",
                  mode === "add"
                    ? "bg-emerald-900/40 text-emerald-50 ring-1 ring-emerald-600/40"
                    : "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10",
                )}
              >
                <Plus className="h-5 w-5" />
                Tambah
              </button>

              <button
                type="button"
                onClick={() => setMode("subtract")}
                className={cn(
                  "inline-flex h-[44px] items-center justify-center gap-2 rounded-[10px] px-4 text-[14px] font-semibold",
                  mode === "subtract"
                    ? "bg-amber-900/40 text-amber-50 ring-1 ring-amber-500/40"
                    : "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10",
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
                  "inline-flex h-[44px] items-center justify-center gap-2 rounded-[10px] px-4 text-[14px] font-semibold",
                  "bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10",
                )}
              >
                <Trash2 className="h-5 w-5 text-rose-300" />
                Hapus semua
              </button>
            </div>

            <div className="mt-5 grid gap-2">
              <div className="text-[13px] font-semibold text-white/80">Jumlah (Rp)</div>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Masukkan jumlah..."
                inputMode="decimal"
                className={cn(
                  "h-11 rounded-[10px] border-white/10 bg-white/5 text-white placeholder:text-white/35",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              />
            </div>

            <div className="mt-5 grid gap-2">
              <div className="text-[13px] font-semibold text-white/80">
                Alasan penyesuaian <span className="text-rose-400">*</span>
              </div>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Wajib diisi. Jelaskan alasan penyesuaian denda..."
                className={cn(
                  "min-h-[120px] rounded-[10px] border-white/10 bg-white/5 text-white placeholder:text-white/35",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              />
            </div>

            <div className="mt-5 overflow-hidden rounded-[12px] bg-black/25 ring-1 ring-white/10">
              <div className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[14px] font-semibold text-white/85">
                    <div>Denda sebelum</div>
                    <div>Penyesuaian</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[16px] font-extrabold">
                      Rp {formatIdr0(basePenalty)}
                    </div>
                    <div
                      className={cn(
                        "mt-1 text-[14px] font-extrabold",
                        delta > 0 ? "text-emerald-300" : delta < 0 ? "text-amber-300" : "text-white/50",
                      )}
                    >
                      {deltaText}
                    </div>
                  </div>
                </div>

                <div className="my-4 h-px w-full bg-white/10" />

                <div className="flex items-center justify-between gap-4">
                  <div className="text-[16px] font-extrabold">Total setelah</div>
                  <div className="text-[18px] font-extrabold">Rp {formatIdr0(after)}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "h-11 w-full rounded-[10px] px-6 text-[14px] font-semibold sm:w-auto",
                  "bg-white/5 text-white ring-1 ring-white/10 transition hover:bg-white/10",
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
                      description: "Mohon isi alasan penyesuaian denda terlebih dahulu.",
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
                  "h-11 w-full rounded-[10px] px-6 text-[14px] font-semibold sm:w-auto",
                  canApply
                    ? "bg-emerald-600 text-white ring-1 ring-emerald-600/25 hover:bg-emerald-700"
                    : "bg-white/10 text-white/40 ring-1 ring-white/10",
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