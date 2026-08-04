"use client";

import * as React from "react";
import {
  getLoanInterestAdjustmentHistory,
  LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
  type LoanInterestAdjustmentHistoryEntry,
} from "@/lib/loanInterestAdjustmentHistoryStore";

const ADJUSTMENT_MARKER_CLASS = "billing-interest-adjustment-marker";
const MARKED_CELL_CLASS = "has-billing-interest-adjustment";

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
    `Penyesuaian bunga angsuran ke-${entry.installmentNo}`,
    `Jenis: ${entry.adjustmentType}`,
    `Nominal: ${entry.adjustmentAmount}`,
    `Bunga sebelum: ${entry.interestBefore}`,
    `Bunga sesudah: ${entry.interestAfter}`,
    `Alasan: ${entry.reason}`,
  ].join("\n");
}

function findDateElements(dueDate: string) {
  return Array.from(document.querySelectorAll<HTMLElement>("td, div")).filter(
    (element) => {
      if (element.children.length > 0 || !element.closest("table")) return false;
      return element.textContent?.trim() === dueDate;
    },
  );
}

function addMarker(
  element: HTMLElement,
  entry: LoanInterestAdjustmentHistoryEntry,
) {
  if (element.querySelector(`.${ADJUSTMENT_MARKER_CLASS}`)) return;

  element.classList.add(MARKED_CELL_CLASS);

  const marker = document.createElement("span");
  marker.className = ADJUSTMENT_MARKER_CLASS;
  marker.setAttribute("role", "img");
  marker.setAttribute("aria-label", adjustmentTitle(entry));

  const icon = document.createElement("span");
  icon.className = `${ADJUSTMENT_MARKER_CLASS}-icon`;
  icon.textContent = "i";

  const tooltip = document.createElement("span");
  tooltip.className = `${ADJUSTMENT_MARKER_CLASS}-tooltip`;
  tooltip.innerHTML = `
    <strong>Penyesuaian Nominal Bunga</strong>
    <span>Angsuran ke-${entry.installmentNo}</span>
    <span>Jenis: ${entry.adjustmentType}</span>
    <span>Nominal: ${entry.adjustmentAmount}</span>
    <span>Bunga sebelum: ${entry.interestBefore}</span>
    <span>Bunga sesudah: ${entry.interestAfter}</span>
    <span>Alasan: ${entry.reason}</span>
  `;

  marker.append(icon, tooltip);
  element.appendChild(marker);
}

function syncMarkers(accountNo: string) {
  document.querySelectorAll(`.${ADJUSTMENT_MARKER_CLASS}`).forEach((marker) => {
    marker.remove();
  });

  document.querySelectorAll(`.${MARKED_CELL_CLASS}`).forEach((cell) => {
    cell.classList.remove(MARKED_CELL_CLASS);
  });

  getLoanInterestAdjustmentHistory(accountNo).forEach((entry) => {
    const dueDate = dueDatesByInstallment[entry.installmentNo - 1];
    if (!dueDate) return;

    const target = findDateElements(dueDate)[0];
    if (target) addMarker(target, entry);
  });
}

function isMarkerOnlyMutation(mutations: MutationRecord[]) {
  return mutations.every((mutation) => {
    const changedNodes = [
      ...Array.from(mutation.addedNodes),
      ...Array.from(mutation.removedNodes),
    ];

    return (
      changedNodes.length > 0 &&
      changedNodes.every(
        (node) =>
          node instanceof HTMLElement &&
          node.classList.contains(ADJUSTMENT_MARKER_CLASS),
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
      syncTimer = window.setTimeout(() => syncMarkers(accountNo), 50);
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

    return () => {
      window.clearTimeout(syncTimer);
      observer.disconnect();
      window.removeEventListener(
        LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
        scheduleSync,
      );
      window.removeEventListener("storage", scheduleSync);
    };
  }, [accountNo]);

  return (
    <style>
      {`
        .has-billing-interest-adjustment {
          position: relative !important;
        }

        .billing-interest-adjustment-marker {
          position: relative;
          display: inline-flex;
          margin-left: 7px;
          vertical-align: middle;
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

        .billing-interest-adjustment-marker-tooltip {
          position: absolute;
          z-index: 100;
          bottom: calc(100% + 9px);
          left: 50%;
          display: grid;
          width: 250px;
          gap: 4px;
          transform: translateX(-50%) translateY(4px);
          border: 1px solid #dbe3ef;
          border-radius: 10px;
          background: #ffffff;
          padding: 10px 12px;
          color: #1e293b;
          font-size: 11px;
          font-weight: 400;
          line-height: 1.35;
          text-align: left;
          opacity: 0;
          pointer-events: none;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.16);
          transition: opacity 150ms ease, transform 150ms ease;
        }

        .billing-interest-adjustment-marker-tooltip strong {
          margin-bottom: 2px;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
        }

        .billing-interest-adjustment-marker:hover
          .billing-interest-adjustment-marker-tooltip {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      `}
    </style>
  );
}