import * as React from "react";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const expiredImageSources = [
  "/QR_kedaluarsa.png",
  "/QR_kedaluarsa.jpg",
  "/QR_kedaluarsa.jpeg",
  "/QR_kedaluarsa.webp",
  "/QR_kedaluarsa.svg",
  "/QR_kedaluarsa",
];

function ExpiredIllustration() {
  const [sourceIndex, setSourceIndex] = React.useState(0);
  const [showFallback, setShowFallback] = React.useState(false);

  if (showFallback) {
    return (
      <div className="grid h-[260px] w-[300px] place-items-center rounded-[28px] bg-[#EEF6FF]">
        <div className="text-center text-[14px] font-semibold text-[#479DF4]">
          QR Kedaluarsa
        </div>
      </div>
    );
  }

  return (
    <img
      src={expiredImageSources[sourceIndex]}
      alt="QR kedaluarsa"
      className="h-[280px] w-[320px] max-w-full object-contain"
      draggable={false}
      onError={() => {
        const nextIndex = sourceIndex + 1;

        if (nextIndex < expiredImageSources.length) {
          setSourceIndex(nextIndex);
          return;
        }

        setShowFallback(true);
      }}
    />
  );
}

export default function NewMBankingQrExpiredPage({
  onBack,
  onRefresh,
}: {
  onBack: () => void;
  onRefresh: () => void;
}) {
  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-[#F9F9F9] text-black">
      <header className="flex h-[86px] shrink-0 items-center gap-3 px-[31px] pt-[18px]">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-black transition active:scale-[0.98]"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-[25px] w-[25px]" strokeWidth={2.7} />
        </button>

        <h1 className="text-[18px] font-bold leading-tight text-black">
          Pembayaran QRIS
        </h1>
      </header>

      <main className="flex min-h-0 flex-1 flex-col px-6 pb-[28px] pt-[46px]">
        <section className="flex flex-1 flex-col items-center justify-center pb-[72px] text-center">
          <ExpiredIllustration />

          <h2 className="mt-[34px] text-[20px] font-bold leading-tight text-black">
            Kode QR Kedaluarsa
          </h2>

          <p className="mx-auto mt-[14px] max-w-[330px] text-[16px] font-normal leading-[1.35] tracking-[-0.02em] text-[#8F8F8F]">
            Kode QR sudah melewati batas waktu. Silakan perbarui kode QR untuk
            melanjutkan pembayaran.
          </p>
        </section>

        <button
          type="button"
          onClick={onRefresh}
          className={cn(
            "h-[58px] w-full rounded-[10px] bg-[#479DF4]",
            "text-[16px] font-normal leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          <span className="inline-flex items-center justify-center gap-[14px]">
            <RefreshCcw className="h-[24px] w-[24px]" strokeWidth={2.5} />
            Perbarui Kode QR
          </span>
        </button>
      </main>
    </div>
  );
}