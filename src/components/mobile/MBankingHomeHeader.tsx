"use client";

import { Bell } from "lucide-react";

export default function MBankingHomeHeader({
  onProfileClick,
}: {
  onProfileClick?: () => void;
}) {
  return (
    <header className="shrink-0 bg-white px-6 pb-5 pt-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[14px] font-normal leading-none tracking-tight text-[#7f7f7f]">
            Selamat Siang,
          </div>
          <div className="mt-2 max-w-[250px] truncate text-[18px] font-extrabold leading-tight tracking-tight text-[#111d4a]">
            Laura Patel
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full text-[#004FC7] transition active:scale-[0.98]"
            aria-label="Notifikasi"
            title="Notifikasi"
          >
            <Bell className="h-[26px] w-[26px] fill-[#004FC7]" strokeWidth={2.4} />
          </button>

          <button
            type="button"
            onClick={onProfileClick}
            className="grid h-[46px] w-[46px] place-items-center rounded-full bg-[#004FC7] text-[17px] font-extrabold leading-none text-white transition active:scale-[0.98]"
            aria-label="Buka profil"
            title="Profil"
          >
            L
          </button>
        </div>
      </div>
    </header>
  );
}