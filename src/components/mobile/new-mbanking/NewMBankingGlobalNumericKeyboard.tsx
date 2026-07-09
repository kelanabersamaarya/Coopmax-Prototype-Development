"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, Delete, X } from "lucide-react";
import { cn } from "@/lib/utils";

type KeyboardMode = "digits" | "amount" | "text";
type EditableField = HTMLInputElement | HTMLTextAreaElement;

type ClearTarget = {
  id: string;
  input: EditableField;
  top: number;
  left: number;
};

type ScrollParentStyle = {
  element: HTMLElement;
  paddingBottom: string;
  scrollPaddingBottom: string;
  overflowY: string;
  overscrollBehaviorY: string;
  webkitOverflowScrolling: string;
};

const KEYBOARD_FALLBACK_HEIGHT = 252;
const ABOVE_KEYBOARD_CTA_HEIGHT = 116;
const WHITE_SECTION_AUTOSCROLL_MAX_DELTA = 72;

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

const qwertyRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

function onlyDigits(value: string) {
  return (value ?? "").replace(/[^\d]/g, "");
}

function formatThousandsFromDigits(value: string) {
  const digits = onlyDigits(value);
  if (!digits) return "";

  const normalized = digits.replace(/^0+(?=\d)/, "");
  return normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getFieldValue(field: EditableField) {
  return field.value ?? "";
}

function getInputContextText(field: EditableField) {
  const parts = [
    field.placeholder,
    field.getAttribute("aria-label"),
    field.name,
    field.id,
  ];

  let current: HTMLElement | null = field.parentElement;
  let depth = 0;

  while (current && depth < 2) {
    if (current.closest('[data-numeric-keyboard="true"]')) break;

    parts.push(current.textContent ?? "");
    current = current.parentElement;
    depth += 1;
  }

  return parts.filter(Boolean).join(" ").toLowerCase();
}

function detectMode(field: EditableField): KeyboardMode {
  if (field instanceof HTMLTextAreaElement) return "text";

  const inputMode = (field.inputMode ?? "").toLowerCase();
  const text = getInputContextText(field);

  if (text.includes("nominal")) return "amount";
  if (["numeric", "decimal", "tel"].includes(inputMode)) return "digits";

  return "text";
}

function isTextField(field: EditableField) {
  if (field instanceof HTMLTextAreaElement) return true;

  const type = (field.type ?? "text").toLowerCase();
  const inputMode = (field.inputMode ?? "").toLowerCase();

  if (["numeric", "decimal", "tel"].includes(inputMode)) return false;

  return ["text", "search", "email", "password", "url"].includes(type);
}

function isElementVisible(element: HTMLElement) {
  return element.getClientRects().length > 0;
}

function isTargetField(field: EditableField) {
  if (field.disabled || field.readOnly) return false;
  if (!isElementVisible(field)) return false;
  if (field.closest('[data-numeric-keyboard="true"]')) return false;

  if (isTextField(field)) return true;

  if (!(field instanceof HTMLInputElement)) return false;

  const inputMode = (field.inputMode ?? "").toLowerCase();
  if (!["numeric", "decimal", "tel"].includes(inputMode)) return false;

  const searchableText = getInputContextText(field);

  return targetPlaceholderKeywords.some((keyword) =>
    searchableText.includes(keyword),
  );
}

function isClearableField(field: EditableField) {
  if (field.disabled || field.readOnly) return false;
  if (!field.value.trim()) return false;
  if (field.closest('[data-numeric-keyboard="true"]')) return false;
  if (!isElementVisible(field)) return false;

  if (field instanceof HTMLTextAreaElement) return true;

  const type = (field.type ?? "text").toLowerCase();
  if (
    [
      "hidden",
      "checkbox",
      "radio",
      "file",
      "button",
      "submit",
      "reset",
    ].includes(type)
  ) {
    return false;
  }

  return true;
}

function isRegisterPageField(field: EditableField) {
  return Boolean(field.closest('[data-new-mbanking-register-page="true"]'));
}

function setNativeFieldValue(field: EditableField, value: string) {
  if (field instanceof HTMLTextAreaElement) {
    const descriptor = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      "value",
    );

    descriptor?.set?.call(field, value);
  } else {
    const descriptor = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value",
    );

    descriptor?.set?.call(field, value);
  }

  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
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

