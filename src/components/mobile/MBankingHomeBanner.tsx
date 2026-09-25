"use client";

export default function MBankingHomeBanner() {
  return (
    <section className="px-6 pt-7" aria-label="Banner informasi">
      <div className="overflow-hidden rounded-[18px] shadow-[0_8px_18px_rgba(24,45,91,0.14)]">
        <img
          src="/banner_sample.jpeg"
          alt="Informasi terbaru M-Banking"
          className="block aspect-[2.25/1] w-full object-cover"
        />
      </div>
    </section>
  );
}
