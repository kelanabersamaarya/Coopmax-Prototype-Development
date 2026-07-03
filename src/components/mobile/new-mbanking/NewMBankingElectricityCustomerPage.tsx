"use client";

import * as React from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import NewMBankingStatusBar from "@/components/mobile/new-mbanking/NewMBankingStatusBar";

export default function NewMBankingElectricityCustomerPage({
  providerName,
  onBack,
}: {
  providerName: string;
  onBack: () => void;
}) {
  const [customerNo, setCustomerNo] = React.useState("");

  function continuePayment() {
    if (!customerNo.trim()) {
      toast("No. Pelanggan wajib diisi", {
        description: "Masukkan nomor pelanggan sebelum melanjutkan.",
      });
      return;
    }

    toast.success("Lanjutkan pembayaran listrik (prototype)", {
      description: `${providerName} • ${customerNo}`,
    });
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
            Listrik PLN
          </h1>
        </header>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto bg-[#F9F9F9] pb-[112px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <section className="flex min-h-full flex-col rounded-t-[30px] bg-white px-6 pb-[34px] pt-[40px]">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-[86px] w-[86px] place-items-center rounded-full bg-[#479DF4] text-white shadow-[0_10px_24px_rgba(71,157,244,0.24)]">
              <Zap className="h-[42px] w-[42px] text-white" strokeWidth={2.7} />
            </span>

            <h2 className="mt-[18px] text-[20px] font-bold leading-tight tracking-[-0.03em] text-black">
              {providerName}
            </h2>

            <p className="mt-[8px] max-w-[290px] text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              Masukkan nomor pelanggan untuk melanjutkan pembayaran listrik.
            </p>
          </div>

          <div className="mt-[44px] grid gap-[9px]">
            <label className="text-[14px] font-bold leading-none text-black">
              No. Pelanggan<span className="text-[#EF135D]">*</span>
            </label>

            <input
              value={customerNo}
              onChange={(event) =>
                setCustomerNo((event.target.value ?? "").replace(/[^\d]/g, ""))
              }
              placeholder="Masukkan No. Pelanggan"
              inputMode="numeric"
              className={cn(
                "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4",
                "text-[14px] font-normal text-black shadow-none outline-none",
                "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                "focus:border-[#479DF4]",
              )}
            />
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