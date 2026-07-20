"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { CheckSquare, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function InfoField({
  label,
  value,
  readOnly = true,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
}) {
  return (
    <div className="grid gap-[8px]">
      <label className="text-[14px] font-bold leading-none text-black">
        {label}
      </label>

      <input
        value={value}
        readOnly={readOnly}
        aria-readonly={readOnly}
        className={cn(
          "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] px-4",
          "text-[14px] font-normal text-black shadow-none outline-none",
          readOnly ? "cursor-not-allowed bg-[#F1F3F6]" : "bg-white",
        )}
      />
    </div>
  );
}

export default function ProfileMandatorySavingsDepositSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [keterangan, setKeterangan] = React.useState("");

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setKeterangan("");
  }, [open]);

  if (!open || !mobileScreen) return null;

  return createPortal(
    <div className="absolute inset-0 z-[140] flex items-end bg-black/35 px-5 pb-5">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup menu penyetoran"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[16px] font-bold leading-tight text-black">
              Penyetoran Simpanan Wajib
            </div>
            <div className="mt-2 text-[12px] font-normal leading-relaxed text-[#828282]">
              Lengkapi informasi penyetoran iuran simpanan wajib.
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-[22px] grid gap-[16px]">
          <InfoField label="Periode" value="Juli 2026" />
          <InfoField label="Sumber Dana" value="Simpanan Kaya - 112233111" />
          <InfoField label="Tujuan Iuran" value="Simpanan Wajib - SWJ-2600006" />
          <InfoField label="Saldo Simpanan Wajib" value="Rp. 100.000,00" />
          <InfoField label="Nominal Setoran" value="Rp. 50.000,00" />

          <div className="grid gap-[8px]">
            <label className="text-[14px] font-bold leading-none text-black">
              Keterangan
            </label>

            <textarea
              value={keterangan}
              onChange={(event) => setKeterangan(event.target.value)}
              placeholder="Masukkan keterangan"
              className={cn(
                "min-h-[88px] w-full resize-none rounded-[12px] border border-[#CDD4E0] bg-white px-4 py-3",
                "text-[14px] font-normal text-black shadow-none outline-none",
                "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                "focus:border-[#479DF4]",
              )}
            />
          </div>
        </div>

        <div className="mt-[24px] grid grid-cols-2 gap-[10px]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "h-[46px] rounded-[8px] border border-[#D9D9D9] bg-white",
              "text-[12px] font-semibold leading-none text-[#828282]",
              "transition active:scale-[0.98]",
            )}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={() => {
              toast.success("Setoran Simpanan Wajib berhasil (prototype)", {
                description: "Nominal setoran Rp. 50.000,00",
              });
              onOpenChange(false);
            }}
            className={cn(
              "h-[46px] rounded-[8px] bg-[#479DF4]",
              "text-[12px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
            )}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <CheckSquare className="h-4 w-4" strokeWidth={3} />
              Setor
            </span>
          </button>
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}