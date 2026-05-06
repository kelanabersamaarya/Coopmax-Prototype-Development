"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  FileText,
  ReceiptText,
  ArrowLeft,
  Trash2,
  ChevronRight,
} from "lucide-react";

function ActionButton({
  icon: Icon,
  label,
  tone = "primary",
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone?: "primary" | "danger" | "ghost";
  onClick: () => void;
}) {
  const base = cn(
    "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition",
    "ring-1 shadow-sm",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
  );

  const toneCls =
    tone === "danger"
      ? "bg-rose-600 text-white ring-rose-600/20 hover:bg-rose-700"
      : tone === "ghost"
        ? "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
        : "bg-[hsl(var(--app-accent))] text-white ring-[hsl(var(--app-accent))]/25 hover:bg-[hsl(var(--app-accent-2))]";

  return (
    <button type="button" className={cn(base, toneCls)} onClick={onClick}>
      <Icon className="h-4.5 w-4.5" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function LoanTransactionsDetailHeader({
  accountNo,
  onBack,
  className,
}: {
  accountNo: string;
  onBack: () => void;
  className?: string;
}) {
  return (
    <div className={cn("bg-transparent p-0 ring-0 shadow-none", className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-600">
            <span className="truncate">Transaksi Pinjaman</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="truncate text-slate-900">Detail</span>
          </div>

          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
              Transaksi Pinjaman Detail
            </h1>
            <div className="rounded-full bg-slate-900/5 px-3 py-1 text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200">
              Rek. Pinjaman: <span className="text-slate-900">{accountNo}</span>
            </div>
          </div>

          <p className="mt-1 text-[13px] text-slate-600">
            Tampilan ini masih prototype — tombol aksi hanya menampilkan toast.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
          <ActionButton
            icon={ReceiptText}
            label="Kwitansi"
            onClick={() =>
              toast("Kwitansi (prototype)", {
                description: `Rek. Pinjaman: ${accountNo}`,
              })
            }
          />
          <ActionButton
            icon={FileText}
            label="Kwitansi Kas"
            onClick={() =>
              toast("Kwitansi Kas (prototype)", {
                description: `Rek. Pinjaman: ${accountNo}`,
              })
            }
            tone="ghost"
          />
          <ActionButton
            icon={ArrowLeft}
            label="Kembali ke Daftar"
            onClick={onBack}
            tone="ghost"
          />
          <ActionButton
            icon={Trash2}
            label="Hapus"
            tone="danger"
            onClick={() =>
              toast("Hapus (prototype)", {
                description: "Aksi hapus belum diimplementasikan.",
              })
            }
          />
        </div>
      </div>
    </div>
  );
}