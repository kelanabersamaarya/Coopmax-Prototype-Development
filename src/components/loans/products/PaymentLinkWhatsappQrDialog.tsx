"use client";

import * as React from "react";
import { MoreVertical, Settings, X } from "lucide-react";
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

      return topLeft || topRight || bottomLeft
        ? !finderGap || finderInner
        : patterned;
    });
  }, []);

  return (
    <div className="relative mx-auto h-[340px] w-[340px] max-w-full overflow-hidden rounded-[24px] bg-white p-6 ring-1 ring-slate-200">
      <div className="grid h-full w-full grid-cols-[repeat(21,minmax(0,1fr))] gap-[2.5px]">
        {cells.map((active, index) => (
          <span
            key={index}
            className={cn(active ? "rounded-[1px] bg-slate-950" : "bg-white")}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-6 top-6 h-[58px] animate-[whatsapp-qr-scan_5s_ease-in-out_forwards] overflow-hidden rounded-[14px]">
        <div className="mx-auto h-[5px] w-full rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.95)]" />
        <div className="h-[53px] w-full bg-[linear-gradient(to_bottom,rgba(37,99,235,0.28),rgba(37,99,235,0.08),rgba(37,99,235,0))]" />
      </div>

      <style>
        {`
          @keyframes whatsapp-qr-scan {
            0% {
              transform: translateY(0);
              opacity: 0.2;
            }
            12% {
              opacity: 1;
            }
            88% {
              opacity: 1;
            }
            100% {
              transform: translateY(234px);
              opacity: 0.95;
            }
          }
        `}
      </style>
    </div>
  );
}

function InlineIconFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="mx-1 inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-white text-slate-800 ring-1 ring-slate-300 shadow-sm align-middle"
      aria-label={label}
      title={label}
    >
      {children}
    </span>
  );
}

const connectionSteps: React.ReactNode[] = [
  "Buka WhatsApp di telepon Anda.",
  <>
    Klik menu
    <InlineIconFrame label="Menu titik tiga">
      <MoreVertical className="h-4.5 w-4.5" strokeWidth={2.6} />
    </InlineIconFrame>
    di Android atau
    <InlineIconFrame label="Pengaturan">
      <Settings className="h-4 w-4" strokeWidth={2.5} />
    </InlineIconFrame>
    pada iPhone.
  </>,
  "Klik Perangkat Tertaut lalu klik Tautkan Perangkat.",
  "Arahkan telepon Anda ke layar untuk memindai kode QR.",
];

export default function PaymentLinkWhatsappQrDialog({
  open,
  onOpenChange,
  onConnected,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnected?: () => void;
}) {
  React.useEffect(() => {
    if (!open) return;

    const timeoutId = window.setTimeout(() => {
      onConnected?.();
      onOpenChange(false);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [onConnected, onOpenChange, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-[calc(100vw-2rem)] sm:w-[860px]",
          "max-w-[860px]",
          "max-h-[90vh] overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-2xl",
          "[&>button[aria-label=Close]]:hidden",
          "[&>button.absolute.right-4.top-4]:hidden",
          "[&_[data-slot=dialog-close]]:hidden",
          "[&_[data-radix-dialog-close]]:hidden",
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
            <div className="min-w-0">
              <div className="text-[18px] font-extrabold tracking-tight text-slate-900">
                Hubungkan ke WhatsApp
              </div>
              <div className="mt-1 max-w-[620px] text-[13px] font-medium leading-relaxed text-slate-500">
                Hubungan perangkat Anda ke Whatsapp untuk mengirimkan pengingat
                pembayaran tagihan secara otomatis
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[calc(90vh-86px)] overflow-auto px-6 py-7">
            <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_360px]">
              <div className="rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-4 text-left md:min-h-[340px]">
                <div className="text-[14px] font-extrabold tracking-tight text-slate-900">
                  Cara menghubungkan WhatsApp
                </div>

                <ol className="mt-4 grid gap-4">
                  {connectionSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[12px] font-extrabold text-white">
                        {index + 1}
                      </span>
                      <span className="text-[13px] font-medium leading-relaxed text-slate-700">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex min-h-[340px] items-center justify-center">
                <MockQrCode />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}