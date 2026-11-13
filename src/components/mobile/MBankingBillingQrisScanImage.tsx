"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const qrCodeSources = [
  "/qr_code.png",
  "/qr_code.jpg",
  "/qr_code.jpeg",
  "/qr_code.webp",
  "/qr_code.svg",
  "/qr_code",
];

function FallbackQrCode() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#101010]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2b2b2b_0,#101010_68%)]" />

      <div className="absolute inset-x-0 bottom-[132px] top-[70px] grid place-items-center px-6">
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
      </div>
    </div>
  );
}

export default function NewMBankingScanQrImage() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return <FallbackQrCode />;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#101010]">
      <img
        src={qrCodeSources[sourceIndex]}
        alt="QR Code"
        className={cn(
          "h-full w-full object-cover object-center",
          "select-none",
        )}
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

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70px] bg-[#101010]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[132px] bg-white" />
    </div>
  );
}