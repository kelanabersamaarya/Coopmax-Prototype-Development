import * as React from "react";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingAccountDetailPage from "@/components/mobile/new-mbanking/NewMBankingAccountDetailPage";
import NewMBankingAccountsSection from "@/components/mobile/new-mbanking/NewMBankingAccountsSection";
import NewMBankingDepositAccountsPage from "@/components/mobile/new-mbanking/NewMBankingDepositAccountsPage";
import NewMBankingHomeBrandHeader from "@/components/mobile/new-mbanking/NewMBankingHomeBrandHeader";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingLogoutButton from "@/components/mobile/new-mbanking/NewMBankingLogoutButton";
import NewMBankingLogoutConfirmModal from "@/components/mobile/new-mbanking/NewMBankingLogoutConfirmModal";
import NewMBankingPortfolioPage from "@/components/mobile/new-mbanking/NewMBankingPortfolioPage";
import NewMBankingQuickActionGrid from "@/components/mobile/new-mbanking/NewMBankingQuickActionGrid";
import NewMBankingScanPage from "@/components/mobile/new-mbanking/NewMBankingScanPage";
import NewMBankingWelcomeItem from "@/components/mobile/new-mbanking/NewMBankingWelcomeItem";

export default function NewMBankingHome({
  transactions = [],
  onTransactionSaved,
  onLogout,
}: {
  transactions?: MBankingTransactionHistoryEntry[];
  onTransactionSaved?: (transaction: MBankingTransactionHistoryEntry) => void;
  onLogout?: () => void;
}) {
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [showAccountDetail, setShowAccountDetail] = React.useState(false);
  const [showQrisFlow, setShowQrisFlow] = React.useState(false);
  const [showPortfolio, setShowPortfolio] = React.useState(false);
  const [showDepositAccounts, setShowDepositAccounts] = React.useState(false);

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

  if (showPortfolio) {
    return (
      <NewMBankingPortfolioPage
        onBack={() => setShowPortfolio(false)}
        onHomeClick={() => setShowPortfolio(false)}
        onQrisClick={() => setShowQrisFlow(true)}
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
          />

          <NewMBankingQuickActionGrid
            onDepositClick={() => setShowDepositAccounts(true)}
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