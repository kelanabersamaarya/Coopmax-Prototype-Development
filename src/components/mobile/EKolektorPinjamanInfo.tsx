"use client";

import { toast } from "sonner";

export default function EKolektorPinjamanInfo() {
  return (
    <div className="mt-[22px] w-full">
      <div className="relative h-[182px] w-full overflow-hidden rounded-[12px] bg-white shadow-[0_3px_12px_rgba(15,23,42,0.08)]">
        <div className="flex h-full items-start gap-[16px] px-[18px] pb-[52px] pt-[14px]">
          <div className="grid h-[55px] w-[55px] shrink-0 place-items-center rounded-full bg-[#28B6DA]">
            <span className="text-[14px] font-normal leading-none text-white">
              K
            </span>
          </div>

          <div className="min-w-0 pt-[2px]">
            <div className="text-[14px] font-extrabold leading-tight tracking-tight text-[#172957]">
              LP Denda RP
            </div>
            <div className="mt-[5px] text-[14px] font-extrabold leading-tight tracking-tight text-[#172957]">
              KORMANI
            </div>
            <div className="mt-[5px] text-[14px] font-extrabold leading-tight tracking-tight text-[#172957]">
              3259238260108
            </div>
            <div className="mt-[5px] text-[14px] font-normal leading-tight tracking-tight text-[#63809E]">
              Penatih
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            toast("Pilih pinjaman (prototype)", {
              description: "Aksi tombol belum dihubungkan.",
            })
          }
          className="absolute inset-x-0 bottom-0 h-[45px] bg-[#004FC7] text-[14px] font-semibold text-white transition active:bg-[#0046B3]"
        >
          Pilih
        </button>
      </div>
    </div>
  );
}