"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

export default function NewMBankingQrisConfirmModal({
  open,
  onOpenChange,
  amount,
  sourceFund,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  sourceFund: SourceFundAccount;
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
    <div className="absolute inset-0 z-[120] flex items-end bg-black/35">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi pembayaran"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full overflow-hidden rounded-t-[30px] bg-white px-[31px] pb-[30px] pt-[26px] shadow-[0_-18px_45px_rgba(15,23,42,0.22)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[14px] font-bold leading-tight text-black">
              Konfirmasi Transaksi Pembayaran
            </div>
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

        <div className="mt-[22px] flex items-start gap-[12px]">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[#ECEEF1] text-black">
            <ShoppingCart
              className="h-[20px] w-[20px] text-black"
              strokeWidth={2.4}
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

        <div className="mt-[30px] text-center text-[28px] font-bold leading-none tracking-[-0.02em] text-[#111827]">
          {amount || "Rp. 50.000,00"}
        </div>

        <div className="mt-[30px] h-px w-full bg-[#D8D8D8]" />

        <div className="mt-[22px] text-[24px] font-normal leading-tight text-[#8F8F8F]">
          Sumber Dana
        </div>

        <div className="mt-[14px] rounded-[15px] border border-[#D8D8D8] bg-white px-[26px] py-[20px]">
          <div className="text-[20px] font-normal leading-tight text-[#2F3137]">
            {sourceFund.productName}
          </div>
          <div className="mt-[10px] text-[26px] font-bold leading-tight text-[#2F3137]">
            {sourceFund.accountNo}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className={cn(
            "mt-[28px] h-[46px] w-full rounded-[10px] bg-[#479DF4]",
            "text-[12px] font-normal leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Bayar Sekarang
        </button>
      </div>
    </div>,
    mobileScreen,
  );
}