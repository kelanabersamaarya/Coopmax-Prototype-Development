"use client";

type EKolektorTransactionIconProps = {
  className?: string;
};

export default function EKolektorTransactionIcon({
  className,
}: EKolektorTransactionIconProps) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8.2 4.8H17.8C19.2912 4.8 20.5 6.00883 20.5 7.5V21.1C20.5 22.5912 19.2912 23.8 17.8 23.8H8.2C6.70883 23.8 5.5 22.5912 5.5 21.1V7.5C5.5 6.00883 6.70883 4.8 8.2 4.8Z"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.45 8.65H16.55"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
      />
      <path
        d="M9.45 12.35H17.1"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
      />
      <path
        d="M9.45 16.05H14.15"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
      />
      <path
        d="M18.75 16.35C20.9591 16.35 22.75 18.1409 22.75 20.35C22.75 22.5591 20.9591 24.35 18.75 24.35C16.5409 24.35 14.75 22.5591 14.75 20.35C14.75 18.1409 16.5409 16.35 18.75 16.35Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.05 20.25L18.2 21.4L20.65 18.85"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}