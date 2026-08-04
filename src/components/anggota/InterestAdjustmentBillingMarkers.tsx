"use client";

import * as React from "react";
import {
  getLoanInterestAdjustmentHistory,
  LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
  type LoanInterestAdjustmentHistoryEntry,
} from "@/lib/loanInterestAdjustmentHistoryStore";

const markerClass = "billing-interest-adjustment-marker";
const markedCellClass = "has-billing-interest-adjustment";
const tooltipClass = "billing-interest-adjustment-portal-tooltip";

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

function getAdjustmentMethodLabel(
  type: LoanInterestAdjustmentHistoryEntry["adjustmentType"],
) {
  if (type === "Penambahan Bunga") return "Penambahan Bunga Pinjaman";
  if (type === "Pengurangan Bunga") return "Pengurangan Bunga Pinjaman";
  if (type === "Pembebasan Seluruh Bunga") {
    return "Pembebasan Bunga Pinjaman";
  }

  return type || "Penyesuaian Bunga Pinjaman";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

function tooltipRow(label: string, value: string) {
  return `
    <section class="billing-interest-adjustment-tooltip-row">
      <span class="billing-interest-adjustment-tooltip-label">${escapeHtml(label)}</span>
      <b class="billing-interest-adjustment-tooltip-value">${escapeHtml(value)}</b>
    </section>
  `;
}

function getTooltipContent(entry: LoanInterestAdjustmentHistoryEntry) {
  return `
    <header class="billing-interest-adjustment-tooltip-title">
      Penyesuaian Nominal Bunga
    </header>
    ${tooltipRow(
      "Metode Penyesuaian",
      getAdjustmentMethodLabel(entry.adjustmentType),
    )}
    ${tooltipRow("Nominal Penyesuaian", entry.adjustmentAmount || "0,00")}
    ${tooltipRow("Alasan Penyesuaian", entry.reason || "-")}
    ${tooltipRow("Disesuaikan Oleh", "Arya Dharma")}
    ${tooltipRow(
      "Nominal Bunga Setelah Penyesuaian",
      entry.interestAfter || "0,00",
    )}
  `;
}

function getAriaLabel(entry: LoanInterestAdjustmentHistoryEntry) {
  return [
    `Metode Penyesuaian: ${getAdjustmentMethodLabel(entry.adjustmentType)}`,
    `Nominal Penyesuaian: ${entry.adjustmentAmount || "0,00"}`,
    `Alasan Penyesuaian: ${entry.reason || "-"}`,
    "Disesuaikan Oleh: Arya Dharma",
    `Nominal Bunga Setelah Penyesuaian: ${entry.interestAfter || "0,00"}`,
  ].join("\n");
}

function removeTooltip() {
  document.querySelector(`.${tooltipClass}`)?.remove();
}

function showTooltip(
  icon: HTMLElement,
  entry: LoanInterestAdjustmentHistoryEntry,
) {
  removeTooltip();

  const tooltip = document.createElement("aside");
  tooltip.className = tooltipClass;
  tooltip.innerHTML = getTooltipContent(entry);
  document.body.appendChild(tooltip);

  const iconRect = icon.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const pagePadding = 12;
  const preferredLeft =
    iconRect.left + iconRect.width / 2 - tooltipRect.width / 2;
  const left = Math.min(
    Math.max(pagePadding, preferredLeft),
    window.innerWidth - tooltipRect.width - pagePadding,
  );
  const hasSpaceAbove = iconRect.top > tooltipRect.height + pagePadding + 10;

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${
    hasSpaceAbove ? iconRect.top - tooltipRect.height - 10 : iconRect.bottom + 10
  }px`;
  tooltip.dataset.visible = "true";
}

function findInterestCell(dueDate: string) {
  const grids = Array.from(document.querySelectorAll<HTMLElement>("div"));

  const billingGrid = grids.find((element) => {
    const className =
      typeof element.className === "string" ? element.className : "";

    return (
      className.includes("grid") &&
      className.includes("items-center") &&
      Array.from(element.children).some(
        (cell) => cell.textContent?.trim() === dueDate,
      )
    );
  });

  if (billingGrid) {
    const cells = Array.from(billingGrid.children) as HTMLElement[];
    const dateIndex = cells.findIndex(
      (cell) => cell.textContent?.trim() === dueDate,
    );

    return dateIndex >= 0 ? cells[dateIndex + 3] ?? null : null;
  }

  const dateCell = Array.from(
    document.querySelectorAll<HTMLTableCellElement>("td"),
  ).find((cell) => cell.textContent?.trim() === dueDate);

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
    marker.setAttribute("aria-label", getAriaLabel(entry));

    const icon = document.createElement("span");
    icon.className = `${markerClass}-icon`;
    icon.textContent = "i";

    marker.addEventListener("mouseenter", () => showTooltip(icon, entry));
    marker.addEventListener("mouseleave", removeTooltip);
    marker.addEventListener("focus", () => showTooltip(icon, entry));
    marker.addEventListener("blur", removeTooltip);
    marker.addEventListener("click", () => showTooltip(icon, entry));

    marker.appendChild(icon);
    interestCell.appendChild(marker);
  });
}

function isOwnMutation(mutations: MutationRecord[]) {
  return mutations.every((mutation) => {
    const nodes = [...mutation.addedNodes, ...mutation.removedNodes];

    return (
      nodes.length > 0 &&
      nodes.every(
        (node) =>
          node instanceof HTMLElement &&
          (node.matches(`.${markerClass}, .${tooltipClass}`) ||
            node.closest(`.${markerClass}, .${tooltipClass}`)),
      )
    );
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

    const observer = new MutationObserver((mutations) => {
      if (!isOwnMutation(mutations)) scheduleSync();
    });

    syncMarkers(accountNo);
    observer.observe(document.body, { childList: true, subtree: true });

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
          right: -12px;
          top: 50%;
          z-index: 20;
          display: inline-flex;
          transform: translateY(-50%);
          cursor: help;
          border: 0;
          background: transparent;
          padding: 0;
        }

        .${markerClass}-icon {
          display: inline-grid;
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
          width: min(320px, calc(100vw - 24px));
          box-sizing: border-box;
          border: 1px solid #dbe3ef;
          border-radius: 10px;
          background: #ffffff;
          padding: 14px;
          color: #1e293b;
          text-align: left;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.16);
          transition: opacity 120ms ease;
        }

        .${tooltipClass}[data-visible="true"] {
          opacity: 1;
        }

        .${tooltipClass} .billing-interest-adjustment-tooltip-title {
          display: block !important;
          margin: 0 0 12px !important;
          padding: 0 !important;
          color: #1d4ed8 !important;
          font-size: 13px !important;
          font-weight: 800 !important;
          line-height: 1.35 !important;
        }

        .${tooltipClass} .billing-interest-adjustment-tooltip-row {
          display: block !important;
          width: 100% !important;
          margin: 11px 0 0 !important;
          padding: 0 !important;
          overflow: visible !important;
        }

        .${tooltipClass} .billing-interest-adjustment-tooltip-label,
        .${tooltipClass} .billing-interest-adjustment-tooltip-value {
          display: block !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          white-space: normal !important;
          overflow-wrap: anywhere !important;
          word-break: break-word !important;
        }

        .${tooltipClass} .billing-interest-adjustment-tooltip-label {
          color: #64748b !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          line-height: 1.35 !important;
        }

        .${tooltipClass} .billing-interest-adjustment-tooltip-value {
          margin-top: 3px !important;
          color: #0f172a !important;
          font-size: 12px !important;
          font-weight: 800 !important;
          line-height: 1.45 !important;
        }
      `}
    </style>
  );
}