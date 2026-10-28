"use client";

import { ArrowLeft } from "lucide-react";
import type { EKolektorDepositAccount } from "@/components/mobile/EKolektorDepositTransactionPage";

export default function EKolektorDepositReviewPage({
  account,
  amount,
  onBack,
}: {
  account: EKolektorDepositAccount;
  amount: string;
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#004FC7]">
      <div className="pointer-events-none absolute -right-[58px] top-[78px] h-[210px] w-[210px] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute right-[62px] top-[520px] h-[190px] w-[190px] rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-[74px] top-[620px] h-[230px] w-[230px] rounded-full bg-white/10" />

      <header className="relative z-10 shrink-0 px-6 pb-7 pt-8 text-white">
        <button type="button" onClick={onBack} aria-label="Kembali" className="mb-7 rounded-full p-1 transition hover:bg-white/10">
          <ArrowLeft className="h-8 w-8" strokeWidth={1.8} />
        </button>
        <h1 className="text-[28px] font-extrabold leading-none tracking-tight">Review</h1>
      </header>

      <main className="relative z-10 mx-4 flex shrink-0 flex-col rounded-[30px] bg-white px-5 pb-6 pt-7">
        <div className="grid gap-5">
          <section>
            <div className="text-[14px] font-extrabold text-[#9A9A9A]">Rekening Tujuan</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full bg-[#28afd4] text-[30px] text-white">{account.customerName.charAt(0)}</div>
              <div>
                <div className="text-[17px] font-extrabold text-[#9A9A9A]">{account.customerName}</div>
                <div className="mt-1 text-[18px] font-extrabold text-[#203064]">{account.accountNo}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="text-[14px] font-extrabold text-[#9A9A9A]">Jenis Transaksi</div>
            <div className="mt-2 text-[17px] font-extrabold text-[#203064]">Setoran</div>
          </section>

          <section>
            <div className="text-[14px] font-extrabold text-[#9A9A9A]">Nominal Transaksi</div>
            <div className="mt-2 text-[17px] font-extrabold text-[#203064]">Rp.{amount || "5.000"},00</div>
          </section>
        </div>

        <div className="pt-8">
          <button type="button" className="h-[48px] w-full rounded-full bg-[#004FC7] text-[15px] font-semibold text-white transition hover:bg-[#0046B3] active:translate-y-px">Kirim</button>
        </div>
      </main>
    </div>
  );
}
