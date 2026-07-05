"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  Smartphone,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";

type ServiceVariant =
  | "electricity"
  | "water"
  | "pbb"
  | "internet"
  | "finance"
  | "tv"
  | "bpjs"
  | "postpaid-phone"
  | "data-package"
  | "token-pln";

function parseIdrLike(value: string) {
  const raw = (value ?? "").trim();
  if (!raw) return 0;

  const withoutCurrency = raw.replace(/rp\.?/gi, "").replace(/\s/g, "");
  const integerPart = withoutCurrency.split(",")[0] ?? "";
  const cleaned = integerPart.replace(/[^\d-]/g, "");
  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatIdr(value: number) {
  return `Rp. ${Math.round(value).toLocaleString("id-ID")},00`;
}

function getServiceIcon(variant: ServiceVariant) {
  if (variant === "water") return Droplets;
  if (variant === "pbb") return Map;
  if (variant === "internet") return Wifi;
  if (variant === "finance") return Landmark;
  if (variant === "tv") return Monitor;
  if (variant === "bpjs") return HeartPulse;
  if (variant === "postpaid-phone" || variant === "data-package") return Smartphone;
  return Zap;
}

function getServiceDescription(variant: ServiceVariant) {
  if (variant === "water") return "Pembayaran tagihan air";
  if (variant === "pbb") return "Pembayaran Pajak Bumi dan Bangunan";
  if (variant === "internet") return "Pembayaran tagihan internet";
  if (variant === "finance") return "Pembayaran cicilan finance";
  if (variant === "tv") return "Pembayaran tagihan TV";
  if (variant === "bpjs") return "Pembayaran BPJS Kesehatan";
  if (variant === "data-package") return "Pembelian paket data";
  if (variant === "postpaid-phone") return "Pembelian pulsa";
  if (variant === "token-pln") return "Pembelian token PLN";
  return "Pembayaran tagihan listrik";
}

function getCustomerNumberLabel(variant: ServiceVariant) {
  if (variant === "postpaid-phone" || variant === "data-package") {
    return "No. Handphone";
  }

  if (variant === "token-pln") return "No. Meter/ID Pelanggan";

  return "No. Pelanggan";
}

function getNominalLabel(variant: ServiceVariant) {
  return variant === "postpaid-phone" ||
    variant === "data-package" ||
    variant === "token-pln"
    ? "Nominal Pembelian"
    : "Nominal Tagihan";
}

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
          "max-w-[190px] text-right leading-tight text-black",
          strong ? "text-[18px] font-bold" : "text-[14px] font-normal",
        )}
      >
        {value}
      </div>
    </div>
  );
}

export default function NewMBankingElectricityConfirmModal({
  open,
  onOpenChange,
  providerName,
  customerName,
  customerNo,
  amount,
  sourceFund,
  onSourceFundChange,
  onConfirm,
  serviceVariant = "electricity",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerName: string;
  customerName: string;
  customerNo: string;
  amount: string;
  sourceFund: SourceFundAccount;
  onSourceFundChange?: (sourceFund: SourceFundAccount) => void;
  onConfirm: () => void;
  serviceVariant?: ServiceVariant;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [selectedSourceFund, setSelectedSourceFund] =
    React.useState<SourceFundAccount>(sourceFund);

  const adminFee = "Rp. 2.500,00";
  const totalTransaction = formatIdr(parseIdrLike(amount) + parseIdrLike(adminFee));
  const Icon = getServiceIcon(serviceVariant);
  const description = getServiceDescription(serviceVariant);
  const showCustomerName =
    serviceVariant !== "postpaid-phone" &&
    serviceVariant !== "data-package" &&
    serviceVariant !== "token-pln";

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setSelectedSourceFund(sourceFund);
    setSourceFundOpen(false);
  }, [open, sourceFund]);

  function handleSelectSourceFund(nextSourceFund: SourceFundAccount) {
    setSelectedSourceFund(nextSourceFund);
    onSourceFundChange?.(nextSourceFund);
  }

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[120] flex items-end justify-center bg-black/35 px-5 pb-5 pt-8">
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={handleSelectSourceFund}
      />

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
            Konfirmasi Pembayaran
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

        <div className="mt-[14px] flex items-start gap-[12px]">
          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-[#479DF4] text-white shadow-sm">
            <Icon className="h-[22px] w-[22px] text-white" strokeWidth={2.7} />
          </span>

          <div className="min-w-0">
            <div className="text-[18px] font-bold leading-tight text-black">
              {providerName}
            </div>
            {description ? (
              <div className="mt-[6px] text-[12px] font-normal leading-relaxed text-[#828282]">
                {description}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-[14px] h-px w-full bg-[#D8D8D8]" />

        <div className="mt-[8px]">
          {showCustomerName ? (
            <DetailRow label="Nama Pelanggan" value={customerName} />
          ) : null}
          <DetailRow label={getCustomerNumberLabel(serviceVariant)} value={customerNo} />
          <DetailRow label={getNominalLabel(serviceVariant)} value={amount} />
          <DetailRow label="Biaya Admin" value={adminFee} />

          <div className="my-[10px] border-t border-dashed border-[#D8D8D8]" />

          <DetailRow label="Total Transaksi" value={totalTransaction} strong />
        </div>

        <div className="mt-[10px] h-px w-full bg-[#D8D8D8]" />

        <div className="mt-[12px] flex items-center justify-between gap-3">
          <div className="text-[12px] font-normal leading-tight text-[#8F8F8F]">
            Sumber Dana
          </div>
          <button
            type="button"
            onClick={() => setSourceFundOpen(true)}
            className="text-[12px] font-semibold leading-none text-[#479DF4] transition active:scale-[0.98]"
          >
            Ubah
          </button>
        </div>

        <div className="mt-[10px]">
          <NewMBankingSourceFundGradientCard
            account={selectedSourceFund}
            textSize="compact"
            className="min-h-[104px]"
            onClick={() => setSourceFundOpen(true)}
          />
        </div>

        <div className="mt-[24px] grid grid-cols-1 gap-[10px]">
          <button
            type="button"
            onClick={onConfirm}
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