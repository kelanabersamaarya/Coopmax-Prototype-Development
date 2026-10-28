"use client";

import * as React from "react";
import { ArrowLeft, ChevronDown, Copy, Plus } from "lucide-react";

type SavingsAccount = {
  id: string;
  productName: string;
  accountNo: string;
};

const savingsAccounts: SavingsAccount[] = [
  { id: "sukarela-1", productName: "Simpanan Sukarela", accountNo: "4260054" },
  { id: "sukarela-2", productName: "Simpanan Sukarela", accountNo: "4260055" },
  { id: "sukarela-3", productName: "Simpanan Sukarela", accountNo: "4260056" },
  { id: "sukarela-4", productName: "Simpanan Sukarela", accountNo: "4260057" },
];

const transactions = [
  {
    title: "Refund Transaksi Transfer",
    amount: "+Rp. 50,000.00",
    date: "16 Okt 2026 17:01:46",
    description: "Refund Transfer Bank Lain, Transfer ke FIRA DIYANKA - 1122334455 - -",
  },
  {
    title: "Transaksi Refund Admin Transfer",
    amount: "+Rp. 10,000.00",
    date: "16 Okt 2026 17:01:46",
    description: "Biaya Admin Refund Transfer Bank Lain, Transfer ke FIRA DIYANKA",
  },
  {
    title: "Setoran Simpanan",
    amount: "+Rp. 500,000.00",
    date: "12 Okt 2026 09:30:12",
    description: "Setoran simpanan melalui teller koperasi",
  },
];

function SavingsCard({
  account,
  onClick,
}: {
  account: SavingsAccount;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left transition active:scale-[0.99]"
      aria-label={`Buka rekening ${account.accountNo}`}
    >
      <div className="relative h-[147px] overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white shadow-[0_8px_22px_rgba(0,79,199,0.20)]">
        <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
        <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[16px] font-extrabold leading-tight tracking-tight">
              {account.productName}
            </div>
            <span className="shrink-0 text-[12px] font-semibold leading-none">
              Detail &gt;
            </span>
          </div>

          <div className="mt-auto">
            <div className="text-[10px] font-normal leading-none text-[#678DD8]">
              No Rekening
            </div>
            <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold leading-none">
              <span>{account.accountNo}</span>
              <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function DetailSavingsCard({ accountNo }: { accountNo: string }) {
  return (
    <section className="relative h-[390px] overflow-hidden rounded-[38px] bg-[#0648C9] px-10 py-10 text-white shadow-[0_5px_7px_rgba(15,23,42,0.28)]">
      <div className="pointer-events-none absolute -right-[72px] -top-[42px] h-[190px] w-[270px] rounded-[50%] bg-white/20" />
      <div className="pointer-events-none absolute -right-[72px] top-[104px] h-[190px] w-[270px] rounded-[50%] bg-white/20" />
      <div className="pointer-events-none absolute -bottom-[12px] -left-[12px] h-[32px] w-[32px] rounded-full bg-white/10 shadow-[36px_0_0_rgba(255,255,255,0.10),72px_0_0_rgba(255,255,255,0.10),108px_0_0_rgba(255,255,255,0.10),144px_0_0_rgba(255,255,255,0.10)]" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <div className="text-[30px] font-normal leading-none tracking-[-0.04em]">
            Luna Thompson
          </div>
          <div className="mt-5 text-[24px] font-normal leading-none">
            {accountNo}
          </div>
        </div>
        <div className="pt-1 text-right text-[23px] font-normal leading-none">
          Simpanan Sukarela
        </div>
      </div>

      <div className="absolute bottom-[70px] left-10 z-10">
        <div className="text-[25px] font-normal leading-none text-white/45">
          Saldo
        </div>
        <div className="mt-4 text-[30px] font-normal leading-none tracking-[-0.02em]">
          Rp 998,617,479.17
        </div>
      </div>
    </section>
  );
}

function DateSelector({ date }: { date: string }) {
  return (
    <button
      type="button"
      className="flex h-[78px] flex-1 items-center justify-between gap-2 px-4 text-left text-[20px] text-[#26365F]"
      aria-label={`Pilih tanggal ${date}`}
    >
      <span>{date}</span>
      <ChevronDown className="h-5 w-5 shrink-0 text-black" strokeWidth={2.4} />
    </button>
  );
}

function TransactionItem({
  title,
  amount,
  date,
  description,
}: (typeof transactions)[number]) {
  return (
    <article className="rounded-[24px] bg-white px-9 py-7 shadow-[0_2px_7px_rgba(15,23,42,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="max-w-[58%] text-[20px] font-extrabold leading-tight text-[#26365F]">
          {title}
        </h3>
        <div className="shrink-0 text-right text-[20px] font-bold leading-tight text-[#4BB567]">
          {amount}
        </div>
      </div>
      <div className="mt-5 text-[17px] font-semibold leading-tight text-[#777777]">
        {date}
      </div>
      <p className="mt-4 text-[17px] leading-tight text-[#26365F]">{description}</p>
    </article>
  );
}

function SavingsDetailPage({
  accountNo,
  onBack,
}: {
  accountNo: string;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-black">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
        </button>
        <h1 className="mt-5 text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#004FC7]">
          Simpanan
        </h1>

        <div className="mt-[70px]">
          <DetailSavingsCard accountNo={accountNo} />
        </div>

        <button
          type="button"
          className="mt-7 flex flex-col items-center text-[#26365F] transition active:scale-[0.98]"
          aria-label="Tambah saldo"
        >
          <span className="grid h-[108px] w-[108px] place-items-center rounded-[36px] bg-[#0648C9] text-white">
            <Plus className="h-10 w-10" strokeWidth={2.2} />
          </span>
          <span className="mt-3 text-[24px] leading-none">Tambah Saldo</span>
        </button>

        <div className="mt-[98px] flex divide-x-2 divide-[#D0D0D0] overflow-hidden rounded-[14px] bg-[#F1F1F1]">
          <DateSelector date="28 Sep 2026" />
          <DateSelector date="28 Okt 2026" />
        </div>

        <section className="-mx-6 mt-9 rounded-t-[34px] bg-[#F3F3F3] px-9 pb-12 pt-9">
          <h2 className="text-[30px] font-extrabold leading-none text-black">
            Riwayat Transaksi
          </h2>
          <div className="mt-10 grid gap-7">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.title} {...transaction} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function MBankingSavingsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(null);

  if (selectedAccount) {
    return (
      <SavingsDetailPage
        accountNo={selectedAccount}
        onBack={() => setSelectedAccount(null)}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-black">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="flex flex-col items-start">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
          </button>
          <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
            Simpanan
          </h1>
        </header>

        <section className="mt-7 grid gap-4">
          {savingsAccounts.map((account) => (
            <SavingsCard
              key={account.id}
              account={account}
              onClick={() => setSelectedAccount(account.accountNo)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
