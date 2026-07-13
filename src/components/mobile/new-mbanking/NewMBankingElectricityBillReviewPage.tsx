"use client";

import * as React from "react";
import {
  ArrowLeft,
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingSourceFundGradientCard from "@/components/mobile/new-mbanking/NewMBankingSourceFundGradientCard";
import NewMBankingSourceFundModal, {
  type SourceFundAccount,
} from "@/components/mobile/new-mbanking/NewMBankingSourceFundModal";
import NewMBankingElectricityConfirmModal from "@/components/mobile/new-mbanking/NewMBankingElectricityConfirmModal";
import NewMBankingElectricityPaymentSuccessPage from "@/components/mobile/new-mbanking/NewMBankingElectricityPaymentSuccessPage";

type ServiceVariant =
  | "electricity"
  | "water"
  | "pbb"
  | "internet"
  | "finance"
  | "tv"
  | "bpjs"
  | "postpaid-phone";

const defaultSourceFund: SourceFundAccount = {
  productName: "Simpanan Kaya",
  accountNo: "112233111",
  balance: "Rp. 4.000.000,00",
};

const adminFee = "Rp. 2.500,00";

function parseIdrLike(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  const parsed = Number(digits);
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
  if (variant === "postpaid-phone") return Smartphone;
  return Zap;
}

function getServiceIconBackground(variant: ServiceVariant) {
  if (variant === "water") return "bg-[#06B6D4]";
  if (variant === "pbb") return "bg-[#8B5CF6]";
  if (variant === "internet") return "bg-[#2563EB]";
  if (variant === "finance") return "bg-[#3B82F6]";
  if (variant === "tv") return "bg-[#14B8A6]";
  if (variant === "bpjs") return "bg-[#22C55E]";
  if (variant === "postpaid-phone") return "bg-[#479DF4]";
  return "bg-[#F59E0B]";
}

function getServiceIconShadow(variant: ServiceVariant) {
  if (variant === "water") return "shadow-[0_10px_24px_rgba(6,182,212,0.24)]";
  if (variant === "pbb") return "shadow-[0_10px_24px_rgba(139,92,246,0.24)]";
  if (variant === "internet") return "shadow-[0_10px_24px_rgba(37,99,235,0.24)]";
  if (variant === "finance") return "shadow-[0_10px_24px_rgba(59,130,246,0.24)]";
  if (variant === "tv") return "shadow-[0_10px_24px_rgba(20,184,166,0.24)]";
  if (variant === "bpjs") return "shadow-[0_10px_24px_rgba(34,197,94,0.24)]";
  if (variant === "postpaid-phone")
    return "shadow-[0_10px_24px_rgba(71,157,244,0.24)]";
  return "shadow-[0_10px_24px_rgba(245,158,11,0.24)]";
}

function getBillAmount(variant: ServiceVariant, bpjsMonths: string) {
  if (variant === "water") return "Rp. 125.000,00";
  if (variant === "pbb") return "Rp. 275.000,00";
  if (variant === "internet") return "Rp. 315.000,00";
  if (variant === "finance") return "Rp. 1.250.000,00";
  if (variant === "tv") return "Rp. 185.000,00";
  if (variant === "postpaid-phone") return "Rp. 95.000,00";

  if (variant === "bpjs") {
    const monthCount = Number.parseInt(bpjsMonths, 10) || 1;
    return formatIdr(monthCount * 70_000);
  }

  return "Rp. 350.000,00";
}

function getCustomerName(variant: ServiceVariant) {
  if (variant === "finance") return "Laura Patel";
  if (variant === "bpjs") return "Keluarga Laura Patel";
  if (variant === "postpaid-phone") return "Laura Patel";
  return "I Made Wirata";
}

function getCustomerNumberLabel(variant: ServiceVariant) {
  return variant === "postpaid-phone" ? "No. Handphone" : "No. Pelanggan";
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
    <div className="flex items-start justify-between gap-4 py-[8px]">
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

export default function NewMBankingElectricityBillReviewPage({
  providerName,
  customerNo,
  onBack,
  onDone,
  title = "Listrik PLN",
  serviceVariant = "electricity",
  bpjsMonths = "1 Bulan",
  recipientAlreadySaved = false,
  onSaveRecipient,
}: {
  providerName: string;
  customerNo: string;
  onBack: () => void;
  onDone: () => void;
  title?: string;
  serviceVariant?: ServiceVariant;
  bpjsMonths?: string;
  recipientAlreadySaved?: boolean;
  onSaveRecipient?: () => void;
}) {
  const [sourceFundOpen, setSourceFundOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [sourceFund, setSourceFund] =
    React.useState<SourceFundAccount>(defaultSourceFund);

  const customerName = getCustomerName(serviceVariant);
  const billAmount = getBillAmount(serviceVariant, bpjsMonths);
  const Icon = getServiceIcon(serviceVariant);

  const totalTransaction = formatIdr(
    parseIdrLike(billAmount) + parseIdrLike(adminFee),
  );

  if (showSuccess) {
    return (
      <NewMBankingElectricityPaymentSuccessPage
        providerName={providerName}
        customerName={customerName}
        customerNo={customerNo}
        amount={billAmount}
        adminFee={adminFee}
        totalTransaction={totalTransaction}
        sourceFund={sourceFund}
        serviceVariant={serviceVariant}
        bpjsMonths={bpjsMonths}
        recipientAlreadySaved={recipientAlreadySaved}
        onSaveRecipient={onSaveRecipient}
        onDone={onDone}
      />
    );
  }

  return (
    <div
      data-payment-bill-review-page="true"
      className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black"
    >
      <NewMBankingSourceFundModal
        open={sourceFundOpen}
        onOpenChange={setSourceFundOpen}
        onSelect={setSourceFund}
      />

      <NewMBankingElectricityConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        providerName={providerName}
        customerName={customerName}
        customerNo={customerNo}
        amount={billAmount}
        sourceFund={sourceFund}
        onSourceFundChange={setSourceFund}
        serviceVariant={serviceVariant}
        onConfirm={() => {
          setConfirmOpen(false);
          setShowSuccess(true);
        }}
      />

      <div className="shrink-0 bg-[#F9F9F9]">
        <NewMBankingStatusBar />

        <header className="flex h-[62px] items-center gap-3 px-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-transparent text-black transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[24px] w-[24px]" strokeWidth={2.6} />
          </button>

          <h1 className="text-[18px] font-bold leading-tight tracking-[-0.03em] text-black">
            {title}
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="min-h-full rounded-t-[30px] bg-white px-6 pb-[118px] pt-[34px]">
          <div className="flex flex-col items-center text-center">
            <span
              className={cn(
                "grid h-[86px] w-[86px] place-items-center rounded-full text-white",
                getServiceIconBackground(serviceVariant),
                getServiceIconShadow(serviceVariant),
              )}
            >
              <Icon className="h-[42px] w-[42px] text-white" strokeWidth={2.7} />
            </span>

            <h2 className="mt-[18px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              {providerName}
            </h2>
          </div>

          <div className="mt-[34px] rounded-[20px] border border-[#E5E7EB] bg-white px-5 py-4">
            <DetailRow label="Nama Pelanggan" value={customerName} />
            <DetailRow
              label={getCustomerNumberLabel(serviceVariant)}
              value={customerNo}
            />
            {serviceVariant === "bpjs" ? (
              <DetailRow label="Jumlah Bulan" value={bpjsMonths} />
            ) : null}
            <div className="my-[8px] h-px w-full bg-[#E5E7EB]" />
            <DetailRow label="Nominal Tagihan" value={billAmount} strong />
          </div>

          <section className="mt-[30px]">
            <div className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-black">
              Sumber Dana
            </div>

            <div className="mt-[12px]">
              <NewMBankingSourceFundGradientCard
                account={sourceFund}
                onClick={() => setSourceFundOpen(true)}
              />
            </div>
          </section>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan Pembayaran
        </button>
      </div>
    </div>
  );
}