import type { MBankingTransactionHistoryEntry } from "@/components/mobile/m-banking-types";

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
    <div className="h-full min-h-full bg-white text-black">
      <div className="sr-only">
        Home New M-Banking dikosongkan sementara.
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