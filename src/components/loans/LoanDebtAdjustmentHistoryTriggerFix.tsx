"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-debt-wizard="true"]';
const HISTORY_SELECTOR = `${WIZARD_SELECTOR}[data-loan-debt-step="1"] button:has(svg.lucide-clock-3)`;

function enhanceHistoryButton() {
  const button = document.querySelector<HTMLButtonElement>(HISTORY_SELECTOR);

  if (!button) return;

  button.dataset.loanDebtHistoryTrigger = "true";
  button.style.position = "relative";
  button.style.zIndex = "2";
  button.style.pointerEvents = "auto";
  button.style.touchAction = "manipulation";
  button.style.cursor = "pointer";
}

export default function LoanDebtAdjustmentHistoryTriggerFix() {
  React.useEffect(() => {
    let frameId = 0;

    function scheduleEnhance() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(enhanceHistoryButton);
    }

    const observer = new MutationObserver(scheduleEnhance);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    scheduleEnhance();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <style>
      {`
        ${HISTORY_SELECTOR} {
          position: relative !important;
          z-index: 2 !important;
          pointer-events: auto !important;
          touch-action: manipulation !important;
          cursor: pointer !important;
        }

        ${HISTORY_SELECTOR} > * {
          pointer-events: none !important;
        }
      `}
    </style>
  );
}