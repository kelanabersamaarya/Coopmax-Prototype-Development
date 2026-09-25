"use client";

import { ArrowLeft } from "lucide-react";

const banners = [
  { src: "/banner_sample.jpeg", alt: "Spesial Harpelnas" },
  { src: "/bannersample2.jpeg", alt: "Promosi M-Banking" },
  { src: "/bannersample3.jpeg", alt: "Layanan terbaru M-Banking" },
];

export default function MBankingAllBanners({
  onBack,
  onBannerClick,
}: {
  onBack: () => void;
  onBannerClick?: (banner: (typeof banners)[number]) => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-y-auto bg-white text-[#23305A]">
      <header className="px-6 pb-5 pt-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke halaman utama"
          className="grid h-10 w-10 place-items-center rounded-full text-[#004FC7] transition active:scale-90"
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={2.2} />
        </button>
        <h1 className="mt-5 text-[22px] font-extrabold leading-tight">
          Info & Penawaran Menarik
        </h1>
      </header>

      <main className="grid gap-5 px-6 pb-12">
        {banners.map((banner) => (
          <article
            key={banner.src}
            className="overflow-hidden rounded-[20px] shadow-[0_8px_18px_rgba(24,45,91,0.14)]"
          >
            <button
              type="button"
              onClick={() => onBannerClick?.(banner)}
              className="block w-full text-left"
              aria-label={`Buka ${banner.alt}`}
            >
              <img
                src={banner.src}
                alt={banner.alt}
                className="block aspect-[2.25/1] w-full object-cover"
              />
            </button>
          </article>
        ))}
      </main>
    </div>
  );
}
