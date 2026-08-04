"use client";

import * as React from "react";
import {
  getLoanInterestAdjustmentHistory,
  LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
  type LoanInterestAdjustmentHistoryEntry,
} from "@/lib/loanInterestAdjustmentHistoryStore";

const ADJUSTMENT_MARKER_CLASS = "billing-interest-adjustment-marker";
const MARKED_CELL_CLASS = "has-billing-interest-adjustment";
const PORTAL_TOOLTIP_CLASS = "billing-interest-adjustment-portal-tooltip";

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

function adjustmentTitle(entry: LoanInterestAdjustmentHistoryEntry) {
  return [
    `Metode Penyesuaian: ${entry.adjustmentType}`,
    `Nominal Bunga Sebelum Penyesuaian: ${entry.interestBefore}`,
    `Nominal Penyesuaian: ${entry.adjustmentAmount}`,
    `Nominal Bunga Setelah Penyesuaian: ${entry.interestAfter}`,
    `Alasan Penyesuaian: ${entry.reason}`,
    "Disesuaikan Oleh: Arya Dharma",
  ].join("\n");
}

function createTooltipContent(entry: LoanInterestAdjustmentHistoryEntry) {
  return `
    <strong>Penyesuaian Nominal Bunga</strong>
    <span><b>Metode Penyesuaian:</b> ${entry.adjustmentType}</span>
    <span><b>Nominal Bunga Sebelum Penyesuaian:</b> ${entry.interestBefore}</span>
    <span><b>Nominal Penyesuaian:</b> ${entry.adjustmentAmount}</span>
    <span><b>Nominal Bunga Setelah Penyesuaian:</b> ${entry.interestAfter}</span>
    <span><b>Alasan Penyesuaian:</b> ${entry.reason}</span>
    <span><b>Disesuaikan Oleh:</b> Arya Dharma</span>
  `;
}

function removePortalTooltip() {
  document.querySelector(`.${PORTAL_TOOLTIP_CLASS}`)?.remove();
}

function showPortalTooltip(
  icon: HTMLElement,
  entry: LoanInterestAdjustmentHistoryEntry,
) {
  removePortalTooltip();

  const tooltip = document.createElement("div");
  tooltip.className = PORTAL_TOOLTIP_CLASS;
  tooltip.innerHTML = createTooltipContent(entry);
  document.body.appendChild(tooltip);

  const iconRect = icon.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const pagePadding = 12;
  const preferredLeft = iconRect.left + iconRect.width / 2 - tooltipRect.width / 2;
  const left = Math.min(
    Math.max(pagePadding, preferredLeft),
    window.innerWidth - tooltipRect.width - pagePadding,
  );
  const hasSpaceAbove = iconRect.top > tooltipRect.height + pagePadding + 10;
  const top = hasSpaceAbove
    ? iconRect.top - tooltipRect.height - 10
    : iconRect.bottom + 10;

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.dataset.visible = "true";
}

function findBillingGrid(dueDate: string) {
  const candidates = Array.from(document.querySelectorAll<HTMLElement>("div"));

  return candidates.find((element) => {
    const className =
      typeof element.className === "string" ? element.className : "";

    if (!className.includes("grid") || !className.includes("items-center")) {
      return false;
    }

    const cells = Array.from(element.children) as HTMLElement[];

    return (
      cells.length >= 6 &&
      cells.some((cell) => cell.textContent?.trim() === dueDate)
    );
  });
}

function findInterestCell(dueDate: string) {
  const billingGrid = findBillingGrid(dueDate);

  if (billingGrid) {
    const cells = Array.from(billingGrid.children) as HTMLElement[];
    const dateCellIndex = cells.findIndex(
      (cell) => cell.textContent?.trim() === dueDate,
    );

    if (dateCellIndex >= 0) {
      return cells[dateCellIndex + 3] ?? null;
    }
  }

  const tableDateCell = Array.from(
    document.querySelectorAll<HTMLTableCellElement>("td"),
  ).find((cell) => cell.textContent?.trim() === dueDate);

  if (!tableDateCell) return null;

  const row = tableDateCell.closest("tr");
  if (!row) return null;

  const cells = Array.from(row.children) as HTMLElement[];
  const dateCellIndex = cells.indexOf(tableDateCell);

  return dateCellIndex >= 0 ? cells[dateCellIndex + 3] ?? null : null;
}

