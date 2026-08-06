"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const IMPACT_PANEL_CLASS = "loan-extension-tenor-impact-panel";
const DETAIL_PANEL_CLASS = "loan-extension-method-reason-panel";

function createImpactPanel() {
  const panel = document.createElement("div");
  panel.className = IMPACT_PANEL_CLASS;
  panel.innerHTML = `
    <span class="loan-extension-tenor-impact-icon" aria-hidden="true">i</span>
    <div class="loan-extension-tenor-impact-content">
      <div class="loan-extension-tenor-impact-title">
        Informasi Dampak Perubahan Tenor
      </div>
      <div class="loan-extension-tenor-impact-description">
        Perpanjangan tenor dapat menambah total bunga yang harus dibayar apabila jangka waktu pembayaran menjadi lebih panjang.
      </div>
    </div>
  `;
  return panel;
}

function createDetailPanel() {
  const panel = document.createElement("section");
  panel.className = DETAIL_PANEL_CLASS;
  panel.setAttribute("aria-label", "Informasi metode dan alasan perpanjangan");
  panel.innerHTML = `
    <div class="loan-extension-method-reason-grid">
      <div class="loan-extension-method-reason-item">
        <div class="loan-extension-method-reason-label">
          METODE PERPANJANGAN
        </div>
        <div
          class="loan-extension-method-reason-value"
          data-extension-method-value
        >
          -
        </div>
      </div>

      <div class="loan-extension-method-reason-item">
        <div class="loan-extension-method-reason-label">
          ALASAN PERPANJANGAN
        </div>
        <div
          class="loan-extension-method-reason-value"
          data-extension-reason-value
        >
          -
        </div>
      </div>
    </div>
  `;
  return panel;
}

function findSummarySection(wizard: HTMLElement) {
  return Array.from(wizard.querySelectorAll<HTMLElement>("section")).find(
    (section) => section.querySelector("table.min-w-\\[650px\\]"),
  );
}

function getSummaryRow(wizard: HTMLElement, label: string) {
  const rows = Array.from(
    wizard.querySelectorAll<HTMLTableRowElement>("table tbody tr"),
  );

  return rows.find((row) => {
    const firstCell = row.querySelector("td");
    return firstCell?.textContent?.trim() === label;
  });
}

function getSummaryValue(wizard: HTMLElement, label: string) {
  const row = getSummaryRow(wizard, label);
  return row?.querySelectorAll("td")[2]?.textContent?.trim() || "-";
}

function syncSummaryDetails() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const existingImpact = wizard?.querySelector<HTMLElement>(
    `.${IMPACT_PANEL_CLASS}`,
  );
  const existingDetails = wizard?.querySelector<HTMLElement>(
    `.${DETAIL_PANEL_CLASS}`,
  );

  if (!wizard || wizard.dataset.loanExtensionStep !== "2") {
    existingImpact?.remove();
    existingDetails?.remove();
    return;
  }

  const summarySection = findSummarySection(wizard);
  if (!summarySection || !summarySection.parentElement) return;

  const effectiveDateRow = getSummaryRow(wizard, "Tanggal Efektif");
  effectiveDateRow?.remove();

  const method = getSummaryValue(wizard, "Metode Perpanjangan");
  const reason = getSummaryValue(wizard, "Alasan Perpanjangan");

  const details =
    existingDetails ??
    summarySection.parentElement.insertBefore(
      createDetailPanel(),
      summarySection.nextSibling,
    );

  const methodValue = details.querySelector<HTMLElement>(
    "[data-extension-method-value]",
  );
  const reasonValue = details.querySelector<HTMLElement>(
    "[data-extension-reason-value]",
  );

  if (methodValue) methodValue.textContent = method;
  if (reasonValue) reasonValue.textContent = reason;

  if (!existingImpact) {
    summarySection.parentElement.insertBefore(
      createImpactPanel(),
      details.nextSibling,
    );
  }
}

export default function LoanExtensionStepTwoSummarySync() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncSummaryDetails);
    };

    const observer = new MutationObserver(scheduleSync);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      document
        .querySelectorAll(`.${IMPACT_PANEL_CLASS}, .${DETAIL_PANEL_CLASS}`)
        .forEach((panel) => panel.remove());
    };
  }, []);

  return null;
}