import * as React from "react";
import { cn } from "@/lib/utils";

const headerImageSources = [
  "/new-mbanking-home-header.png",
  "/new_mbanking_home_header.png",
  "/home-header.png",
  "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=85",
];

function HeaderImage() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#f8fafc_0%,#f8fafc_34%,#d97706_35%,#b45309_100%)]">
        <div className="absolute right-[-22px] top-[94px] h-[160px] w-[250px] rotate-[-10deg] rounded-full bg-slate-900/75" />
        <div className="absolute right-[88px] top-[42px] h-[46px] w-[150px] rotate-[18deg] rounded-full bg-orange-100/80" />
        <div className="absolute right-[24px] top-[26px] h-[34px] w-[118px] rotate-[20deg] rounded-full bg-orange-100/90" />
      </div>
    );
  }

  return (
    <img
      src={headerImageSources[sourceIndex]}
      alt="Header M-Banking"
      className="absolute inset-0 h-full w-full object-cover object-center"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < headerImageSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setShowFallback(true);
      }}
    />
  );
}

export default function NewMBankingHomeHeader({
  className,
}: {
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative h-[258px] shrink-0 overflow-hidden bg-[#f8fafc]",
        className,
      )}
    >
      <HeaderImage />

      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_24%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0)_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[68px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.94))]" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-[30px]">
        <div className="max-w-[210px]">
          <div className="text-[13px] font-normal leading-none tracking-[-0.01em] text-[#8F8F8F]">
            Selamat Datang,
          </div>

          <div className="mt-[8px] text-[24px] font-bold leading-[1.12] tracking-[-0.04em] text-black">
            Laura Patel
          </div>
        </div>
      </div>
    </header>
  );
}