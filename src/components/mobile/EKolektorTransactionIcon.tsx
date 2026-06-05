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
        d="M20.2 14.8L14.9 20.1L20.2 25.4"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7 20.1H36.8"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      <path
        d="M34.8 40.2L40.1 34.9L34.8 29.6"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.3 34.9H18.2"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}