"use client";

import * as React from "react";
import { ArrowLeft, Delete } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const pinLength = 6;
const correctPin = "000000";
const blue = "#0758C9";

export default function MBankingLoanPasswordPage({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [password, setPassword] = React.useState("");

  function submit() {
    if (password.length < pinLength) return;

    if (password !== correctPin) {
      toast.error("PIN tidak sesuai");
      setPassword("");
      return;
    }

    toast.success("PIN terverifikasi (prototype)");
    onSuccess();
  }

  function addNumber(value: string) {
    setPassword((current) =>
      current.length >= pinLength ? current : `${current}${value}`,
    );
  }

  function backspace() {
    setPassword((current) => current.slice(0, -1));
  }

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        addNumber(event.key);
        return;
      }

      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        backspace();
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        submit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [password]);

  const keyClassName = cn(
    "flex h-[50px] items-center justify-center rounded-[14px]",
    "text-[28px] font-bold leading-none text-[#152B63]",
    "transition active:scale-[0.94] active:bg-slate-100",
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#050A16]">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0758C9]">
        <header className="shrink-0 bg-[#0758C9] px-6 pb-5 pt-[15px]">
          <button
            type="button"
            onClick={onBack}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition active:scale-95"
            aria-label="Kembali"
            title="Kembali"
          >
            <ArrowLeft className="h-[30px] w-[30px]" strokeWidth={2.4} />
          </button>

          <h1 className="mt-[22px] text-[24px] font-bold leading-tight tracking-[-0.6px] text-white">
            Masukkan PIN Anda
          </h1>
        </header>

        <main className="flex min-h-0 flex-1 flex-col items-center bg-[#0758C9] px-6 pt-[222px]">
          <div
            className="flex items-center justify-center gap-[11px]"
            aria-label={`${password.length} dari ${pinLength} digit terisi`}
          >
            {Array.from({ length: pinLength }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-[14px] w-[14px] rounded-full border-2 transition",
                  index < password.length
                    ? "border-white bg-white"
                    : "border-[#A7C7F5] bg-transparent",
                )}
              />
            ))}
          </div>
        </main>

        <section className="shrink-0 rounded-t-[15px] bg-white px-5 pb-[22px] pt-[18px]">
          <div className="mx-auto grid max-w-[300px] grid-cols-3 gap-x-8 gap-y-[4px]">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
              (number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => addNumber(number)}
                  className={keyClassName}
                  aria-label={`Angka ${number}`}
                >
                  {number}
                </button>
              ),
            )}

            <div />

            <button
              type="button"
              onClick={() => addNumber("0")}
              className={keyClassName}
              aria-label="Angka 0"
            >
              0
            </button>

            <button
              type="button"
              onClick={backspace}
              className="flex h-[50px] items-center justify-center rounded-[14px] transition active:scale-[0.94] active:bg-slate-100"
              aria-label="Hapus"
              title="Hapus"
            >
              <span className="inline-flex h-[21px] w-[28px] items-center justify-center rounded-[5px] bg-[#0758C9] text-white">
                <Delete className="h-[17px] w-[17px]" strokeWidth={3} />
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={submit}
            style={{ backgroundColor: blue }}
            disabled={password.length < pinLength}
            className={cn(
              "mt-[12px] h-[35px] w-full rounded-full text-[11px] font-medium text-white transition active:scale-[0.99] hover:brightness-95",
              password.length < pinLength && "cursor-not-allowed opacity-60",
            )}
          >
            Selanjutnya
          </button>
        </section>
      </div>

      <div className="flex h-[34px] shrink-0 items-center justify-around bg-[#050A16] px-[90px] text-white">
        <span className="text-[14px] leading-none" aria-hidden="true">◀</span>
        <span className="text-[14px] leading-none" aria-hidden="true">○</span>
        <span className="text-[14px] leading-none" aria-hidden="true">□</span>
      </div>
    </div>
  );
}
