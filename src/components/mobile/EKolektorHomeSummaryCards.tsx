"use client";

import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Total Debitur",
    value: "128",
    subtitle: "Nasabah aktif dalam daftar koleksi hari ini.",
  },
  {
    title: "Total Tagihan",
    value: "Rp 48.250.000",
    subtitle: "Akumulasi tagihan yang perlu ditindaklanjuti.",
  },
  {
    title: "Tertagih",
    value: "Rp 12.500.000",
    subtitle: "Pembayaran berhasil diterima hari ini.",
  },
];

export default function EKolektorHomeSummaryCards() {
  return (
    <div className="relative z-10 -mt-3 px-5">
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="min-w-0 overflow-hidden rounded-[11px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)]"
          >
            <div className="h-[48px] rounded-t-[11px] bg-[#25b6dc]" />

            <div className="px-2.5 pb-3 pt-2">
              <div className="truncate text-[9px] font-semibold leading-tight text-[#6f6f6f]">
                {card.title}
              </div>
              <div
                className={cn(
                  "mt-1 break-words text-[11px] font-extrabold leading-tight text-[#111d4a]",
                  card.value.length > 8 ? "text-[9px]" : "",
                )}
              >
                {card.value}
              </div>
              <div className="mt-1 line-clamp-3 text-[7px] font-normal leading-[1.25] text-[#7f7f7f]">
                {card.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}