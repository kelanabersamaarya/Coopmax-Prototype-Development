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
        d="M20.2 19.8L14.9 25.1L20.2 30.4"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7 25.1H36.8"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      <path
        d="M34.8 35.2L40.1 29.9L34.8 24.6"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.3 29.9H18.2"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}