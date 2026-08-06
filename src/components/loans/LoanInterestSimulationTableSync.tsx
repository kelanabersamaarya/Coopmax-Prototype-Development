"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-interest-wizard="true"]';
const TABLE_TITLE = "Simulasi Angsuran Setelah Perubahan Suku Bunga";
const TABLE_CLASS = "loan-interest-member-style-table";

const rows = [
  ["25-01-2026", "916.667", "0,00", "83.333", "0,00", "26.389", "100.000", "eye"],
  ["25-01-2026", "916.667", "0,00", "83.333", "0,00", "26.389", "75.000", "eye"],
  ["25-02-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "225.000", "eye"],
  ["25-03-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "", "plus"],
  ["25-04-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "", "plus"],
  ["25-05-2026", "916.667", "916.667", "83.333", "833.333", "33.333", "", "plus"],
] as const;

function findSimulationTable(wizard: HTMLElement) {
  const title = Array.from(wizard.querySelectorAll<HTMLElement>("div")).find(
    (element) => element.textContent?.trim() === TABLE_TITLE,
  );

  return title?.parentElement?.querySelector<HTMLTableElement>("table") ?? null;
}

function penaltyIcon(type: string) {
  if (type === "plus") {
    return '<span class="loan-interest-member-icon">+</span>';
  }

  return `
    <span
      class="loan-interest-member-icon loan-interest-member-eye"
      aria-label="Lihat detail denda"
      title="Lihat detail denda"
    ></span>
  `;
}

function buildTableMarkup() {
  const body = rows
    .map(
      ([date, total, principal, interest, remainingPrincipal, remainingInterest, penalty, action]) => `
        <tr>
          <td class="loan-interest-member-date">${date}</td>
          <td>${total}</td>
          <td>${principal}</td>
          <td>${interest}</td>
          <td>${remainingPrincipal}</td>
          <td>${remainingInterest}</td>
          <td class="loan-interest-member-penalty">
            <span>${penalty}</span>
            ${penaltyIcon(action)}
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <table class="${TABLE_CLASS}">
      <colgroup>
        <col class="col-date" />
        <col class="col-total" />
        <col class="col-principal" />
        <col class="col-interest" />
        <col class="col-remaining-principal" />
        <col class="col-remaining-interest" />
        <col class="col-penalty" />
      </colgroup>
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

  const table = findSimulationTable(wizard);
  if (!table) return;

  const replacement = document.createElement("div");
  replacement.innerHTML = buildTableMarkup().trim();
  const nextTable = replacement.firstElementChild;

  if (nextTable) {
    table.replaceWith(nextTable);
  }
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
          min-width: 980px !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
          background: #fff !important;
          color: #0f172a !important;
          font-size: 12px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .col-date {
          width: 112px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .col-total {
          width: 156px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .col-principal,
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .col-interest {
          width: 128px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .col-remaining-principal,
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .col-remaining-interest {
          width: 148px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .col-penalty {
          width: 140px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th {
          height: 72px !important;
          padding: 10px 8px !important;
          border-bottom: 1px solid #cbd5e1 !important;
          background: #fff !important;
          color: #334155 !important;
          font-size: 10px !important;
          font-weight: 800 !important;
          line-height: 1.2 !important;
          text-align: right !important;
          vertical-align: middle !important;
          white-space: normal !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} th:first-child,
        [data-loan-interest-wizard="true"] .${TABLE_CLASS} td:first-child {
          text-align: left !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} td {
          height: 48px !important;
          padding: 12px 8px !important;
          border-top: 1px solid #e2e8f0 !important;
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
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-penalty {
          padding-right: 8px !important;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-penalty > span:first-child {
          display: inline-block;
          min-width: 66px;
          text-align: right;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-icon {
          display: inline-flex;
          width: 20px;
          height: 20px;
          margin-left: 6px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #2563eb;
          color: #fff;
          font-size: 17px;
          font-weight: 500;
          line-height: 1;
          vertical-align: middle;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-eye {
          position: relative;
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-eye::before {
          content: "";
          width: 11px;
          height: 7px;
          border: 1.5px solid #fff;
          border-radius: 70% 20%;
          transform: rotate(45deg);
        }

        [data-loan-interest-wizard="true"] .${TABLE_CLASS} .loan-interest-member-eye::after {
          content: "";
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: #fff;
        }

        @media (max-width: 640px) {
          [data-loan-interest-wizard="true"] .${TABLE_CLASS} {
            min-width: 980px !important;
          }
        }
      `}
    </style>
  );
}