"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/MBankingBillingQrisSourceFundCard";

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
      .find((screen) => {
        const rect = screen.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
    setMobileScreen(visibleScreen ?? null);
    setSelectedAccount(currentAccount ?? accounts[0]);
  }, [accounts, currentAccount, open]);

  React.useEffect(() => {
    if (!open || !mobileScreen) return;

    const frame = mobileScreen.closest<HTMLElement>('[data-mobile-frame="true"]');
    const scrollContainer = frame?.parentElement?.parentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousContainerOverflow = scrollContainer?.style.overflow;
    const previousContainerOverscrollBehavior = scrollContainer?.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
      scrollContainer.style.overscrollBehavior = "none";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      if (!scrollContainer) return;
      scrollContainer.style.overflow = previousContainerOverflow ?? "";
      scrollContainer.style.overscrollBehavior = previousContainerOverscrollBehavior ?? "";
    };
  }, [mobileScreen, open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div data-source-fund-page="true" className="absolute inset-0 z-[190] h-full min-h-full overflow-y-auto overscroll-contain bg-[#0758C9] text-black [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <header className="relative flex h-[132px] min-h-[132px] flex-col items-start overflow-hidden bg-[#0758C9] px-[31px] pt-[18px] text-white">
        <div className="pointer-events-none absolute -right-[18px] -top-[44px] h-[132px] w-[158px] rounded-b-full bg-white/10" />
        <button type="button" onClick={() => onOpenChange(false)} className="relative z-10 -ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full" aria-label="Kembali">
          <ArrowLeft className="h-[25px] w-[25px]" strokeWidth={2.7} />
        </button>
        <h1 className="relative z-10 mt-[12px] text-[25px] font-bold leading-tight">Sumber Dana</h1>
      </header>
      <main className="relative z-10 -mt-[1px] flex min-h-0 flex-col rounded-t-[20px] bg-white px-6 pb-3 pt-6">
        <div data-source-fund-scroll="true" className="pb-2">
          <div className="grid gap-3">
            {accounts.map((account) => (
              <NewMBankingSourceFundGradientCard key={account.accountNo} account={account} selected={selectedAccount.accountNo === account.accountNo} showChevron={false} onClick={() => setSelectedAccount(account)} />
            ))}
          </div>
        </div>
        <button type="button" onClick={() => { onSelect(selectedAccount); onOpenChange(false); }} className={cn("mt-2 h-[48px] shrink-0 rounded-[8px] bg-[#0758C9] text-[14px] font-bold text-white", "transition active:scale-[0.98]")}>Simpan</button>
        <div className="h-3 shrink-0" aria-hidden="true" />
      </main>
    </div>,
    mobileScreen,
  );
}
