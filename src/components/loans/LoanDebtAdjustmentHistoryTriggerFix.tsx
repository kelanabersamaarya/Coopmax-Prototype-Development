"use client";

import * as React from "react";

const WIZARD_SELECTOR =
  '[data-loan-debt-wizard="true"], [data-loan-interest-wizard="true"]';

function isHistoryButton(button: HTMLButtonElement) {
  const text = (button.textContent ?? "").trim().toLowerCase();
  const hasClockIcon = Boolean(button.querySelector("svg.lucide-clock-3"));
  const hasEyeIcon = Boolean(button.querySelector("svg.lucide-eye"));

  return (
    text.includes("riwayat perubahan") ||
    (hasClockIcon && text.includes("riwayat")) ||
    (hasEyeIcon && text.includes("riwayat"))
  );
}

function enhanceHistoryButtons() {
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      `${WIZARD_SELECTOR} button`,
    ),
  );

  buttons.filter(isHistoryButton).forEach((button) => {
    button.dataset.loanDebtHistoryTrigger = "true";
    button.style.position = "relative";
    button.style.zIndex = "10000";
    button.style.pointerEvents = "auto";
    button.style.touchAction = "manipulation";
    button.style.cursor = "pointer";

    let parent = button.parentElement;
    let depth = 0;

    while (parent && depth < 4) {
      parent.style.position = "relative";
      parent.style.zIndex = String(9999 - depth);
      parent.style.pointerEvents = "auto";
      parent = parent.parentElement;
      depth += 1;
    }
  });
}

export default function LoanDebtAdjustmentHistoryTriggerFix() {
  React.useEffect(() => {
    let frameId = 0;

    function scheduleEnhance() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(enhanceHistoryButtons);
    }

    const observer = new MutationObserver(scheduleEnhance);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    document.addEventListener("pointerdown", scheduleEnhance, true);
    document.addEventListener("pointerup", scheduleEnhance, true);
    document.addEventListener("click", scheduleEnhance, true);

    enhanceHistoryButtons();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener("pointerdown", scheduleEnhance, true);
      document.removeEventListener("pointerup", scheduleEnhance, true);
      document.removeEventListener("click", scheduleEnhance, true);
    };
  }, []);

  return (
    <style>
      {`
        ${WIZARD_SELECTOR}
          button[data-loan-debt-history-trigger="true"] {
          position: relative !important;
          z-index: 10000 !important;
          pointer-events: auto !important;
          touch-action: manipulation !important;
          cursor: pointer !important;
        }

        ${WIZARD_SELECTOR}
          button[data-loan-debt-history-trigger="true"] > * {
          pointer-events: none !important;
        }
      `}
    </style>
  );
}