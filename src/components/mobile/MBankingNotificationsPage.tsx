"use client";

import { ArrowLeft, Mail } from "lucide-react";

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
        <h1 className="mt-7 text-[30px] font-extrabold leading-tight text-[#004FC7]">
          Notifikasi
        </h1>
      </header>

      <main className="px-6 pb-12">
        <div className="flex items-center gap-10 border-b border-[#F4F4F4]">
          <button
            type="button"
            className="rounded-full bg-[#004FC7] px-8 py-4 text-[20px] font-bold text-white shadow-sm"
          >
            Transfer
          </button>
          <button
            type="button"
            className="px-2 py-4 text-[20px] font-bold text-[#004FC7]"
          >
            Info
          </button>
        </div>

        <article className="mt-5 flex items-center gap-5 rounded-[24px] bg-white px-5 py-7 shadow-[0_8px_24px_rgba(30,47,83,0.09)]">
          <Mail className="h-12 w-12 shrink-0 fill-[#8A8A8A] text-[#8A8A8A]" strokeWidth={1.6} />
          <div className="min-w-0 flex-1 text-[22px] font-bold text-[#23305A]">
            Transfer
          </div>
          <time className="shrink-0 text-right text-[20px] leading-[1.15] text-[#23305A]">
            20 Jul 2026
            <br />
            11:49
          </time>
        </article>
      </main>
    </div>
  );
}
