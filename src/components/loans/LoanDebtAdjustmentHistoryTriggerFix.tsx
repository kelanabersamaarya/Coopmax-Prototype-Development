"use client";

import * as React from "react";
import { createPortal } from "react-dom";

const WIZARD_SELECTOR = '[data-loan-debt-wizard="true"]';
const HISTORY_SELECTOR = `${WIZARD_SELECTOR}[data-loan-debt-step="1"] button:has(svg.lucide-clock-3)`;

type ButtonRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function findHistoryButton() {
  return document.querySelector<HTMLButtonElement>(HISTORY_SELECTOR);
}

function getButtonRect(button: HTMLButtonElement): ButtonRect {
  const rect = button.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

export default function LoanDebtAdjustmentHistoryTriggerFix() {
  const [button, setButton] = React.useState<HTMLButtonElement | null>(null);
  const [rect, setRect] = React.useState<ButtonRect | null>(null);

  React.useEffect(() => {
    let frameId = 0;

    function syncButton() {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const nextButton = findHistoryButton();

        setButton(nextButton);

        if (nextButton) {
          nextButton.dataset.loanDebtHistoryTrigger = "true";
          setRect(getButtonRect(nextButton));
        } else {
          setRect(null);
        }
      });
    }

    const observer = new MutationObserver(syncButton);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    window.addEventListener("resize", syncButton);
    window.addEventListener("scroll", syncButton, true);

    syncButton();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", syncButton);
      window.removeEventListener("scroll", syncButton, true);
    };
  }, []);

  React.useEffect(() => {
    if (!button) return;

    const updatePosition = () => {
      if (!button.isConnected) {
        setButton(null);
        setRect(null);
        return;
      }

      setRect(getButtonRect(button));
    };

    updatePosition();

    const intervalId = window.setInterval(updatePosition, 150);

    return () => window.clearInterval(intervalId);
  }, [button]);

  if (!button || !rect) {
    return null;
  }

  return (
    <>
      <style>
        {`
          ${HISTORY_SELECTOR} {
            pointer-events: auto !important;
            touch-action: manipulation !important;
            cursor: pointer !important;
          }

          ${HISTORY_SELECTOR} > * {
            pointer-events: none !important;
          }
        `}
      </style>

      {createPortal(
        <button
          type="button"
          aria-label="Lihat Riwayat Perubahan"
          title="Lihat Riwayat Perubahan"
          onClick={() => button.click()}
          className="fixed z-[100000] cursor-pointer bg-transparent p-0"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
        />,
        document.body,
      )}
    </>
  );
}