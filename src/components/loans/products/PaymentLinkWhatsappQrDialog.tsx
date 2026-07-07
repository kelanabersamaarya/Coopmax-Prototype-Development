"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function MockQrCode() {
  const cells = React.useMemo(() => {
    return Array.from({ length: 21 * 21 }).map((_, index) => {
      const row = Math.floor(index / 21);
      const col = index % 21;

      const topLeft = row < 7 && col < 7;
      const topRight = row < 7 && col > 13;
      const bottomLeft = row > 13 && col < 7;

      const finderInner =
        (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
        (row >= 2 && row <= 4 && col >= 16 && col <= 18) ||
        (row >= 16 && row <= 18 && col >= 2 && col <= 4);

      const finderGap =
        ((row === 1 || row === 5) && (col < 7 || col > 13)) ||
        ((col === 1 || col === 5) && row < 7) ||
        ((col === 15 || col === 19) && row < 7) ||
        ((row === 15 || row === 19) && col < 7) ||
        ((col === 1 || col === 5) && row > 13);

      const patterned =
        (row * 5 + col * 7 + row * col) % 4 === 0 ||
        (row + col) % 6 === 0 ||
        (row > 8 && col > 8 && (row * col) % 5 === 0);

      return topLeft || topRight || bottomLeft ? !finderGap || finderInner : patterned;
    });
  }, []);

  return (
    <div className="mx-auto grid h-[220px] w-[220px] grid-cols-[repeat(21,minmax(0,1fr))] gap-[2px] rounded-[18px] bg-white p-4 ring-1 ring-slate-200">
      {cells.map((active, index) => (
        <span
          key={index}
          className={cn(active ? "rounded-[1px] bg-slate-950" : "bg-white")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function PaymentLinkWhatsappQrDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[460px]",
          "max-w-[460px]",
          "overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
            <div>
              <div className="text-[18px] font-extrabold tracking-tight text-slate-900">
                Hubungkan ke WhatsApp
              </div>
              <div className="mt-1 text-[13px] font-medium text-slate-500">
                Scan QR code berikut untuk menghubungkan WhatsApp.
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-6 py-7 text-center">
            <MockQrCode />

            <div className="mt-5 text-[14px] font-semibold text-slate-900">
              QR Code WhatsApp
            </div>
            <div className="mt-1 text-[12px] font-medium leading-relaxed text-slate-500">
              Prototype QR code untuk simulasi koneksi WhatsApp.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}