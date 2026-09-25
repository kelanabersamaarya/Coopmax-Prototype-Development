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

        <p className="mt-20 text-[18px] leading-[1.3] text-[#23305A]">
          Koperasi mengucapkan Selamat Hari Suci Galungan dan Kuningan.
          Semoga Dharma senantiasa menang atas Adharma, dan kedamaian selalu
          menyertai kita semua. Mari kita jadikan momentum ini sebagai
          pengingat akan pentingnya kebersamaan, kejujuran, dan gotong royong
          dalam kehidupan dan berkoperasi.
        </p>
      </main>
    </div>
  );
}
