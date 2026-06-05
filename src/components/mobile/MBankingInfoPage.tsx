"use client";

import MBankingInfoHeader from "@/components/mobile/MBankingInfoHeader";
import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";

export default function MBankingInfoPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <MBankingInfoHeader onBack={onBack} />

      <main className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="rounded-[14px] bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.08)] ring-1 ring-[#E5E7EB]">
          <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#23305A]">
            Simpanan Sukarela
          </div>

          <div className="mt-4 grid gap-4">
            <div>
              <div className="text-[12px] font-normal leading-none text-[#9A9A9A]">
                No Rekening
              </div>
              <div className="mt-2 text-[15px] font-extrabold leading-tight text-[#23305A]">
                4260029
              </div>
            </div>

            <div>
              <div className="text-[12px] font-normal leading-none text-[#9A9A9A]">
                Nama Pemilik
              </div>
              <div className="mt-2 text-[15px] font-extrabold leading-tight text-[#23305A]">
                Laura Patel
              </div>
            </div>

            <div>
              <div className="text-[12px] font-normal leading-none text-[#9A9A9A]">
                Saldo
              </div>
              <div className="mt-2 text-[18px] font-extrabold leading-tight text-[#004FC7]">
                Rp 0
              </div>
            </div>
          </div>
        </div>
      </main>

      <EKolektorAndroidNavBar onBack={onBack} />
    </div>
  );
}