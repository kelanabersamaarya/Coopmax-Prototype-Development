"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorBillListPage from "@/components/mobile/EKolektorBillListPage";
import MBankingLoanAmountInfo from "@/components/mobile/MBankingLoanAmountInfo";
import MBankingLoanInstallmentSummary from "@/components/mobile/MBankingLoanInstallmentSummary";
import MBankingLoanReviewPage from "@/components/mobile/MBankingLoanReviewPage";
import MBankingLoanTransactionHistory from "@/components/mobile/MBankingLoanTransactionHistory";
import MBankingStickyActionButton from "@/components/mobile/MBankingStickyActionButton";
import MBankingTransactionDateRange from "@/components/mobile/MBankingTransactionDateRange";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

const loanInfoItems = [
  {
    label: "No. Pinjaman",
    value: "SMG260004",
  },
  {
    label: "Produk",
    value: "Pinjaman Billing",
  },
  {
    label: "Grace Period",
    value: "3 Bulan",
  },
  {
    label: "Tanggal Pencairan",
    value: "01-03-2026",
  },
  {
    label: "Jangka Waktu",
    value: "12 Bulan",
  },
  {
    label: "Jatuh Tempo",
    value: "16-03-2027",
  },
  {
    label: "Bunga",
    value: "10,00%",
  },
];

function LoanInfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3">
      <div className="text-[14px] font-extrabold leading-[1.15] tracking-tight text-[#203064]">
        {label}
      </div>

      <div className="text-right text-[14px] font-normal leading-[1.15] tracking-tight text-black">
        {value}
      </div>
    </div>
  );
}

export default function MBankingLoanDetailPage({
  onBack,
  transactions = [],
  onPaymentSuccess,
}: {
  onBack: () => void;
  transactions?: MBankingTransactionHistoryEntry[];
  onPaymentSuccess?: (transaction: MBankingTransactionHistoryEntry) => void;
}) {
  const [showReview, setShowReview] = React.useState(false);
  const [showBillList, setShowBillList] = React.useState(false);

  if (showBillList) {
    return (
      <EKolektorBillListPage
        accountNo="SMG260004"
        showSpecialNextBillInfo={false}
        onBack={() => setShowBillList(false)}
      />
    );
  }

  if (showReview) {
    return (
      <MBankingLoanReviewPage
        onBack={() => setShowReview(false)}
        onPaymentSuccess={(transaction) => {
          onPaymentSuccess?.(transaction);
          setShowReview(false);
        }}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="shrink-0 bg-white px-6 pb-3 pt-8">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
          </button>

          <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
            Pinjaman
          </h1>
        </header>

        <main className="bg-white px-6 pb-10 pt-3">
          <div className="grid gap-[18px]">
            {loanInfoItems.map((item) => (
              <LoanInfoRow
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>

          <MBankingLoanAmountInfo />

          <MBankingTransactionDateRange
            className="mt-5"
            containerClassName="bg-[#F2F2F2] shadow-sm"
          />

          <h2 className="mt-6 text-[18px] font-extrabold leading-tight tracking-tight text-[#203064]">
            Tagihan Angsuran
          </h2>

          <MBankingLoanInstallmentSummary />

          <button
            type="button"
            onClick={() => setShowBillList(true)}
            className="mt-4 h-[41px] w-full rounded-[9px] bg-[#004FC7] text-[12px] font-semibold text-white shadow-[0_3px_8px_rgba(0,79,199,0.22)] transition hover:bg-[#0046B3] active:translate-y-px"
          >
            Lihat Tagihan
          </button>

          <MBankingLoanTransactionHistory transactions={transactions} />
        </main>
      </div>

      <MBankingStickyActionButton
        label="Bayar Angsuran"
        onClick={() => setShowReview(true)}
      />

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}