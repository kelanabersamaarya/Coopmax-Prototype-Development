"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";

export type SourceFundAccount = {
  productName: string;
  accountNo: string;
  balance: string;
  balanceLabel?: string;
};

const savingsSourceFundAccounts: SourceFundAccount[] = [
  {
    productName: "Simpanan Kaya",
    accountNo: "112233111",
    balance: "Rp. 4.000.000,00",
  },
  {
    productName: "Simpanan Sukarela",
    accountNo: "4260029",
    balance: "Rp. 2.750.000,00",
  },
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
    () =>
      includeVirtualAccount
        ? [...savingsSourceFundAccounts, virtualAccountSourceFund]
        : savingsSourceFundAccounts,
    [includeVirtualAccount],
  );
  const [selectedAccount, setSelectedAccount] =
    React.useState<SourceFundAccount>(accounts[0]);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setSelectedAccount(accounts[0]);
  }, [accounts, open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[120] flex items-end bg-black/35 px-5 pb-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup pilihan rekening"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          "relative z-10 w-full rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[290px] text-[14px] font-bold leading-snug text-black">
            Silakan pilih rekening sumber dana pembayaran
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-[18px] grid gap-[10px]">
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

        <div className="mt-[18px] grid grid-cols-1 gap-[10px]">
          <button
            type="button"
            onClick={() => {
              onSelect(selectedAccount);
              onOpenChange(false);
            }}
            className={cn(
              "h-[46px] rounded-[8px] bg-[#479DF4]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Simpan
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "h-[46px] rounded-[8px] border border-[#D9D9D9] bg-white",
              "text-[12px] font-normal leading-none text-[#828282]",
              "transition active:scale-[0.98]",
            )}
          >
            Batal
          </button>
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}