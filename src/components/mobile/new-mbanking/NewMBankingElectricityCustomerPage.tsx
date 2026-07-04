"use client";

import * as React from "react";
import {
  ArrowLeft,
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  Wifi,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingElectricityBillReviewPage from "@/components/mobile/new-mbanking/NewMBankingElectricityBillReviewPage";

type ServiceVariant =
  | "electricity"
  | "water"
  | "pbb"
  | "internet"
  | "finance"
  | "tv"
  | "bpjs";

function getServiceIcon(variant: ServiceVariant) {
  if (variant === "water") return Droplets;
  if (variant === "pbb") return Map;
  if (variant === "internet") return Wifi;
  if (variant === "finance") return Landmark;
  if (variant === "tv") return Monitor;
  if (variant === "bpjs") return HeartPulse;
  return Zap;
}

function getHelperText(variant: ServiceVariant) {
  if (variant === "water") {
    return "Masukkan nomor pelanggan untuk melanjutkan pembayaran air.";
  }

  if (variant === "pbb") {
    return "Masukkan NOP PBB untuk melanjutkan pembayaran pajak.";
  }

  if (variant === "internet") {
    return "Masukkan nomor pelanggan untuk melanjutkan pembayaran internet.";
  }

  if (variant === "finance") {
    return "Masukkan nomor kontrak untuk melanjutkan pembayaran finance.";
  }

  if (variant === "tv") {
    return "Masukkan nomor pelanggan untuk melanjutkan pembayaran TV.";
  }

  if (variant === "bpjs") {
    return "Masukkan nomor peserta dan pilih jumlah bulan untuk melanjutkan pembayaran BPJS.";
  }

  return "Masukkan nomor pelanggan untuk melanjutkan pembayaran listrik.";
}

function getFieldLabel(variant: ServiceVariant) {
  if (variant === "pbb") return "NOP";
  if (variant === "finance") return "No. Kontrak";
  if (variant === "bpjs") return "No. Peserta";
  return "No. Pelanggan";
}

function getPlaceholder(variant: ServiceVariant) {
  if (variant === "pbb") return "Masukkan NOP";
  if (variant === "finance") return "Masukkan No. Kontrak";
  if (variant === "bpjs") return "Masukkan No. Peserta";
  return "Masukkan No. Pelanggan";
}

const bpjsMonthOptions = ["1 Bulan", "2 Bulan", "3 Bulan", "6 Bulan", "12 Bulan"];

export default function NewMBankingElectricityCustomerPage({
  providerName,
  onBack,
  onDone,
  title = "Listrik PLN",
  serviceVariant = "electricity",
}: {
  providerName: string;
  onBack: () => void;
  onDone: () => void;
  title?: string;
  serviceVariant?: ServiceVariant;
}) {
  const [customerNo, setCustomerNo] = React.useState("");
  const [bpjsMonths, setBpjsMonths] = React.useState("1 Bulan");
  const [showReview, setShowReview] = React.useState(false);
  const Icon = getServiceIcon(serviceVariant);
  const helperText = getHelperText(serviceVariant);
  const fieldLabel = getFieldLabel(serviceVariant);
  const showBpjsMonthField = serviceVariant === "bpjs";

  function continuePayment() {
    if (!customerNo.trim()) {
      toast(`${fieldLabel} wajib diisi`, {
        description: `Masukkan ${fieldLabel.toLowerCase()} sebelum melanjutkan.`,
      });
      return;
    }

    if (showBpjsMonthField && !bpjsMonths.trim()) {
      toast("Jumlah bulan wajib dipilih", {
        description: "Pilih jumlah bulan pembayaran BPJS sebelum melanjutkan.",
      });
      return;
    }

    setShowReview(true);
  }

  if (showReview) {
    return (
      <NewMBankingElectricityBillReviewPage
        providerName={providerName}
        customerNo={customerNo}
        title={title}
        serviceVariant={serviceVariant}
        bpjsMonths={bpjsMonths}
        onBack={() => setShowReview(false)}
        onDone={onDone}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
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

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[112px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="flex min-h-full flex-col rounded-t-[30px] bg-white px-6 pb-[34px] pt-[40px]">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-[86px] w-[86px] place-items-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_24px_rgba(71,157,244,0.24)]">
              <Icon className="h-[42px] w-[42px] text-white" strokeWidth={2.7} />
            </span>

            <h2 className="mt-[18px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              {providerName}
            </h2>

            <p className="mt-[8px] max-w-[290px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              {helperText}
            </p>
          </div>

          <div className="mt-[44px] grid gap-[18px]">
            <div className="grid gap-[9px]">
              <label className="text-[14px] font-bold leading-none text-black">
                {fieldLabel}<span className="text-[#EF135D]">*</span>
              </label>

              <input
                value={customerNo}
                onChange={(event) =>
                  setCustomerNo((event.target.value ?? "").replace(/[^\d]/g, ""))
                }
                placeholder={getPlaceholder(serviceVariant)}
                inputMode="numeric"
                className={cn(
                  "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4",
                  "text-[14px] font-normal text-black shadow-none outline-none",
                  "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                  "focus:border-[#479DF4]",
                )}
              />
            </div>

            {showBpjsMonthField ? (
              <div className="grid gap-[9px]">
                <label className="text-[14px] font-bold leading-none text-black">
                  Jumlah Bulan<span className="text-[#EF135D]">*</span>
                </label>

                <select
                  value={bpjsMonths}
                  onChange={(event) => setBpjsMonths(event.target.value)}
                  className={cn(
                    "h-[44px] w-full appearance-none rounded-[12px] border border-[#CDD4E0] bg-white px-4",
                    "text-[14px] font-normal text-black shadow-none outline-none",
                    "focus:border-[#479DF4]",
                  )}
                >
                  {bpjsMonthOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-30 bg-white px-6 pb-[26px] pt-[14px] shadow-[0_-10px_24px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          onClick={continuePayment}
          className={cn(
            "h-[52px] w-full rounded-[8px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
}