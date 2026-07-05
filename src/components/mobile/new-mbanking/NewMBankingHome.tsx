import * as React from "react";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingAccountDetailPage from "@/components/mobile/new-mbanking/NewMBankingAccountDetailPage";
import NewMBankingAccountsSection from "@/components/mobile/new-mbanking/NewMBankingAccountsSection";
import NewMBankingDepositAccountsPage from "@/components/mobile/new-mbanking/NewMBankingDepositAccountsPage";
import NewMBankingDepositDetailPage from "@/components/mobile/new-mbanking/NewMBankingDepositDetailPage";
import NewMBankingHistoryPage from "@/components/mobile/new-mbanking/NewMBankingHistoryPage";
import NewMBankingHomeBrandHeader from "@/components/mobile/new-mbanking/NewMBankingHomeBrandHeader";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingInterbankTransferPage from "@/components/mobile/new-mbanking/NewMBankingInterbankTransferPage";
import NewMBankingLoanInstallmentDetailPage, {
  type NewMBankingLoanInstallmentAccount,
} from "@/components/mobile/new-mbanking/NewMBankingLoanInstallmentDetailPage";
import NewMBankingLoanInstallmentPage from "@/components/mobile/new-mbanking/NewMBankingLoanInstallmentPage";
import NewMBankingLogoutButton from "@/components/mobile/new-mbanking/NewMBankingLogoutButton";
import NewMBankingLogoutConfirmModal from "@/components/mobile/new-mbanking/NewMBankingLogoutConfirmModal";
import NewMBankingPaymentPage from "@/components/mobile/new-mbanking/NewMBankingPaymentPage";
import NewMBankingPortfolioPage from "@/components/mobile/new-mbanking/NewMBankingPortfolioPage";
import NewMBankingProfilePage from "@/components/mobile/new-mbanking/NewMBankingProfilePage";
import NewMBankingPurchasePage from "@/components/mobile/new-mbanking/NewMBankingPurchasePage";
import NewMBankingQuickActionGrid from "@/components/mobile/new-mbanking/NewMBankingQuickActionGrid";
import NewMBankingScanPage from "@/components/mobile/new-mbanking/NewMBankingScanPage";
import NewMBankingTransferTypeModal from "@/components/mobile/new-mbanking/NewMBankingTransferTypeModal";
import NewMBankingWelcomeItem from "@/components/mobile/new-mbanking/NewMBankingWelcomeItem";

type TransferMode = "antar-rekening" | "antar-bank";

const homeLoanDetailAccount: NewMBankingLoanInstallmentAccount = {
  id: "loan-home-smg260004",
  productName: "Pinjaman Billing",
  accountNo: "SMG260004",
  totalLoan: "Rp. 12.000.000,00",
  remainingLoan: "Rp. 10.000.000,00",
  dueDate: "25-01-2026",
  gracePeriod: "3 Bulan",
  disbursementDate: "01-03-2026",
  tenor: "12 Bulan",
  installmentNo: "1",
  installmentBill: {
    totalPay: "Rp. 991.666,00",
    installmentNo: "1",
    principal: "Rp. 833.333,00",
    interest: "Rp. 83.333,00",
    principalDebt: "Rp. 0,00",
    interestDebt: "Rp. 0,00",
    penalty: "Rp. 75.000,00",
    remainingLoan: "Rp. 10.000.000,00",
  },
};

