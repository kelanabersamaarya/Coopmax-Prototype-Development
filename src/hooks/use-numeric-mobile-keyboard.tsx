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

export function useNumericMobileKeyboard(deps: React.DependencyList = []) {
  React.useEffect(() => {
    const root = document.querySelector('[data-mobile-screen="true"]');
    if (!root) return;

    function applyNumericKeyboard() {
      const inputs = root.querySelectorAll<HTMLInputElement>("input");

      inputs.forEach((input) => {
        if (!shouldUseNumericKeyboard(input)) return;

        input.setAttribute("inputmode", "numeric");
        input.setAttribute("pattern", "[0-9]*");
        input.setAttribute("enterkeyhint", "done");
      });
    }

    applyNumericKeyboard();

    const observer = new MutationObserver(applyNumericKeyboard);
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "inputmode", "name", "id"],
    });

    return () => observer.disconnect();
  }, deps);
}