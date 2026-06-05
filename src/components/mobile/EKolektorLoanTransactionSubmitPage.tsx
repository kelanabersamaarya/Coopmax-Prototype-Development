"use client";

import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import { cn } from "@/lib/utils";

export default function EKolektorLoanTransactionSubmitPage({
  onBack,
}: {
  onBack: () => void;
}) {
  function submit() {
    toast.success("Transaksi berhasil dikirim (prototype)", {
      description: "Data pembayaran angsuran sudah masuk ke antrean sinkronisasi.",
    });
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] px-5 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[28px] w-[28px]" strokeWidth={2.6} />
        </button>

        <div className="mt-3 text-[25px] font-extrabold leading-none tracking-tight text-white">
          Review
        </div>

        <div className="mt-8 overflow-hidden rounded-[26px] bg-white px-6 pb-8 pt-7 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
          <button
            type="button"
            onClick={submit}
            className={cn(
              "h-[41px] w-full rounded-full",
              "bg-[#004FC7] text-[14px] font-normal text-white",
              "shadow-[0_8px_18px_rgba(0,79,199,0.28)]",
              "transition hover:bg-[#0046B3] active:translate-y-px",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
            )}
          >
            Kirim
          </button>
        </div>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}