function findContinueButton(root: HTMLElement | null) {
  if (!root) return null;

  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("button"));

  return (
    buttons
      .reverse()
      .find((button) => {
        if (button.disabled) return false;
        if (button.closest('[data-numeric-keyboard="true"]')) return false;

        const label = (button.textContent ?? "").trim().toLowerCase();
        const isContinue =
          label === "lanjutkan" || label.includes("lanjutkan pembayaran");

        if (!isContinue) return false;

        return true;
      }) ?? null
  );
}

function findLoginSubmitButton(root: HTMLElement | null) {
  if (!root) return null;

  return root.querySelector<HTMLButtonElement>(
    '[data-new-mbanking-login-detail-page="true"] button[type="submit"]',
  );
}

function findSpecialFormScrollContainer(input: EditableField) {
  const page = input.closest(
    '[data-new-mbanking-register-page="true"], [data-new-mbanking-login-detail-page="true"]',
  ) as HTMLElement | null;

  if (!page) return null;

  let current: HTMLElement | null = input.parentElement;

  while (current && current !== page.parentElement) {
    const className = String(current.className ?? "");

    if (className.includes("rounded-t-[30px]") && className.includes("bg-white")) {
      return current;
    }

    current = current.parentElement;
  }

  return page;
}

function findScrollableParent(
  element: HTMLElement,
  mobileScreen: HTMLElement,
): HTMLElement {
  const specialContainer = findSpecialFormScrollContainer(element as EditableField);
  if (specialContainer) return specialContainer;

  let current: HTMLElement | null = element.parentElement;

  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const canScrollY =
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflowY === "overlay";

    if (canScrollY) {
      return current;
    }

    if (current === mobileScreen) break;
    current = current.parentElement;
  }

  return mobileScreen;
}

function getNumberStyleValue(value: string) {
  const parsed = Number.parseFloat(value || "0");
  return Number.isFinite(parsed) ? parsed : 0;
}

function shouldAccountForAboveKeyboardCta(input: EditableField) {
  return Boolean(
    input.closest('[data-new-mbanking-register-page="true"]') ||
      input.closest('[data-new-mbanking-login-detail-page="true"]'),
  );
}

