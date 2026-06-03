"use client";

import { HandCoins } from "lucide-react";

export default function PinjamanSettingsIcon() {
  return (
    <span className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F7DF5] text-white shadow-sm">
      <HandCoins className="h-[20px] w-[20px]" strokeWidth={2.8} />
    </span>
  );
}