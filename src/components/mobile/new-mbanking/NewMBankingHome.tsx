import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingAccountSummaryCard from "@/components/mobile/new-mbanking/NewMBankingAccountSummaryCard";
import NewMBankingHomeBrandHeader from "@/components/mobile/new-mbanking/NewMBankingHomeBrandHeader";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";
import NewMBankingLogoutButton from "@/components/mobile/new-mbanking/NewMBankingLogoutButton";
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
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] text-black">
      <main className="min-h-0 flex-1 overflow-y-auto px-6 pt-[30px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-start justify-between gap-4">
          <NewMBankingHomeBrandHeader />
          <NewMBankingLogoutButton onClick={onLogout} />
        </div>

        <NewMBankingWelcomeItem />

        <NewMBankingAccountSummaryCard />

        <NewMBankingQuickActionGrid />

        <div className="sr-only">
          {transactions.length}
          <button type="button" onClick={() => onTransactionSaved?.(transactions[0])}>
            sinkron transaksi
          </button>
        </div>
      </main>

      <NewMBankingHomeMenuSection />
    </div>
  );
}