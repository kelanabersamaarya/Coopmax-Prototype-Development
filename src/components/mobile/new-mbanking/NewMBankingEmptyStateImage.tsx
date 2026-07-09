"use client";

import * as React from "react";

const emptyStateSources = [
  "/empty_state",
  "/empty_state.png",
  "/empty_state.jpg",
  "/empty_state.jpeg",
  "/empty_state.webp",
  "/empty_state.svg",
];

export default function NewMBankingEmptyStateImage({
  className,
}: {
  className?: string;
}) {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [hidden, setHidden] = React.useState(false);

  if (hidden) return null;

  return (
    <img
      src={emptyStateSources[sourceIndex]}
      alt="Tidak ada transaksi"
      className={className}
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < emptyStateSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setHidden(true);
      }}
    />
  );
}