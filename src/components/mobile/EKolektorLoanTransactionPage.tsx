"use client";

import * as React from "react";
import { CalendarDays, CheckSquare, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function EKolektorLoanTransactionPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [nominal, setNominal] = React.useState("");
  const [catatan, setCatatan] = React.useState("");

  function saveTransaction() {
    if (!nominal.trim()) {
      toast("Nominal wajib diisi", {
        description: "Masukkan nominal transaksi terlebih dahulu.",
      });
      return;
    }

    toast.success("Transaksi pinjaman berhasil disimpan", {
      description: "Data transaksi tersimpan sebagai prototype.",
    });

    onBack();
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <header className="relative h-[116px] shrink-0 overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
        <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
        <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <h1 className="text-[25px] font-extrabold leading-none tracking-tight text-white">
            Tambah Transaksi
          </h1>

          <button
            type="button"
            onClick={onBack}
            className="rounded-full px-1 text-[14px] font-semibold leading-none text-[#BFD3F5] transition active:scale-[0.98]"
          >
            Batal
          </button>
        </div>
      </header>

      <main className="relative z-10 -mt-[30px] min-h-0 flex-1 overflow-y-auto rounded-t-[30px] bg-white px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#004FC7]">
          Angsuran Pinjaman
        </div>
        <div className="mt-1 text-[14px] font-normal leading-relaxed text-[#9B9B9B]">
          Silakan lengkapi form berikut
        </div>

        <form
          className="mt-[22px] grid gap-[16px]"
          onSubmit={(event) => {
            event.preventDefault();
            saveTransaction();
          }}
        >
          <div className="grid gap-2">
            <label className="text-[13px] font-semibold text-[#172957]">
              Jenis Transaksi
            </label>
            <button
              type="button"
              className={cn(
                "flex h-[43px] w-full items-center justify-between rounded-[9px] bg-[#F2F2F2] px-4",
                "text-left text-[14px] font-semibold text-[#172957]",
              )}
            >
              Bayar Angsuran
              <ChevronDown className="h-5 w-5 text-[#8D8D8D]" />
            </button>
          </div>

          <div className="grid gap-2">
            <label className="text-[13px] font-semibold text-[#172957]">
              Tanggal Transaksi
            </label>
            <div className="flex h-[43px] items-center justify-between rounded-[9px] bg-[#F2F2F2] px-4">
              <span className="text-[14px] font-semibold text-[#172957]">
                05-06-2026
              </span>
              <CalendarDays className="h-5 w-5 text-[#8D8D8D]" />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-[13px] font-semibold text-[#172957]">
              Nominal Pembayaran
            </label>
            <input
              value={nominal}
              onChange={(event) =>
                setNominal(event.target.value.replace(/[^\d.,]/g, ""))
              }
              inputMode="decimal"
              placeholder="Masukkan nominal"
              className={cn(
                "h-[43px] w-full rounded-[9px] border-0 bg-[#F2F2F2] px-4",
                "text-[14px] font-semibold text-[#172957] shadow-none outline-none",
                "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
              )}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-[13px] font-semibold text-[#172957]">
              Catatan
            </label>
            <textarea
              value={catatan}
              onChange={(event) => setCatatan(event.target.value)}
              placeholder="Tambahkan catatan"
              className={cn(
                "min-h-[88px] w-full resize-none rounded-[9px] border-0 bg-[#F2F2F2] px-4 py-3",
                "text-[14px] font-normal text-[#172957] shadow-none outline-none",
                "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9A9A]",
              )}
            />
          </div>

          <button
            type="submit"
            className={cn(
              "mt-2 flex h-[45px] w-full items-center justify-center gap-2 rounded-[9px]",
              "bg-[#004FC7] text-[14px] font-semibold text-white",
              "shadow-[0_3px_8px_rgba(0,79,199,0.22)] transition active:scale-[0.98]",
            )}
          >
            <CheckSquare className="h-5 w-5" />
            Simpan Transaksi
          </button>
        </form>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}