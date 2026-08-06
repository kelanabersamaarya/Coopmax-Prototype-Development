"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-interest-wizard="true"]';
const TABLE_TITLE = "Simulasi Angsuran Setelah Perubahan Suku Bunga";
const TABLE_CLASS = "loan-interest-member-style-table";

const rows = [
  {
    dueDate: "25-01-2026",
    total: "916.667",
    principal: "0,00",
    interest: "83.333",
    remainingPrincipal: "0,00",
    remainingInterest: "26.389",
    penalty: "100.000",
  },
  {
    dueDate: "25-01-2026",
    total: "916.667",
    principal: "0,00",
    interest: "83.333",
    remainingPrincipal: "0,00",
    remainingInterest: "26.389",
    penalty: "75.000",
  },
  {
    dueDate: "25-02-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
    penalty: "225.000",
  },
  {
    dueDate: "25-03-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
    penalty: "0,00",
  },
  {
    dueDate: "25-04-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
    penalty: "0,00",
  },
  {
    dueDate: "25-05-2026",
    total: "916.667",
    principal: "916.667",
    interest: "83.333",
    remainingPrincipal: "833.333",
    remainingInterest: "33.333",
    penalty: "0,00",
  },
];

function findSimulationTable(wizard: HTMLElement) {
  const title = Array.from(wizard.querySelectorAll<HTMLElement>("div")).find(
    (element) => element.textContent?.trim() === TABLE_TITLE,
  );

  if (!title) return null;

  return title.parentElement?.querySelector<HTMLTableElement>("table") ?? null;
}

function buildTableMarkup() {
  const body = rows
    .map(
      (row) => `
        <tr>
          <td class="loan-interest-member-date">${row.dueDate}</td>
          <td>${row.total}</td>
          <td>${row.principal}</td>
          <td>${row.interest}</td>
          <td>${row.remainingPrincipal}</td>
          <td>${row.remainingInterest}</td>
          <td class="loan-interest-member-penalty">${row.penalty}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <table class="${TABLE_CLASS}">
      <thead>
        <tr>
          <th>JATUH<br />TEMPO</th>
          <th>TOTAL TAGIHAN<br />BELUM DIBAYAR</th>
          <th>TAGIHAN<br />POKOK</th>
          <th>TAGIHAN<br />BUNGA</th>
          <th>SISA TAGIHAN<br />POKOK</th>
          <th>SISA TAGIHAN<br />BUNGA</th>
          <th>TAGIHAN<br />DENDA</th>
        </tr>
      </thead>
      <tbody>${body}</tbody>
    </table>
  `;
}

function syncTable() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard || wizard.dataset.loanInterestStep !== "2") return;

  const existingTable = findSimulationTable(wizard);
  if (!existingTable || existingTable.classList.contains(TABLE_CLASS)) return;

  existingTable.outerHTML = buildTableMarkup();
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
    };
  }, []);

  return (
    <style>
      {`
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} {
          width: 100% !important;
          min-width: 820px !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
          background: #ffffff !important;
          color: #0f172a !important;
          font-size: 12px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th {
          padding: 10px 8px !important;
          border-bottom: 1px solid #cbd5e1 !important;
          background: #ffffff !important;
          color: #334155 !important;
          font-size: 10px !important;
          font-weight: 800 !important;
          line-height: 1.2 !important;
          text-align: right !important;
          vertical-align: middle !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:first-child,
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} td:first-child {
          width: 112px !important;
          text-align: left !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:nth-child(2) {
          width: 150px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:nth-child(3),
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:nth-child(4) {
          width: 125px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:nth-child(5),
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:nth-child(6) {
          width: 145px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:nth-child(7) {
          width: 120px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} td {
          padding: 12px 8px !important;
          border-top: 1px solid #e2e8f0 !important;
          background: #ffffff !important;
          color: #0f172a !important;
          font-size: 12px !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          text-align: right !important;
          vertical-align: middle !important;
          white-space: nowrap !important;
          font-variant-numeric: tabular-nums !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} tbody tr:nth-child(even) td {
          background: #f8fafc !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-date {
          font-weight: 700 !important;
          text-align: left !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-penalty {
          text-align: right !important;
        }

        @media (max-width: 640px) {
          [data-loan-interest-wizard="true"] .${TABLE_CLASS} {
            min-width: 740px !important;
          }
        }
      `}
    </style>
  );
}