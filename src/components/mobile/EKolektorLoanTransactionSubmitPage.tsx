"use client";

import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorRecipientInfo from "@/components/mobile/EKolektorRecipientInfo";
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
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#004FC7] px-5 py-8">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-5 top-8 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[28px] w-[28px]" strokeWidth={2.6} />
        </button>

        <div className="flex h-full min-h-0 items-center justify-center">
          <div className="w-full max-w-[360px]">
            <div className="mb-5 text-center text-[25px] font-extrabold leading-none tracking-tight text-white">
              Review
            </div>

            <div className="overflow-hidden rounded-[26px] bg-white px-6 pb-8 pt-7 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
              <EKolektorRecipientInfo />

              <button
                type="button"
                onClick={submit}
                className={cn(
                  "h-[43px] w-full rounded-full",
                  "bg-[#004FC7] text-[14px] font-normal text-white",
                  "transition hover:bg-[#0046B3] active:translate-y-px",
                  "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#004FC7]/25",
                )}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}