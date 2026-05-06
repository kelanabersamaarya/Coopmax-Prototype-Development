"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FileText, ReceiptText, ArrowLeft, Trash2 } from "lucide-react";

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition",
        "bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm",
        "hover:bg-slate-50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
      )}
      onClick={onClick}
    >
      <Icon className="h-4.5 w-4.5 text-slate-600" />
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
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl">
            Transaksi Pinjaman Detail
          </h1>

          {/* keep prop used so TS doesn't complain */}
          <div className="sr-only">{accountNo}</div>
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
          />
          <ActionButton
            icon={ArrowLeft}
            label="Kembali ke Daftar"
            onClick={onBack}
          />
          <ActionButton
            icon={Trash2}
            label="Hapus"
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