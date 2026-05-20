"use client";

import * as React from "react";
import { X, Save } from "lucide-react";
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

const UI = {
  gapY: "gap-[15px]",
  h: "h-[30px]",
  radius: "rounded-[5px]",
  text: "text-[12.5px]",
} as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[14px] font-normal text-[#1e3a8a]">{children}</div>;
}

function LeftLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[14px] font-normal text-black">{children}</div>;
}

function FieldRow({
  label,
  align = "center",
  children,
}: {
  label: string;
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
        <div className="md:hidden">
          <FieldLabel>{label}</FieldLabel>
        </div>
        <div className="hidden md:block">
          <LeftLabel>{label}</LeftLabel>
        </div>
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

function DataPemohonKV({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[180px_14px_minmax(0,1fr)]">
      <div className="text-[14px] font-normal text-slate-900">{label}</div>
      <div className="hidden sm:block text-[14px] font-normal text-slate-400">:</div>
      <div className="text-[14px] font-normal text-slate-900">{value}</div>
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
  const [deskripsi, setDeskripsi] = React.useState(prefill.deskripsi);

  React.useEffect(() => {
    if (!open) return;
    setStatus(prefill.status);
    setTanggal(prefill.tanggal);
    setDeskripsi(prefill.deskripsi);
  }, [open, prefill]);

  const triggerCls = cn(
    UI.h,
    "w-full justify-between",
    UI.radius,
    UI.text,
    "border-slate-200 bg-white px-3",
    "font-normal text-slate-900 shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    "[&>svg]:text-slate-500",
  );

  const inputCls = cn(
    UI.h,
    UI.radius,
    UI.text,
    "border-slate-200 bg-white",
    "font-normal text-slate-900 shadow-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
  );

  const textareaCls = cn(
    UI.radius,
    UI.text,
    "min-h-[180px]",
    "border-slate-200 bg-white",
    "font-normal text-slate-900 shadow-sm",
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
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="text-[18px] font-normal tracking-tight text-slate-900">
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
            <div className={cn("grid", UI.gapY)}>
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
                <div className={cn("border border-slate-200 bg-white p-4 shadow-sm", UI.radius)}>
                  <div className={cn("grid", UI.gapY)}>
                    <DataPemohonKV label="Nama Pemohon" value={prefill.namaPemohon} />
                    <DataPemohonKV label="No Telepon" value="085461231456" />
                    <DataPemohonKV label="Alamat" value="BR. TENGKULAK KAJA KANGIN" />
                  </div>

                  {/* keep nikPemohon & verified referenced to avoid TS unused warnings */}
                  <div className="sr-only">
                    {prefill.nikPemohon} • {String(prefill.verified)}
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

              <FieldRow label="Nominal Pengajuan">
                <Input value={prefill.pinjamanDiajukan} readOnly className={inputCls} />
              </FieldRow>

              <FieldRow label="Deskripsi" align="top">
                <Textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className={textareaCls}
                />
              </FieldRow>

              <div className="sr-only">{prefill.pinjamanDisetujui}</div>
            </div>
          </div>

          <Separator className="bg-slate-200" />

          <div className="px-6 py-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-4",
                  UI.radius,
                  "h-10",
                  "bg-[#6B7A90] text-white ring-1 ring-[#6B7A90]/25 transition hover:bg-[#5f6d82]",
                  "text-[14px] font-normal",
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
                    deskripsi,
                  };
                  onSave?.(next);
                  toast.success("Status diperbarui (prototype)", {
                    description: `${next.status} • ${next.tanggal}`,
                  });
                  onOpenChange(false);
                }}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-4",
                  UI.radius,
                  "h-10",
                  "bg-[#3BB001] text-white ring-1 ring-[#3BB001]/25 transition hover:bg-[#349d01]",
                  "text-[14px] font-normal",
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