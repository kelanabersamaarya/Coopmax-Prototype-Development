"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorRecipientInfo from "@/components/mobile/EKolektorRecipientInfo";
import EKolektorTransactionSuccessPage from "@/components/mobile/EKolektorTransactionSuccessPage";
import { cn } from "@/lib/utils";
import type { EKolektorTodayTransaction } from "@/components/mobile/e-kolektor-types";

export default function EKolektorLoanTransactionSubmitPage({
  onBack,
  onDone,
  onTransactionSaved,
}: {
  onBack: () => void;
  onDone: () => void;
  onTransactionSaved: (transaction: EKolektorTodayTransaction) => void;
}) {
  const [success, setSuccess] = React.useState(false);

  if (success) {
    return (
      <EKolektorTransactionSuccessPage
        onDone={onDone}
        onTransactionSaved={onTransactionSaved}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#004FC7] px-5 py-8">
        <div className="absolute left-5 top-8 z-20">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[28px] w-[28px]" strokeWidth={2.6} />
          </button>

          <div className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-white">
            Review
          </div>
        </div>

        <div className="flex h-full min-h-0 items-center justify-center">
          <div className="w-full max-w-[360px] overflow-hidden rounded-[26px] bg-white px-6 pb-8 pt-7 shadow-[0_12px_34px_rgba(15,23,42,0.18)]">
            <EKolektorRecipientInfo />

            <button
              type="button"
              onClick={() => setSuccess(true)}
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

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}