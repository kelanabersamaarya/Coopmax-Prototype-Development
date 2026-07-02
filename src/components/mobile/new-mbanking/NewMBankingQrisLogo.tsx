"use client";

import * as React from "react";

const qrisLogoSources = [
  "/QRIS_logo",
  "/QRIS_logo.png",
  "/QRIS_logo.jpg",
  "/QRIS_logo.jpeg",
  "/QRIS_logo.webp",
  "/QRIS_logo.svg",
];

export default function NewMBankingQrisLogo() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [hidden, setHidden] = React.useState(false);

  if (hidden) return null;

  return (
    <img
      src={qrisLogoSources[sourceIndex]}
      alt="QRIS"
      className="h-[22px] w-auto object-contain"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < qrisLogoSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setHidden(true);
      }}
    />
  );
}