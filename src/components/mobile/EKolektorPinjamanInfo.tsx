"use client";

import { CalendarDays, CheckCircle2, Clock3, HandCoins } from "lucide-react";

function InfoRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#E9E9E9] py-[10px] last:border-b-0">
      <div className="text-[12px] font-normal leading-tight text-[#8E8E8E]">
        {label}
      </div>
      <div
        className={
          strong
            ? "text-right text-[13px] font-extrabold leading-tight text-black"
            : "text-right text-[13px] font-semibold leading-tight text-black"
        }
      >
        {value}
      </div>
    </div>
  );
}

export default function EKolektorPinjamanInfo() {
  return (
    <div className="mt-[22px]">
      <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_16px_rgba(15,23,42,0.10)] ring-1 ring-[#E9E9E9]">
        <div className="bg-[#004FC7] px-4 py-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[12px] font-semibold leading-none text-white/80">
                Rekening Pinjaman
              </div>
              <div className="mt-2 text-[18px] font-extrabold leading-tight tracking-tight text-white">
                12260006
              </div>
              <div className="mt-1 text-[13px] font-semibold leading-tight text-white">
                Pinjaman Bulanan
              </div>
            </div>

            <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/20">
              <HandCoins className="h-[24px] w-[24px]" strokeWidth={2.8} />
            </span>
          </div>
        </div>

        <div className="px-4 py-3">
          <InfoRow label="Nama Nasabah" value="Pangeran Sirait" strong />
          <InfoRow label="Sisa Pinjaman" value="1.040.000,00" strong />
          <InfoRow label="Tagihan Bulan Ini" value="500.000,00" />
          <InfoRow label="Angsuran Pokok" value="416.667,00" />
          <InfoRow label="Angsuran Bunga" value="83.333,00" />
          <InfoRow label="Denda" value="0,00" />
        </div>

        <div className="grid gap-3 border-t border-[#E9E9E9] px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[10px] bg-[#F4F7FF] px-3 py-3">
              <div className="flex items-center gap-2 text-[#004FC7]">
                <CalendarDays className="h-4 w-4" />
                <span className="text-[11px] font-semibold">Jatuh Tempo</span>
              </div>
              <div className="mt-2 text-[13px] font-extrabold text-black">
                30-05-2026
              </div>
            </div>

            <div className="rounded-[10px] bg-[#F4F7FF] px-3 py-3">
              <div className="flex items-center gap-2 text-[#004FC7]">
                <Clock3 className="h-4 w-4" />
                <span className="text-[11px] font-semibold">Angsuran</span>
              </div>
              <div className="mt-2 text-[13px] font-extrabold text-black">
                2 / 12
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[10px] bg-[#EAF7EF] px-3 py-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#39B54A]" />
              <div>
                <div className="text-[12px] font-extrabold leading-tight text-[#39B54A]">
                  Aktif
                </div>
                <div className="text-[10px] font-normal text-[#6F8C76]">
                  Status rekening pinjaman
                </div>
              </div>
            </div>

            <button
              type="button"
              className="h-[32px] rounded-full bg-[#004FC7] px-4 text-[12px] font-semibold text-white active:scale-[0.98]"
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}