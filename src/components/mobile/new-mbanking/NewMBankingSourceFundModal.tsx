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
  { productName: "Simpanan Berjangka", accountNo: "5300148", balance: "Rp. 6.500.000,00" },
  { productName: "Simpanan Pendidikan", accountNo: "6400271", balance: "Rp. 3.200.000,00" },
  { productName: "Simpanan Hari Raya", accountNo: "7500384", balance: "Rp. 1.850.000,00" },
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
  selectedAccount: currentAccount,
  includeVirtualAccount = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (account: SourceFundAccount) => void;
  selectedAccount?: SourceFundAccount;
  includeVirtualAccount?: boolean;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const accounts = React.useMemo(
    () => includeVirtualAccount ? [...savingsSourceFundAccounts, virtualAccountSourceFund] : savingsSourceFundAccounts,
    [includeVirtualAccount],
  );
  const [selectedAccount, setSelectedAccount] = React.useState(currentAccount ?? accounts[0]);

  React.useEffect(() => {
    if (!open) return;
    const mobileScreens = Array.from(
      document.querySelectorAll<HTMLElement>('[data-mobile-screen="true"]'),
    );
    const visibleScreen = [...mobileScreens]
      .reverse()
      .find((screen) => screen.getBoundingClientRect().width > 0 && screen.getBoundingClientRect().height > 0);
    setMobileScreen(visibleScreen ?? null);
    setSelectedAccount(currentAccount ?? accounts[0]);
  }, [accounts, currentAccount, open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[190] flex h-full min-h-full flex-col bg-[#0758C9] text-black">
      <header className="relative z-20 flex h-[92px] shrink-0 items-center gap-5 overflow-hidden bg-white px-[31px] pt-[18px] text-black">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent transition active:scale-[0.98]"
          aria-label="Kembali"
        >
          <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={2.4} />
        </button>
        <h1 className="text-[17px] font-bold leading-tight">Sumber Dana</h1>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col bg-white px-6 pb-6 pt-6">
        <div className="grid gap-3 overflow-y-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
