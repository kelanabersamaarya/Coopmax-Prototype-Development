import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

function MockQrImage({ color }: { color: string }) {
  return (
    <div
      className={cn(
        "relative h-[430px] w-full overflow-hidden rounded-[24px] bg-gradient-to-br",
        color,
      )}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-[310px] w-[310px] grid-cols-[repeat(11,minmax(0,1fr))] gap-[5px] rounded-[22px] bg-white p-[24px] shadow-[0_14px_34px_rgba(15,23,42,0.14)]">
          {Array.from({ length: 121 }).map((_, index) => {
            const row = Math.floor(index / 11);
            const col = index % 11;

            const finderTopLeft = row < 3 && col < 3;
            const finderTopRight = row < 3 && col > 7;
            const finderBottomLeft = row > 7 && col < 3;
            const pattern =
              finderTopLeft ||
              finderTopRight ||
              finderBottomLeft ||
              (row * 5 + col * 7 + row * col) % 4 === 0 ||
              (row + col) % 6 === 0;

            return (
              <span
                key={index}
                className={pattern ? "rounded-[2px] bg-black" : "bg-white"}
              />
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[120px] animate-[media-qr-scan_2.2s_ease-in-out_infinite]">
        <div className="mx-auto h-[3px] w-[88%] rounded-full bg-[#479DF4] shadow-[0_0_22px_rgba(71,157,244,0.95)]" />
        <div className="mx-auto h-[112px] w-[88%] bg-[linear-gradient(to_bottom,rgba(71,157,244,0.30),rgba(71,157,244,0.10),rgba(71,157,244,0))]" />
      </div>
    </div>
  );
}

export default function NewMBankingMediaScanPreviewPage({
  title,
  color,
  onBack,
  onComplete,
}: {
  title: string;
  color: string;
  onBack: () => void;
  onComplete: () => void;
}) {
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete();
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] text-black">
      <header className="flex h-[92px] shrink-0 items-center gap-3 px-[31px] pt-[22px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.6} />
        </button>

        <h1 className="text-[16px] font-bold leading-tight text-black">
          Memindai QR
        </h1>
      </header>

      <main className="relative flex min-h-0 flex-1 items-center justify-center px-5 pb-[74px] pt-0">
        <div className="w-full">
          <MockQrImage color={color} />
        </div>

        <div className="absolute bottom-[26px] left-0 right-0 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-[#E5E7EB]">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#479DF4]" />
            <span className="text-[12px] font-normal text-[#828282]">
              Memproses hasil scan...
            </span>
          </div>
        </div>

        <div className="sr-only">{title}</div>
      </main>

      <style>
        {`
          @keyframes media-qr-scan {
            0% {
              transform: translateY(12px);
              opacity: 0.2;
            }
            15% {
              opacity: 1;
            }
            50% {
              transform: translateY(300px);
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            100% {
              transform: translateY(12px);
              opacity: 0.2;
            }
          }
        `}
      </style>
    </div>
  );
}