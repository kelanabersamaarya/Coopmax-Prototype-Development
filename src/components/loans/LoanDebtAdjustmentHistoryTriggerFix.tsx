"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-debt-wizard="true"]';
const BUTTON_SELECTOR = `${WIZARD_SELECTOR} button`;

function isHistoryButton(button: HTMLButtonElement) {
  const text = (button.textContent ?? "").trim().toLowerCase();

  return (
    text.includes("lihat riwayat perubahan") &&
    text.includes("nominal bunga")
  );
}

export default function LoanDebtAdjustmentHistoryTriggerFix() {
  React.useEffect(() => {
    let frameId = 0;

    function enhanceButton() {
      const buttons = Array.from(
        document.querySelectorAll<HTMLButtonElement>(BUTTON_SELECTOR),
      );

      buttons.filter(isHistoryButton).forEach((button) => {
        button.dataset.loanDebtHistoryTrigger = "true";
        button.style.position = "relative";
        button.style.zIndex = "1000";
        button.style.pointerEvents = "auto";
        button.style.touchAction = "manipulation";
      });
    }

    function scheduleEnhance() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(enhanceButton);
    }

    const observer = new MutationObserver(scheduleEnhance);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("pointerup", scheduleEnhance, true);
    enhanceButton();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener("pointerup", scheduleEnhance, true);
    };
  }, []);

  return (
    <style>
      {`
        [data-loan-debt-wizard="true"]
          button[data-loan-debt-history-trigger="true"] {
          position: relative !important;
          z-index: 1000 !important;
          pointer-events: auto !important;
          touch-action: manipulation !important;
          cursor: pointer !important;
        }

        [data-loan-debt-wizard="true"]
          button[data-loan-debt-history-trigger="true"]::before {
          pointer-events: none !important;
        }

        [data-loan-debt-wizard="true"]
          button[data-loan-debt-history-trigger="true"]::after {
          pointer-events: none !important;
        }
      `}
    </style>
  );
}