function addMarker(
  interestCell: HTMLElement,
  entry: LoanInterestAdjustmentHistoryEntry,
) {
  if (interestCell.querySelector(`.${ADJUSTMENT_MARKER_CLASS}`)) return;

  interestCell.classList.add(MARKED_CELL_CLASS);

  const marker = document.createElement("span");
  marker.className = ADJUSTMENT_MARKER_CLASS;
  marker.setAttribute("role", "img");
  marker.setAttribute("aria-label", adjustmentTitle(entry));

  const icon = document.createElement("span");
  icon.className = `${ADJUSTMENT_MARKER_CLASS}-icon`;
  icon.textContent = "i";

  marker.addEventListener("mouseenter", () => showPortalTooltip(icon, entry));
  marker.addEventListener("mouseleave", removePortalTooltip);
  marker.addEventListener("focus", () => showPortalTooltip(icon, entry));
  marker.addEventListener("blur", removePortalTooltip);

  marker.appendChild(icon);
  interestCell.appendChild(marker);
}

function clearMarkers() {
  removePortalTooltip();

  document.querySelectorAll(`.${ADJUSTMENT_MARKER_CLASS}`).forEach((marker) => {
    marker.remove();
  });

  document.querySelectorAll(`.${MARKED_CELL_CLASS}`).forEach((cell) => {
    cell.classList.remove(MARKED_CELL_CLASS);
  });
}

function syncMarkers(accountNo: string) {
  clearMarkers();

  getLoanInterestAdjustmentHistory(accountNo).forEach((entry) => {
    const dueDate = dueDatesByInstallment[entry.installmentNo - 1];
    if (!dueDate) return;

    const interestCell = findInterestCell(dueDate);

    if (interestCell) {
      addMarker(interestCell, entry);
    }
  });
}

function isMarkerOnlyMutation(mutations: MutationRecord[]) {
  return mutations.every((mutation) => {
    const nodes = [
      ...Array.from(mutation.addedNodes),
      ...Array.from(mutation.removedNodes),
    ];

    return (
      nodes.length > 0 &&
      nodes.every(
        (node) =>
          node instanceof HTMLElement &&
          (node.classList.contains(ADJUSTMENT_MARKER_CLASS) ||
            node.closest(`.${ADJUSTMENT_MARKER_CLASS}`)),
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
    let syncTimer = 0;

    const scheduleSync = () => {
      window.clearTimeout(syncTimer);
      syncTimer = window.setTimeout(() => syncMarkers(accountNo), 80);
    };

    const observer = new MutationObserver((mutations) => {
      if (isMarkerOnlyMutation(mutations)) return;
      scheduleSync();
    });

    syncMarkers(accountNo);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener(LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT, scheduleSync);
    window.addEventListener("storage", scheduleSync);
    window.addEventListener("scroll", removePortalTooltip, true);
    window.addEventListener("resize", removePortalTooltip);

    return () => {
      window.clearTimeout(syncTimer);
      observer.disconnect();
      clearMarkers();
      window.removeEventListener(
        LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
        scheduleSync,
      );
      window.removeEventListener("storage", scheduleSync);
      window.removeEventListener("scroll", removePortalTooltip, true);
      window.removeEventListener("resize", removePortalTooltip);
    };
  }, [accountNo]);

  return (
    <style>
      {`
        .has-billing-interest-adjustment {
          position: relative !important;
        }

        .billing-interest-adjustment-marker {
          position: absolute;
          right: -12px;
          top: 50%;
          z-index: 20;
          display: inline-flex;
          transform: translateY(-50%);
          cursor: help;
        }

        .billing-interest-adjustment-marker-icon {
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

        .${PORTAL_TOOLTIP_CLASS} {
          position: fixed;
          z-index: 9999;
          display: grid;
          width: min(320px, calc(100vw - 24px));
          gap: 7px;
          border: 1px solid #dbe3ef;
          border-radius: 10px;
          background: #ffffff;
          padding: 12px;
          color: #1e293b;
          font-size: 11px;
          font-weight: 400;
          line-height: 1.4;
          text-align: left;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.16);
          transition: opacity 120ms ease;
        }

        .${PORTAL_TOOLTIP_CLASS}[data-visible="true"] {
          opacity: 1;
        }

        .${PORTAL_TOOLTIP_CLASS} strong {
          margin-bottom: 3px;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
        }

        .${PORTAL_TOOLTIP_CLASS} b {
          color: #0f172a;
          font-weight: 700;
        }
      `}
    </style>
  );
}