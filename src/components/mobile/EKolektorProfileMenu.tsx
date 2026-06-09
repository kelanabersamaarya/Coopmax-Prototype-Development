"use client";

import { ChevronRight } from "lucide-react";

const menuItems = ["Printer", "Pengaturan"];

export default function EKolektorProfileMenu() {
  return (
    <div className="bg-white px-[26px] pb-8 pt-4">
      <div className="overflow-hidden bg-white">
        {menuItems.map((item) => (
          <button
            key={item}
            type="button"
            className="flex h-[60px] w-full items-center justify-between border-b border-[#E8E8E8] text-left transition active:scale-[0.99]"
            aria-label={item}
          >
            <span className="text-[20px] font-extrabold leading-none tracking-tight text-[#203064]">
              {item}
            </span>
            <ChevronRight
              className="h-[24px] w-[24px] shrink-0 text-black"
              strokeWidth={2.6}
            />
          </button>
        ))}
      </div>
    </div>
  );
}