import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingQrisLogo from "@/components/mobile/new-mbanking/NewMBankingQrisLogo";
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
      <header className="relative z-20 flex h-[70px] shrink-0 items-center justify-between overflow-hidden bg-white px-[31px] text-[#071b38]">
        <button type="button" onClick={onBack} className="-ml-2 inline-flex h-[70px] w-10 items-center justify-center rounded-full bg-transparent transition active:scale-[0.98]" aria-label="Kembali">
          <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
        </button>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NewMBankingQrisLogo />
        </div>
      </header>
      <main className="flex min-h-0 flex-1 flex-col rounded-t-[20px] bg-white px-6 pb-6 pt-6">
        <h1 className="text-[25px] font-bold leading-tight text-[#071b38]">Sumber Dana</h1>
        <p className="mt-3 text-[14px] font-bold text-[#2F3137]">Silakan pilih rekening sumber dana pembayaran</p>
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
