"use client";

import { cn } from "@/lib/utils";

export default function NewMBankingElectricityIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M12 4.25L18.35 7.9V15.2L12 18.85L5.65 15.2V7.9L12 4.25Z"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="11.55"
        r="2.65"
        stroke="currentColor"
        strokeWidth="2.25"
      />
    </svg>
  );
}