"use client";

import { ArrowLeft, ChevronRight, WalletCards } from "lucide-react";

const savingsAccounts = [
  { productName: "Simpanan Sukarela", accountNo: "4260054", balance: "Rp 998,617,479.17" },
  { productName: "Simpanan Sukarela", accountNo: "4260055", balance: "Rp 0.00" },
  { productName: "Simpanan Sukarela", accountNo: "4260056", balance: "Rp 0.00" },
  { productName: "Simpanan Sukarela", accountNo: "4260057", balance: "Rp 0.00" },
];

export default function MBankingTopUpAccountPage({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (accountNo: string) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#F7FAFF] text-[#26365F]">
      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>

        <div className="mt-7">
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#479DF4]">Tambah Saldo</p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight text-[#203064]">Pilih Rekening Simpanan</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#68738A]">Pilih rekening simpanan yang ingin Anda isi saldonya.</p>
        </div>

        <section className="mt-8 grid gap-4">
          {savingsAccounts.map((account) => (
            <button
              key={account.accountNo}
              type="button"
              onClick={() => onSelect(account.accountNo)}
              className="flex w-full items-center gap-4 rounded-[18px] border border-[#E1EAF6] bg-white p-4 text-left shadow-[0_5px_18px_rgba(37,83,145,0.08)] transition active:scale-[0.99]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[#EAF3FF] text-[#004FC7]">
                <WalletCards className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold text-[#203064]">{account.productName}</span>
                <span className="mt-1 block text-[13px] text-[#68738A]">No. Rekening {account.accountNo}</span>
                <span className="mt-2 block text-[13px] font-semibold text-[#004FC7]">Saldo {account.balance}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-[#004FC7]" strokeWidth={2.4} />
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
