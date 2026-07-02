import * as React from "react";
import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingAccountDetailPage from "@/components/mobile/new-mbanking/NewMBankingAccountDetailPage";
import NewMBankingAccountsSection from "@/components/mobile/new-mbanking/NewMBankingAccountsSection";
import NewMBankingHomeBrandHeader from "@/components/mobile/new-mbanking/NewMBankingHomeBrandHeader";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingLogoutButton from "@/components/mobile/new-mbanking/NewMBankingLogoutButton";
import NewMBankingLogoutConfirmModal from "@/components/mobile/new-mbanking/NewMBankingLogoutConfirmModal";
import NewMBankingQuickActionGrid from "@/components/mobile/new-mbanking/NewMBankingQuickActionGrid";
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

  if (showAccountDetail) {
    return (
      <NewMBankingAccountDetailPage
        onBack={() => setShowAccountDetail(false)}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-white pt-[30px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0 bg-[#F9F9F9] px-6 pb-[18px]">
          <div className="flex items-start justify-between gap-4">
            <NewMBankingHomeBrandHeader />
            <NewMBankingLogoutButton onClick={() => setLogoutOpen(true)} />
          </div>

          <NewMBankingWelcomeItem />
        </div>

        <section className="min-h-0 flex-1 bg-white px-6 pb-[160px] pt-[1px]">
          <NewMBankingAccountsSection
            onSavingsDetailClick={() => setShowAccountDetail(true)}
          />

          <NewMBankingQuickActionGrid />
        </section>

        <div className="sr-only">
          {transactions.length}
          <button type="button" onClick={() => onTransactionSaved?.(transactions[0])}>
            sinkron transaksi
          </button>
        </div>
      </main>

      <NewMBankingHomeMenuSection />

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