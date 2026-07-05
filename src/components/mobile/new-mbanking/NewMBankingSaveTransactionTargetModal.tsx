"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceVariant =
  | "electricity"
  | "water"
  | "pbb"
  | "internet"
  | "finance"
  | "tv"
  | "bpjs"
  | "postpaid-phone"
  | "data-package"
  | "token-pln"
  | "e-wallet";

function isBuyVariant(variant: ServiceVariant) {
  return (
    variant === "postpaid-phone" ||
    variant === "data-package" ||
    variant === "e-wallet"
  );
}

export default function NewMBankingSaveTransactionTargetModal({
  open,
  onOpenChange,
  providerName,
  customerNo,
  serviceVariant,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerName: string;
  customerNo: string;
  serviceVariant: ServiceVariant;
  onSave: (data: {
    name: string;
    providerName: string;
    customerNo: string;
    numberLabel: string;
  }) => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState(customerNo);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setName("");
    setNumber(customerNo);
  }, [customerNo, open]);

  if (!open || !mobileScreen) return null;

  const numberLabel = isBuyVariant(serviceVariant)
    ? "Nomor Handphone"
    : "Nomor Pelanggan";

  const canSave = name.trim().length > 0 && number.trim().length > 0;

  function save() {
    if (!canSave) return;

    onSave({
      name: name.trim(),
      providerName,
      customerNo: number.trim(),
      numberLabel,
    });
  }

  return createPortal(
    <div className="absolute inset-0 z-[150] flex items-end justify-center bg-black/35 px-5 pb-5 pt-8">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup simpan tujuan transaksi"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-[365px] overflow-hidden rounded-[8px] bg-white",
          "px-5 pb-6 pt-5 shadow-[0_20px_55px_rgba(15,23,42,0.28)]",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="min-w-0 text-[16px] font-bold leading-tight tracking-[-0.02em] text-black">
            Simpan Tujuan Transaksi
          </h2>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="mt-[22px] grid gap-[16px]">
          <div className="grid gap-[9px]">
            <label className="text-[14px] font-bold leading-none text-black">
              Nama<span className="text-[#EF135D]">*</span>
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Masukkan Nama"
              className={cn(
                "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4",
                "text-[14px] font-normal text-black shadow-none outline-none",
                "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                "focus:border-[#479DF4]",
              )}
            />
          </div>

          <div className="grid gap-[9px]">
            <label className="text-[14px] font-bold leading-none text-black">
              Penyedia Layanan
            </label>
            <input
              value={providerName}
              readOnly
              aria-readonly="true"
              className={cn(
                "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-[#F1F3F6] px-4",
                "cursor-not-allowed text-[14px] font-normal text-[#4B5563] shadow-none outline-none",
              )}
            />
          </div>

          <div className="grid gap-[9px]">
            <label className="text-[14px] font-bold leading-none text-black">
              {numberLabel}<span className="text-[#EF135D]">*</span>
            </label>
            <input
              value={number}
              onChange={(event) =>
                setNumber((event.target.value ?? "").replace(/[^\d]/g, ""))
              }
              placeholder={`Masukkan ${numberLabel}`}
              inputMode="numeric"
              className={cn(
                "h-[44px] w-full rounded-[12px] border border-[#CDD4E0] bg-white px-4",
                "text-[14px] font-normal text-black shadow-none outline-none",
                "placeholder:text-[14px] placeholder:font-normal placeholder:text-[#8F8F8F]",
                "focus:border-[#479DF4]",
              )}
            />
          </div>
        </div>

        <div className="mt-[24px] grid gap-[10px]">
          <button
            type="button"
            onClick={save}
            disabled={!canSave}
            className={cn(
              "h-[46px] rounded-[8px] bg-[#479DF4]",
              "text-[12px] font-semibold leading-none text-white",
              "transition active:scale-[0.98]",
              !canSave ? "cursor-not-allowed opacity-60" : "",
            )}
          >
            Simpan
          </button>

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
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}