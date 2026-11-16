"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";

export type SourceFundAccount = {
  productName: string;
  accountNo: string;
  balance: string;
  balanceLabel?: string;
};

const savingsSourceFundAccounts: SourceFundAccount[] = [
  { productName: "Simpanan Kaya", accountNo: "112233111", balance: "Rp. 4.000.000,00" },
  { productName: "Simpanan Sukarela", accountNo: "4260029", balance: "Rp. 2.750.000,00" },
];

const virtualAccountSourceFund: SourceFundAccount = {
  productName: "Virtual Account",
  accountNo: "88810 112233111",
  balance: "Bayar melalui VA",
  balanceLabel: "Metode Pembayaran",
};

export default function NewMBankingSourceFundModal({
  open,
  onOpenChange,
  onSelect,
  includeVirtualAccount = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (account: SourceFundAccount) => void;
  includeVirtualAccount?: boolean;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const accounts = React.useMemo(
    () => includeVirtualAccount ? [...savingsSourceFundAccounts, virtualAccountSourceFund] : savingsSourceFundAccounts,
    [includeVirtualAccount],
  );
  const [selectedAccount, setSelectedAccount] = React.useState(accounts[0]);

  React.useEffect(() => {
    if (!open) return;
    setMobileScreen(document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null);
    setSelectedAccount(accounts[0]);
  }, [accounts, open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[190] flex h-full min-h-full flex-col bg-[#0758C9] text-black">
      <header className="flex h-[128px] shrink-0 flex-col items-start bg-[#0758C9] px-[31px] pt-[18px] text-white">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-[25px] w-[25px]" strokeWidth={2.7} />
        </button>
        <h1 className="mt-[12px] text-[25px] font-bold leading-tight">Sumber Dana</h1>
      </header>

      <main className="flex min-h-0 flex-1 flex-col rounded-t-[20px] bg-white px-6 pb-6 pt-6">
        <p className="text-[14px] font-bold text-[#2F3137]">Silakan pilih rekening sumber dana pembayaran</p>
        <div className="mt-4 grid gap-3 overflow-y-auto pb-4">
          {accounts.map((account) => (
            <NewMBankingSourceFundGradientCard
              key={account.accountNo}
              account={account}
              selected={selectedAccount.accountNo === account.accountNo}
              showChevron={false}
              onClick={() => setSelectedAccount(account)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            onSelect(selectedAccount);
            onOpenChange(false);
          }}
          className={cn("mt-auto h-[48px] rounded-[8px] bg-[#0758C9] text-[14px] font-bold text-white", "transition active:scale-[0.98]")}
        >
          Simpan
        </button>
      </main>
    </div>,
    mobileScreen,
  );
}
