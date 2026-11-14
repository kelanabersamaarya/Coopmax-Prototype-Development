import * as React from "react";
import { ArrowLeft, Delete } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultPinLength = 6;
const loanBillingPinLength = 4;
const defaultPin = "123456";
const loanBillingPin = "0000";

export default function NewMBankingPinInputPage({
  onBack,
  onSubmit,
  variant = "default",
}: {
  onBack: () => void;
  onSubmit: () => void;
  title?: string;
  description?: string;
  variant?: "default" | "loan-billing";
}) {
  const pinLength = variant === "loan-billing" ? loanBillingPinLength : defaultPinLength;
  const correctPin = variant === "loan-billing" ? loanBillingPin : defaultPin;
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

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        addDigit(event.key);
      } else if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        removeDigit();
      } else if (event.key === "Enter") {
        event.preventDefault();
        submit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pin]);

  const keyClassName =
    "flex h-[50px] items-center justify-center text-[28px] font-semibold leading-none text-[#152b63] transition active:scale-95";

  return (
    <div
      data-new-mbanking-pin-input-page="true"
      className="relative flex h-full min-h-full flex-col overflow-hidden bg-[#0758c9] text-white"
    >
      <header className="shrink-0 px-5 pt-[15px]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-95"
          aria-label="Kembali"
          title="Kembali"
        >
          <ArrowLeft className="h-7 w-7" strokeWidth={2.4} />
        </button>

        <h1 className="mt-[22px] text-[24px] font-bold leading-tight tracking-[-0.6px]">
          Masukkan PIN Anda
        </h1>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center px-5 pt-[222px]">
        <div className="flex items-center justify-center gap-[11px]" aria-label={`${pin.length} dari ${pinLength} digit terisi`}>
          {Array.from({ length: pinLength }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-[14px] w-[14px] rounded-full border-2 transition",
                index < pin.length
                  ? "border-white bg-white"
                  : isWrongPin
                    ? "border-[#ff9cb8] bg-transparent"
                    : "border-[#a7c7f5] bg-transparent",
              )}
            />
          ))}
        </div>

        {isWrongPin ? (
          <p className="mt-3 text-center text-[11px] text-white">PIN Belum Sesuai. Silakan Coba Lagi</p>
        ) : null}
      </main>

      <section className="shrink-0 rounded-t-[15px] bg-white px-5 pb-[22px] pt-[18px] text-center">
        <div className="mx-auto grid max-w-[300px] grid-cols-3 gap-x-8 gap-y-[4px]">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button key={digit} type="button" onClick={() => addDigit(digit)} className={keyClassName} aria-label={`Angka ${digit}`}>
              {digit}
            </button>
          ))}
          <div />
          <button type="button" onClick={() => addDigit("0")} className={keyClassName} aria-label="Angka 0">
            0
          </button>
          <button type="button" onClick={removeDigit} className={keyClassName} aria-label="Hapus" title="Hapus">
            <Delete className="h-[22px] w-[22px] text-[#0758c9]" strokeWidth={2.8} />
          </button>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={pin.length < pinLength}
          className={cn(
            "mt-[12px] h-[35px] w-full rounded-full text-[11px] font-medium text-white transition active:scale-[0.98]",
            pin.length < pinLength ? "cursor-not-allowed bg-[#a8c9f2]" : "bg-[#0758c9]",
          )}
        >
          Selanjutnya
        </button>
      </section>
    </div>
  );
}
