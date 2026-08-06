"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const IMPACT_PANEL_CLASS = "loan-extension-tenor-impact-panel";
const DETAIL_PANEL_CLASS = "loan-extension-method-reason-panel";

function removeInjectedPanels() {
  document
    .querySelectorAll(`.${IMPACT_PANEL_CLASS}, .${DETAIL_PANEL_CLASS}`)
    .forEach((panel) => panel.remove());
}

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
        <div class="loan-extension-method-reason-value" data-extension-method-value>
          -
        </div>
      </div>

      <div class="loan-extension-method-reason-item">
        <div class="loan-extension-method-reason-label">
          ALASAN PERPANJANGAN
        </div>
        <div class="loan-extension-method-reason-value" data-extension-reason-value>
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
  return Array.from(
    wizard.querySelectorAll<HTMLTableRowElement>("table tbody tr"),
  ).find((row) => row.querySelector("td")?.textContent?.trim() === label);
}

function getSummaryValue(wizard: HTMLElement, label: string) {
  const row = getSummaryRow(wizard, label);
  return row?.querySelectorAll("td")[2]?.textContent?.trim() || "-";
}

function parseAmount(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString("id-ID");
}

function getScheduleValues(wizard: HTMLElement) {
  const scheduleTable = wizard.querySelector<HTMLTableElement>(
    "table.min-w-\\[750px\\]",
  );

  if (!scheduleTable) {
    return {
      monthlyInstallment: "-",
      totalInterest: "-",
      finalDueDate: "-",
    };
  }

  const rows = Array.from(
    scheduleTable.querySelectorAll<HTMLTableRowElement>("tbody tr"),
  );

  const firstRowCells = rows[0]?.querySelectorAll("td");
  const lastRowCells = rows[rows.length - 1]?.querySelectorAll("td");

  const monthlyInstallment = firstRowCells?.[1]?.textContent?.trim() || "-";
  const finalDueDate = lastRowCells?.[0]?.textContent?.trim() || "-";

  const totalInterest = rows.reduce((total, row) => {
    const cells = row.querySelectorAll("td");
    return total + parseAmount(cells[3]?.textContent ?? "");
  }, 0);

  return {
    monthlyInstallment,
    totalInterest: formatAmount(totalInterest),
    finalDueDate,
  };
}

function createSummaryRow(
  label: string,
  beforeValue: string,
  afterValue: string,
) {
  const row = document.createElement("tr");
  row.className = "border-b border-slate-100 bg-white text-[12px] text-black";

  const labelCell = document.createElement("td");
  labelCell.className = "px-4 py-3 font-medium";
  labelCell.textContent = label;

  const beforeCell = document.createElement("td");
  beforeCell.className = "px-4 py-3";
  beforeCell.textContent = beforeValue;

  const afterCell = document.createElement("td");
  afterCell.className = "px-4 py-3 font-semibold text-[#2563EB]";
  afterCell.textContent = afterValue;

  row.append(labelCell, beforeCell, afterCell);
  return row;
}

function replaceSummaryRows(wizard: HTMLElement) {
  const summarySection = findSummarySection(wizard);
  const tbody = summarySection?.querySelector("table tbody");

  if (!tbody) return;

  const originalRows = Array.from(tbody.querySelectorAll("tr"));
  const tenor = originalRows.find(
    (row) => row.querySelector("td")?.textContent?.trim() === "Tenor",
  );
  const dueDate = originalRows.find(
    (row) =>
      row.querySelector("td")?.textContent?.trim() ===
      "Tanggal Jatuh Tempo Akhir",
  );

  const scheduleValues = getScheduleValues(wizard);

  tbody.replaceChildren(
    createSummaryRow(
      "Tenor",
      "12 Bulan",
      tenor?.querySelectorAll("td")[2]?.textContent?.trim() ||
        `${scheduleValues.finalDueDate === "-" ? "12" : "12"} Bulan`,
    ),
    createSummaryRow(
      "Tanggal Jatuh Tempo Akhir",
      "07-04-2027",
      dueDate?.querySelectorAll("td")[2]?.textContent?.trim() ||
        scheduleValues.finalDueDate,
    ),
    createSummaryRow(
      "Angsuran Bulanan",
      "1.120.000,00",
      scheduleValues.monthlyInstallment,
    ),
    createSummaryRow(
      "Total Bunga Pinjaman",
      "1.440.000,00",
      scheduleValues.totalInterest,
    ),
  );
}

function syncSummaryDetails() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);

  // Step 1, modal tertutup, atau wizard sudah berganti:
  // hapus semua panel yang sebelumnya diinjeksi.
  if (!wizard || wizard.dataset.loanExtensionStep !== "2") {
    removeInjectedPanels();
    return;
  }

  removeInjectedPanels();

  const summarySection = findSummarySection(wizard);
  if (!summarySection?.parentElement) return;

  const method = getSummaryValue(wizard, "Metode Perpanjangan");
  const reason = getSummaryValue(wizard, "Alasan Perpanjangan");

  const impactPanel = createImpactPanel();
  const detailPanel = createDetailPanel();

  const methodValue = detailPanel.querySelector<HTMLElement>(
    "[data-extension-method-value]",
  );
  const reasonValue = detailPanel.querySelector<HTMLElement>(
    "[data-extension-reason-value]",
  );

  if (methodValue) methodValue.textContent = method;
  if (reasonValue) reasonValue.textContent = reason;

  const parent = summarySection.parentElement;
  parent.insertBefore(impactPanel, summarySection);
  parent.insertBefore(detailPanel, summarySection);

  replaceSummaryRows(wizard);
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
      attributes: true,
    });

    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      removeInjectedPanels();
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

        [data-loan-extension-wizard="true"]:not([data-loan-extension-step="2"])
          .loan-extension-tenor-impact-panel,
        [data-loan-extension-wizard="true"]:not([data-loan-extension-step="2"])
          .loan-extension-method-reason-panel {
          display: none !important;
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