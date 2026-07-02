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
      <div className="flex items-center gap-[6px]">
        <span className="relative inline-flex h-[20px] w-[20px] overflow-hidden rounded-[6px]">
          <span className="absolute left-0 top-0 h-[14px] w-[8px] rounded-full bg-[#72D2FF]" />
          <span className="absolute bottom-0 left-[2px] h-[11px] w-[11px] rounded-full bg-[#D726D7]" />
          <span className="absolute bottom-0 right-0 h-[15px] w-[8px] rounded-full bg-[#536DFE]" />
        </span>
        <span className="text-[16px] font-normal leading-none tracking-[-0.04em] text-[#111827]">
          By Djoin
        </span>
      </div>
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
    <div className="flex flex-col items-end text-right">
      <div className="whitespace-nowrap text-[16px] font-normal leading-tight tracking-[-0.04em] text-black">
        M-Banking Koperasi
      </div>

      <div className="mt-[4px]">
        <DjoinLogo />
      </div>
    </div>
  );
}