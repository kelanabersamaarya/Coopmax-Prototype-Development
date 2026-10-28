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
          <h1 className="mt-5 text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#004FC7]">
            Simpanan
          </h1>
        </header>

        <section className="relative mt-[70px] h-[390px] overflow-hidden rounded-[38px] bg-[#0648C9] px-10 py-10 text-white shadow-[0_5px_7px_rgba(15,23,42,0.28)] sm:h-[390px]">
          <div className="pointer-events-none absolute -right-[72px] -top-[42px] h-[190px] w-[270px] rounded-[50%] bg-white/20" />
          <div className="pointer-events-none absolute -right-[72px] top-[104px] h-[190px] w-[270px] rounded-[50%] bg-white/20" />
          <div className="pointer-events-none absolute -bottom-[12px] -left-[12px] h-[32px] w-[32px] rounded-full bg-white/10 shadow-[36px_0_0_rgba(255,255,255,0.10),72px_0_0_rgba(255,255,255,0.10),108px_0_0_rgba(255,255,255,0.10),144px_0_0_rgba(255,255,255,0.10)]" />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <h2 className="text-[30px] font-normal leading-none tracking-[-0.04em]">
              Simpanan Sukarela
            </h2>
            <button
              type="button"
              className="shrink-0 pt-1 text-[23px] font-normal leading-none text-white transition active:scale-[0.98]"
            >
              Detail &gt;
            </button>
          </div>

          <div className="absolute bottom-[70px] left-10 z-10">
            <div className="text-[25px] font-normal leading-none text-white/45">
              No Rekening
            </div>
            <div className="mt-4 flex items-center gap-3 text-[30px] font-normal leading-none tracking-[-0.02em]">
              <span>4260054</span>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText("4260054")}
                className="inline-flex h-8 w-8 items-center justify-center text-white transition active:scale-[0.94]"
                aria-label="Salin nomor rekening"
                title="Salin nomor rekening"
              >
                <Copy className="h-8 w-8" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
