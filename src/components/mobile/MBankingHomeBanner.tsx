"use client";

import * as React from "react";

const banners = [
  { src: "/banner_sample.jpeg", alt: "Informasi terbaru M-Banking" },
  { src: "/bannersample2.jpeg", alt: "Promosi M-Banking" },
  { src: "/bannersample3.jpeg", alt: "Layanan terbaru M-Banking" },
];

const sliderStartInset = 16;

export default function MBankingHomeBanner() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const slideRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  function updateActiveSlide() {
    const slider = sliderRef.current;
    if (!slider) return;

    const closestIndex = slideRefs.current.reduce(
      (closest, slide, index) => {
        if (!slide) return closest;
        const currentDistance = Math.abs(
          slide.offsetLeft - sliderStartInset - slider.scrollLeft,
        );
        const closestDistance = Math.abs(
          (slideRefs.current[closest]?.offsetLeft ?? 0) -
            sliderStartInset -
            slider.scrollLeft,
        );
        return currentDistance < closestDistance ? index : closest;
      },
      0,
    );

    setActiveIndex(closestIndex);
  }

  function goToSlide(index: number) {
    const slider = sliderRef.current;
    const slide = slideRefs.current[index];
    if (!slider || !slide) return;

    slider.scrollTo({
      left: slide.offsetLeft - sliderStartInset,
      behavior: "smooth",
    });
  }

  return (
    <section className="px-6 pt-7" aria-label="Banner informasi">
      <div
        ref={sliderRef}
        onScroll={updateActiveSlide}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div aria-hidden="true" className="w-4 shrink-0" />

        {banners.map((banner, index) => (
          <div
            key={banner.src}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            className="w-[87%] shrink-0 snap-start overflow-hidden rounded-[18px] shadow-[0_8px_18px_rgba(24,45,91,0.14)]"
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="block aspect-[2.25/1] w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-1.5" aria-label="Posisi banner">
        {banners.map((banner, index) => (
          <button
            key={banner.src}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Tampilkan banner ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all ${
              activeIndex === index ? "w-5 bg-[#004FC7]" : "w-1.5 bg-[#B8C9E5]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
