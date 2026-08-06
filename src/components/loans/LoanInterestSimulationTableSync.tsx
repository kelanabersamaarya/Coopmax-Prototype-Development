"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-interest-wizard="true"]';
const TABLE_TITLE = "Simulasi Angsuran Setelah Perubahan Suku Bunga";
const TABLE_CLASS = "loan-interest-billing-simulation-table";
const WRAPPER_CLASS = "loan-interest-billing-simulation-wrapper";

const rows = [
  {
    dueDate: "25-01-2026",
    total: "916.667",
    principal: "0,00",
    interest: "83.333",
    remainingPrincipal: "0,00",
    remainingInterest: "26.389",
  },
  {
    dueDate: "25-02-2026",
    total: "916.667",
    principal: "0,00",
    interest: "83.333",
    remainingPrincipal: "0,00",
    remainingInterest: "26.389",
  },
  {
    dueDate: "25-03-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
  },
  {
    dueDate: "25-04-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
  },
  {
    dueDate: "25-05-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
  },
  {
    dueDate: "25-06-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
  },
];

function findSimulationTable(wizard: HTMLElement) {
  const title = Array.from(wizard.querySelectorAll<HTMLElement>("div")).find(
    (element) => element.textContent?.trim() === TABLE_TITLE,
  );

  return title?.parentElement?.querySelector<HTMLTableElement>("table") ?? null;
}

function cell(value: string, className = "") {
  return `<td class="${className}">${value}</td>`;
}

function penaltyCell(index: number) {
  if (index >= 3) return cell("0,00", "numeric-cell");

  return cell(
    `<span class="penalty-value">75.000</span><button type="button" class="penalty-info-button" aria-label="Lihat Detail Denda" title="Lihat Detail Denda">i</button>`,
    "numeric-cell penalty-cell",
  );
}

function buildGraceInfoRow() {
  return `
    <tr class="grace-info-row">
      <td colspan="7">
        <div class="grace-info-box">
          <span class="grace-info-icon">i</span>
          <div>
            <div class="grace-info-title">Periode Grace Period</div>
            <div class="grace-info-description">
              Berikut ini merupakan periode tagihan pinjaman yang termasuk ke dalam
              grace period selama 2 bulan. Selama periode ini nasabah hanya membayar bunga.
            </div>
          </div>
        </div>
      </td>
    </tr>
  `;
}

function buildTableMarkup() {
  const graceRows = rows.slice(0, 2);
  const regularRows = rows.slice(2);

  const renderRow = (row: (typeof rows)[number], index: number) => `
    <tr class="billing-data-row">
      ${cell(row.dueDate, "date-cell")}
      ${cell(row.total, "numeric-cell")}
      ${cell(row.principal, "numeric-cell")}
      ${cell(row.interest, "numeric-cell")}
      ${cell(row.remainingPrincipal, "numeric-cell")}
      ${cell(row.remainingInterest, "numeric-cell")}
      ${penaltyCell(index)}
    </tr>
  `;

  return `
    <div class="${WRAPPER_CLASS}">
      <div class="billing-table-scroll">
        <table class="${TABLE_CLASS}">
          <thead>
            <tr>
              <th>Jatuh<br />Tempo</th>
              <th>Total Tagihan<br />Belum Dibayar</th>
              <th>Tagihan<br />Pokok</th>
              <th>Tagihan<br />Bunga</th>
              <th>Sisa Tagihan<br />Pokok</th>
              <th>Sisa Tagihan<br />Bunga</th>
              <th>Tagihan<br />Denda</th>
            </tr>
          </thead>
          <tbody>
            <tr class="grace-shell-row">
              <td colspan="7">
                <div class="grace-shell">
                  <table class="${TABLE_CLASS} grace-inner-table">
                    <tbody>
                      ${buildGraceInfoRow()}
                      ${graceRows.map((row, index) => renderRow(row, index)).join("")}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            ${regularRows
              .map((row, index) => renderRow(row, index + 2))
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function syncTable() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);

  if (!wizard || wizard.dataset.loanInterestStep !== "2") {
    wizard?.querySelector(`.${WRAPPER_CLASS}`)?.remove();
    return;
  }

  const existing = wizard.querySelector(`.${WRAPPER_CLASS}`);
  if (existing) return;

  const table = findSimulationTable(wizard);
  if (!table || table.classList.contains(TABLE_CLASS)) return;

  const replacement = document.createElement("div");
  replacement.innerHTML = buildTableMarkup().trim();

  const nextTable = replacement.firstElementChild;
  if (!nextTable) return;

  table.parentElement?.replaceWith(nextTable);
}

export default function LoanInterestSimulationTableSync() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncTable);
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
        .querySelectorAll(`.${WRAPPER_CLASS}`)
        .forEach((element) => element.remove());
    };
  }, []);

  return (
    <style>
      {`
        [data-loan-interest-wizard="true"] .${WRAPPER_CLASS} {
          width: 100%;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 5px;
          background: #ffffff;
        }

        [data-loan-interest-wizard="true"] .billing-table-scroll {
          width: 100%;
          overflow-x: auto;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} {
          width: 100%;
          min-width: 980px;
          table-layout: fixed;
          border-collapse: collapse;
          background: #ffffff;
          color: #0f172a;
          font-family: inherit;
          font-size: 12px;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th {
          padding: 10px 12px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          color: #334155;
          font-size: 10px;
          font-weight: 800;
          line-height: 1.1;
          text-align: right;
          text-transform: uppercase;
          vertical-align: middle;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:first-child,
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} td:first-child {
          text-align: left;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} td {
          padding: 12px;
          border-top: 1px solid #e2e8f0;
          color: #0f172a;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.2;
          text-align: right;
          white-space: nowrap;
          vertical-align: middle;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .date-cell {
          font-weight: 700;
        }

        [data-loan-interest-wizard="true"] .grace-shell-row > td {
          padding: 0;
          border-top: 1px solid #e2e8f0;
        }

        [data-loan-interest-wizard="true"] .grace-shell {
          margin: 8px;
          overflow: hidden;
          border: 2px solid rgba(37, 99, 235, 0.7);
          border-radius: 5px;
        }

        [data-loan-interest-wizard="true"] .grace-inner-table {
          min-width: 100%;
        }

        [data-loan-interest-wizard="true"] .grace-info-row td {
          padding: 0;
          border-top: 0;
        }

        [data-loan-interest-wizard="true"] .grace-info-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin: 6px;
          padding: 10px 12px;
          border-radius: 12px;
          background: #eff6ff;
          color: #1e293b;
          text-align: left;
        }

        [data-loan-interest-wizard="true"] .grace-info-icon {
          display: inline-flex;
          height: 36px;
          width: 36px;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: 16px;
          font-weight: 800;
        }

        [data-loan-interest-wizard="true"] .grace-info-title {
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
        }

        [data-loan-interest-wizard="true"] .grace-info-description {
          margin-top: 3px;
          font-size: 11px;
          line-height: 1.4;
        }

        [data-loan-interest-wizard="true"] .penalty-cell {
          white-space: nowrap;
        }

        [data-loan-interest-wizard="true"] .penalty-value {
          vertical-align: middle;
        }

        [data-loan-interest-wizard="true"] .penalty-info-button {
          display: inline-flex;
          height: 20px;
          width: 20px;
          margin-left: 8px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 999px;
          background: #2563eb;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          line-height: 1;
          vertical-align: middle;
          cursor: pointer;
        }

        [data-loan-interest-wizard="true"] .penalty-info-button:hover {
          background: #1d4ed8;
        }
      `}
    </style>
  );
}