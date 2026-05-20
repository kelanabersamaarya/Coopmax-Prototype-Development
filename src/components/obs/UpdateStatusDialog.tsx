"use client";

import * as React from "react";
import { XCircle, X, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type StatusOption = "Pilih Status" | "Diajukan" | "Diproses" | "Ditolak" | "Disetujui";

export type UpdateStatusDialogPrefill = {
  nikPemohon: string;
  namaPemohon: string;
  verified: boolean;
  tanggal: string; // dd-mm-yyyy
  pinjamanDiajukan: string; // "30.000.000,00"
  pinjamanDisetujui: string; // editable
  deskripsi: string; // editable
  status: StatusOption;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[14px] font-semibold text-[#1e3a8a]">{children}</div>;
}

function LeftLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[14px] font-normal text-black">{children}</div>;
}

function FieldRow({
  label,
  hideLabelOnDesktop = false,
  align = "center",
  children,
}: {
  label: string;
  hideLabelOnDesktop?: boolean;
  align?: "top" | "center";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-2 md:grid-cols-[200px_minmax(0,1fr)]",
        align === "top" ? "md:items-start" : "md:items-center",
      )}
    >
      <div className={cn("md:pt-1", align === "top" ? "md:pt-2" : "")}>
        {/* Mobile label */}
        <div className="md:hidden">
          <FieldLabel>{label}</FieldLabel>
        </div>

        {/* Desktop label */}
        <div className={cn("hidden md:block", hideLabelOnDesktop ? "invisible" : "")}>
          <LeftLabel>{label}</LeftLabel>
        </div>
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function UpdateStatusDialog({
  open,
  onOpenChange,
  prefill,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  prefill: UpdateStatusDialogPrefill;
  onSave?: (next: UpdateStatusDialogPrefill) => void;
}) {
  const [status, setStatus] = React.useState<StatusOption>(prefill.status);
  const [tanggal, setTanggal] = React.useState(prefill.tanggal);
  const [pinjamanDisetujui, setPinjamanDisetujui] = React.useState(
    prefill.pinjamanDisetujui,
  );
  const [deskripsi, setDeskripsi] = React.useState(prefill.deskripsi);

  React.useEffect(() => {
    if (!open) return;
    setStatus(prefill.status);
    setTanggal(prefill.tanggal);
    setPinjamanDisetujui(prefill.pinjamanDisetujui);
    setDeskripsi(prefill.deskripsi);
  }, [open, prefill]);

  const triggerCls = cn(
    "h-10 w-full justify-between rounded-[6px]",
    "border-slate-200 bg-white px-3",
    "text-[14px] font-medium text-slate-900 shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-500",
  );

  const inputCls = cn(
    "h-10 rounded-[6px] border-slate-200 bg-white",
    "text-[14px] font-medium text-slate-900 shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const textareaCls = cn(
    "min-h-[240px] rounded-[6px] border-slate-200 bg-white",
    "text-[14px] font-medium text-slate-900 shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[920px]",
          "max-w-[920px]",
          "max-h-[85vh] overflow-hidden",
          "rounded-3xl border-slate-200 p-0 shadow-2xl",
          // hide default close button
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-[18px] font-extrabold tracking-tight text-slate-900">
              Perbarui Status
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

          <div
            className="overflow-auto px-6 py-5"
            style={{ maxHeight: "calc(85vh - 64px - 86px)" }}
          >
            <div className="grid gap-6">
              <FieldRow label="Status">
                <Select
                  value={status}
                  onValueChange={(v) => setStatus(v as StatusOption)}
                >
                  <SelectTrigger className={triggerCls}>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="Pilih Status">Pilih Status</SelectItem>
                    <SelectItem value="Diajukan">Diajukan</SelectItem>
                    <SelectItem value="Diproses">Diproses</SelectItem>
                    <SelectItem value="Disetujui">Disetujui</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </FieldRow>

              <FieldRow label="Data Pemohon" align="top">
                <div className="rounded-[6px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid gap-2 text-[14px]">
                    <div className="grid gap-2 sm:grid-cols-[180px_14px_minmax(0,1fr)]">
                      <div className="font-semibold text-slate-900">NIK Pemohon</div>
                      <div className="hidden sm:block font-semibold text-slate-400">
                        :
                      </div>
                      <div className="font-medium text-slate-900 tabular-nums">
                        {prefill.nikPemohon}
                      </div>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-[180px_14px_minmax(0,1fr)]">
                      <div className="font-semibold text-slate-900">Nama Pemohon</div>
                      <div className="hidden sm:block font-semibold text-slate-400">
                        :
                      </div>
                      <div className="font-medium text-slate-900">
                        {prefill.namaPemohon}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[6px] bg-rose-50 px-4 py-3 ring-1 ring-rose-100">
                    <div className="flex items-center justify-center gap-3 text-rose-700">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white ring-1 ring-rose-200">
                        <XCircle className="h-4.5 w-4.5" />
                      </span>
                      <div className="text-[14px] font-extrabold tracking-wide">
                        {prefill.verified
                          ? "SUDAH TERVERIFIKASI"
                          : "BELUM TERVERIFIKASI"}
                      </div>
                    </div>
                  </div>
                </div>
              </FieldRow>

              <FieldRow label="Tanggal">
                <Input
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className={inputCls}
                />
              </FieldRow>

              {/* ✅ Nominal Pengajuan (readonly) */}
              <FieldRow label="Nominal Pengajuan">
                <Input value={prefill.pinjamanDiajukan} readOnly className={inputCls} />
              </FieldRow>

              {/* Pinjaman Disetujui: label desktop disembunyikan, field tetap ada */}
              <FieldRow label="Pinjaman yang Disetujui" hideLabelOnDesktop>
                <Input
                  value={pinjamanDisetujui}
                  onChange={(e) => setPinjamanDisetujui(e.target.value)}
                  className={inputCls}
                  inputMode="decimal"
                />
              </FieldRow>

              <FieldRow label="Deskripsi" align="top">
                <Textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className={textareaCls}
                />
              </FieldRow>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-4",
                  "bg-[#6B7A90] text-white ring-1 ring-[#6B7A90]/25 transition hover:bg-[#5f6d82]",
                  "text-[14px] font-semibold",
                )}
              >
                <X className="h-5 w-5" />
                Tutup
              </button>

              <button
                type="button"
                onClick={() => {
                  const next = {
                    ...prefill,
                    status,
                    tanggal,
                    pinjamanDisetujui,
                    deskripsi,
                  };
                  onSave?.(next);
                  toast.success("Status diperbarui (prototype)", {
                    description: `${next.status} • ${next.tanggal}`,
                  });
                  onOpenChange(false);
                }}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-[10px] px-4",
                  "bg-[#3BB001] text-white ring-1 ring-[#3BB001]/25 transition hover:bg-[#349d01]",
                  "text-[14px] font-semibold",
                )}
              >
                <Save className="h-5 w-5" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}