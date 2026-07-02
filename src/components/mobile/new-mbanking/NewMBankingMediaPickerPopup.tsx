"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  id: string;
  title: string;
  color: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "qr-1",
    title: "QRIS Mini Mart",
    color: "from-sky-100 via-white to-blue-100",
  },
  {
    id: "qr-2",
    title: "QR Pembayaran",
    color: "from-violet-100 via-white to-indigo-100",
  },
  {
    id: "qr-3",
    title: "Struk QR",
    color: "from-emerald-100 via-white to-teal-100",
  },
  {
    id: "qr-4",
    title: "Kode QR",
    color: "from-amber-100 via-white to-orange-100",
  },
  {
    id: "qr-5",
    title: "Galeri QR",
    color: "from-rose-100 via-white to-pink-100",
  },
  {
    id: "qr-6",
    title: "QR Merchant",
    color: "from-slate-100 via-white to-slate-200",
  },
];

function MockQrPreview({ item }: { item: GalleryItem }) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[13px] bg-gradient-to-br",
        item.color,
      )}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-[56px] w-[56px] grid-cols-5 gap-[3px] rounded-[8px] bg-white p-[8px] shadow-sm">
          {Array.from({ length: 25 }).map((_, index) => {
            const active =
              index === 0 ||
              index === 1 ||
              index === 5 ||
              index === 6 ||
              index === 18 ||
              index === 19 ||
              index === 23 ||
              index === 24 ||
              index % 4 === 0 ||
              index % 7 === 0;

            return (
              <span
                key={index}
                className={cn(active ? "bg-black" : "bg-transparent")}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute inset-x-2 bottom-2 truncate rounded-full bg-white/85 px-2 py-1 text-center text-[9px] font-semibold text-slate-700">
        {item.title}
      </div>
    </div>
  );
}

export default function NewMBankingMediaPickerPopup({
  open,
  onOpenChange,
  onChoose,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChoose: (item: GalleryItem) => void;
}) {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = React.useState(galleryItems[0].id);

  React.useEffect(() => {
    if (!open) return;

    setMobileScreen(
      document.querySelector('[data-mobile-screen="true"]') as HTMLElement | null,
    );
    setSelectedId(galleryItems[0].id);
  }, [open]);

  if (!open || !mobileScreen) return null;

  const selectedItem =
    galleryItems.find((item) => item.id === selectedId) ?? galleryItems[0];

  return createPortal(
    <div className="absolute inset-0 z-[130] flex items-end bg-black/45 px-4 pb-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup pilihan galeri"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-10 w-full overflow-hidden rounded-[24px] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.28)]">
        <div className="flex items-center justify-between gap-3 border-b border-[#EEF0F4] px-5 py-4">
          <div className="min-w-0">
            <div className="text-[16px] font-bold leading-tight text-black">
              Pilih Dari Media
            </div>
            <div className="mt-1 text-[12px] font-normal leading-tight text-[#828282]">
              Pilih gambar QR dari galeri
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black transition active:scale-[0.98]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="px-5 pb-5 pt-4">
          <div className="grid grid-cols-3 gap-[10px]">
            {galleryItems.map((item) => {
              const selected = selectedId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "relative h-[92px] overflow-hidden rounded-[14px] border transition active:scale-[0.98]",
                    selected ? "border-[#479DF4]" : "border-[#E5E7EB]",
                  )}
                  aria-label={`Pilih ${item.title}`}
                >
                  <MockQrPreview item={item} />

                  {selected ? (
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[#479DF4] text-white shadow-sm">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-[10px]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={cn(
                "h-[46px] rounded-[10px] border border-[#D9D9D9] bg-white",
                "text-[12px] font-normal leading-none text-[#828282]",
                "transition active:scale-[0.98]",
              )}
            >
              Batal
            </button>

            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onChoose(selectedItem);
              }}
              className={cn(
                "h-[46px] rounded-[10px] bg-[#479DF4]",
                "text-[12px] font-normal leading-none text-white",
                "transition active:scale-[0.98]",
              )}
            >
              Pilih Gambar
            </button>
          </div>
        </div>
      </div>
    </div>,
    mobileScreen,
  );
}