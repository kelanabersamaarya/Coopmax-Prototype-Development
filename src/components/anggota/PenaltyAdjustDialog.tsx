"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Minus, Plus, X, CheckSquare } from "lucide-react";

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

const R5 = "rounded-[5px]";
const SAVE_GREEN = "#3BB001";
const SAVE_GREEN_HOVER = "#349d01";

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

  const amountNumber = React.useMemo(() => parseIdrLike(amount), [amount]);

  const delta = React.useMemo(() => {
    const n = amountNumber;
    if (n <= 0) return 0;
    return mode === "subtract" ? -n : n;
  }, [amountNumber, mode]);

  const after = React.useMemo(
    () => clampNonNegative(basePenalty + delta),
    [basePenalty, delta],
  );

  const deltaText = React.useMemo(() => {
    if (delta === 0) return "Rp 0";
    const abs = formatIdr0(Math.abs(delta));
    return delta > 0 ? `+ Rp ${abs}` : `- Rp ${abs}`;
  }, [delta]);

  const canSave = reason.trim().length > 0 && amountNumber > 0;

  const actionBtnBase = cn(
    "inline-flex items-center justify-center gap-2",
    "h-[30px] w-[90px] px-2",
    R5,
    "text-[11px] font-bold tracking-tight text-white",
    "ring-1 transition",
    "leading-none",
  );

  const modeBtnBase = cn(
    "inline-flex items-center justify-center gap-2 px-4",
    "h-[35px]",
    "text-[14px] font-semibold transition",
    R5,
  );

  const saveBtnCls = cn(
    actionBtnBase,
    "text-white transition",
    canSave ? "" : "opacity-60",
  );

  const labelCls = "text-[14px] font-normal text-slate-900";
  const requiredStar = <span className="text-rose-600">*</span>;

  const fieldGrid = "grid gap-3 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center";
  const fieldGridTop =
    "grid gap-3 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-start";

  // Summary typography (match reference: same size, all regular)
  const summaryLabelCls = "text-[15px] font-normal text-slate-900";
  const summaryValueCls = "text-[15px] font-normal text-slate-900";
  const summaryDeltaCls = cn(
    "text-[15px] font-normal",
    delta > 0
      ? "text-emerald-700"
      : delta < 0
        ? "text-amber-700"
        : "text-slate-400",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[780px]",
          "max-w-[780px]",
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
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              Penyesuaian Denda
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center",
                R5,
                "text-slate-700 transition hover:bg-slate-100",
              )}
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setMode("add")}
                className={cn(
                  modeBtnBase,
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
                  modeBtnBase,
                  mode === "subtract"
                    ? "bg-amber-500 text-white ring-1 ring-amber-500/25 hover:bg-amber-600"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
                )}
              >
                <Minus className="h-5 w-5" />
                Kurangi
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <div className={fieldGrid}>
                <div className={labelCls}>
                  Nominal Penyesuaian{requiredStar}
                </div>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Masukkan Nominal Penyesuaian"
                  inputMode="decimal"
                  className={cn(
                    "h-[30px]",
                    R5,
                    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                    "shadow-sm",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                />
              </div>

              <div className={fieldGridTop}>
                <div className={cn(labelCls, "pt-2")}>
                  Alasan penyesuaian{requiredStar}
                </div>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Wajib diisi. Jelaskan alasan penyesuaian denda..."
                  className={cn(
                    "min-h-[120px]",
                    R5,
                    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                  )}
                />
              </div>
            </div>

            <div
              className={cn(
                "mt-5 overflow-hidden bg-slate-50 ring-1 ring-slate-200",
                R5,
              )}
            >
              <div className="px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div className={summaryLabelCls}>Denda sebelum penyesuaian</div>
                  <div className={cn(summaryValueCls, "text-right")}>
                    Rp {formatIdr0(basePenalty)}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className={summaryLabelCls}>Nominal Penyesuaian</div>
                  <div className={cn(summaryDeltaCls, "text-right")}>{deltaText}</div>
                </div>

                <div className="my-4 h-px w-full bg-slate-200" />

                <div className="flex items-center justify-between gap-4">
                  <div className={summaryLabelCls}>
                    Total Denda Setelah Penyesuaian
                  </div>
                  <div className={cn(summaryValueCls, "text-right")}>
                    Rp {formatIdr0(after)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 -mx-6 h-px bg-slate-200" />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  actionBtnBase,
                  "bg-[#77839A] ring-1 ring-[#77839A]/25 transition hover:bg-[#6b768c]",
                )}
              >
                <X className="h-4 w-4" strokeWidth={3} />
                Batalkan
              </button>

              <button
                type="button"
                disabled={!canSave}
                onClick={() => {
                  if (amountNumber <= 0) {
                    toast("Nominal Penyesuaian wajib diisi", {
                      description: "Mohon masukkan nominal penyesuaian (> 0).",
                    });
                    return;
                  }
                  if (!reason.trim()) {
                    toast("Alasan penyesuaian wajib diisi", {
                      description:
                        "Mohon isi alasan penyesuaian denda terlebih dahulu.",
                    });
                    return;
                  }

                  toast.success("Denda berhasil disesuaikan (prototype)", {
                    description: `Sebelum: Rp ${formatIdr0(basePenalty)} • Sesudah: Rp ${formatIdr0(after)}`,
                  });
                  onOpenChange(false);
                }}
                className={saveBtnCls}
                style={{
                  backgroundColor: SAVE_GREEN,
                  borderColor: SAVE_GREEN,
                }}
                onMouseEnter={(e) => {
                  if (!canSave) return;
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    SAVE_GREEN_HOVER;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    SAVE_GREEN;
                }}
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