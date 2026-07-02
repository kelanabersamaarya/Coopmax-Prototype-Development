import * as React from "react";
import { ArrowRight, ShieldCheck, Smartphone, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  newMBankingOnboardingSlides,
  type NewMBankingOnboardingSlide,
} from "@/components/mobile/new-mbanking/new-mbanking-data";

const slideIcons = [ShieldCheck, Smartphone, WalletCards];

type NewMBankingOnboardingProps = {
  onSkip: () => void;
  onFinish: () => void;
};

function OnboardingIllustration({
  slide,
  index,
}: {
  slide: NewMBankingOnboardingSlide;
  index: number;
}) {
  const Icon = slideIcons[index] ?? ShieldCheck;

  return (
    <div className="relative mx-auto mt-2 flex h-[255px] w-full max-w-[300px] items-center justify-center">
      <div
        className="absolute h-[230px] w-[230px] rounded-full opacity-15"
        style={{ backgroundColor: slide.accentColor }}
      />
      <div className="absolute left-3 top-11 h-14 w-14 rounded-[1.25rem] bg-white shadow-[0_14px_30px_rgba(16,42,67,0.10)]" />
      <div className="absolute bottom-7 right-4 h-16 w-16 rounded-[1.4rem] bg-[#18B7A1]/18" />
      <div className="relative flex h-[205px] w-[154px] flex-col rounded-[2rem] bg-[#102A43] p-2.5 shadow-[0_24px_55px_rgba(16,42,67,0.28)]">
        <div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-white/25" />
        <div className="flex flex-1 flex-col rounded-[1.5rem] bg-white p-4">
          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1.1rem] text-white"
            style={{ backgroundColor: slide.accentColor }}
          >
            <Icon className="h-6 w-6" strokeWidth={2.4} />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-20 rounded-full bg-[#D9E2EC]" />
            <div className="h-3 w-24 rounded-full bg-[#EEF2F7]" />
          </div>
          <div className="mt-auto rounded-[1.15rem] bg-[#F0F7FF] p-3">
            <div className="h-2.5 w-16 rounded-full bg-[#0B63CE]/25" />
            <div className="mt-2 h-5 w-24 rounded-full bg-[#0B63CE]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewMBankingOnboarding({
  onSkip,
  onFinish,
}: NewMBankingOnboardingProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeSlide = newMBankingOnboardingSlides[activeIndex];
  const isLastSlide = activeIndex === newMBankingOnboardingSlides.length - 1;

  function goNext() {
    if (isLastSlide) {
      onFinish();
      return;
    }

    setActiveIndex((current) => current + 1);
  }

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white px-7 pb-7 pt-8 text-[#102A43]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#EEF6FF] px-4 py-2 text-[12px] font-bold text-[#0B63CE]">
          New Mbanking
        </span>
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full px-3 py-2 text-[13px] font-semibold text-[#627D98] transition hover:bg-[#F0F4F8] active:scale-95"
        >
          Lewati
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <OnboardingIllustration slide={activeSlide} index={activeIndex} />

        <div className="mt-3 rounded-[2rem] bg-[#F8FBFF] p-6 shadow-[inset_0_0_0_1px_rgba(11,99,206,0.06)]">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#18B7A1]">
            {activeSlide.eyebrow}
          </p>
          <h1 className="mt-3 text-[29px] font-black leading-[1.05] tracking-[-0.05em] text-[#102A43]">
            {activeSlide.title}
          </h1>
          <p className="mt-4 text-[14px] font-medium leading-relaxed text-[#627D98]">
            {activeSlide.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {newMBankingOnboardingSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === activeIndex ? "w-8 bg-[#0B63CE]" : "w-2.5 bg-[#D9E2EC]",
              )}
              aria-label={`Buka slide ${index + 1}`}
              aria-current={index === activeIndex ? "step" : undefined}
            />
          ))}
        </div>

        <Button
          type="button"
          onClick={goNext}
          className="h-13 min-w-[132px] rounded-[1.15rem] bg-[#0B63CE] px-6 text-[15px] font-extrabold text-white shadow-[0_14px_30px_rgba(11,99,206,0.26)] transition hover:bg-[#0958B8] active:translate-y-px"
        >
          {isLastSlide ? "Mulai" : "Lanjut"}
          <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
        </Button>
      </div>
    </div>
  );
}