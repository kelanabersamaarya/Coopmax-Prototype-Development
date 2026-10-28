"use client";

import { ArrowLeft, Copy } from "lucide-react";

export default function MBankingSavingsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-black">
      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-6 pb-10 pt-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="flex flex-col items-start">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.96]"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-8 w-8" strokeWidth={2.4} />
          </button>
          <h1 className="mt-5 text-[25px] font-extrabold leading-none tracking-tight text-[#004FC7]">
            Simpanan
          </h1>
        </header>

        <section className="relative mt-7 h-[147px] overflow-hidden rounded-[14px] bg-[#004FC7] px-5 py-5 text-white shadow-[0_8px_22px_rgba(0,79,199,0.20)]">
          <div className="pointer-events-none absolute -right-[36px] -top-[48px] h-[120px] w-[120px] rounded-full bg-white/12" />
          <div className="pointer-events-none absolute right-[22px] -top-[62px] h-[112px] w-[112px] rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-[72px] top-[18px] h-[44px] w-[44px] rounded-full bg-white/8" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-start justify-between gap-3">
              <div className="text-[16px] font-extrabold leading-tight tracking-tight text-white">
                Simpanan Sukarela
              </div>
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-0.5 rounded-full text-[12px] font-semibold leading-none text-white transition active:scale-[0.98]"
              >
                Detail &gt;
              </button>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] font-normal leading-none text-[#678DD8]">
                  No Rekening
                </div>
                <div className="mt-2 flex items-center gap-2 text-[12px] font-semibold leading-none text-white">
                  <span>4260054</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText("4260054")}
                    className="inline-flex h-5 w-5 items-center justify-center text-white transition active:scale-[0.94]"
                    aria-label="Salin nomor rekening"
                    title="Salin nomor rekening"
                  >
                    <Copy className="h-[15px] w-[15px]" strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
