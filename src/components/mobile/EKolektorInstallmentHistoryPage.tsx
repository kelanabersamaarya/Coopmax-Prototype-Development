"use client";

import { ArrowLeft } from "lucide-react";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function EKolektorInstallmentHistoryPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#004FC7] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <header className="relative h-[132px] overflow-hidden bg-[#004FC7] px-6 pt-[34px] text-white">
          <div className="pointer-events-none absolute -right-[18px] -top-[58px] h-[140px] w-[140px] rounded-full bg-white/16" />
          <div className="pointer-events-none absolute right-[62px] -top-[72px] h-[154px] w-[154px] rounded-full bg-white/10" />

          <div className="relative z-10">
            <button
              type="button"
              onClick={onBack}
              className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-[0.98]"
              aria-label="Kembali"
              title="Kembali"
            >
              <ArrowLeft className="h-[28px] w-[28px]" strokeWidth={2.6} />
            </button>

            <h1 className="mt-3 text-[25px] font-extrabold leading-none tracking-tight text-white">
              Riwayat Angsuran
            </h1>
            <div className="mt-2 text-[14px] font-semibold leading-tight tracking-tight text-white/85">
              7260175 - I Ketut Agus Pasek Jaya Arta
            </div>
          </div>
        </header>

        <main className="relative z-10 -mt-[30px] min-h-[calc(100%-102px)] rounded-t-[30px] bg-[#F2F2F2] px-6 pb-8 pt-8" />
      </div>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}