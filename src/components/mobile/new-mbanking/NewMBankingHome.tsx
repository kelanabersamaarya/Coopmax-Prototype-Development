import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingAccountsSection from "@/components/mobile/new-mbanking/NewMBankingAccountsSection";
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
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-[30px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="shrink-0 px-6">
          <div className="flex items-start justify-between gap-4">
            <NewMBankingHomeBrandHeader />
            <NewMBankingLogoutButton onClick={onLogout} />
          </div>

          <NewMBankingWelcomeItem />
        </div>

        <section className="mt-[18px] min-h-0 flex-1 bg-[#FFFF] px-6 pb-[34px] pt-[1px]">
          <NewMBankingAccountsSection />

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
    </div>
  );
}