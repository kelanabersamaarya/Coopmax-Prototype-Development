"use client";

import { CircleArrowDown, CircleArrowUp, X } from "lucide-react";

export default function EKolektorTransactionTypeSheet({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (type: "setoran" | "penarikan") => void;
}) {
  return (
    <div className="absolute inset-0 z-[100] bg-black/45">
      <button type="button" aria-label="Tutup jenis transaksi" className="absolute inset-0 cursor-default" onClick={onClose} />
      <section className="absolute inset-x-0 bottom-0 rounded-t-[24px] bg-white px-[16px] pb-[20px] pt-[12px] shadow-[0_-8px_30px_rgba(15,23,42,0.2)]">
        <div className="mx-auto h-[4px] w-[40px] rounded-full bg-[#004FC7]" />
        <div className="mt-[9px] flex items-center justify-between">
          <h2 className="text-[18px] font-extrabold tracking-tight text-[#203064]">Jenis Transaksi</h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="rounded-full p-1 text-[#9a9a9a] transition hover:bg-slate-100">
            <X className="h-6 w-6" strokeWidth={1.8} />
          </button>
        </div>
        <div className="mt-[18px] grid grid-cols-2 gap-[12px]">
          <button type="button" onClick={() => onSelect("setoran")} className="flex h-[132px] flex-col items-center justify-center rounded-[20px] bg-[#e8e8e8] text-[#203064] transition active:scale-[0.98]">
            <CircleArrowDown className="h-[40px] w-[40px] text-[#004FC7]" strokeWidth={2} />
            <span className="mt-[12px] text-[16px] font-extrabold">Setoran</span>
          </button>
          <button type="button" onClick={() => onSelect("penarikan")} className="flex h-[132px] flex-col items-center justify-center rounded-[20px] bg-[#e8e8e8] text-[#203064] transition active:scale-[0.98]">
            <CircleArrowUp className="h-[40px] w-[40px] text-[#004FC7]" strokeWidth={2} />
            <span className="mt-[12px] text-[16px] font-extrabold">Penarikan</span>
          </button>
        </div>
      </section>
    </div>
  );
}
