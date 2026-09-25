"use client";

import { ArrowLeft, Bell } from "lucide-react";

export default function MBankingNotificationsPage({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-y-auto bg-white text-[#23305A]">
      <header className="px-6 pb-5 pt-8">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke halaman utama"
          className="grid h-10 w-10 place-items-center rounded-full text-[#004FC7] transition active:scale-90"
        >
          <ArrowLeft className="h-8 w-8" strokeWidth={2.2} />
        </button>
        <h1 className="mt-5 text-[24px] font-extrabold leading-tight text-[#004FC7]">
          Notifikasi
        </h1>
      </header>

      <main className="px-6 pb-12">
        <div className="flex items-center gap-8">
          <button
            type="button"
            className="rounded-full bg-[#004FC7] px-7 py-3 text-[16px] font-bold text-white shadow-sm"
          >
            Transfer
          </button>
          <button
            type="button"
            className="px-2 py-3 text-[16px] font-bold text-[#004FC7]"
          >
            Info
          </button>
        </div>

        <article className="mt-4 rounded-[20px] bg-white px-4 py-4 shadow-[0_6px_18px_rgba(30,47,83,0.09)]">
          <div className="flex items-start gap-3">
            <Bell className="mt-1 h-7 w-7 shrink-0 fill-[#004FC7] text-[#004FC7]" strokeWidth={1.8} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[16px] font-bold leading-tight text-[#23305A]">
                    Transfer In
                  </p>
                  <p className="mt-1 text-[14px] font-semibold text-[#004FC7]">
                    Rp2.500.000
                  </p>
                </div>
                <div className="shrink-0 text-right text-[13px] leading-[1.2] text-[#23305A]">
                  <p>20 Jul 2026</p>
                  <p>11:49</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#EEF2F7] pt-3 text-[13px]">
                <span className="text-[#6B7280]">Status</span>
                <span className="font-bold text-[#16A34A]">Berhasil</span>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
