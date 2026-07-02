"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowRight, UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-[24px]">
      <div className="text-[14px] font-bold leading-tight text-black">
        {title}
      </div>
      <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />
      <div className="mt-[12px]">{children}</div>
    </section>
  );
}

function AccountInfoItem({
  name,
  subtitle,
}: {
  name: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-[12px]">
      <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#F1F3F6] text-[#53657D]">
        <UserRound className="h-[22px] w-[22px]" strokeWidth={2.45} />
      </span>

      <div className="min-w-0">
        <div className="truncate text-[18px] font-bold leading-tight tracking-[-0.025em] text-black">
          {name}
        </div>
        <div className="mt-[5px] truncate text-[12px] font-normal leading-tight text-[#8F8F8F]">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function TransactionRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[14px] font-normal leading-tight text-black">
        {label}
      </div>
      <div
        className={cn(
          "text-right leading-tight text-black",
          strong
            ? "text-[18px] font-bold tracking-[-0.02em]"
            : "text-[14px] font-normal",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingTransferConfirmModal({
  open,
  onOpenChange,
  sourceName = "Arya",
  sourceInfo = "11122333311 - Simpanan Kaya",
  recipientName = "Suyatna",
  recipientAccountNo,
  description,
  nominal,
  totalWithFee = "Rp. 52.500,00",
  onContinue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceName?: string;
  sourceInfo?: string;
  recipientName?: string;
  recipientAccountNo: string;
  description: string;
  nominal: string;
  totalWithFee?: string;
  onContinue?: () => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
  }, [open]);

  if (!open || !mobileScreen) return null;

  const displayedRecipientAccount = recipientAccountNo.trim() || "22111122333";
  const displayedDescription = description.trim() || "Bayar UKT";
  const displayedNominal = nominal.trim() || "50.000,00";

  return createPortal(
    <div className="absolute inset-0 z-[120] flex items-end bg-black/35 px-5 pb-5 pt-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi transfer"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
            Konfirmasi Transaksi Transfer
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

        <SectionBlock title="Sumber Dana">
          <AccountInfoItem name={sourceName} subtitle={sourceInfo} />
        </SectionBlock>

        <SectionBlock title="Tujuan">
          <AccountInfoItem
            name={recipientName}
            subtitle={displayedRecipientAccount}
          />
        </SectionBlock>

        <SectionBlock title="Deskripsi">
          <div className="text-[14px] font-normal leading-relaxed text-black">
            {displayedDescription}
          </div>
        </SectionBlock>

        <SectionBlock title="Transaksi">
          <div className="grid gap-[14px]">
            <TransactionRow label="Nominal" value={displayedNominal} />

            <div className="border-t border-dashed border-[#D8D8D8]" />

            <TransactionRow label="Total" value={displayedNominal} strong />
          </div>
        </SectionBlock>

        <div className="mt-[28px] grid gap-[10px]">
          <button
            type="button"
            onClick={onContinue}
            className={cn(
              "flex h-[56px] w-full items-center justify-between gap-3 rounded-[8px] bg-[#479DF4] px-5",
              "text-white transition active:scale-[0.98]",
            )}
          >
            <span className="min-w-0 text-left text-[14px] font-semibold leading-none">
              Lanjutkan Transaksi
            </span>

            <span className="ml-auto whitespace-nowrap text-right text-[14px] font-semibold leading-none">
              {totalWithFee}
            </span>

            <ArrowRight className="h-[24px] w-[24px] shrink-0 text-white" strokeWidth={2.6} />
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "h-[56px] w-full rounded-[8px] border border-[#D8D8D8] bg-white",
              "text-[14px] font-semibold leading-none text-[#828282]",
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