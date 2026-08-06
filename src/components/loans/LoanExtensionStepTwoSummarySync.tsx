"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const IMPACT_PANEL_CLASS = "loan-extension-tenor-impact-panel";
const DETAIL_PANEL_CLASS = "loan-extension-method-reason-panel";

function createImpactPanel() {
  const panel = document.createElement("section");
  panel.className = IMPACT_PANEL_CLASS;
  panel.setAttribute("aria-label", "Informasi dampak perubahan tenor");
  panel.innerHTML = `
    <div class="loan-extension-tenor-impact-icon" aria-hidden="true">i</div>
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
  if (!summarySection?.parentElement) return;

  getSummaryRow(wizard, "Tanggal Efektif")?.remove();

  const method = getSummaryValue(wizard, "Metode Perpanjangan");
  const reason = getSummaryValue(wizard, "Alasan Perpanjangan");

  const parent = summarySection.parentElement;
  const impactPanel = existingImpact ?? createImpactPanel();
  const detailPanel = existingDetails ?? createDetailPanel();

  const methodValue = detailPanel.querySelector<HTMLElement>(
    "[data-extension-method-value]",
  );
  const reasonValue = detailPanel.querySelector<HTMLElement>(
    "[data-extension-reason-value]",
  );

  if (methodValue) methodValue.textContent = method;
  if (reasonValue) reasonValue.textContent = reason;

  parent.insertBefore(impactPanel, summarySection);
  parent.insertBefore(detailPanel, summarySection.nextSibling);
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

  return (
    <style>
      {`
        [data-loan-extension-wizard="true"] .${IMPACT_PANEL_CLASS} {
          display: flex;
          width: 100%;
          align-items: flex-start;
          gap: 12px;
          margin: 0 0 16px;
          overflow: hidden;
          border: 1px solid #93c5fd;
          border-radius: 12px;
          background: #dbeafe;
          padding: 14px 16px;
          color: #1e3a8a;
          box-sizing: border-box;
        }

        [data-loan-extension-wizard="true"] .loan-extension-tenor-impact-icon {
          display: grid;
          width: 30px;
          height: 30px;
          flex: 0 0 auto;
          place-items: center;
          margin-top: 1px;
          border-radius: 9999px;
          background: #2563eb;
          color: #ffffff;
          font-size: 18px;
          font-weight: 800;
          line-height: 1;
        }

        [data-loan-extension-wizard="true"] .loan-extension-tenor-impact-content {
          min-width: 0;
        }

        [data-loan-extension-wizard="true"] .loan-extension-tenor-impact-title {
          color: #1e3a8a;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.3;
        }

        [data-loan-extension-wizard="true"] .loan-extension-tenor-impact-description {
          margin-top: 4px;
          color: #1e40af;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.45;
        }

        @media (max-width: 640px) {
          [data-loan-extension-wizard="true"] .${IMPACT_PANEL_CLASS} {
            padding: 12px;
          }
        }
      `}
    </style>
  );
}