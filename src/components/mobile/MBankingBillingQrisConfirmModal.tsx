"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceFundAccount } from "@/components/mobile/MBankingBillingQrisSourceFundModal";
import NewMBankingSourceFundModal from "@/components/mobile/MBankingBillingQrisSourceFundModal";
import NewMBankingSourceFundGradientCard from "@/components/mobile/MBankingBillingQrisSourceFundCard";

export default function NewMBankingQrisConfirmModal({
  open,
  onOpenChange,
  amount,
  sourceFund,
  onSourceFundChange,
  onContinuePayment,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  sourceFund: SourceFundAccount;
  onSourceFundChange?: (sourceFund: SourceFundAccount) => void;
  onContinuePayment: () => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [selectedSourceFund, setSelectedSourceFund] =
    React.useState<SourceFundAccount>(sourceFund);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setSelectedSourceFund(sourceFund);
    setSourceFundOpen(false);
  }, [open, sourceFund]);

  function handleSourceFundSelect(nextSourceFund: SourceFundAccount) {
    setSelectedSourceFund(nextSourceFund);
    onSourceFundChange?.(nextSourceFund);
  }

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[120] flex items-end justify-center bg-black/35 px-3 pb-5 pt-6">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={handleSourceFundSelect}
      />

      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi pembayaran"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full max-w-[392px] overflow-hidden rounded-[8px] bg-white px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[14px] font-bold leading-tight text-black">
              Konfirmasi Transaksi Pembayaran
            </div>
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

        <div className="mt-[10px] rounded-[12px] border border-[#D8D8D8] px-[14px] py-[14px]">
          <div className="flex items-start gap-[12px]">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#004FC7] text-white shadow-sm">
              <ShoppingCart
                className="h-[20px] w-[20px] text-white"
                strokeWidth={2.6}
              />
            </div>

            <div className="min-w-0">
              <div className="text-[18px] font-bold leading-tight text-black">
                Mini Mart
              </div>
              <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#828282]">
                Bali, Indonesia
              </div>
              <div className="mt-[4px] text-[12px] font-normal leading-relaxed text-[#828282]">
                Merchant PAN : 2211122223333
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />

        <div className="flex items-center justify-between gap-4 py-[10px]">
          <div className="text-[14px] font-normal leading-tight text-[#777777]">
            Nominal Transaksi
          </div>
          <div className="shrink-0 text-right text-[18px] font-bold leading-tight tracking-[-0.01em] text-[#111827]">
            {amount || "Rp. 50.000,00"}
          </div>
        </div>

        <div className="h-px w-full bg-[#D8D8D8]" />

        <div className="mt-[10px]">
          <div className="text-[12px] font-normal leading-tight text-[#777777]">
            Sumber Dana
          </div>

          <div className="mt-[10px]">
            <NewMBankingSourceFundGradientCard
              account={selectedSourceFund}
              textSize="compact"
              className="min-h-[104px]"
              onClick={() => setSourceFundOpen(true)}
            />
          </div>
        </div>

        <div className="mt-[24px] grid grid-cols-1 gap-[10px]">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onContinuePayment();
            }}
            className={cn(
              "h-[46px] rounded-[8px] bg-[#004FC7]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Lanjutkan Pembayaran
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