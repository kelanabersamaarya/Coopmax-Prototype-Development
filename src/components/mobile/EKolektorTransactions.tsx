"use client";

import EKolektorAndroidNavBar from "@/components/mobile/EKolektorAndroidNavBar";
import EKolektorSearchBar from "@/components/mobile/EKolektorSearchBar";
import EKolektorTransactionHeader from "@/components/mobile/EKolektorTransactionHeader";
import EKolektorTransactionTabs from "@/components/mobile/EKolektorTransactionTabs";

export default function EKolektorTransactions({
  onBackHome,
}: {
  onBackHome: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col bg-[#004FC7]">
      <div className="shrink-0 pb-[28px]">
        <EKolektorTransactionHeader onCancel={onBackHome} />
      </div>

      <div className="relative z-10 -mt-[30px] min-h-0 flex-1 rounded-t-[30px] bg-white px-6 pt-8">
        <div className="text-[20px] font-extrabold leading-tight tracking-tight text-[#004FC7]">
          Cari Nasabah
        </div>
        <div className="mt-1 text-[14px] font-normal leading-relaxed text-[#9B9B9B]">
          Pilih nasabah untuk melanjutkan
        </div>

        <EKolektorSearchBar className="mt-[22px]" />

        <EKolektorTransactionTabs className="mt-[24px]" />
      </div>

      <EKolektorAndroidNavBar onBack={onBackHome} />
    </div>
  );
}