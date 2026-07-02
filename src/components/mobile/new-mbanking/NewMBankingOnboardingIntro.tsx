import * as React from "react";
import { cn } from "@/lib/utils";

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

const onboardingImageSources = [
  "/onboarding_screen_1.png",
  "/onboarding_screen_1.jpg",
  "/onboarding_screen_1.jpeg",
  "/onboarding_screen_1.webp",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
];

function FallbackCooperativeLogo() {
  return (
    <div className="grid h-[44px] w-[42px] place-items-center rounded-full bg-white text-[9px] font-extrabold text-[#0B63CE] ring-1 ring-slate-200">
      KSP
    </div>
  );
}

function CooperativeLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) return <FallbackCooperativeLogo />;

  return (
    <img
      src={cooperativeLogoSources[sourceIndex]}
      alt="Logo koperasi"
      className="h-[44px] w-[42px] shrink-0 rounded-full object-cover"
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

function OnboardingBackground() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.58),transparent_10%),radial-gradient(circle_at_45%_43%,rgba(255,246,177,0.55),transparent_22%),linear-gradient(180deg,#153c2b_0%,#6e8f43_44%,#d8c77a_64%,#242333_100%)]" />
    );
  }

  return (
    <img
      src={onboardingImageSources[sourceIndex]}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < onboardingImageSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setShowFallback(true);
      }}
    />
  );
}

function BubbleDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <span className="absolute bottom-[170px] left-[12px] h-[26px] w-[26px] rounded-full border border-white/60 bg-white/10 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.42),0_0_12px_rgba(255,255,255,0.24)]" />
      <span className="absolute bottom-[210px] left-[54px] h-[22px] w-[22px] rounded-full border border-white/55 bg-white/10 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.38),0_0_10px_rgba(255,255,255,0.22)]" />
      <span className="absolute bottom-[248px] left-[36px] h-[18px] w-[18px] rounded-full border border-white/55 bg-white/10 shadow-[inset_3px_3px_7px_rgba(255,255,255,0.38),0_0_10px_rgba(255,255,255,0.22)]" />
      <span className="absolute bottom-[138px] left-[260px] h-[20px] w-[20px] rounded-full border border-white/50 bg-white/10 shadow-[inset_3px_3px_7px_rgba(255,255,255,0.34),0_0_10px_rgba(255,255,255,0.2)]" />
    </div>
  );
}

export default function NewMBankingOnboardingIntro({
  onLogin,
  onRegister,
}: {
  onLogin: () => void;
  onRegister: () => void;
}) {
  return (
    <div className="relative h-full min-h-full overflow-hidden bg-white">
      <OnboardingBackground />
      <div className="absolute inset-0 bg-white/5" />
      <BubbleDecorations />

      <div className="absolute left-0 right-0 top-[86px] z-10 h-[168px] bg-white">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-[12px]">
            <CooperativeLogo />
            <div className="whitespace-nowrap text-[31px] font-semibold leading-none tracking-[-0.055em] text-black">
              M-Banking Koperasi
            </div>
          </div>

          <div className="mt-[18px]">
            <DjoinLogo />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-white px-6 pb-[29px] pt-[27px]">
        <div className="grid grid-cols-2 gap-[10px]">
          <button
            type="button"
            onClick={onRegister}
            className={cn(
              "h-[58px] rounded-[10px] border-2 border-[#3D98FF] bg-white",
              "text-[20px] font-semibold leading-none text-[#3D98FF]",
              "transition active:scale-[0.98]",
            )}
          >
            Daftar
          </button>

          <button
            type="button"
            onClick={onLogin}
            className={cn(
              "h-[58px] rounded-[10px] bg-[#479DF4]",
              "text-[20px] font-semibold leading-none text-white",
              "shadow-[0_10px_22px_rgba(71,157,244,0.24)]",
              "transition active:scale-[0.98]",
            )}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}