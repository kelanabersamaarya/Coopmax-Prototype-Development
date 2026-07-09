"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, Delete, X } from "lucide-react";
import { cn } from "@/lib/utils";

type KeyboardMode = "digits" | "amount";

type ClearTarget = {
  id: string;
  input: HTMLInputElement;
  top: number;
  left: number;
};

const KEYBOARD_FALLBACK_HEIGHT = 252;

const targetPlaceholderKeywords = [
  "masukkan no. pelanggan",
  "masukkan no pelanggan",
  "no.pelanggan",
  "no. pelanggan",
  "masukkan no. handphone",
  "masukkan nomor hp",
  "nomor hp",
  "masukkan no. meter",
  "no. meter",
  "id pelanggan",
  "masukkan nominal pembayaran",
  "nominal pembayaran",
  "masukkan nomor rekening penerima",
  "nomor rekening penerima",
  "masukkan nominal transfer",
  "nominal transfer",
  "masukkan nominal setoran",
  "nominal setoran",
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

function getInputContextText(input: HTMLInputElement) {
  const parts = [
    input.placeholder,
    input.getAttribute("aria-label"),
    input.name,
    input.id,
  ];

  let current: HTMLElement | null = input.parentElement;
  let depth = 0;

  while (current && depth < 2) {
    if (current.closest('[data-numeric-keyboard="true"]')) break;

    parts.push(current.textContent ?? "");
    current = current.parentElement;
    depth += 1;
  }

  return parts.filter(Boolean).join(" ").toLowerCase();
}

function detectMode(input: HTMLInputElement): KeyboardMode {
  const text = getInputContextText(input);

  if (text.includes("nominal")) return "amount";

  return "digits";
}

function isTargetInput(input: HTMLInputElement) {
  if (input.disabled || input.readOnly) return false;

  const inputMode = (input.inputMode ?? "").toLowerCase();
  if (!["numeric", "decimal", "tel"].includes(inputMode)) return false;

  const searchableText = getInputContextText(input);

  return targetPlaceholderKeywords.some((keyword) =>
    searchableText.includes(keyword),
  );
}

function isClearableInput(input: HTMLInputElement) {
  if (input.disabled || input.readOnly) return false;
  if (!input.value.trim()) return false;
  if (input.closest('[data-numeric-keyboard="true"]')) return false;
  if (!isElementVisible(input)) return false;

  const type = (input.type ?? "text").toLowerCase();
  if (
    [
      "password",
      "hidden",
      "checkbox",
      "radio",
      "file",
      "button",
      "submit",
    ].includes(type)
  ) {
    return false;
  }

  return true;
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

function findScrollableParent(
  element: HTMLElement,
  mobileScreen: HTMLElement,
): HTMLElement {
  let current: HTMLElement | null = element.parentElement;

  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const canScrollY =
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflowY === "overlay";

    if (canScrollY && current.scrollHeight > current.clientHeight) {
      return current;
    }

    if (current === mobileScreen) break;
    current = current.parentElement;
  }

  return mobileScreen;
}

function scrollInputAboveKeyboard({
  input,
  mobileScreen,
  keyboardHeight,
}: {
  input: HTMLInputElement;
  mobileScreen: HTMLElement;
  keyboardHeight: number;
}) {
  if (!isElementVisible(input)) return;

  const screenRect = mobileScreen.getBoundingClientRect();
  const inputRect = input.getBoundingClientRect();
  const visibleTop = screenRect.top + 16;
  const visibleBottom = screenRect.bottom - keyboardHeight - 18;

  let delta = 0;

  if (inputRect.bottom > visibleBottom) {
    delta = inputRect.bottom - visibleBottom;
  } else if (inputRect.top < visibleTop) {
    delta = inputRect.top - visibleTop;
  }

  if (Math.abs(delta) < 1) return;

  const scrollParent = findScrollableParent(input, mobileScreen);
  scrollParent.scrollBy({
    top: delta,
    behavior: "smooth",
  });
}

export default function NewMBankingGlobalNumericKeyboard() {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [activeInput, setActiveInput] = React.useState<HTMLInputElement | null>(
    null,
  );
  const [mode, setMode] = React.useState<KeyboardMode>("digits");
  const [value, setValue] = React.useState("");
  const [clearTargets, setClearTargets] = React.useState<ClearTarget[]>([]);

  const keyboardPanelRef = React.useRef<HTMLDivElement | null>(null);
  const activeInputStyleRef = React.useRef<{
    input: HTMLInputElement;
    borderColor: string;
    boxShadow: string;
  } | null>(null);

  const updateClearTargets = React.useCallback(() => {
    if (!mobileScreen) return;

    const screenRect = mobileScreen.getBoundingClientRect();
    const inputs = Array.from(mobileScreen.querySelectorAll<HTMLInputElement>("input"));

    const nextTargets = inputs
      .filter(isClearableInput)
      .map((input, index) => {
        const rect = input.getBoundingClientRect();

        return {
          id: `${input.name || input.id || input.placeholder || "input"}-${index}`,
          input,
          top: rect.top - screenRect.top + rect.height / 2 - 14,
          left: rect.right - screenRect.left - 34,
        };
      });

    setClearTargets(nextTargets);
  }, [mobileScreen]);

  React.useEffect(() => {
    const screen = document.querySelector(
      '[data-mobile-screen="true"]',
    ) as HTMLElement | null;

    setMobileScreen(screen);
  }, []);

  React.useEffect(() => {
    if (!mobileScreen) return;

    const sync = () => {
      window.requestAnimationFrame(updateClearTargets);
    };

    sync();

    mobileScreen.addEventListener("input", sync, true);
    mobileScreen.addEventListener("change", sync, true);
    mobileScreen.addEventListener("keyup", sync, true);
    mobileScreen.addEventListener("pointerup", sync, true);
    mobileScreen.addEventListener("scroll", sync, true);
    window.addEventListener("resize", sync);

    return () => {
      mobileScreen.removeEventListener("input", sync, true);
      mobileScreen.removeEventListener("change", sync, true);
      mobileScreen.removeEventListener("keyup", sync, true);
      mobileScreen.removeEventListener("pointerup", sync, true);
      mobileScreen.removeEventListener("scroll", sync, true);
      window.removeEventListener("resize", sync);
    };
  }, [mobileScreen, updateClearTargets]);

  React.useEffect(() => {
    return () => {
      restoreActiveInputStyle();
    };
  }, []);

  React.useEffect(() => {
    if (!activeInput || !mobileScreen) return;

    let timeoutId = 0;

    const scrollActiveInput = () => {
      const keyboardHeight =
        keyboardPanelRef.current?.getBoundingClientRect().height ??
        KEYBOARD_FALLBACK_HEIGHT;

      scrollInputAboveKeyboard({
        input: activeInput,
        mobileScreen,
        keyboardHeight,
      });

      updateClearTargets();
    };

    const animationFrameId = window.requestAnimationFrame(() => {
      scrollActiveInput();
      timeoutId = window.setTimeout(scrollActiveInput, 230);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [activeInput, mobileScreen, updateClearTargets]);

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

      if (mobileScreen) {
        scrollInputAboveKeyboard({
          input,
          mobileScreen,
          keyboardHeight: KEYBOARD_FALLBACK_HEIGHT,
        });
      }

      updateClearTargets();
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
  }, [mobileScreen, updateClearTargets]);

  React.useEffect(() => {
    if (!activeInput) return;

    function handleOutsidePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-numeric-keyboard="true"]')) return;
      if (target.closest('[data-input-clear-button="true"]')) return;
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

    const syncValue = () => {
      setValue(activeInput.value ?? "");
      updateClearTargets();
    };

    activeInput.addEventListener("input", syncValue);

    return () => activeInput.removeEventListener("input", syncValue);
  }, [activeInput, updateClearTargets]);

  function applyValue(nextValue: string) {
    if (!activeInput) return;

    setValue(nextValue);
    setNativeInputValue(activeInput, nextValue);
    window.requestAnimationFrame(updateClearTargets);
  }

  function clearInput(input: HTMLInputElement) {
    setNativeInputValue(input, "");

    if (input === activeInput) {
      setValue("");
      activateInput(input);
    }

    window.requestAnimationFrame(updateClearTargets);
  }

  function closeKeyboard() {
    activeInput?.blur();
    restoreActiveInputStyle();
    setActiveInput(null);
    setValue("");
    window.requestAnimationFrame(updateClearTargets);
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

  if (!mobileScreen) return null;

  return createPortal(
    <>
      {clearTargets.map((target) => (
        <button
          key={target.id}
          type="button"
          data-input-clear-button="true"
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            clearInput(target.input);
          }}
          className={cn(
            "absolute z-[171] inline-flex h-7 w-7 items-center justify-center rounded-full",
            "bg-transparent text-[#8F8F8F] transition active:scale-[0.94]",
          )}
          style={{
            top: target.top,
            left: target.left,
          }}
          aria-label="Hapus input"
          title="Hapus"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2.6} />
        </button>
      ))}

      {activeInput ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[170]">
          <div
            ref={keyboardPanelRef}
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
        </div>
      ) : null}
    </>,
    mobileScreen,
  );
}