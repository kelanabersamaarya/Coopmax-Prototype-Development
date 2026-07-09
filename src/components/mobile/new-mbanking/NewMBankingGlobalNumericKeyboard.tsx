"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, Delete } from "lucide-react";
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
  const text =
    `${input.placeholder ?? ""} ${input.getAttribute("aria-label") ?? ""}`.toLowerCase();

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

function isElementVisible(element: HTMLElement) {
  return element.getClientRects().length > 0;
}

function findContinueButton(root: HTMLElement | null) {
  if (!root) return null;

  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("button"));

  return (
    buttons
      .reverse()
      .find((button) => {
        if (button.disabled) return false;
        if (button.closest('[data-numeric-keyboard="true"]')) return false;
        if (!isElementVisible(button)) return false;

        const label = (button.textContent ?? "").trim().toLowerCase();
        return label === "lanjutkan" || label.includes("lanjutkan pembayaran");
      }) ?? null
  );
}

export default function NewMBankingGlobalNumericKeyboard() {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [activeInput, setActiveInput] = React.useState<HTMLInputElement | null>(
    null,
  );
  const [mode, setMode] = React.useState<KeyboardMode>("digits");
  const [value, setValue] = React.useState("");

  const activeInputStyleRef = React.useRef<{
    input: HTMLInputElement;
    borderColor: string;
    boxShadow: string;
  } | null>(null);

  React.useEffect(() => {
    const screen = document.querySelector(
      '[data-mobile-screen="true"]',
    ) as HTMLElement | null;

    setMobileScreen(screen);
  }, []);

  React.useEffect(() => {
    return () => {
      restoreActiveInputStyle();
    };
  }, []);

  function restoreActiveInputStyle() {
    const previous = activeInputStyleRef.current;
    if (!previous) return;

    previous.input.style.borderColor = previous.borderColor;
    previous.input.style.boxShadow = previous.boxShadow;
    previous.input.removeAttribute("data-keyboard-active");

    activeInputStyleRef.current = null;
  }

  function activateInput(input: HTMLInputElement) {
    restoreActiveInputStyle();

    activeInputStyleRef.current = {
      input,
      borderColor: input.style.borderColor,
      boxShadow: input.style.boxShadow,
    };

    input.setAttribute("data-keyboard-active", "true");
    input.style.borderColor = "#2563eb";
    input.style.boxShadow = "0 0 0 2px rgba(37, 99, 235, 0.18)";

    window.requestAnimationFrame(() => {
      input.focus({ preventScroll: true });
      const end = input.value.length;
      input.setSelectionRange(end, end);
    });
  }

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      const input = target?.closest("input") as HTMLInputElement | null;

      if (!input || !isTargetInput(input)) return;

      event.preventDefault();
      event.stopPropagation();

      const nextMode = detectMode(input);
      activateInput(input);
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

    function handleOutsidePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-numeric-keyboard="true"]')) return;
      if (target === activeInput) return;

      const nextInput = target.closest("input") as HTMLInputElement | null;
      if (nextInput && isTargetInput(nextInput)) return;

      closeKeyboard();
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
    };
  }, [activeInput]);

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
    activeInput?.blur();
    restoreActiveInputStyle();
    setActiveInput(null);
    setValue("");
  }

  function continueFlow() {
    const root =
      activeInput?.closest('[data-mobile-screen="true"]') ?? mobileScreen;
    const continueButton = findContinueButton(root as HTMLElement | null);

    closeKeyboard();

    if (!continueButton) return;

    window.requestAnimationFrame(() => {
      continueButton.click();
    });
  }

  if (!mobileScreen || !activeInput) return null;

  return createPortal(
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[170]">
      <div
        data-numeric-keyboard="true"
        className={cn(
          "pointer-events-auto w-full rounded-t-[20px] bg-[#F2F3F6] px-4 pb-4 pt-3",
          "animate-in slide-in-from-bottom-4 fade-in-0 duration-200",
        )}
      >
        <div className="grid grid-cols-3 gap-2.5">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => applyValue(nextValueForDigit(value, digit, mode))}
              className={cn(
                "h-[52px] rounded-[12px] bg-white",
                "text-[24px] font-bold leading-none text-black",
                "shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
              )}
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={closeKeyboard}
            className={cn(
              "flex h-[52px] items-center justify-center rounded-[12px] bg-white",
              "text-[#33AA00] shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
            )}
            aria-label="Sembunyikan keyboard"
            title="Sembunyikan keyboard"
          >
            <Check className="h-[25px] w-[25px]" strokeWidth={3.2} />
          </button>

          <button
            type="button"
            onClick={() => applyValue(nextValueForDigit(value, "0", mode))}
            className={cn(
              "h-[52px] rounded-[12px] bg-white",
              "text-[24px] font-bold leading-none text-black",
              "shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
            )}
          >
            0
          </button>

          <button
            type="button"
            onClick={() => applyValue(nextValueForBackspace(value, mode))}
            className={cn(
              "flex h-[52px] items-center justify-center rounded-[12px] bg-white",
              "shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]",
            )}
            aria-label="Hapus angka"
            title="Hapus"
          >
            <Delete className="h-[23px] w-[23px] text-black" strokeWidth={2.7} />
          </button>
        </div>

        <button
          type="button"
          onClick={continueFlow}
          className={cn(
            "mt-3 h-[44px] w-full rounded-[12px] bg-[#479DF4]",
            "text-[14px] font-semibold leading-none text-white",
            "transition active:scale-[0.98]",
          )}
        >
          Lanjutkan
        </button>
      </div>
    </div>,
    mobileScreen,
  );
}