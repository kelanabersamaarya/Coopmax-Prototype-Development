import * as React from "react";

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

  if (showFallback) {
    return (
      <div className="grid h-[44px] w-[42px] place-items-center rounded-full bg-[#EEF6FF] text-[9px] font-extrabold text-[#479DF4] ring-1 ring-slate-200">
        KSP
      </div>
    );
  }

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

export default function NewMBankingReceiptBrand() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-[10px]">
        <CooperativeLogo />
        <div className="whitespace-nowrap text-[18px] font-semibold leading-none tracking-[-0.035em] text-black">
          M-Banking Koperasi
        </div>
      </div>

      <div className="mt-[5px]">
        <DjoinLogo />
      </div>
    </div>
  );
}