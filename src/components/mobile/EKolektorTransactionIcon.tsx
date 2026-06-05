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
        d="M8.25 4.75H18.25C19.4926 4.75 20.5 5.75736 20.5 7V21.25C20.5 22.4926 19.4926 23.5 18.25 23.5H8.25C7.00736 23.5 6 22.4926 6 21.25V7C6 5.75736 7.00736 4.75 8.25 4.75Z"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.25H16.75"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
      />
      <path
        d="M10 13.25H17.25"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
      />
      <path
        d="M10 17.25H14.25"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
      />
      <path
        d="M20.25 15.5C22.7353 15.5 24.75 17.5147 24.75 20C24.75 22.4853 22.7353 24.5 20.25 24.5C17.7647 24.5 15.75 22.4853 15.75 20C15.75 17.5147 17.7647 15.5 20.25 15.5Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.35 20.1L19.55 21.3L22.25 18.55"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}