export default function NewMBankingHome({
  transactions = [],
  onTransactionSaved,
  onLogout,
  onReturnToOnboarding,
}: {
  transactions?: MBankingTransactionHistoryEntry[];
  onTransactionSaved?: (transaction: MBankingTransactionHistoryEntry) => void;
  onLogout?: () => void;
  onReturnToOnboarding?: () => void;
}) {
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [showAccountDetail, setShowAccountDetail] = React.useState(false);
  const [showDepositDetail, setShowDepositDetail] = React.useState(false);
  const [showHomeLoanDetail, setShowHomeLoanDetail] = React.useState(false);
  const [showQrisFlow, setShowQrisFlow] = React.useState(false);
  const [showPortfolio, setShowPortfolio] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showDepositAccounts, setShowDepositAccounts] = React.useState(false);
  const [showLoanInstallment, setShowLoanInstallment] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const [showPayment, setShowPayment] = React.useState(false);
  const [showPurchase, setShowPurchase] = React.useState(false);
  const [transferTypeOpen, setTransferTypeOpen] = React.useState(false);
  const [transferMode, setTransferMode] = React.useState<TransferMode | null>(
    null,
  );

  function openProfile() {
    setShowPortfolio(false);
    setShowHistory(false);
    setShowProfile(true);
  }

  if (showHomeLoanDetail) {
    return (
      <NewMBankingLoanInstallmentDetailPage
        account={homeLoanDetailAccount}
        onBack={() => setShowHomeLoanDetail(false)}
      />
    );
  }

  if (showDepositDetail) {
    return (
      <NewMBankingDepositDetailPage
        onBack={() => setShowDepositDetail(false)}
      />
    );
  }

  if (showLoanInstallment) {
    return (
      <NewMBankingLoanInstallmentPage
        onBack={() => setShowLoanInstallment(false)}
      />
    );
  }

  if (showPayment) {
    return <NewMBankingPaymentPage onBack={() => setShowPayment(false)} />;
  }

  if (showPurchase) {
    return <NewMBankingPurchasePage onBack={() => setShowPurchase(false)} />;
  }

  if (transferMode) {
    return (
      <NewMBankingInterbankTransferPage
        title={
          transferMode === "antar-rekening"
            ? "Transfer Antar Rekening"
            : "Transfer Antar Bank"
        }
        onBack={() => setTransferMode(null)}
        onTransferDone={() => setTransferMode(null)}
      />
    );
  }

  if (showDepositAccounts) {
    return (
      <NewMBankingDepositAccountsPage
        onBack={() => setShowDepositAccounts(false)}
      />
    );
  }

  if (showQrisFlow) {
    return <NewMBankingScanPage onBack={() => setShowQrisFlow(false)} />;
  }

  if (showProfile) {
    return (
      <NewMBankingProfilePage
        onBack={() => setShowProfile(false)}
        onRequireLogin={onLogout}
        onAccountDeleted={onReturnToOnboarding}
      />
    );
  }

  if (showPortfolio) {
    return (
      <NewMBankingPortfolioPage
        onBack={() => setShowPortfolio(false)}
        onHomeClick={() => setShowPortfolio(false)}
        onQrisClick={() => setShowQrisFlow(true)}
        onProfileClick={openProfile}
      />
    );
  }

  if (showHistory) {
    return (
      <NewMBankingHistoryPage
        onBack={() => setShowHistory(false)}
        onHomeClick={() => setShowHistory(false)}
        onPortfolioClick={() => {
          setShowHistory(false);
          setShowPortfolio(true);
        }}
        onQrisClick={() => {
          setShowHistory(false);
          setShowQrisFlow(true);
        }}
        onProfileClick={openProfile}
      />
    );
  }

  if (showAccountDetail) {
    return (
      <NewMBankingAccountDetailPage
        onBack={() => setShowAccountDetail(false)}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white text-black">
      <main className="relative z-0 min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white pt-0 [scrollbar-width:none] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden">
        <div className="relative shrink-0 overflow-hidden bg-[#4ba2f5] px-6 pb-[58px] pt-[30px]">
          <div className="pointer-events-none absolute -left-[98px] -top-[150px] h-[300px] w-[300px] rounded-full bg-[#f56ac8]" />
          <div className="pointer-events-none absolute -left-[36px] -top-[162px] h-[220px] w-[220px] rounded-full bg-[#f044bd]" />

          <div className="pointer-events-none absolute -right-[76px] -top-[54px] h-[178px] w-[178px] rounded-full bg-[#8fc2f3]" />
          <div className="pointer-events-none absolute right-[-8px] top-[-18px] h-[88px] w-[88px] rounded-full bg-[#459cf0]" />

          <div className="pointer-events-none absolute -bottom-[118px] right-[-116px] h-[260px] w-[260px] rounded-full bg-[#8bdcec]" />
          <div className="pointer-events-none absolute -bottom-[88px] right-[-52px] h-[188px] w-[188px] rounded-full bg-[#65d0e8]" />

          <div className="pointer-events-none absolute -bottom-[92px] -left-[48px] h-[168px] w-[168px] rounded-full bg-[#a143ef]" />
          <div className="pointer-events-none absolute -bottom-[58px] -left-[22px] h-[98px] w-[98px] rounded-full bg-[#8c16ea]" />

          <div className="pointer-events-none absolute inset-0 bg-white/10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.68))]" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <NewMBankingHomeBrandHeader />
              <NewMBankingLogoutButton onClick={() => setLogoutOpen(true)} />
            </div>

            <NewMBankingWelcomeItem />
          </div>
        </div>

        <section className="relative z-20 -mt-[30px] rounded-t-[30px] bg-white px-6 pb-[160px] pt-[20px]">
          <NewMBankingAccountsSection
            className="mt-0"
            onSavingsDetailClick={() => setShowAccountDetail(true)}
            onLoanDetailClick={() => setShowHomeLoanDetail(true)}
            onDepositDetailClick={() => setShowDepositDetail(true)}
          />

          <NewMBankingQuickActionGrid
            onDepositClick={() => setShowDepositAccounts(true)}
            onTransferClick={() => setTransferTypeOpen(true)}
            onInstallmentClick={() => setShowLoanInstallment(true)}
            onPaymentClick={() => setShowPayment(true)}
            onPurchaseClick={() => setShowPurchase(true)}
          />
        </section>

        <div className="sr-only">
          {transactions.length}
          {transactions[0] ? (
            <button
              type="button"
              onClick={() => onTransactionSaved?.(transactions[0])}
            >
              sinkron transaksi
            </button>
          ) : null}
        </div>
      </main>

      <NewMBankingHomeMenuSection
        activeTab="home"
        onHomeClick={() => {}}
        onPortfolioClick={() => setShowPortfolio(true)}
        onQrisClick={() => setShowQrisFlow(true)}
        onHistoryClick={() => setShowHistory(true)}
        onProfileClick={openProfile}
      />

      <NewMBankingTransferTypeModal
        open={transferTypeOpen}
        onClose={() => setTransferTypeOpen(false)}
        onChooseInternal={() => {
          setTransferTypeOpen(false);
          setTransferMode("antar-rekening");
        }}
        onChooseInterbank={() => {
          setTransferTypeOpen(false);
          setTransferMode("antar-bank");
        }}
      />

      <NewMBankingLogoutConfirmModal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onExit={() => {
          setLogoutOpen(false);
          onLogout?.();
        }}
      />
    </div>
  );
}