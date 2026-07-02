import * as React from "react";
import { cn } from "@/lib/utils";
import NewMBankingQrisLogo from "@/components/mobile/new-mbanking/NewMBankingQrisLogo";
import NewMBankingScanButton from "@/components/mobile/new-mbanking/NewMBankingScanButton";

type NewMBankingLoginIdentityStepProps = {
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  onRegister: () => void;
  onScan: () => void;
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
  onRegister,
  onScan,
}: NewMBankingLoginIdentityStepProps) {
  return (
    <div className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#FBFDFF] text-black">
      <div className="absolute -left-[112px] -top-[146px] h-[320px] w-[320px] rounded-full bg-[#EC4FC9]/80" />
      <div className="absolute -left-[38px] -top-[132px] h-[205px] w-[205px] rounded-full bg-[#D81BB2]/35" />

      <div className="absolute -right-[64px] -top-[48px] h-[172px] w-[172px] rounded-full bg-[#7BBDF4]/80" />
      <div className="absolute right-[16px] top-[-18px] h-[86px] w-[86px] rounded-full bg-[#2D93E8]/55" />

      <div className="absolute -right-[112px] bottom-[92px] h-[210px] w-[210px] rounded-full bg-[#72DCEB]/28" />
      <div className="absolute -left-[82px] bottom-[142px] h-[178px] w-[178px] rounded-full bg-[#A78BFA]/18" />
      <div className="absolute left-[34px] bottom-[34px] h-[74px] w-[74px] rounded-full bg-[#FBBF24]/18" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.92)_34%,rgba(251,253,255,0.72)_100%)]" />

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
        <div className="mb-[16px] flex flex-col items-center">
          <NewMBankingScanButton onClick={onScan} />
          <div className="mt-[8px] flex justify-center">
            <NewMBankingQrisLogo />
          </div>
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

        <div className="mt-[14px] text-center text-[12px] font-normal leading-none text-[#828282]">
          Belum Punya Akun?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="font-semibold text-[#479DF4] transition active:scale-[0.98]"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
}