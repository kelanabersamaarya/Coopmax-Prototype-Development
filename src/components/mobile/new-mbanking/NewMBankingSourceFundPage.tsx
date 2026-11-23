import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

const accounts: SourceFundAccount[] = [
  { productName: "Simpanan Kaya", accountNo: "112233111", balance: "Rp. 4.000.000,00" },
  { productName: "Simpanan Sukarela", accountNo: "4260029", balance: "Rp. 2.750.000,00" },
];

export default function NewMBankingSourceFundPage({
  selectedAccount,
  onBack,
  onSelect,
}: {
  selectedAccount: SourceFundAccount;
  onBack: () => void;
  onSelect: (account: SourceFundAccount) => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col bg-white text-black">
      <header className="flex h-[92px] shrink-0 items-center gap-5 bg-white px-[31px] pt-[18px] text-black">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition active:scale-[0.98]" aria-label="Kembali">
          <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={2.4} />
        </button>
        <h1 className="text-[17px] font-bold leading-tight">Sumber Dana</h1>
      </header>
      <main className="flex min-h-0 flex-1 flex-col bg-white px-6 pb-6 pt-6">
        <p className="text-[14px] font-bold text-[#2F3137]">Silakan pilih rekening sumber dana pembayaran</p>
        <div className="mt-4 grid gap-3">
          {accounts.map((account) => (
            <NewMBankingSourceFundGradientCard
              key={account.accountNo}
              account={account}
              selected={selectedAccount.accountNo === account.accountNo}
              showChevron={false}
              onClick={() => onSelect(account)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onBack}
          className={cn("mt-auto h-[48px] rounded-[8px] bg-[#0758C9] text-[14px] font-bold text-white", "transition active:scale-[0.98]")}
        >
          Simpan
        </button>
      </main>
    </div>
  );
}
