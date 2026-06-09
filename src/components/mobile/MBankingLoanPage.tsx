"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import MBankingLoanCard from "@/components/mobile/MBankingLoanCard";
import MBankingLoanDetailPage, {
  type MBankingLoanItem,
} from "@/components/mobile/MBankingLoanDetailPage";
import MBankingLoanPasswordPage from "@/components/mobile/MBankingLoanPasswordPage";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

type LoanScreen = "list" | "password" | "detail";

const loans: MBankingLoanItem[] = [
  {
    productName: "Pinjaman Bulanan",
    accountNo: "SMG260004",
    tenor: "12 Bulan",
  },
  {
    productName: "Pinjaman Billing",
    accountNo: "12260006",
    tenor: "12 Bulan",
  },
  {
    productName: "Pinjaman Harian",
    accountNo: "072260001",
    tenor: "18 Bulan",
  },
  {
    productName: "Pinjaman RC",
    accountNo: "210260001",
    tenor: "24 Bulan",
  },
];

export default function MBankingLoanPage({
  onBack,
  transactions = [],
  onPaymentSuccess,
}: {
  onBack: () => void;
  transactions?: MBankingTransactionHistoryEntry[];
  onPaymentSuccess?: (transaction: MBankingTransactionHistoryEntry) => void;
}) {
  const [screen, setScreen] = React.useState<LoanScreen>("list");
  const [selectedLoan, setSelectedLoan] = React.useState<MBankingLoanItem>(loans[0]);

  if (screen === "detail") {
    return (
      <MBankingLoanDetailPage
        loan={selectedLoan}
        transactions={transactions}
        onBack={() => setScreen("list")}
        onPaymentSuccess={onPaymentSuccess}
      />
    );
  }

  if (screen === "password") {
    return (
      <MBankingLoanPasswordPage
        onBack={() => setScreen("list")}
        onSuccess={() => setScreen("detail")}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
        </button>

        <h1 className="mt-6 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
          Pinjaman
        </h1>

        <section className="grid gap-4 pt-7">
          {loans.map((loan) => (
            <MBankingLoanCard
              key={loan.accountNo}
              productName={loan.productName}
              accountNo={loan.accountNo}
              tenor={loan.tenor}
              onClick={() => {
                setSelectedLoan(loan);
                setScreen("password");
              }}
            />
          ))}
        </section>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}