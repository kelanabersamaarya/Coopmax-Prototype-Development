"use client";

import { ArrowLeft, ChevronRight, Copy } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingLoanPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-8 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
        </button>

        <h1 className="mt-6 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
          Pinjaman
        </h1>

        <section className="pt-12">
          <div className="relative h-[147px] w-full overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white shadow-[0_8px_22px_rgba(0,79,199,0.20)]">
            <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
            <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
            <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[16px] font-extrabold leading-tight tracking-tight text-white">
                  Pinjaman Bulanan
                </div>
                <div className="mt-8 text-[10px] font-normal leading-none text-[#678DD8]">
                  No Rekening
                </div>
                <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold leading-none text-white">
                  <span>SMG260004</span>
                  <Copy className="h-[13px] w-[13px] text-white" strokeWidth={2.4} />
                </div>
              </div>

              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-1 rounded-full px-1 text-[12px] font-semibold leading-none text-white transition active:scale-[0.98]"
              >
                Detail
                <ChevronRight
                  className="h-[13px] w-[13px] text-white"
                  strokeWidth={2.6}
                />
              </button>
            </div>
          </div>
        </section>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}