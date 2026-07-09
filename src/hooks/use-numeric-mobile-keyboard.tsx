"use client";

import * as React from "react";

const NUMERIC_KEYWORDS = [
  "nomor",
  "no.",
  "no ",
  "no_",
  "no-",
  "hp",
  "handphone",
  "telepon",
  "telp",
  "pelanggan",
  "rekening",
  "identitas",
  "meter",
  "id pelanggan",
  "virtual account",
  "va",
  "nominal",
  "jumlah",
];

function getFieldText(input: HTMLInputElement) {
  const labelText = input.labels
    ? Array.from(input.labels)
        .map((label) => label.textContent ?? "")
        .join(" ")
    : "";

  return [
    input.getAttribute("aria-label") ?? "",
    input.getAttribute("placeholder") ?? "",
    input.getAttribute("name") ?? "",
    input.id ?? "",
    labelText,
  ]
    .join(" ")
    .toLowerCase();
}

function shouldUseNumericKeyboard(input: HTMLInputElement) {
  if (input.type === "password") return false;
  if (input.readOnly || input.disabled) return false;

  const inputMode = (input.getAttribute("inputmode") ?? "").toLowerCase();

  if (inputMode === "numeric" || inputMode === "decimal" || inputMode === "tel") {
    return true;
  }

  if (input.type === "tel" || input.type === "number") return true;

  const fieldText = getFieldText(input);
  return NUMERIC_KEYWORDS.some((keyword) => fieldText.includes(keyword));
}

function setAttributeIfDifferent(
  input: HTMLInputElement,
  name: string,
  value: string,
) {
  if (input.getAttribute(name) === value) return;
  input.setAttribute(name, value);
}

function applyNumericKeyboardToInput(input: HTMLInputElement) {
  if (!shouldUseNumericKeyboard(input)) return;

  setAttributeIfDifferent(input, "inputmode", "numeric");
  setAttributeIfDifferent(input, "pattern", "[0-9]*");
  setAttributeIfDifferent(input, "enterkeyhint", "done");
}

function applyNumericKeyboardToRoot(root: Element) {
  root
    .querySelectorAll<HTMLInputElement>("input")
    .forEach(applyNumericKeyboardToInput);
}

export function useNumericMobileKeyboard(deps: React.DependencyList = []) {
  React.useEffect(() => {
    const root = document.querySelector('[data-mobile-screen="true"]');
    if (!root) return;

    const applyOnce = () => applyNumericKeyboardToRoot(root);

    const frameId = window.requestAnimationFrame(applyOnce);
    const timeoutId = window.setTimeout(applyOnce, 120);

    function applyFromEvent(event: Event) {
      const target = event.target as HTMLElement | null;
      const input = target?.closest("input");

      if (input instanceof HTMLInputElement) {
        applyNumericKeyboardToInput(input);
      }
    }

    root.addEventListener("pointerdown", applyFromEvent, true);
    root.addEventListener("touchstart", applyFromEvent, true);
    root.addEventListener("focusin", applyFromEvent, true);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      root.removeEventListener("pointerdown", applyFromEvent, true);
      root.removeEventListener("touchstart", applyFromEvent, true);
      root.removeEventListener("focusin", applyFromEvent, true);
    };
  }, deps);
}