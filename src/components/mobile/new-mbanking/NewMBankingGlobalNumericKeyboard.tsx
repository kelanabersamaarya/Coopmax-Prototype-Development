"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Delete, X } from "lucide-react";
import { cn } from "@/lib/utils";

type KeyboardMode = "digits" | "amount";

const targetPlaceholderKeywords = [
  "masukkan no. pelanggan",
  "masukkan no pelanggan",
  "masukkan no. handphone",
  "masukkan nomor hp",
  "masukkan no. meter",
  "masukkan nominal pembayaran",
];

function onlyDigits(value: string) {
  return (value ?? "").replace(/[^\d]/g, "");
}

function formatThousandsFromDigits(value: string) {
  const digits = onlyDigits(value);
  if (!digits) return "";

  const normalized = digits.replace(/^0+(?=\d)/, "");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function detectMode(input: HTMLInputElement): KeyboardMode {
  const text = `${input.placeholder ?? ""} ${input.getAttribute("aria-label") ?? ""}`.toLowerCase();

  if (text.includes("nominal")) return "amount";

  return "digits";
}

function isTargetInput(input: HTMLInputElement) {
  if (input.disabled || input.readOnly) return false;

  const inputMode = (input.inputMode ?? "").toLowerCase();
  if (!["numeric", "decimal", "tel"].includes(inputMode)) return false;

  const searchableText = [
    input.placeholder,
    input.getAttribute("aria-label"),
    input.name,
    input.id,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return targetPlaceholderKeywords.some((keyword) =>
    searchableText.includes(keyword),
  );
}

function setNativeInputValue(input: HTMLInputElement, value: string) {
  const descriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  );

  descriptor?.set?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function nextValueForDigit(current: string, digit: string, mode: KeyboardMode) {
  if (mode === "amount") {
    return formatThousandsFromDigits(`${onlyDigits(current)}${digit}`);
  }

  return `${onlyDigits(current)}${digit}`;
}

function nextValueForBackspace(current: string, mode: KeyboardMode) {
  const nextDigits = onlyDigits(current).slice(0, -1);

  if (mode === "amount") {
    return formatThousandsFromDigits(nextDigits);
  }

  return nextDigits;
}

export default function NewMBankingGlobalNumericKeyboard() {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [activeInput, setActiveInput] = React.useState<HTMLInputElement | null>(
    null,
  );
  const [mode, setMode] = React.useState<KeyboardMode>("digits");
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const screen = document.querySelector(
      '[data-mobile-screen="true"]',
    ) as HTMLElement | null;

    setMobileScreen(screen);
  }, []);

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      const input = target?.closest("input") as HTMLInputElement | null;

      if (!input || !isTargetInput(input)) return;

      event.preventDefault();
      event.stopPropagation();

      const nextMode = detectMode(input);
      setActiveInput(input);
      setMode(nextMode);
      setValue(input.value ?? "");
    }

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, []);

  React.useEffect(() => {
    if (!activeInput) return;

    const syncValue = () => setValue(activeInput.value ?? "");
    activeInput.addEventListener("input", syncValue);

    return () => activeInput.removeEventListener("input", syncValue);
  }, [activeInput]);

  function applyValue(nextValue: string) {
    if (!activeInput) return;

    setValue(nextValue);
    setNativeInputValue(activeInput, nextValue);
  }

  function closeKeyboard() {
    setActiveInput(null);
    setValue("");
  }

  if (!mobileScreen || !activeInput) return null;

  const title = mode === "amount" ? "Masukkan Nominal" : "Masukkan Angka";

  return createPortal(
    <div className="absolute inset-0 z-[170] flex items-end bg-black/25">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Tutup keyboard angka"
        onClick={closeKeyboard}
      />

      <div
        className={cn(
          "relative z-10 w-full rounded-t-[24px] bg-white px-5 pb-5 pt-4",
          "shadow-[0_-18px_45px_rgba(15,23,42,0.22)]",
          "animate-in slide-in-from-bottom-4 fade-in-0 duration-200",
        )}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[15px] font-bold leading-tight text-black">
              {title}
            </div>
            <div className="mt-1 truncate text-[13px] font-normal text-[#8F8F8F]">
              {value || (mode === "amount" ? "0" : "Belum diisi")}
            </div>
          </div>

          <button
            type="button"
            onClick={closeKeyboard}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-black transition active:scale-[0.96]"
            aria-label="Tutup"
            title="Tutup"
          >
            <X className="h-[22px] w-[22px]" strokeWidth={2.6} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => applyValue(nextValueForDigit(value, digit, mode))}
              className={cn(
                "h-[54px] rounded-[16px] bg-[#F1F3F6]",
                "text-[24px] font-bold leading-none text-black",
                "transition active:scale-[0.94] active:bg-[#E3E7ED]",
              )}
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={() => applyValue("")}
            className={cn(
              "h-[54px] rounded-[16px] bg-[#F1F3F6]",
              "text-[14px] font-semibold leading-none text-[#828282]",
              "transition active:scale-[0.94] active:bg-[#E3E7ED]",
            )}
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => applyValue(nextValueForDigit(value, "0", mode))}
            className={cn(
              "h-[54px] rounded-[16px] bg-[#F1F3F6]",
              "text-[24px] font-bold leading-none text-black",
              "transition active:scale-[0.94] active:bg-[#E3E7ED]",
            )}
          >
            0
          </button>

          <button
            type="button"
            onClick={() => applyValue(nextValueForBackspace(value, mode))}
            className={cn(
              "flex h-[54px] items-center justify-center rounded-[16px] bg-[#F1F3F6]",
              "transition active:scale-[0.94] active:bg-[#E3E7ED]",
            )}
            aria-label="Hapus angka"
            title="Hapus"
          >
            <Delete className="h-[23px] w-[23px] text-black" strokeWidth={2.7} />
          </button>
        </div>

        <button
          type="button"
          onClick={closeKeyboard}
          className={cn(
            "mt-4 h-[48px] w-full rounded-[12px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Selesai
        </button>
      </div>
    </div>,
    mobileScreen,
  );
}