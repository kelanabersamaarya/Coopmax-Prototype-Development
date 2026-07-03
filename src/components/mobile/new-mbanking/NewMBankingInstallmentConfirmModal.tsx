"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import type { SourceFundAccount } from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

function DetailRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[7px]">
      <div className="min-w-0 text-[14px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div
        className={cn(
          "max-w-[180px] text-right leading-tight text-black",
          strong ? "text-[18px] font-bold" : "text-[14px] font-normal",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingInstallmentConfirmModal({
  open,
  onOpenChange,
  productName,
  accountNo,
  installmentNo,
  principal,
  interest,
  principalDebt,
  interestDebt,
  penalty,
  totalPay,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  accountNo: string;
  installmentNo: string;
  principal: string;
  interest: string;
  principalDebt: string;
  interestDebt: string;
  penalty: string;
  totalPay: string;
  onConfirm?: () => void;
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
    <div className="absolute inset-0 z-[120] flex items-end justify-center bg-black/35 px-5 pb-5 pt-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi pembayaran"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[365px] overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
            Konfirmasi Pembayaran Angsuran
          </h2>

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

        <div className="mt-[14px]">
          <div className="text-[18px] font-bold leading-tight text-black">
            {productName}
          </div>
          <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#828282]">
            {accountNo} • Angsuran Ke-{installmentNo}
          </div>
        </div>

        <div className="mt-[14px] h-px w-full bg-[#D8D8D8]" />

        <div className="mt-[8px]">
          <DetailRow label="Pokok" value={principal} />
          <DetailRow label="Bunga" value={interest} />
          <DetailRow label="Hutang Pokok" value={principalDebt} />
          <DetailRow label="Hutang Bunga" value={interestDebt} />
          <DetailRow label="Denda" value={penalty} />

          <div className="my-[10px] border-t border-dashed border-[#D8D8D8]" />

          <DetailRow label="Total Bayar" value={totalPay} strong />
        </div>

        <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />

        <div className="mt-[12px] text-[12px] font-normal leading-tight text-[#8F8F8F]">
          Sumber Dana
        </div>

        <div className="mt-[10px]">
          <NewMBankingSourceFundGradientCard
            account={defaultSourceFund}
            showChevron={false}
            textSize="compact"
            className="min-h-[104px]"
          />
        </div>

        <div className="mt-[24px] grid grid-cols-1 gap-[10px]">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onConfirm?.();
            }}
            className={cn(
              "h-[46px] rounded-[8px] bg-[#479DF4]",
              "text-[12px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Bayar Sekarang
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "h-[46px] rounded-[8px] border border-[#D9D9D9] bg-white",
              "text-[12px] font-semibold leading-none text-[#828282]",
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