"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const SUMMARY_ROW_ATTRIBUTE = "data-total-interest-summary-row";
const SUMMARY_TITLE = "Ringkasan Perpanjangan Pinjaman";
const CURRENT_TOTAL_INTEREST = 1_440_000;

function parseAmount(value: string) {
  const normalized = (value ?? "").replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatAmount(value: number) {
  return Math.max(0, Math.round(value)).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function findSummaryTable(wizard: HTMLElement) {
  const titleElement = Array.from(
    wizard.querySelectorAll<HTMLElement>("div, h2, h3"),
  ).find((element) => element.textContent?.trim() === SUMMARY_TITLE);

  if (!titleElement) return null;

  let current: HTMLElement | null = titleElement.parentElement;

  while (current && current !== wizard.parentElement) {
    const table = current.querySelector<HTMLTableElement>("table");

    if (table) return table;

    current = current.parentElement;
  }

  return null;
}

function findScheduleTable(wizard: HTMLElement) {
  return wizard.querySelector<HTMLTableElement>(
    "table.min-w-\\[750px\\]",
  );
}

function getSimulatedTotalInterest(wizard: HTMLElement) {
  const scheduleTable = findScheduleTable(wizard);
  if (!scheduleTable) return CURRENT_TOTAL_INTEREST;

  const interestCells = Array.from(
    scheduleTable.querySelectorAll<HTMLTableCellElement>(
      "tbody tr td:nth-child(4)",
    ),
  );

  const total = interestCells.reduce(
    (sum, cell) => sum + parseAmount(cell.textContent ?? ""),
    0,
  );

  return total > 0 ? total : CURRENT_TOTAL_INTEREST;
}

function createInterestSummaryRow(wizard: HTMLElement) {
  const row = document.createElement("tr");
  row.setAttribute(SUMMARY_ROW_ATTRIBUTE, "true");
  row.className = "border-b border-slate-100 bg-white text-[12px] text-black";

  const labelCell = document.createElement("td");
  labelCell.className = "px-4 py-3 font-medium";
  labelCell.textContent = "Total Nominal Bunga Pinjaman";

  const beforeCell = document.createElement("td");
  beforeCell.className = "px-4 py-3";
  beforeCell.textContent = formatAmount(CURRENT_TOTAL_INTEREST);

  const afterCell = document.createElement("td");
  afterCell.className = "px-4 py-3 font-semibold text-[#2563EB]";
  afterCell.textContent = formatAmount(getSimulatedTotalInterest(wizard));

  row.append(labelCell, beforeCell, afterCell);
  return row;
}

function syncInterestSummary() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard || wizard.dataset.loanExtensionStep !== "2") return;

  const summaryTable = findSummaryTable(wizard);
  const tbody = summaryTable?.querySelector("tbody");
  if (!tbody) return;

  tbody
    .querySelector<HTMLTableRowElement>(
      `[${SUMMARY_ROW_ATTRIBUTE}="true"]`,
    )
    ?.remove();

  const interestRow = createInterestSummaryRow(wizard);
  const tenorRow = Array.from(
    tbody.querySelectorAll<HTMLTableRowElement>("tr"),
  ).find((row) => {
    const firstCell = row.querySelector("td");
    return firstCell?.textContent?.trim() === "Tenor";
  });

  if (tenorRow) {
    tenorRow.insertAdjacentElement("afterend", interestRow);
  } else {
    tbody.appendChild(interestRow);
  }
}

export default function LoanExtensionInterestSummarySync() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncInterestSummary);
    };

    const observer = new MutationObserver(scheduleSync);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return null;
}