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
        d="M8.75 4.75H19.25C20.4926 4.75 21.5 5.75736 21.5 7V21C21.5 22.2426 20.4926 23.25 19.25 23.25H8.75C7.50736 23.25 6.5 22.2426 6.5 21V7C6.5 5.75736 7.50736 4.75 8.75 4.75Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.25 10H17.75"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M10.25 14H17.75"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M10.25 18H14.5"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M19.5 20.25L22.25 23L26 18.75"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}