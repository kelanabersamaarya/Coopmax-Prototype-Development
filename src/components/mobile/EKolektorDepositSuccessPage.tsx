"use client";

import { Check, ArrowLeft } from "lucide-react";
import type { EKolektorDepositAccount } from "@/components/mobile/EKolektorDepositTransactionPage";

export default function EKolektorDepositSuccessPage({
  account,
  amount,
  onBack,
  onDoneHome,
}: {
  account: EKolektorDepositAccount;
  amount: string;
  onBack: () => void;
  onDoneHome: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="pointer-events-none absolute -right-[70px] top-[150px] h-[220px] w-[220px] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -left-[80px] bottom-[90px] h-[230px] w-[230px] rounded-full bg-white/10" />

      <header className="relative z-10 shrink-0 px-6 pb-5 pt-5 text-white">
        <button type="button" onClick={onBack} aria-label="Kembali" className="rounded-full p-1 transition hover:bg-white/10">
          <ArrowLeft className="h-7 w-7" strokeWidth={1.8} />
        </button>
      </header>

      <main className="relative z-10 mx-6 mb-6 flex shrink-0 flex-col rounded-[28px] bg-white px-6 pb-7 pt-6">
        <h1 className="text-center text-[20px] font-extrabold text-[#203064]">Solusi Sakti</h1>
        <div className="mx-auto mt-6 grid h-[96px] w-[96px] place-items-center rounded-full bg-[#D5E2F8]">
          <Check className="h-14 w-14 text-[#004FC7]" strokeWidth={2.8} />
        </div>
        <h2 className="mt-7 text-center text-[18px] font-extrabold text-[#203064]">Berhasil menambah transaksi</h2>

        <div className="mt-6 rounded-[12px] bg-[#F4F4F4] px-4 py-4 text-center">
          <div className="text-[23px] font-extrabold text-[#203064]">Rp.{amount || "5.000"},00</div>
          <div className="mt-1 text-[12px] text-[#8B8B8B]">Jumlah Transaksi</div>
        </div>

        <div className="mt-7 grid gap-4 text-[14px]">
          <section>
            <div className="font-extrabold text-[#203064]">No.Rekening:</div>
            <div className="mt-2 font-extrabold text-[#203064]">{account.customerName}</div>
            <div className="mt-1 font-extrabold text-[#8B8B8B]">{account.accountNo}</div>
          </section>
          <section>
            <div className="font-extrabold text-[#203064]">Tanggal:</div>
            <div className="mt-2 font-extrabold text-[#203064]">{new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}</div>
            <div className="mt-1 font-extrabold text-[#8B8B8B]">{new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</div>
          </section>
        </div>

        <div className="mt-7 grid gap-2.5">
          <button type="button" className="h-[44px] w-full rounded-full border border-[#004FC7] bg-white text-[14px] font-semibold text-[#004FC7] transition hover:bg-[#F4F8FF] active:translate-y-px">Cetak Bukti</button>
          <button type="button" className="h-[44px] w-full rounded-full border border-[#004FC7] bg-white text-[14px] font-semibold text-[#004FC7] transition hover:bg-[#F4F8FF] active:translate-y-px">Bagikan</button>
          <button type="button" onClick={onDoneHome} className="h-[44px] w-full rounded-full bg-[#004FC7] text-[14px] font-semibold text-white transition hover:bg-[#0046B3] active:translate-y-px">Kembali</button>
        </div>
      </main>
    </div>
  );
}
