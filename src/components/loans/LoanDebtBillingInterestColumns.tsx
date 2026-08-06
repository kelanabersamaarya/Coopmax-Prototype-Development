"use client";

import * as React from "react";

const WIZARD_SELECTOR =
  '[data-loan-debt-wizard="true"][data-loan-debt-step="1"]';
const TABLE_SELECTOR = ".loan-debt-billing-preview table";
const ADJUSTED_CELL_ATTRIBUTE = "data-adjusted-interest-cell";
const CURRENT_HEADER = "Tagihan Bunga Saat Ini";
const ADJUSTED_HEADER = "Tagihan Bunga Sesudah Penyesuaian";

function plainCellText(cell: HTMLTableCellElement) {
  return (cell.textContent ?? "").replace(/\s+/g, " ").trim();
}

function createCell(value: string) {
  const cell = document.createElement("td");
  cell.setAttribute(ADJUSTED_CELL_ATTRIBUTE, "true");
  cell.className =
    "px-4 py-3 text-right font-normal tabular-nums whitespace-nowrap text-slate-900";
  cell.textContent = value;
  return cell;
}

function syncTable(table: HTMLTableElement) {
  const headerRow = table.tHead?.rows[0];
  if (!headerRow) return;

  const headerCells = Array.from(headerRow.cells);
  const interestHeader = headerCells[4];
  if (!interestHeader) return;

  interestHeader.textContent = CURRENT_HEADER;
  interestHeader.className =
    "w-[165px] px-4 py-3 text-right font-extrabold uppercase tracking-wide text-slate-700";

  let adjustedHeader = headerRow.querySelector< HTMLTableCellElement>(
    `th[${ADJUSTED_CELL_ATTRIBUTE}]`,
  );

  if (!adjustedHeader) {
    adjustedHeader = document.createElement("th");
    adjustedHeader.setAttribute(ADJUSTED_CELL_ATTRIBUTE, "true");
    adjustedHeader.className =
      "w-[175px] px-4 py-3 text-right font-extrabold uppercase tracking-wide text-slate-700";
    adjustedHeader.textContent = ADJUSTED_HEADER;
    interestHeader.insertAdjacentElement("afterend", adjustedHeader);
  } else {
    adjustedHeader.textContent = ADJUSTED_HEADER;
  }

  Array.from(table.tBodies).forEach((tbody) => {
    Array.from(tbody.rows).forEach((row) => {
      if (row.querySelector("td[colspan]")) return;

      const currentInterestCell = row.cells[4];
      if (!currentInterestCell) return;

      const existingAdjustedCell = row.querySelector<HTMLTableCellElement>(
        `td[${ADJUSTED_CELL_ATTRIBUTE}]`,
      );
      const currentValue = plainCellText(currentInterestCell);

      if (!existingAdjustedCell) {
        currentInterestCell.insertAdjacentElement(
          "afterend",
          createCell(currentValue),
        );
      } else {
        existingAdjustedCell.textContent = currentValue;
      }
    });
  });
}

export default function LoanDebtBillingInterestColumns() {
  React.useEffect(() => {
    let frameId = 0;

    function sync() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const wizard = document.querySelector(WIZARD_SELECTOR);
        const table = wizard?.querySelector<HTMLTableElement>(TABLE_SELECTOR);

        if (table) syncTable(table);
      });
    }

    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    sync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return null;
}