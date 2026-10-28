"use client";

import { ArrowDown, ArrowUp, X } from "lucide-react";

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
      <section className="absolute inset-x-0 bottom-0 rounded-t-[30px] bg-white px-[20px] pb-[30px] pt-[17px] shadow-[0_-8px_30px_rgba(15,23,42,0.2)]">
        <div className="mx-auto h-[6px] w-[48px] rounded-full bg-[#28afd4]" />
        <div className="mt-[12px] flex items-center justify-between">
          <h2 className="text-[22px] font-extrabold tracking-tight text-[#203064]">Jenis Transaksi</h2>
          <button type="button" onClick={onClose} aria-label="Tutup" className="rounded-full p-1 text-[#9a9a9a] transition hover:bg-slate-100">
            <X className="h-8 w-8" strokeWidth={1.8} />
          </button>
        </div>
        <div className="mt-[28px] grid grid-cols-2 gap-[18px]">
          <button type="button" onClick={() => onSelect("setoran")} className="flex h-[205px] flex-col items-center justify-center rounded-[27px] bg-[#e8e8e8] text-[#203064] transition active:scale-[0.98]">
            <ArrowDown className="h-[58px] w-[58px] text-[#28afd4]" strokeWidth={2.2} />
            <span className="mt-[18px] text-[21px] font-extrabold">Setoran</span>
          </button>
          <button type="button" onClick={() => onSelect("penarikan")} className="flex h-[205px] flex-col items-center justify-center rounded-[27px] bg-[#e8e8e8] text-[#203064] transition active:scale-[0.98]">
            <ArrowUp className="h-[58px] w-[58px] text-[#28afd4]" strokeWidth={2.2} />
            <span className="mt-[18px] text-[21px] font-extrabold">Penarikan</span>
          </button>
        </div>
      </section>
    </div>
  );
}
