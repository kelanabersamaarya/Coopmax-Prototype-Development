import * as React from "react";
import { ArrowLeft, Delete } from "lucide-react";
import { cn } from "@/lib/utils";

const pinLength = 6;
const correctPin = "123456";

export default function NewMBankingPinInputPage({
  onBack,
  onSubmit,
  title = "Pembayaran QRIS",
  description = "Masukkan 6 digit PIN M-Banking untuk melanjutkan pembayaran QRIS.",
}: {
  onBack: () => void;
  onSubmit: () => void;
  title?: string;
  description?: string;
}) {
  const [pin, setPin] = React.useState("");
  const [isWrongPin, setIsWrongPin] = React.useState(false);

  function addDigit(digit: string) {
    setPin((current) => {
      if (current.length >= pinLength) return current;
      return `${current}${digit}`;
    });
    setIsWrongPin(false);
  }

  function removeDigit() {
    setPin((current) => current.slice(0, -1));
    setIsWrongPin(false);
  }

  function submit() {
    if (pin.length < pinLength) return;

    if (pin !== correctPin) {
      setIsWrongPin(true);
      setPin("");
      return;
    }

    setIsWrongPin(false);
    onSubmit();
  }

  const keyClassName = cn(
    "flex h-[72px] w-[72px] items-center justify-center rounded-full",
    "bg-[#EEF0F4] text-[28px] font-bold leading-none text-black",
    "transition active:scale-[0.94] active:bg-[#E3E7ED]",
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
            {title}
          </h1>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col px-6 pb-[30px] pt-[72px]">
        <div className="text-center">
          <h2 className="text-[20px] font-bold leading-tight text-black">
            Masukkan PIN M-Banking Anda
          </h2>
          <p className="mx-auto mt-[12px] max-w-[310px] text-[12px] font-normal leading-relaxed text-[#828282]">
            {description}
          </p>

          <div className="mt-[38px] flex items-center justify-center gap-[12px]">
            {Array.from({ length: pinLength }).map((_, index) => {
              const filled = index < pin.length;

              return (
                <span
                  key={index}
                  className={cn(
                    "h-[24px] w-[24px] rounded-full border-2 transition",
                    isWrongPin
                      ? "border-[#EF135D] bg-white"
                      : filled
                        ? "border-[#479DF4] bg-[#479DF4]"
                        : "border-[#CDD4E0] bg-white",
                  )}
                />
              );
            })}
          </div>

          {isWrongPin ? (
            <div className="mt-[18px] text-[12px] font-normal leading-relaxed text-[#EF135D]">
              PIN Belum Sesuai. Silakan Coba Lagi
            </div>
          ) : null}
        </div>

        <div className="mt-auto">
          <div className="mx-auto grid max-w-[300px] grid-cols-3 justify-items-center gap-x-[24px] gap-y-[20px]">
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
              className={keyClassName}
              aria-label="Hapus"
              title="Hapus"
            >
              <Delete className="h-[22px] w-[22px] text-black" strokeWidth={2.7} />
            </button>
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={pin.length < pinLength}
            className={cn(
              "mt-[28px] h-[46px] w-full rounded-[10px]",
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