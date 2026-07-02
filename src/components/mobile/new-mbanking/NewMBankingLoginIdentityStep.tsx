import * as React from "react";
import { cn } from "@/lib/utils";
import NewMBankingScanButton from "@/components/mobile/new-mbanking/NewMBankingScanButton";

type NewMBankingLoginIdentityStepProps = {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  onRegister: () => void;
};

const cooperativeLogoSources = [
  "/logo koperasi_splash.png",
  "/logo koperasi_splash.jpg",
  "/logo koperasi_splash.jpeg",
  "/logo koperasi_splash.webp",
  "/logo koperasi_splash",
];

const djoinLogoSources = [
  "/logo djoin_splash.png",
  "/logo djoin_splash.jpg",
  "/logo djoin_splash.jpeg",
  "/logo djoin_splash.webp",
  "/logo djoin_splash",
];

function CooperativeLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  return (
    <div className="relative h-[44px] w-[42px] shrink-0 overflow-hidden rounded-full bg-white shadow-[0_4px_12px_rgba(15,23,42,0.16)] ring-1 ring-slate-100">
      {showFallback ? (
        <div className="grid h-full w-full place-items-center text-[9px] font-extrabold text-[#0B63CE]">
          KSP
        </div>
      ) : (
        <img
          src={cooperativeLogoSources[sourceIndex]}
          alt="Logo Koperasi"
          className="h-full w-full object-cover"
          draggable={false}
          onError={() => {
            const nextIndex = sourceIndex + 1;

            if (nextIndex < cooperativeLogoSources.length) {
              setSourceIndex(nextIndex);
              return;
            }

            setShowFallback(true);
          }}
        />
      )}
    </div>
  );
}

function DjoinLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return (
      <span className="text-[19px] font-semibold leading-none tracking-[-0.02em] text-black">
        By Djoin
      </span>
    );
  }

  return (
    <img
      src={djoinLogoSources[sourceIndex]}
      alt="By Djoin"
      className="h-[27px] w-[92px] object-contain"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < djoinLogoSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setShowFallback(true);
      }}
    />
  );
}

export default function NewMBankingLoginIdentityStep({
  onNext,
}: NewMBankingLoginIdentityStepProps) {
  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#FFFFFF] text-black">
      <div className="absolute -left-[98px] -top-[160px] h-[340px] w-[340px] rounded-full bg-[#f56ac8]" />
      <div className="absolute -left-[40px] -top-[180px] h-[255px] w-[255px] rounded-full bg-[#f044bd]" />

      <div className="absolute -right-[76px] -top-[54px] h-[175px] w-[175px] rounded-full bg-[#8fc2f3]" />
      <div className="absolute right-[-8px] top-[-20px] h-[88px] w-[88px] rounded-full bg-[#459cf0]" />

      <div className="absolute -bottom-[164px] right-[-148px] h-[340px] w-[340px] rounded-full bg-[#8bdcec]" />
      <div className="absolute -bottom-[145px] right-[-78px] h-[252px] w-[252px] rounded-full bg-[#65d0e8]" />

      <div className="absolute -bottom-[94px] -left-[52px] h-[180px] w-[180px] rounded-full bg-[#a143ef]" />
      <div className="absolute -bottom-[62px] -left-[26px] h-[108px] w-[108px] rounded-full bg-[#8c16ea]" />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-7 pb-[96px]">
        <div className="flex animate-in items-center justify-center gap-[2px] fade-in-0 zoom-in-95 duration-700">
          <CooperativeLogo />

          <div className="whitespace-nowrap text-[22px] font-extrabold leading-none tracking-[-0.055em] text-black">
            M-Banking Koperasi
          </div>
        </div>

        <div className="mt-[8px] flex h-[54px] animate-in items-center justify-center rounded-[16px] bg-white px-[24px] text-[#121826] shadow-[0_8px_22px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 fade-in-0 slide-in-from-bottom-2 duration-700 [animation-delay:140ms] [animation-fill-mode:both]">
          <DjoinLogo />
        </div>
      </main>

      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-[30px] pt-4">
        <div className="mb-[16px] flex justify-center">
          <NewMBankingScanButton />
        </div>

        <button
          type="button"
          onClick={onNext}
          className={cn(
            "h-[46px] w-full rounded-[10px] bg-[#479DF4]",
            "text-[12px] font-normal leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Masuk
        </button>
      </div>
    </div>
  );
}