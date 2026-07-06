import * as React from "react";

const logoSources = [
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

function FallbackLogo() {
  return (
    <>
      <div className="absolute inset-[5px] rounded-full bg-gradient-to-b from-[#f01818] via-[#f8f8f8] to-[#24b24a]" />
      <div className="absolute left-[10px] top-[11px] h-[15px] w-[15px] rounded-full bg-[#111827]">
        <div className="mx-auto mt-[3px] h-[7px] w-[7px] rounded-full bg-[#ffd21f]" />
      </div>
      <div className="absolute bottom-[11px] left-[11px] h-[16px] w-[13px] rounded-b-full bg-[#e11d48]" />
      <div className="absolute bottom-[10px] right-[11px] h-[20px] w-[19px] rounded-t-full bg-[#16a34a]" />
      <div className="absolute left-[20px] top-[25px] h-[12px] w-[14px] rounded-full bg-white" />
      <div className="absolute inset-0 rounded-full border border-white/70" />
    </>
  );
}

function CooperativeLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  return (
    <div
      className="relative h-[44px] w-[42px] shrink-0 overflow-hidden rounded-full bg-white shadow-[0_4px_12px_rgba(15,23,42,0.16)]"
      aria-label="Logo koperasi"
    >
      {showFallback ? (
        <FallbackLogo />
      ) : (
        <img
          src={logoSources[sourceIndex]}
          alt="Logo Koperasi"
          className="h-full w-full object-cover"
          draggable={false}
          onError={() => {
            const nextIndex = sourceIndex + 1;

            if (nextIndex < logoSources.length) {
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
      <span className="text-[19px] font-semibold leading-none tracking-[-0.02em]">
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

export default function NewMBankingSplashScreen() {
  return (
    <div className="relative h-full min-h-full overflow-hidden bg-[#4ba2f5] text-white">
      <div className="absolute -left-[118px] -top-[190px] h-[400px] w-[400px] rounded-full bg-[#f56ac8]" />
      <div className="absolute -left-[48px] -top-[215px] h-[300px] w-[300px] rounded-full bg-[#f044bd]" />

      <div className="absolute -right-[90px] -top-[64px] h-[205px] w-[205px] rounded-full bg-[#8fc2f3]" />
      <div className="absolute right-[-10px] top-[-25px] h-[104px] w-[104px] rounded-full bg-[#459cf0]" />

      <div className="absolute -bottom-[194px] right-[-174px] h-[400px] w-[400px] rounded-full bg-[#8bdcec]" />
      <div className="absolute -bottom-[171px] right-[-92px] h-[296px] w-[296px] rounded-full bg-[#65d0e8]" />

      <div className="absolute -bottom-[112px] -left-[62px] h-[212px] w-[212px] rounded-full bg-[#a143ef]" />
      <div className="absolute -bottom-[74px] -left-[31px] h-[126px] w-[126px] rounded-full bg-[#8c16ea]" />

      <div className="relative z-10 flex h-full min-h-full flex-col">
        <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-7 pb-[86px]">
          <div className="flex animate-in items-center justify-center gap-[2px] fade-in-0 zoom-in-95 duration-700">
            <CooperativeLogo />
            <div className="whitespace-nowrap text-[22px] font-extrabold leading-none tracking-[-0.055em] text-white">
              M-Banking Koperasi
            </div>
          </div>

          <div className="mt-[8px] flex h-[54px] animate-in items-center justify-center rounded-[16px] bg-white px-[24px] text-[#121826] shadow-[0_8px_22px_rgba(15,23,42,0.12)] fade-in-0 slide-in-from-bottom-2 duration-700 [animation-delay:140ms] [animation-fill-mode:both]">
            <DjoinLogo />
          </div>
        </main>
      </div>
    </div>
  );
}