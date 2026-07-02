import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";
import NewMBankingHomeHeader from "@/components/mobile/new-mbanking/NewMBankingHomeHeader";

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
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <NewMBankingHomeHeader />

      <main className="min-h-0 flex-1 rounded-t-[30px] bg-white px-6 pb-[30px] pt-[24px]">
        <div className="rounded-[18px] border border-dashed border-[#D8D8D8] bg-[#F9F9F9] px-5 py-8 text-center">
          <div className="text-[14px] font-semibold leading-tight text-[#8F8F8F]">
            Bagian berikutnya akan ditambahkan di sini.
          </div>
        </div>
      </main>

      <div className="sr-only">
        {transactions.length}
        <button type="button" onClick={() => onTransactionSaved?.(transactions[0])}>
          sinkron transaksi
        </button>
        <button type="button" onClick={onLogout}>
          keluar
        </button>
      </div>
    </div>
  );
}