"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const qrCodeSources = [
  "/qr_code_.png",
  "/qr_code_.jpg",
  "/qr_code_.jpeg",
  "/qr_code_.webp",
  "/qr_code_.svg",
  "/qr_code_",
];

function FallbackQrCode() {
  return (
    <div className="grid h-[300px] w-[300px] grid-cols-[repeat(13,minmax(0,1fr))] gap-[4px] rounded-[24px] bg-white p-[24px] shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
      {Array.from({ length: 169 }).map((_, index) => {
        const row = Math.floor(index / 13);
        const col = index % 13;

        const finderTopLeft = row < 4 && col < 4;
        const finderTopRight = row < 4 && col > 8;
        const finderBottomLeft = row > 8 && col < 4;
        const pattern =
          finderTopLeft ||
          finderTopRight ||
          finderBottomLeft ||
          (row * 7 + col * 5 + row * col) % 4 === 0 ||
          (row + col) % 6 === 0;

        return (
          <span
            key={index}
            className={cn(pattern ? "rounded-[2px] bg-black" : "bg-white")}
          />
        );
      })}
    </div>
  );
}

export default function NewMBankingScanQrImage() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return (
      <div className="absolute inset-0 z-0 grid place-items-center bg-[#101010] px-6 pb-[132px] pt-[70px]">
        <FallbackQrCode />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 grid place-items-center bg-[#101010] px-6 pb-[132px] pt-[70px]">
      <img
        src={qrCodeSources[sourceIndex]}
        alt="QR Code"
        className="h-[360px] w-[360px] max-w-full rounded-[24px] object-contain shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
        draggable={false}
        onError={() => {
          const nextIndex = sourceIndex + 1;

          if (nextIndex < qrCodeSources.length) {
            setSourceIndex(nextIndex);
            return;
          }

          setShowFallback(true);
        }}
      />
    </div>
  );
}