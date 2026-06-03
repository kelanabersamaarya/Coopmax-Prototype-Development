"use client";

import { MousePointerClick, ReceiptText } from "lucide-react";

export default function PinjamanSettingsIcon() {
  return (
    <span className="relative inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#3F7DF5] text-white shadow-sm">
      <ReceiptText className="h-[19px] w-[19px]" strokeWidth={2.7} />
      <MousePointerClick
        className="absolute bottom-[7px] right-[6px] h-[14px] w-[14px] text-white"
        strokeWidth={3}
      />
    </span>
  );
}