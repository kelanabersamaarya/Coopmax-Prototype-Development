"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-debt-wizard="true"]';
const HISTORY_SELECTOR = `${WIZARD_SELECTOR}[data-loan-debt-step="1"] button:has(svg.lucide-clock-3)`;

function enhanceHistoryButton() {
  const button = document.querySelector<HTMLButtonElement>(HISTORY_SELECTOR);

  if (!button) return;

  button.dataset.loanDebtHistoryTrigger = "true";
  button.style.position = "relative";
  button.style.zIndex = "100000";
  button.style.pointerEvents = "auto";
  button.style.touchAction = "manipulation";
  button.style.cursor = "pointer";

  let parent = button.parentElement;
  let depth = 0;

  while (parent && depth < 5) {
    parent.style.position = "relative";
    parent.style.zIndex = String(99999 - depth);
    parent.style.pointerEvents = "auto";
    parent = parent.parentElement;
    depth += 1;
  }

  const dialogContent = button.closest<HTMLElement>(
    '[data-radix-dialog-content], [data-slot="dialog-content"]',
  );

  if (dialogContent) {
    dialogContent.style.pointerEvents = "auto";
    dialogContent.style.zIndex = "10000";
  }
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
      attributes: true,
    });

    document.addEventListener("pointerdown", scheduleEnhance, true);
    document.addEventListener("pointerup", scheduleEnhance, true);
    document.addEventListener("click", scheduleEnhance, true);

    enhanceHistoryButton();

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
        ${WIZARD_SELECTOR}[data-loan-debt-step="1"] {
          position: relative !important;
          z-index: 10000 !important;
        }

        ${HISTORY_SELECTOR} {
          position: relative !important;
          z-index: 100000 !important;
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