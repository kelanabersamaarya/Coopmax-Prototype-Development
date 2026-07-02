import * as React from "react";
import { ArrowLeft, Delete } from "lucide-react";
import { cn } from "@/lib/utils";

const pinLength = 6;

export default function NewMBankingPinInputPage({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [pin, setPin] = React.useState("");

  function addDigit(digit: string) {
    setPin((current) =>
      current.length >= pinLength ? current : `${current}${digit}`,
    );
  }

  function removeDigit() {
    setPin((current) => current.slice(0, -1));
  }

  function submit() {
    if (pin.length < pinLength) return;
    onSubmit();
  }

  const keyClassName = cn(
    "flex h-[52px] items-center justify-center rounded-[14px]",
    "text-[30px] font-bold leading-none text-black",
    "transition active:scale-[0.94] active:bg-slate-100",
  );

  return (
    <div className="flex h-full min-h-full flex-col overflow-hidden bg-white text-black">
      <header className="shrink-0 px-[31px] pt-[30px]">
        <div className="flex h-10 items-center gap-3">
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
            Input PIN
          </h1>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col px-6 pb-[30px] pt-[80px]">
        <div className="text-center">
          <h2 className="text-[20px] font-bold leading-tight text-black">
            Masukkan PIN Anda
          </h2>
          <p className="mx-auto mt-[12px] max-w-[310px] text-[12px] font-normal leading-relaxed text-[#828282]">
            Masukkan 6 digit PIN M-Banking untuk melanjutkan pembayaran QRIS.
          </p>

          <div className="mt-[38px] flex items-center justify-center gap-[12px]">
            {Array.from({ length: pinLength }).map((_, index) => {
              const filled = index < pin.length;

              return (
                <span
                  key={index}
                  className={cn(
                    "h-[14px] w-[14px] rounded-full border-2 transition",
                    filled
                      ? "border-[#479DF4] bg-[#479DF4]"
                      : "border-[#CDD4E0] bg-white",
                  )}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-auto">
          <div className="mx-auto grid max-w-[320px] grid-cols-3 gap-x-[34px] gap-y-[6px]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => addDigit(digit)}
                className={keyClassName}
                aria-label={`Angka ${digit}`}
              >
                {digit}
              </button>
            ))}

            <div />

            <button
              type="button"
              onClick={() => addDigit("0")}
              className={keyClassName}
              aria-label="Angka 0"
            >
              0
            </button>

            <button
              type="button"
              onClick={removeDigit}
              className="flex h-[52px] items-center justify-center rounded-[14px] transition active:scale-[0.94] active:bg-slate-100"
              aria-label="Hapus"
              title="Hapus"
            >
              <span className="inline-flex h-[22px] w-[30px] items-center justify-center rounded-[6px] bg-[#479DF4] text-white">
                <Delete className="h-[18px] w-[18px]" strokeWidth={3} />
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={pin.length < pinLength}
            className={cn(
              "mt-[20px] h-[46px] w-full rounded-[10px]",
              "text-[12px] font-normal leading-none text-white",
              "transition active:scale-[0.98]",
              pin.length < pinLength
                ? "cursor-not-allowed bg-[#A9D0FA]"
                : "bg-[#479DF4]",
            )}
          >
            Lanjutkan
          </button>
        </div>
      </main>
    </div>
  );
}