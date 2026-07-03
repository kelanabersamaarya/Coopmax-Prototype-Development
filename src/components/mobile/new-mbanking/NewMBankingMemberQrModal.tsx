"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function MemberQrVisual() {
  const cells = Array.from({ length: 17 * 17 }).map((_, index) => {
    const row = Math.floor(index / 17);
    const col = index % 17;

    const topLeft = row < 5 && col < 5;
    const topRight = row < 5 && col > 11;
    const bottomLeft = row > 11 && col < 5;
    const center =
      (row >= 7 && row <= 10 && col >= 7 && col <= 10) ||
      (row + col) % 5 === 0 ||
      (row * 3 + col * 7) % 11 === 0;

    const finderGap =
      ((row === 1 || row === 3) && (col < 5 || col > 11)) ||
      ((col === 1 || col === 3) && (row < 5 || row > 11));

    return topLeft || topRight || bottomLeft ? !finderGap : center;
  });

  return (
    <div className="grid h-[210px] w-[210px] grid-cols-[repeat(17,minmax(0,1fr))] gap-[3px] rounded-[24px] bg-white p-[20px] shadow-sm ring-1 ring-[#E5E7EB]">
      {cells.map((active, index) => (
        <span
          key={index}
          className={cn(active ? "rounded-[2px] bg-black" : "bg-white")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function NewMBankingMemberQrModal({
  open,
  onOpenChange,
  memberNo,
  memberName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberNo: string;
  memberName: string;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
  }, [open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[130] flex items-center justify-center bg-black/40 px-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup QR anggota"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full max-w-[330px] overflow-hidden rounded-[24px] bg-white px-6 pb-7 pt-5 text-center shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
        <div className="flex items-start justify-between gap-4 text-left">
          <div className="min-w-0">
            <div className="text-[16px] font-bold leading-tight text-black">
              QR Keanggotaan
            </div>
            <div className="mt-1 text-[12px] font-normal leading-relaxed text-[#8F8F8F]">
              Tunjukkan QR ini kepada petugas koperasi.
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <MemberQrVisual />
        </div>

        <div className="mt-5 rounded-[16px] bg-[#F8FAFC] px-4 py-3 text-left">
          <div className="text-[11px] font-normal leading-none text-[#8F8F8F]">
            Nomor Anggota
          </div>
          <div className="mt-2 text-[15px] font-bold leading-tight text-black">
            {memberNo}
          </div>

          <div className="mt-4 text-[11px] font-normal leading-none text-[#8F8F8F]">
            Nama
          </div>
          <div className="mt-2 text-[15px] font-bold leading-tight text-black">
            {memberName}
          </div>
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}