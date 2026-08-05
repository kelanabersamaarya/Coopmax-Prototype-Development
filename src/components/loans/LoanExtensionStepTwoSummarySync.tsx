"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const PANEL_CLASS = "loan-extension-tenor-impact-panel";

function createImpactPanel() {
  const panel = document.createElement("div");
  panel.className = PANEL_CLASS;
  panel.innerHTML = `
    <div class="loan-extension-tenor-impact-content">
      <div class="loan-extension-tenor-impact-title">
        Informasi Dampak Perubahan Tenor
      </div>
      <div class="loan-extension-tenor-impact-description">
        Perpanjangan tenor dapat menambah total bunga yang harus dibayar apabila jangka waktu pembayaran menjadi lebih panjang.
      </div>
    </div>
    <span class="loan-extension-tenor-impact-icon" aria-hidden="true">i</span>
  `;
  return panel;
}

function syncImpactPanel() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard || wizard.dataset.loanExtensionStep !== "2") {
    document.querySelectorAll(`.${PANEL_CLASS}`).forEach((panel) => panel.remove());
    return;
  }

  const summarySection = Array.from(
    wizard.querySelectorAll<HTMLElement>("section"),
  ).find((section) => section.querySelector("table.min-w-\\[650px\\]"));

  if (!summarySection) return;

  const existingPanel = wizard.querySelector<HTMLElement>(`.${PANEL_CLASS}`);

  if (existingPanel) {
    if (existingPanel.nextElementSibling !== summarySection) {
      summarySection.parentElement?.insertBefore(existingPanel, summarySection);
    }
    return;
  }

  summarySection.parentElement?.insertBefore(
    createImpactPanel(),
    summarySection,
  );
}

export default function LoanExtensionStepTwoSummarySync() {
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(syncImpactPanel);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    syncImpactPanel();

    return () => {
      observer.disconnect();
      document.querySelectorAll(`.${PANEL_CLASS}`).forEach((panel) => panel.remove());
    };
  }, []);

  return null;
}