function getEffectiveKeyboardHeight(input: EditableField, panelHeight: number) {
  return (
    panelHeight +
    (shouldAccountForAboveKeyboardCta(input) ? ABOVE_KEYBOARD_CTA_HEIGHT : 0)
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function scrollInputAboveKeyboard({
  input,
  mobileScreen,
  keyboardHeight,
}: {
  input: EditableField;
  mobileScreen: HTMLElement;
  keyboardHeight: number;
}) {
  if (!isElementVisible(input)) return;

  const screenRect = mobileScreen.getBoundingClientRect();
  const inputRect = input.getBoundingClientRect();
  const scrollParent = findScrollableParent(input, mobileScreen);
  const whiteSection = findSpecialFormScrollContainer(input);

  if (whiteSection) {
    const sectionRect = scrollParent.getBoundingClientRect();
    const visibleTop = Math.max(sectionRect.top, screenRect.top) + 18;
    const visibleBottom =
      Math.min(sectionRect.bottom, screenRect.bottom - keyboardHeight) - 20;

    let delta = 0;

    if (inputRect.bottom > visibleBottom) {
      delta = inputRect.bottom - visibleBottom;
    } else if (inputRect.top < visibleTop) {
      delta = inputRect.top - visibleTop;
    }

    if (Math.abs(delta) < 1) return;

    scrollParent.scrollBy({
      top: clamp(
        delta,
        -WHITE_SECTION_AUTOSCROLL_MAX_DELTA,
        WHITE_SECTION_AUTOSCROLL_MAX_DELTA,
      ),
      behavior: "smooth",
    });

    return;
  }

  const visibleTop = screenRect.top + 18;
  const visibleBottom = screenRect.bottom - keyboardHeight - 32;
  const visibleCenter = visibleTop + (visibleBottom - visibleTop) / 2;
  const inputCenter = inputRect.top + inputRect.height / 2;

  let delta = 0;

  if (inputRect.bottom > visibleBottom || inputRect.top < visibleTop) {
    delta = inputCenter - visibleCenter;
  }

  if (Math.abs(delta) < 1) return;

  scrollParent.scrollBy({
    top: delta,
    behavior: "smooth",
  });
}

export default function NewMBankingGlobalNumericKeyboard() {
  const [mobileScreen, setMobileScreen] = React.useState<HTMLElement | null>(null);
  const [activeInput, setActiveInput] = React.useState<EditableField | null>(
    null,
  );
  const [mode, setMode] = React.useState<KeyboardMode>("digits");
  const [value, setValue] = React.useState("");
  const [clearTargets, setClearTargets] = React.useState<ClearTarget[]>([]);

  const keyboardPanelRef = React.useRef<HTMLDivElement | null>(null);
  const activeInputStyleRef = React.useRef<{
    input: EditableField;
    borderColor: string;
    boxShadow: string;
  } | null>(null);
  const scrollParentStyleRef = React.useRef<ScrollParentStyle | null>(null);

  const isLoginDetailPage = Boolean(
    activeInput?.closest('[data-new-mbanking-login-detail-page="true"]'),
  );

  const updateClearTargets = React.useCallback(() => {
    if (!mobileScreen) return;

    const screenRect = mobileScreen.getBoundingClientRect();
    const fields = Array.from(
      mobileScreen.querySelectorAll<EditableField>("input, textarea"),
    );

    const nextTargets = fields
      .filter(isClearableField)
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
      restoreScrollParentSpacing();
    };
  }, []);

  React.useEffect(() => {
    if (!activeInput || !mobileScreen) {
      restoreScrollParentSpacing();
      return;
    }

    if (isRegisterPageField(activeInput)) {
      restoreScrollParentSpacing();
      updateClearTargets();
      return;
    }

    let firstTimeoutId = 0;
    let secondTimeoutId = 0;
    let thirdTimeoutId = 0;

    const applyScroll = () => {
      const panelHeight =
        keyboardPanelRef.current?.getBoundingClientRect().height ??
        KEYBOARD_FALLBACK_HEIGHT;
      const keyboardHeight = getEffectiveKeyboardHeight(activeInput, panelHeight);

      applyScrollParentSpacing({
        input: activeInput,
        mobileScreen,
        keyboardHeight,
      });

      scrollInputAboveKeyboard({
        input: activeInput,
        mobileScreen,
        keyboardHeight,
      });

      updateClearTargets();
    };

    const animationFrameId = window.requestAnimationFrame(() => {
      applyScroll();
      firstTimeoutId = window.setTimeout(applyScroll, 90);
      secondTimeoutId = window.setTimeout(applyScroll, 220);
      thirdTimeoutId = window.setTimeout(applyScroll, 420);
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(firstTimeoutId);
      window.clearTimeout(secondTimeoutId);
      window.clearTimeout(thirdTimeoutId);
    };
  }, [activeInput, mobileScreen, updateClearTargets]);

  function restoreScrollParentSpacing() {
    const previous = scrollParentStyleRef.current;
    if (!previous) return;

    previous.element.style.paddingBottom = previous.paddingBottom;
    previous.element.style.scrollPaddingBottom = previous.scrollPaddingBottom;
    previous.element.style.overflowY = previous.overflowY;
    previous.element.style.overscrollBehaviorY = previous.overscrollBehaviorY;
    previous.element.style.setProperty(
      "-webkit-overflow-scrolling",
      previous.webkitOverflowScrolling,
    );

    scrollParentStyleRef.current = null;
  }

  function applyScrollParentSpacing({
    input,
    mobileScreen,
    keyboardHeight,
  }: {
    input: EditableField;
    mobileScreen: HTMLElement;
    keyboardHeight: number;
  }) {
    const scrollParent = findScrollableParent(input, mobileScreen);

    if (scrollParentStyleRef.current?.element !== scrollParent) {
      restoreScrollParentSpacing();

      scrollParentStyleRef.current = {
        element: scrollParent,
        paddingBottom: scrollParent.style.paddingBottom,
        scrollPaddingBottom: scrollParent.style.scrollPaddingBottom,
        overflowY: scrollParent.style.overflowY,
        overscrollBehaviorY: scrollParent.style.overscrollBehaviorY,
        webkitOverflowScrolling:
          scrollParent.style.getPropertyValue("-webkit-overflow-scrolling"),
      };
    }

    const originalPadding = scrollParentStyleRef.current?.paddingBottom ?? "";
    const originalPaddingNumber = getNumberStyleValue(originalPadding);
    const extraSafety = shouldAccountForAboveKeyboardCta(input) ? 190 : 64;
    const nextPadding = Math.max(
      originalPaddingNumber,
      keyboardHeight + extraSafety,
    );

    scrollParent.style.overflowY = "auto";
    scrollParent.style.overscrollBehaviorY = "contain";
    scrollParent.style.setProperty("-webkit-overflow-scrolling", "touch");
    scrollParent.style.paddingBottom = `${nextPadding}px`;
    scrollParent.style.scrollPaddingBottom = `${keyboardHeight + extraSafety}px`;
  }

  function restoreActiveInputStyle() {
    const previous = activeInputStyleRef.current;
    if (!previous) return;

    previous.input.style.borderColor = previous.borderColor;
    previous.input.style.boxShadow = previous.boxShadow;
    previous.input.removeAttribute("data-keyboard-active");

    activeInputStyleRef.current = null;
  }

  function activateInput(input: EditableField) {
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

      if (mobileScreen && !isRegisterPageField(input)) {
        const keyboardHeight = getEffectiveKeyboardHeight(
          input,
          KEYBOARD_FALLBACK_HEIGHT,
        );

        applyScrollParentSpacing({
          input,
          mobileScreen,
          keyboardHeight,
        });

        scrollInputAboveKeyboard({
          input,
          mobileScreen,
          keyboardHeight,
        });
      }

      updateClearTargets();
    });
  }

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      const input = target?.closest("input, textarea") as EditableField | null;

      if (!input || !isTargetField(input)) return;

      event.preventDefault();
      event.stopPropagation();

      const nextMode = detectMode(input);
      activateInput(input);
      setActiveInput(input);
      setMode(nextMode);
      setValue(getFieldValue(input));
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

      const nextInput = target.closest("input, textarea") as EditableField | null;
      if (nextInput && isTargetField(nextInput)) return;

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
      setValue(getFieldValue(activeInput));
      updateClearTargets();
    };

    activeInput.addEventListener("input", syncValue);

    return () => activeInput.removeEventListener("input", syncValue);
  }, [activeInput, updateClearTargets]);

  function applyValue(nextValue: string) {
    if (!activeInput) return;

    setValue(nextValue);
    setNativeFieldValue(activeInput, nextValue);
    window.requestAnimationFrame(updateClearTargets);
  }

  function insertText(token: string) {
    if (!activeInput) return;

    const current = getFieldValue(activeInput);
    const start = activeInput.selectionStart ?? current.length;
    const end = activeInput.selectionEnd ?? start;
    const nextValue = `${current.slice(0, start)}${token}${current.slice(end)}`;
    const nextCursor = start + token.length;

    setValue(nextValue);
    setNativeFieldValue(activeInput, nextValue);

    window.requestAnimationFrame(() => {
      activeInput.setSelectionRange(nextCursor, nextCursor);
      updateClearTargets();
    });
  }

  function backspaceText() {
    if (!activeInput) return;

    const current = getFieldValue(activeInput);
    const start = activeInput.selectionStart ?? current.length;
    const end = activeInput.selectionEnd ?? start;

    if (start === 0 && end === 0) return;

    const deleteStart = start === end ? Math.max(0, start - 1) : start;
    const nextValue = `${current.slice(0, deleteStart)}${current.slice(end)}`;

    setValue(nextValue);
    setNativeFieldValue(activeInput, nextValue);

    window.requestAnimationFrame(() => {
      activeInput.setSelectionRange(deleteStart, deleteStart);
      updateClearTargets();
    });
  }

  function clearInput(input: EditableField) {
    setNativeFieldValue(input, "");

    if (input === activeInput) {
      setValue("");
      activateInput(input);
    }

    window.requestAnimationFrame(updateClearTargets);
  }

  function closeKeyboard() {
    activeInput?.blur();
    restoreActiveInputStyle();
    restoreScrollParentSpacing();
    setActiveInput(null);
    setValue("");
    window.requestAnimationFrame(updateClearTargets);
  }

  function submitRegisterFormIfNeeded() {
    if (!activeInput?.closest('[data-new-mbanking-register-page="true"]')) {
      return false;
    }

    const form = activeInput.closest("form") as HTMLFormElement | null;
    if (!form) return false;

    form.requestSubmit();
    return true;
  }

  function continueFlow() {
    const root =
      activeInput?.closest('[data-mobile-screen="true"]') ?? mobileScreen;
    const continueButton = findContinueButton(root as HTMLElement | null);

    const submittedRegisterForm = submitRegisterFormIfNeeded();
    closeKeyboard();

    if (submittedRegisterForm) return;
    if (!continueButton) return;

    window.requestAnimationFrame(() => {
      continueButton.click();
    });
  }

  function submitLogin() {
    const root =
      activeInput?.closest('[data-mobile-screen="true"]') ?? mobileScreen;
    const loginSubmitButton = findLoginSubmitButton(root as HTMLElement | null);

    closeKeyboard();

    if (!loginSubmitButton) return;

    window.requestAnimationFrame(() => {
      loginSubmitButton.click();
    });
  }

  if (!mobileScreen) return null;

  const isTextMode = mode === "text";

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
            {isLoginDetailPage ? (
              <button
                type="button"
                onClick={submitLogin}
                className={cn(
                  "mb-3 h-[44px] w-full rounded-[12px] bg-[#479DF4]",
                  "text-[14px] font-semibold leading-none text-white",
                  "transition active:scale-[0.98]",
                )}
              >
                Masuk
              </button>
            ) : null}

            {isTextMode ? (
              <div className="grid gap-2">
                <div className="grid grid-cols-10 gap-1.5">
                  {qwertyRows[0].split("").map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => insertText(letter)}
                      className="h-[42px] rounded-[10px] bg-white text-[18px] font-bold text-black shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                    >
                      {letter}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-9 gap-1.5 px-3">
                  {qwertyRows[1].split("").map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => insertText(letter)}
                      className="h-[42px] rounded-[10px] bg-white text-[18px] font-bold text-black shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                    >
                      {letter}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-[repeat(7,minmax(0,1fr))_1.35fr] gap-1.5 px-8">
                  {qwertyRows[2].split("").map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => insertText(letter)}
                      className="h-[42px] rounded-[10px] bg-white text-[18px] font-bold text-black shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                    >
                      {letter}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={backspaceText}
                    className="flex h-[42px] items-center justify-center rounded-[10px] bg-white shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                    aria-label="Hapus huruf"
                    title="Hapus"
                  >
                    <Delete className="h-[21px] w-[21px] text-black" strokeWidth={2.7} />
                  </button>
                </div>

                <div className="grid grid-cols-[1fr_1fr_3fr_1fr_1fr] gap-2">
                  <button
                    type="button"
                    onClick={() => insertText("@")}
                    className="h-[44px] rounded-[12px] bg-white text-[18px] font-bold text-black shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                  >
                    @
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText(".")}
                    className="h-[44px] rounded-[12px] bg-white text-[18px] font-bold text-black shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                  >
                    .
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText(" ")}
                    className="h-[44px] rounded-[12px] bg-white text-[13px] font-semibold text-black shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                    aria-label="Spasi"
                  >
                    spasi
                  </button>

                  <button
                    type="button"
                    onClick={() => insertText("-")}
                    className="h-[44px] rounded-[12px] bg-white text-[18px] font-bold text-black shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                  >
                    -
                  </button>

                  <button
                    type="button"
                    onClick={closeKeyboard}
                    className="flex h-[44px] items-center justify-center rounded-[12px] bg-white text-[#33AA00] shadow-sm transition active:scale-[0.94] active:bg-[#E7EAF0]"
                    aria-label="Sembunyikan keyboard"
                    title="Sembunyikan keyboard"
                  >
                    <Check className="h-[24px] w-[24px]" strokeWidth={3.2} />
                  </button>
                </div>
              </div>
            ) : (
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
            )}

            {!isLoginDetailPage ? (
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
            ) : null}
          </div>
        </div>
      ) : null}
    </>,
    mobileScreen,
  );
}