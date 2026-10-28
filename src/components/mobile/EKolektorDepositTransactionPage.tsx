"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import EKolektorDepositReviewPage from "@/components/mobile/EKolektorDepositReviewPage";

export type EKolektorDepositAccount = {
  accountNo: string;
  customerName: string;
  productName: string;
};

function formatAmount(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function EKolektorDepositTransactionPage({
  account,
  onBack,
  onDoneHome,
}: {
  account: EKolektorDepositAccount;
  onBack: () => void;
  onDoneHome: () => void;
}) {
  const [amount, setAmount] = React.useState("");
  const [showReview, setShowReview] = React.useState(false);
  const quickAmounts = ["5.000", "10.000", "15.000", "20.000"];

  if (showReview) {
    return <EKolektorDepositReviewPage account={account} amount={amount} onBack={() => setShowReview(false)} onDoneHome={onDoneHome} />;
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[116px] overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
          <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
          <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <h1 className="text-[24px] font-extrabold leading-none tracking-tight">Tambah Transaksi</h1>
            <button type="button" onClick={onBack} className="rounded-full px-1 text-[14px] font-semibold text-[#BFD3F5] transition active:scale-[0.98]">Batal</button>
          </div>
        </header>

        <main className="relative z-10 -mt-[30px] flex min-h-[calc(100%-86px)] flex-col rounded-t-[30px] bg-white px-6 pb-6 pt-8">
          <h2 className="text-[22px] font-extrabold leading-tight tracking-tight text-[#203064]">Setoran</h2>
          <p className="mt-2 text-[14px] font-semibold text-[#203064]">Silakan lengkapi form berikut</p>

          <div className="mt-7 grid gap-5">
            <div>
              <div className="text-[14px] font-extrabold text-[#9A9A9A]">No. Rekening</div>
              <div className="mt-2 text-[16px] font-extrabold text-[#203064]">{account.accountNo} - {account.customerName}</div>
              <button type="button" className="mt-4 text-[16px] font-extrabold text-[#004FC7]">Lihat Mutasi Rekening</button>
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-[#9A9A9A]">Saldo</div>
              <div className="mt-2 text-[16px] font-extrabold text-[#203064]">Rp. 500.000.000,00</div>
            </div>
            <div>
              <label htmlFor="deposit-type" className="text-[14px] font-extrabold text-[#9A9A9A]">Jenis Transaksi</label>
              <div className="relative mt-2">
                <select id="deposit-type" defaultValue="Setoran" className="h-[48px] w-full appearance-none rounded-[12px] border-0 bg-[#F2F2F2] px-4 text-[16px] text-[#203064] outline-none"><option>Setoran</option></select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#004FC7]" />
              </div>
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-[#9A9A9A]">Nominal Setoran</div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {quickAmounts.map((quickAmount) => (
                  <button key={quickAmount} type="button" onClick={() => setAmount(quickAmount)} className={`shrink-0 rounded-full border px-4 py-2 text-[14px] font-extrabold transition ${amount === quickAmount ? "border-[#004FC7] bg-[#EAF2FF] text-[#004FC7]" : "border-[#C8C8C8] bg-white text-[#111827]"}`}>{quickAmount}</button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="deposit-amount" className="text-[14px] font-extrabold text-[#9A9A9A]">Nominal Transaksi</label>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-semibold text-[#203064]">Rp.</span>
                <input id="deposit-amount" inputMode="numeric" value={amount} onChange={(event) => setAmount(formatAmount(event.target.value))} placeholder="0" className="h-[48px] w-full rounded-[12px] border-0 bg-[#F2F2F2] pl-12 pr-4 text-[16px] text-[#203064] outline-none placeholder:text-[#9A9A9A]" />
              </div>
            </div>
          </div>

          <div className="mt-auto -mx-6 bg-white px-6 pb-0 pt-6">
            <button type="button" onClick={() => setShowReview(true)} className="h-[46px] w-full rounded-full bg-[#004FC7] text-[15px] font-semibold text-white shadow-[0_4px_10px_rgba(0,79,199,0.2)] transition hover:bg-[#0046B3] active:translate-y-px">Lanjutkan</button>
          </div>
        </main>
      </div>
    </div>
  );
}
