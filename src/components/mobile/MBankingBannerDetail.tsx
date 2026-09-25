"use client";

import { ArrowLeft } from "lucide-react";

export default function MBankingBannerDetail({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-y-auto bg-white text-[#23305A]">
      <header className="px-6 pb-3 pt-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke halaman utama"
          className="grid h-10 w-10 place-items-center rounded-full text-[#004FC7] transition active:scale-90"
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={2.2} />
        </button>
        <h1 className="mt-5 text-[22px] font-extrabold leading-tight text-[#23305A]">
          Spesial Harpelnas
        </h1>
      </header>

      <main className="px-6 pb-12 pt-8">
        <img
          src="/banner_sample.jpeg"
          alt="Informasi banner M-Banking"
          className="block aspect-[2.25/1] w-full rounded-[22px] object-cover shadow-[0_8px_18px_rgba(24,45,91,0.12)]"
        />

        <div className="mt-12 h-4 w-9 rounded-full bg-[#0052C8]" aria-hidden="true" />

        <div className="mt-20 space-y-5 text-[17px] leading-[1.45] text-[#23305A]">
          <p className="font-bold">
            Special Harpelnas: Diskon Resto s.d Rp150 Ribu!
          </p>
          <p>
            Buat kamu nasabah setia Koperasi, yuk nikmati diskon hingga Rp150
            Ribu di merchant favorit seperti Karnivor, Baby Dutch, Nanny&apos;s
            Pavillon, Croco, Monsieur Spoon, dan Raa Cha.
          </p>
          <p>
            Jangan sampai kelewatan, serbu promosinya sekarang!
          </p>
        </div>
      </main>
    </div>
  );
}
