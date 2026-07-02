import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingHomeBrandHeader from "@/components/mobile/new-mbanking/NewMBankingHomeBrandHeader";
import NewMBankingLogoutButton from "@/components/mobile/new-mbanking/NewMBankingLogoutButton";
import NewMBankingWelcomeItem from "@/components/mobile/new-mbanking/NewMBankingWelcomeItem";
import NewMBankingHomeMenuSection from "@/components/mobile/new-mbanking/NewMBankingHomeMenuSection";

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
    <div className="h-full min-h-full bg-[#F9F9F9] px-6 pt-[30px] text-black">
      <div className="flex items-start justify-between gap-4">
        <NewMBankingHomeBrandHeader />
        <NewMBankingLogoutButton onClick={onLogout} />
      </div>

      <NewMBankingWelcomeItem />

      <NewMBankingHomeMenuSection />

      <div className="sr-only">
        Home New M-Banking dikosongkan sementara.
        {transactions.length}
        <button type="button" onClick={() => onTransactionSaved?.(transactions[0])}>
          sinkron transaksi
        </button>
      </div>
    </div>
  );
}