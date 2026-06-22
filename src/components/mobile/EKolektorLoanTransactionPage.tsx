"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorBillListPage from "@/components/mobile/EKolektorBillListPage";
import EKolektorInstallmentDetailSection from "@/components/mobile/EKolektorInstallmentDetailSection";
import EKolektorInstallmentHistoryPage from "@/components/mobile/EKolektorInstallmentHistoryPage";
import EKolektorLoanTransactionForm from "@/components/mobile/EKolektorLoanTransactionForm";
import EKolektorLoanTransactionSubmitPage from "@/components/mobile/EKolektorLoanTransactionSubmitPage";
import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

const FOURTH_ACCOUNT_NO = "072260001";

const loanInfoItems = [
  {
    title: "No. Rekening",
    subtitle: "SMG260004 - KORMANI",
  },
  {
    title: "Grace Period",
    subtitle: "3 Bulan",
  },
  {
    title: "Tagihan Ke-",
    subtitle: "1",
  },
  {
    title: "Jatuh Tempo tagihan",
    subtitle: "25-01-2026",
  },
  {
    title: "Sisa Pinjaman",
    subtitle: "Rp. 10.000.000,00",
  },
  {
    title: "Total Angsuran",
    subtitle: "Rp. 991.666",
  },
  {
    title: "Total Hutang",
    subtitle: "Rp. 0,00",
  },
];

export default function EKolektorLoanTransactionPage({
  accountNo,
  onBack,
  onDoneHome,
  onTransactionSaved,
}: {
  accountNo?: string;
  onBack: () => void;
  onDoneHome: () => void;
  onTransactionSaved: (transaction: EKolektorTodayTransaction) => void;
}) {
  const [showSubmitPage, setShowSubmitPage] = React.useState(false);
  const [showInstallmentHistory, setShowInstallmentHistory] = React.useState(false);
  const [showBillList, setShowBillList] = React.useState(false);

  const isFourthAccount = accountNo === FOURTH_ACCOUNT_NO;

  const visibleLoanInfoItems = React.useMemo(() => {
    if (!isFourthAccount) return loanInfoItems;
    return loanInfoItems.filter((item) => item.title !== "Grace Period");
  }, [isFourthAccount]);

  if (showBillList) {
    return (
      <EKolektorBillListPage
        accountNo={accountNo}
        onBack={() => setShowBillList(false)}
      />
    );
  }

  if (showInstallmentHistory) {
    return (
      <EKolektorInstallmentHistoryPage
        onBack={() => setShowInstallmentHistory(false)}
      />
    );
  }

  if (showSubmitPage) {
    return (
      <EKolektorLoanTransactionSubmitPage
        onBack={() => setShowSubmitPage(false)}
        onDone={onDoneHome}
        onTransactionSaved={onTransactionSaved}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[116px] overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
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

        <main className="relative z-10 -mt-[30px] min-h-[calc(100%-86px)] rounded-t-[30px] bg-white px-6 pb-0 pt-8">
          <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#004FC7]">
            Angsuran Pinjaman
          </div>
          <div className="mt-1 text-[14px] font-normal leading-relaxed text-[#9B9B9B]">
            Silakan lengkapi form berikut
          </div>

          <div className="mt-[24px] grid gap-[22px]">
            {visibleLoanInfoItems.map((item) => (
              <div key={item.title} className="min-w-0">
                <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
                  {item.title}
                </div>
                <div className="mt-[8px] min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-extrabold leading-tight tracking-tight text-[#23305A]">
                  {item.title === "No. Rekening" && accountNo
                    ? `${accountNo} - KORMANI`
                    : item.subtitle}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[28px] text-[14px] font-extrabold leading-tight tracking-tight text-[#B8B8B8]">
            Detail Angsuran
          </div>

          <EKolektorInstallmentDetailSection />

          <div
            className={cn(
              "mt-[18px] grid gap-[12px]",
              isFourthAccount ? "grid-cols-1" : "grid-cols-2",
            )}
          >
            {!isFourthAccount ? (
              <button
                type="button"
                onClick={() => setShowBillList(true)}
                className={cn(
                  "inline-flex h-[41px] items-center justify-center rounded-[9px]",
                  "bg-[#004FC7] px-3 text-[12px] font-semibold text-white",
                  "shadow-[0_3px_8px_rgba(0,79,199,0.18)] transition active:scale-[0.98]",
                )}
              >
                Lihat Tagihan
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => setShowInstallmentHistory(true)}
              className={cn(
                "inline-flex h-[41px] items-center justify-center rounded-[9px]",
                "border border-[#004FC7] bg-white px-3 text-[12px] font-semibold text-[#004FC7]",
                "transition active:scale-[0.98]",
              )}
            >
              Lihat Riwayat Angsuran
            </button>
          </div>

          <EKolektorLoanTransactionForm />

          <div className="sticky bottom-0 -mx-6 mt-6 bg-white px-6 pb-5 pt-3">
            <button
              type="button"
              onClick={() => setShowSubmitPage(true)}
              className="h-[43px] w-full rounded-[9px] bg-[#004FC7] text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(0,79,199,0.22)] transition hover:bg-[#0046B3] active:translate-y-px"
            >
              Lanjutkan
            </button>
          </div>
        </main>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}