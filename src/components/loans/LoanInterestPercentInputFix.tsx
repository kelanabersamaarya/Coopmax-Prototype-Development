"use client";

import { useEffect } from "react";

function isInterestRateInput(target: EventTarget | null): target is HTMLInputElement {
  return (
    target instanceof HTMLInputElement &&
    target.placeholder === "%" &&
    target.value.endsWith("%")
  );
}

export default function LoanInterestPercentInputFix() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Backspace" || !isInterestRateInput(event.target)) {
        return;
      }

      const input = event.target;
      const suffixStart = input.value.length - 1;
      const selectionStart = input.selectionStart ?? suffixStart;
      const selectionEnd = input.selectionEnd ?? suffixStart;

      if (selectionStart === input.value.length && selectionEnd === input.value.length) {
        input.setSelectionRange(suffixStart, suffixStart);
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return null;
}