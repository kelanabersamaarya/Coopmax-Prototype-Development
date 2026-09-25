"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  { src: "/banner_sample.jpeg", alt: "Informasi terbaru M-Banking" },
  { src: "/bannersample2.jpeg", alt: "Promosi M-Banking" },
  { src: "/bannersample3.jpeg", alt: "Layanan terbaru M-Banking" },
];

export default function MBankingHomeBanner() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + banners.length) % banners.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % banners.length);
  }

  const activeBanner = banners[activeIndex];

  return (
    <section className="px-6 pt-7" aria-label="Banner informasi">
      <div className="relative overflow-hidden rounded-[18px] shadow-[0_8px_18px_rgba(24,45,91,0.14)]">
        <img
          key={activeBanner.src}
          src={activeBanner.src}
          alt={activeBanner.alt}
          className="block aspect-[2.25/1] w-full object-cover transition-opacity duration-300"
        />

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Banner sebelumnya"
          className="absolute left-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#004FC7] shadow-sm transition active:scale-90"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={showNext}
          aria-label="Banner berikutnya"
          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#004FC7] shadow-sm transition active:scale-90"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/20 px-2 py-1">
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Tampilkan banner ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
