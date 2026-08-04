"use client";

import * as React from "react";
import {
  getLoanInterestAdjustmentHistory,
  LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
  type LoanInterestAdjustmentHistoryEntry,
} from "@/lib/loanInterestAdjustmentHistoryStore";

const markerClass = "billing-interest-adjustment-marker";
const markedCellClass = "has-billing-interest-adjustment";
const tooltipClass = "billing-interest-adjustment-tooltip";

const dueDatesByInstallment = [
  "25-01-2026",
  "25-01-2026",
  "25-02-2026",
  "25-03-2026",
  "25-04-2026",
  "25-05-2026",
  "25-06-2026",
  "25-07-2026",
  "25-08-2026",
  "25-09-2026",
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

function getMethodLabel(type: string) {
  if (type === "Penambahan Bunga") return "Penambahan Bunga";
  if (type === "Pengurangan Bunga") return "Pengurangan Bunga";
  if (type === "Pembebasan Seluruh Bunga") return "Pembebasan Seluruh Bunga";
  return type || "Penyesuaian Bunga";
}

function getTooltipContent(entry: LoanInterestAdjustmentHistoryEntry) {
  const row = (label: string, value: string) => `
    <div class="billing-interest-tooltip-row">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;

  return `
    <div class="billing-interest-tooltip-title">Penyesuaian Bunga</div>
    ${row("Metode", getMethodLabel(entry.adjustmentType))}
    ${row("Nominal", entry.adjustmentAmount || "0,00")}
    ${row("Alasan", entry.reason || "-")}
    ${row("Disesuaikan oleh", "Arya Dharma")}
  `;
}

function removeTooltip() {
  document.querySelector(`.${tooltipClass}`)?.remove();
}

function showTooltip(
  anchor: HTMLElement,
  entry: LoanInterestAdjustmentHistoryEntry,
) {
  removeTooltip();

  const tooltip = document.createElement("aside");
  tooltip.className = tooltipClass;
  tooltip.innerHTML = getTooltipContent(entry);
  document.body.appendChild(tooltip);

  const anchorRect = anchor.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const padding = 12;

  const left = Math.min(
    Math.max(
      padding,
      anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2,
    ),
    window.innerWidth - tooltipRect.width - padding,
  );

  const showAbove = anchorRect.top > tooltipRect.height + padding + 8;

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${
    showAbove ? anchorRect.top - tooltipRect.height - 8 : anchorRect.bottom + 8
  }px`;
  tooltip.dataset.visible = "true";
}

function findInterestCell(dueDate: string) {
  const billingGrid = Array.from(document.querySelectorAll<HTMLElement>("div")).find(
    (element) => {
      const className =
        typeof element.className === "string" ? element.className : "";

      return (
        className.includes("grid") &&
        className.includes("items-center") &&
        Array.from(element.children).some(
          (child) => child.textContent?.trim() === dueDate,
        )
      );
    },
  );

  if (billingGrid) {
    const cells = Array.from(billingGrid.children) as HTMLElement[];
    const dateIndex = cells.findIndex(
      (cell) => cell.textContent?.trim() === dueDate,
    );

    return dateIndex >= 0 ? cells[dateIndex + 3] ?? null : null;
  }

  const dateCell = Array.from(document.querySelectorAll<HTMLTableCellElement>("td")).find(
    (cell) => cell.textContent?.trim() === dueDate,
  );

  if (!dateCell) return null;

  const cells = Array.from(dateCell.closest("tr")?.children ?? []) as HTMLElement[];
  const dateIndex = cells.indexOf(dateCell);

  return dateIndex >= 0 ? cells[dateIndex + 3] ?? null : null;
}

function clearMarkers() {
  removeTooltip();

  document.querySelectorAll(`.${markerClass}`).forEach((marker) => marker.remove());

  document
    .querySelectorAll(`.${markedCellClass}`)
    .forEach((cell) => cell.classList.remove(markedCellClass));
}

function syncMarkers(accountNo: string) {
  clearMarkers();

  getLoanInterestAdjustmentHistory(accountNo).forEach((entry) => {
    const dueDate = dueDatesByInstallment[entry.installmentNo - 1];
    if (!dueDate) return;

    const interestCell = findInterestCell(dueDate);
    if (!interestCell || interestCell.querySelector(`.${markerClass}`)) return;

    interestCell.classList.add(markedCellClass);

    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = markerClass;
    marker.setAttribute("aria-label", "Lihat detail penyesuaian bunga");

    marker.innerHTML = '<span aria-hidden="true">i</span>';

    marker.addEventListener("mouseenter", () => showTooltip(marker, entry));
    marker.addEventListener("mouseleave", removeTooltip);
    marker.addEventListener("focus", () => showTooltip(marker, entry));
    marker.addEventListener("blur", removeTooltip);
    marker.addEventListener("click", () => showTooltip(marker, entry));

    interestCell.appendChild(marker);
  });
}

export default function InterestAdjustmentBillingMarkers({
  accountNo = "SMG260004",
}: {
  accountNo?: string;
}) {
  React.useEffect(() => {
    let timeoutId = 0;

    const scheduleSync = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => syncMarkers(accountNo), 80);
    };

    const observer = new MutationObserver(scheduleSync);

    syncMarkers(accountNo);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener(
      LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
      scheduleSync,
    );
    window.addEventListener("storage", scheduleSync);
    window.addEventListener("scroll", removeTooltip, true);
    window.addEventListener("resize", removeTooltip);

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      clearMarkers();
      window.removeEventListener(
        LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
        scheduleSync,
      );
      window.removeEventListener("storage", scheduleSync);
      window.removeEventListener("scroll", removeTooltip, true);
      window.removeEventListener("resize", removeTooltip);
    };
  }, [accountNo]);

  return (
    <style>
      {`
        .${markedCellClass} {
          position: relative !important;
        }

        .${markerClass} {
          position: absolute;
          top: 50%;
          right: -12px;
          z-index: 20;
          display: inline-flex;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          padding: 0;
          cursor: help;
        }

        .${markerClass} > span {
          display: grid;
          height: 18px;
          width: 18px;
          place-items: center;
          border-radius: 999px;
          background: #2563eb;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          line-height: 1;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.14);
        }

        .${tooltipClass} {
          position: fixed;
          z-index: 9999;
          width: min(300px, calc(100vw - 24px));
          border: 1px solid #dbe3ef;
          border-radius: 10px;
          background: #ffffff;
          padding: 14px;
          color: #1e293b;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.16);
          transition: opacity 120ms ease;
        }

        .${tooltipClass}[data-visible="true"] {
          opacity: 1;
        }

        .${tooltipClass} .billing-interest-tooltip-title {
          margin-bottom: 12px;
          color: #1d4ed8;
          font-size: 13px;
          font-weight: 800;
        }

        .${tooltipClass} .billing-interest-tooltip-row {
          display: grid;
          gap: 3px;
          margin-top: 10px;
        }

        .${tooltipClass} .billing-interest-tooltip-row span {
          color: #64748b;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.35;
        }

        .${tooltipClass} .billing-interest-tooltip-row strong {
          color: #0f172a;
          font-size: 12px;
          font-weight: 800;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }
      `}
    </style>
  );
}