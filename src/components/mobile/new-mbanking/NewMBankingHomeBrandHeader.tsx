import * as React from "react";

const djoinLogoSources = [
  "/logo djoin_splash.png",
  "/logo djoin_splash.jpg",
  "/logo djoin_splash.jpeg",
  "/logo djoin_splash.webp",
  "/logo djoin_splash",
];

function DjoinLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return (
      <span className="text-[16px] font-semibold leading-none tracking-[-0.02em] text-white">
        By Djoin
      </span>
    );
  }

  return (
    <img
      src={djoinLogoSources[sourceIndex]}
      alt="By Djoin"
      className="h-[24px] w-auto object-contain"
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

export default function NewMBankingHomeBrandHeader() {
  return (
    <div className="flex flex-col items-start text-left">
      <div className="whitespace-nowrap text-[16px] font-normal leading-tight tracking-[-0.04em] text-white">
        M-Banking Koperasi
      </div>

      <div className="mt-[4px]">
        <DjoinLogo />
      </div>
    </div>
  );
}