"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

function SectionBlock({
  title,
  children,
  className,
  action,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn("mt-[24px]", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="text-[14px] font-bold leading-tight text-black">
          {title}
        </div>
        {action}
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
      <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white">
        <UserRound className="h-[22px] w-[22px] text-white" strokeWidth={2.45} />
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

function buildSourceFundAccount(sourceInfo: string): SourceFundAccount {
  const parts = sourceInfo.split(" - ").map((part) => part.trim());
  const accountNo = parts[0] || "11122333311";
  const productName = parts[1] || "Simpanan Kaya";

  return {
    productName,
    accountNo,
    balance: "Rp. 4.000.000,00",
  };
}

export default function NewMBankingTransferConfirmModal({
  open,
  onOpenChange,
  sourceName = "Arya",
  sourceInfo = "11122333311 - Simpanan Kaya",
  recipientName = "Suyatna",
  recipientAccountNo,
  recipientBankName,
  description,
  nominal,
  totalWithFee = "Rp. 52.500,00",
  hideAdminFee = false,
  onContinue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceName?: string;
  sourceInfo?: string;
  recipientName?: string;
  recipientAccountNo: string;
  recipientBankName?: string;
  description: string;
  nominal: string;
  totalWithFee?: string;
  hideAdminFee?: boolean;
  onContinue?: () => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [sourceFund, setSourceFund] = React.useState<SourceFundAccount>(() =>
    buildSourceFundAccount(sourceInfo),
  );

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setSourceFund(buildSourceFundAccount(sourceInfo));
    setSourceFundOpen(false);
  }, [open, sourceInfo]);

  if (!open || !mobileScreen) return null;

  const displayedRecipientAccount = recipientAccountNo.trim() || "22111122333";
  const displayedRecipientBank = recipientBankName?.trim();
  const displayedRecipientSubtitle = displayedRecipientBank
    ? `${displayedRecipientBank} • ${displayedRecipientAccount}`
    : displayedRecipientAccount;
  const displayedDescription = description.trim() || "Bayar UKT";
  const displayedNominal = nominal.trim() || "50.000,00";
  const displayedAdminFee = "2.500,00";
  const displayedTotal = hideAdminFee ? `Rp. ${displayedNominal}` : totalWithFee;

  return createPortal(
    <div className="absolute inset-0 z-[120] flex items-end bg-black/35 px-5 pb-5 pt-8">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi transfer"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 ring-1 ring-black/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
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

        <SectionBlock
          title="Sumber Dana"
          className="mt-[6px]"
          action={
            <button
              type="button"
              onClick={() => setSourceFundOpen(true)}
              className="text-[12px] font-semibold leading-none text-[#479DF4] transition active:scale-[0.98]"
            >
              Ubah
            </button>
          }
        >
          <NewMBankingSourceFundGradientCard
            account={sourceFund}
            showChevron
            iconShape="circle"
            textSize="compact"
            className="min-h-[104px] shadow-none"
            onClick={() => setSourceFundOpen(true)}
          />
          <div className="sr-only">{sourceName}</div>
        </SectionBlock>

        <SectionBlock title="Tujuan">
          <AccountInfoItem
            name={recipientName}
            subtitle={displayedRecipientSubtitle}
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

            {!hideAdminFee ? (
              <TransactionRow label="Biaya Admin" value={displayedAdminFee} />
            ) : null}

            <div className="border-t border-dashed border-[#D8D8D8]" />

            <TransactionRow label="Total" value={displayedTotal} strong />
          </div>
        </SectionBlock>

        <div className="mt-[28px] grid gap-[10px]">
          <button
            type="button"
            onClick={onContinue}
            className={cn(
              "flex h-[56px] w-full items-center justify-center rounded-[8px] bg-[#479DF4] px-5",
              "text-white transition active:scale-[0.98]",
            )}
          >
            <span className="text-center text-[14px] font-semibold leading-none">
              Lanjutkan Transaksi
            </span>
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