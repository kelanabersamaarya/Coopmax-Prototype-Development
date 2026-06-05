"use client";

type EKolektorTransactionIconProps = {
  className?: string;
};

export default function EKolektorTransactionIcon({
  className,
}: EKolektorTransactionIconProps) {
  return (
    <svg
      viewBox="0 0 55 55"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="27.5" cy="27.5" r="27.5" fill="#004FC7" />

      <path
        d="M20.2 17.6L14.9 22.9L20.2 28.2"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7 22.9H36.8"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      <path
        d="M34.8 37.4L40.1 32.1L34.8 26.8"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.3 32.1H18.2"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}