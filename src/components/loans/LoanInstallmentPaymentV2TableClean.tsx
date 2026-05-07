"use client";

import * as React from "react";
import { Plus, Trash2, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import LoanAccountPickerDialog from "@/components/loans/LoanAccountPickerDialog";
import { toast } from "sonner";

type Row = {
  id: string;
  accountNo: string;
};

function makeRow(): Row {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    accountNo: "",
  };
}

function Th({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <th
      className={cn(
        "border-b border-slate-300/70 px-4 py-3",
        "text-[12px] font-extrabold uppercase tracking-wide text-[#64748B]",
        align === "right"
          ? "text-right"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}) {
  return (
    <td
      className={cn(
        "px-4 py-5 align-top text-[13px] font-medium text-slate-900",
        align === "right"
          ? "text-right tabular-nums"
          : align === "center"
            ? "text-center"
            : "text-left",
        className,
      )}
    >
      {children}
    </td>
  );
}

function NasabahPickerField({
  value,
  onPickClick,
}: {
  value: string;
  onPickClick: () => void;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="h-[18px] text-[12px] font-normal leading-[18px] text-slate-900">
        No Rek
      </div>
      <div className="flex min-w-0 items-stretch">
        <Input
          value={value}
          readOnly
          placeholder="Cari nasabah"
          className={cn(
            "h-[30px] min-w-0 rounded-l-[5px] rounded-r-none",
            "border-slate-300 bg-white text-[14px] font-medium text-slate-900",
            "shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            "placeholder:text-slate-500",
          )}
        />
        <button
          type="button"
          onClick={onPickClick}
          className={cn(
            "inline-flex w-10 shrink-0 items-center justify-center",
            "h-[30px]",
            "rounded-r-[5px] rounded-l-none",
            "bg-[#6B7A90] text-white",
            "ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
          )}
          aria-label="Cari"
          title="Cari"
        >
          <Search className="h-4.5 w-4.5" />
        </button>
      </div>
    </div>
  );
}

export default function LoanInstallmentPaymentV2TableClean({
  className,
}: {
  className?: string;
}) {
  const fixedPx = 56 + 280;

  const [rows, setRows] = React.useState<Row[]>(() => [makeRow()]);

  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [pickerTargetId, setPickerTargetId] = React.useState<string | null>(null);

  function openPickerForRow(id: string) {
    setPickerTargetId(id);
    setPickerOpen(true);
  }

  function onPick(accountNo: string) {
    if (!pickerTargetId) return;

    setRows((prev) =>
      prev.map((r) => (r.id === pickerTargetId ? { ...r, accountNo } : r)),
    );

    toast.success("Rekening dipilih", { description: accountNo });

    setPickerOpen(false);
    setPickerTargetId(null);
  }

  function addRow(afterId: string) {
    setRows((prev) => {
      const idx = prev.findIndex((r) => r.id === afterId);
      const next = makeRow();
      if (idx < 0) return [...prev, next];
      return [...prev.slice(0, idx + 1), next, ...prev.slice(idx + 1)];
    });
  }

  function removeRow(id: string) {
    setRows((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)));
  }

  return (
    <div className={cn("mt-5 overflow-hidden rounded-2xl bg-white", className)}>
      <LoanAccountPickerDialog
        open={pickerOpen}
        onOpenChange={(v) => {
          setPickerOpen(v);
          if (!v) setPickerTargetId(null);
        }}
        query=""
        onPick={onPick}
      />

      <table className="w-full table-fixed border-collapse bg-white">
        <colgroup>
          <col style={{ width: 56 }} />
          <col style={{ width: 280 }} />
          <col style={{ width: `calc((100% - ${fixedPx}px) * 0.35)` }} />
          <col style={{ width: `calc((100% - ${fixedPx}px) * 0.65 - 80px)` }} />
          <col style={{ width: 80 }} />
        </colgroup>

        <thead className="bg-white">
          <tr>
            <Th className="px-3">NO</Th>
            <Th className="pl-3 pr-4">NASABAH</Th>
            <Th>PINJAMAN</Th>
            <Th>TAGIHAN & TRANSAKSI</Th>
            <Th align="center">AKSI</Th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id} className={idx === 0 ? "" : "border-t border-slate-200"}>
              <Td className="px-3">
                <span className="tabular-nums">{idx + 1}.</span>
              </Td>

              <Td className="pl-3 pr-4">
                <NasabahPickerField
                  value={r.accountNo}
                  onPickClick={() => openPickerForRow(r.id)}
                />
              </Td>

              <Td className="text-slate-500">—</Td>

              <Td className="text-slate-500">—</Td>

              <Td align="center" className="px-2">
                <div className="grid place-items-center gap-2 pt-[26px]">
                  <button
                    type="button"
                    onClick={() => addRow(r.id)}
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-[5px]",
                      "bg-[#6B7A90] text-white ring-1 ring-[#6B7A90]/20 transition hover:bg-[#5f6d82]",
                    )}
                    aria-label="Tambah transaksi"
                    title="Tambah transaksi"
                  >
                    <Plus className="h-5.5 w-5.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeRow(r.id)}
                    disabled={rows.length <= 1}
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-[5px]",
                      "bg-[#DC3545] text-white ring-1 ring-[#DC3545]/20 transition hover:bg-[#c72f3d]",
                      rows.length <= 1 ? "opacity-60 pointer-events-none" : "",
                    )}
                    aria-label="Hapus transaksi"
                    title="Hapus transaksi"
                  >
                    <Trash2 className="h-5.5 w-5.5" />
                  </button>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}