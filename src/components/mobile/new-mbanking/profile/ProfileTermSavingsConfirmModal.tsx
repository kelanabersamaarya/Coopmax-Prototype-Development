"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-[7px]">
      <div className="min-w-0 text-[14px] font-normal leading-tight text-[#8F8F8F]">
        {label}
      </div>
      <div className="max-w-[185px] text-right text-[14px] font-normal leading-tight text-black">
        {value}
      </div>
    </div>
  );
}

function SectionBlock({
  title,
  action,
  children,
  className,
  titleClassName,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section className={cn("mt-[22px]", className)}>
      <div className="flex items-center justify-between gap-3">
        <div
          className={cn(
            "text-[14px] font-bold leading-tight text-black",
            titleClassName,
          )}
        >
          {title}
        </div>
        {action}
      </div>
      <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />
      <div className="mt-[10px]">{children}</div>
    </section>
  );
}

export default function ProfileTermSavingsConfirmModal({
  open,
  sourceFund,
  onSourceFundChange,
  keterangan,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  sourceFund: SourceFundAccount;
  onSourceFundChange: (sourceFund: SourceFundAccount) => void;
  keterangan: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setSourceFundOpen(false);
  }, [open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[150] flex items-end justify-center bg-black/35 px-5 pb-5 pt-8">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={onSourceFundChange}
      />

      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup konfirmasi setor simpanan berjangka"
        onClick={onCancel}
      />

      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
            Konfirmasi Iuran Simpanan Berjangka
          </h2>

          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <SectionBlock
          title="Sumber Dana"
          className="mt-[14px]"
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
            textSize="compact"
            className="min-h-[104px] shadow-none"
            onClick={() => setSourceFundOpen(true)}
          />
        </SectionBlock>

        <SectionBlock
          title="Detail Setoran"
          titleClassName="font-normal"
        >
          <DetailRow label="Periode" value="Juli 2026" />
          <DetailRow
            label="Tujuan Setoran"
            value="Simpanan Berjangka - SBJ-2600006"
          />
          <DetailRow label="Saldo Simpanan Berjangka" value="Rp. 50.000,00" />
          <DetailRow label="Nominal Iuran" value="Rp. 50.000,00" />
          <DetailRow label="Keterangan" value={keterangan.trim() || "-"} />
        </SectionBlock>

        <div className="mt-[26px] grid grid-cols-1 gap-[10px]">
          <button
            type="button"
            onClick={onConfirm}
            className={cn(
              "h-[46px] rounded-[8px] bg-[#479DF4]",
              "text-[12px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            Setor Sekarang
          </button>

          <button
            type="button"
            onClick={onCancel}
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