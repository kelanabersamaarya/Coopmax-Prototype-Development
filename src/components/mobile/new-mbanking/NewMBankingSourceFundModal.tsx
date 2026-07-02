"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SourceFundAccount = {
  productName: string;
  accountNo: string;
  balance: string;
};

const sourceFundAccounts: SourceFundAccount[] = [
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

function SourceFundCard({
  account,
  onClick,
}: {
  account: SourceFundAccount;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[115px] w-full items-center justify-between gap-4 rounded-[15px]",
        "border border-[#D8D8D8] bg-white px-[26px] py-[16px] text-left",
        "transition active:scale-[0.99]",
      )}
    >
      <div className="min-w-0">
        <div className="text-[12px] font-normal leading-none text-[#2F3137]">
          {account.productName}
        </div>
        <div className="mt-[6px] text-[16px] font-bold leading-none text-[#2F3137]">
          {account.accountNo}
        </div>

        <div className="mt-[15px] text-[12px] font-normal leading-none text-[#2F3137]">
          Saldo
        </div>
        <div className="mt-[6px] text-[16px] font-bold leading-none text-[#2F3137]">
          {account.balance}
        </div>
      </div>

      <ChevronRight className="h-[28px] w-[28px] shrink-0 text-black" strokeWidth={2.8} />
    </button>
  );
}

export default function NewMBankingSourceFundModal({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (account: SourceFundAccount) => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
  }, [open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[120] flex items-end bg-black/35 px-5 pb-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup pilihan sumber dana"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full overflow-hidden rounded-[24px] bg-white px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <div className="max-w-[290px] text-[14px] font-bold leading-snug text-black">
            Silakan pilih rekening sumber dana pembayaran
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-[18px] grid gap-[10px]">
          {sourceFundAccounts.map((account) => (
            <SourceFundCard
              key={account.accountNo}
              account={account}
              onClick={() => {
                onSelect(account);
                onOpenChange(false);
              }}
            />
          ))}
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}