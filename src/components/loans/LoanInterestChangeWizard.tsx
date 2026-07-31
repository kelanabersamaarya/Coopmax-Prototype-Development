"use client";

import * as React from "react";
import { Check, ChevronLeft, ChevronRight, Percent, X } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const accountDetails = [
  ["Nomor Rekening Pinjaman", "SMG260004"],
  ["Nama Anggota / Debitur", "Bapak Bagus"],
  ["Produk Pinjaman", "Pinjaman Billing"],
  ["Suku Bunga Saat Ini", "12,00% per tahun"],
  ["Baki Debet", "10.553.571,00"],
  ["Sisa Tenor", "10 Bulan"],
  ["Angsuran Berjalan", "1.120.000,00"],
  ["Tanggal Jatuh Tempo Berikutnya", "07-08-2026"],
] as const;

export default function LoanInterestChangeWizard({
  open,
  onOpenChange,
  accountNo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountNo: string;
}) {
  const [step, setStep] = React.useState(1);
  const [newRate, setNewRate] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    setStep(1);
    setNewRate("");
  }, [open]);

  function next() {
    if (step === 2 && (!newRate.trim() || Number(newRate.replace(",", ".")) <= 0)) {
      toast("Suku bunga belum valid", {
        description: "Masukkan suku bunga baru yang lebih dari 0.",
      });
      return;
    }

    setStep((current) => Math.min(3, current + 1));
  }

  function save() {
    toast.success("Perubahan bunga tersimpan (prototype)", {
      description: `Rekening ${accountNo} menggunakan bunga baru ${newRate}%.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-1rem)] sm:w-[760px]",
          "max-w-[760px] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                Ubah Bunga Pinjaman
              </h2>
              <p className="mt-1 text-[13px] text-slate-600">
                Langkah {step} dari 3
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="px-6 pt-5">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={cn(
                    "h-1.5 rounded-full transition",
                    item <= step ? "bg-[#479DF4]" : "bg-slate-200",
                  )}
                />
              ))}
            </div>
          </div>

          <main className="min-h-[360px] px-6 py-6">
            {step === 1 ? (
              <>
                <div className="text-[16px] font-extrabold text-slate-900">
                  Informasi Pinjaman
                </div>
                <p className="mt-1 text-[13px] text-slate-600">
                  Pastikan data rekening berikut sudah sesuai sebelum melanjutkan.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {accountDetails.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                    >
                      <div className="text-[11px] font-semibold text-slate-500">
                        {label}
                      </div>
                      <div className="mt-1 text-[14px] font-extrabold text-slate-900">
                        {label === "Nomor Rekening Pinjaman" ? accountNo : value}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <div className="mx-auto max-w-md">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-[#479DF4] ring-1 ring-blue-100">
                  <Percent className="h-6 w-6" />
                </span>
                <div className="mt-5 text-[16px] font-extrabold text-slate-900">
                  Tentukan Suku Bunga Baru
                </div>
                <p className="mt-1 text-[13px] text-slate-600">
                  Suku bunga saat ini adalah 12,00% per tahun.
                </p>

                <div className="mt-6">
                  <label className="text-[13px] font-bold text-slate-700">
                    Suku Bunga Baru (% per tahun)
                  </label>
                  <Input
                    value={newRate}
                    onChange={(event) => setNewRate(event.target.value)}
                    placeholder="Contoh: 10,50"
                    inputMode="decimal"
                    className="mt-2 h-11 rounded-xl border-slate-300 text-[14px] font-semibold"
                    autoFocus
                  />
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="mx-auto max-w-md text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </span>
                <div className="mt-5 text-[18px] font-extrabold text-slate-900">
                  Konfirmasi Perubahan Bunga
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  Suku bunga rekening <span className="font-bold text-slate-900">{accountNo}</span>{" "}
                  akan diubah dari <span className="font-bold text-slate-900">12,00%</span>{" "}
                  menjadi <span className="font-bold text-slate-900">{newRate}%</span> per tahun.
                </p>
              </div>
            ) : null}
          </main>

          <footer className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => (step === 1 ? onOpenChange(false) : setStep(step - 1))}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
              {step === 1 ? "Batal" : "Kembali"}
            </button>

            <button
              type="button"
              onClick={step === 3 ? save : next}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#479DF4] px-5 text-[13px] font-semibold text-white transition hover:bg-[#2563EB]"
            >
              {step === 3 ? "Simpan Perubahan" : "Lanjutkan"}
              {step === 3 ? <Check className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}