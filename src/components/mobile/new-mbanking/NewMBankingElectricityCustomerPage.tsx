"use client";

import * as React from "react";
import {
  ArrowLeft,
  Contact,
  Droplets,
  HeartPulse,
  Landmark,
  Map,
  Monitor,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";
import NewMBankingElectricityBillReviewPage from "@/components/mobile/new-mbanking/NewMBankingElectricityBillReviewPage";
import NewMBankingBpjsMonthSelect from "@/components/mobile/new-mbanking/NewMBankingBpjsMonthSelect";

type ServiceVariant =
  | "electricity"
  | "water"
  | "pbb"
  | "internet"
  | "finance"
  | "tv"
  | "bpjs"
  | "postpaid-phone";

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
  if (variant === "postpaid-phone") return "shadow-[0_10px_24px_rgba(71,157,244,0.24)]";
  return "shadow-[0_10px_24px_rgba(245,158,11,0.24)]";
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

  if (variant === "postpaid-phone") {
    return "Masukkan nomor handphone pascabayar atau pilih dari kontak.";
  }

  return "Masukkan nomor pelanggan untuk melanjutkan pembayaran listrik.";
}

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
  const [bpjsMonths, setBpjsMonths] = React.useState("");
  const [showReview, setShowReview] = React.useState(false);
  const Icon = getServiceIcon(serviceVariant);
  const helperText = getHelperText(serviceVariant);
  const showBpjsMonthField = serviceVariant === "bpjs";
  const isPostpaidPhone = serviceVariant === "postpaid-phone";
  const fieldLabel = isPostpaidPhone ? "No. Handphone" : "No.Pelanggan";
  const fieldPlaceholder = isPostpaidPhone
    ? "Masukkan No. Handphone"
    : "Masukkan No. Pelanggan";

  function choosePhoneContact() {
    setCustomerNo("0819987262");
    toast.success("Kontak dipilih (prototype)", {
      description: "Laura Patel • 0819987262",
    });
  }

  function continuePayment() {
    if (!customerNo.trim()) {
      toast(`${fieldLabel} wajib diisi`, {
        description: `${fieldPlaceholder} sebelum melanjutkan.`,
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

            <p className="mt-[8px] max-w-[290px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              {helperText}
            </p>
          </div>

          <div className="mt-[44px] grid gap-[18px]">
            <div className="grid gap-[9px]">
              <label className="text-[14px] font-bold leading-none text-black">
                {fieldLabel}
                <span className="text-[#EF135D]">*</span>
              </label>

              <div className="flex items-stretch gap-[9px]">
                <input
                  value={customerNo}
                  onChange={(event) =>
                    setCustomerNo((event.target.value ?? "").replace(/[^\d]/g, ""))
                  }
                  placeholder={fieldPlaceholder}
                  inputMode="numeric"
                  className={cn(
                    "h-[44px] min-w-0 flex-1 rounded-[12px] border border-[#CDD4E0] bg-white px-4",
                    "text-[14px] font-normal text-black shadow-none outline-none",
                    "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                    "focus:border-[#479DF4]",
                  )}
                />

                {isPostpaidPhone ? (
                  <button
                    type="button"
                    onClick={choosePhoneContact}
                    className={cn(
                      "grid h-[44px] w-[44px] shrink-0 place-items-center rounded-[12px]",
                      "bg-[#479DF4] text-white shadow-[0_8px_18px_rgba(71,157,244,0.20)]",
                      "transition active:scale-[0.96]",
                    )}
                    aria-label="Pilih dari kontak handphone"
                    title="Pilih dari kontak"
                  >
                    <Contact className="h-[22px] w-[22px] text-white" strokeWidth={2.5} />
                  </button>
                ) : null}
              </div>
            </div>

            {showBpjsMonthField ? (
              <div className="grid gap-[9px]">
                <label className="text-[14px] font-bold leading-none text-black">
                  Jumlah Bulan
                  <span className="text-[#EF135D]">*</span>
                </label>

                <NewMBankingBpjsMonthSelect
                  value={bpjsMonths}
                  onChange={setBpjsMonths}
                />
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