"use client";

import * as React from "react";
import { Clock3, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DebtField = {
  label: string;
  value: string;
};

const changeHistory = [
  {
    date: "07-04-2026 10:35",
    user: "Gusman",
    description: "Penyesuaian tunggakan pokok berdasarkan verifikasi pembayaran.",
  },
];

function AccountField({ label, value }: DebtField) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] font-semibold text-white/85">{label}</div>
      <div className="mt-1 break-words text-[14px] font-extrabold leading-snug text-white">
        {value}
      </div>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
}: {
  number: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full text-[14px] font-extrabold",
          active ? "bg-[#5B3DF5] text-white" : "bg-slate-100 text-slate-500",
        )}
      >
        {number}
      </span>
      <span
        className={cn(
          "text-[11px] font-semibold leading-tight",
          active ? "text-slate-900" : "text-slate-500",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export default function LoanDebtChangeWizard({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [historyOpen, setHistoryOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) setHistoryOpen(false);
  }, [open]);

  const fields: DebtField[] = [
    { label: "No. Rek. Pinjaman", value: accountNo },
    { label: "Nama Anggota / Debitur", value: "Bapak Bagus" },
    { label: "Produk Pinjaman", value: "Pinjaman Billing" },
    { label: "Status Pinjaman", value: "Aktif / Sudah Dicairkan" },
    { label: "Baki Debet Pokok", value: "10.553.571,00" },
    { label: "Tunggakan Pokok", value: "0,00" },
    { label: "Tunggakan Bunga", value: "0,00" },
    { label: "Denda dan Biaya Lainnya", value: "0,00" },
    { label: "Total Kewajiban", value: "10.553.571,00" },
  ];

  return (
    <>
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-1rem)] max-w-[760px] overflow-hidden",
            "rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
            "[&>button[aria-label=Close]]:hidden",
            "[&>button.absolute.right-4.top-4]:hidden",
            "[&_[data-slot=dialog-close]]:hidden",
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h3 className="text-[18px] font-extrabold text-slate-900">
              Riwayat Perubahan Hutang
            </h3>
            <button
              type="button"
              onClick={() => setHistoryOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {changeHistory.map((item) => (
              <div
                key={item.date}
                className="rounded-[10px] bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <div className="text-[13px] font-extrabold text-slate-900">
                  {item.date}
                </div>
                <div className="mt-1 text-[12px] font-semibold text-[#5B3DF5]">
                  {item.user}
                </div>
                <div className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "w-[calc(100vw-1rem)] sm:w-[860px]",
            "max-w-[860px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
            "[&>button[aria-label=Close]]:hidden",
            "[&>button.absolute.right-4.top-4]:hidden",
            "[&_[data-slot=dialog-close]]:hidden",
          )}
        >
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-[20px] font-extrabold tracking-tight text-slate-900">
              Ubah Hutang Pinjaman
            </h2>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex items-start gap-2 px-6 py-5">
            <StepIndicator number={1} label="Informasi Pinjaman" active />
            <div className="mt-[18px] h-[2px] flex-1 bg-slate-200" />
            <StepIndicator number={2} label="Penyesuaian Hutang" />
            <div className="mt-[18px] h-[2px] flex-1 bg-slate-200" />
            <StepIndicator number={3} label="Konfirmasi" />
          </div>

          <Separator className="bg-slate-200" />

          <main className="max-h-[58vh] overflow-auto px-6 py-6 sm:px-8">
            <div className="rounded-[8px] bg-[#17a2b8] p-5 text-white shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-[14px] font-extrabold tracking-wide">
                  INFORMASI REKENING PINJAMAN
                </div>
                <button
                  type="button"
                  onClick={() => setHistoryOpen(true)}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[5px] bg-white px-3 text-[12px] font-semibold text-[#168294]"
                >
                  <Clock3 className="h-4 w-4" />
                  Riwayat Perubahan
                </button>
              </div>

              <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {fields.map((field) => (
                  <AccountField key={field.label} {...field} />
                ))}
              </div>
            </div>
          </main>

          <footer className="flex justify-end border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-[5px] bg-[#77839A] px-5 text-[12px] font-semibold text-white transition hover:bg-[#6b768c]"
            >
              Tutup
            </button>
          </footer>
        </DialogContent>
      </Dialog>
    </>
  );
}