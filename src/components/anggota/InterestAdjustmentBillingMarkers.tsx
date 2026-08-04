"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  getLoanInterestAdjustmentHistory,
  LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
  type LoanInterestAdjustmentHistoryEntry,
} from "@/lib/loanInterestAdjustmentHistoryStore";

const markerClass = "billing-interest-adjustment-marker";
const markedCellClass = "has-billing-interest-adjustment";

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

type TooltipState = {
  entry: LoanInterestAdjustmentHistoryEntry;
  rect: DOMRect;
};

function getMethodLabel(type: string) {
  if (type === "Penambahan Bunga") return "Penambahan Bunga";
  if (type === "Pengurangan Bunga") return "Pengurangan Bunga";
  if (type === "Pembebasan Seluruh Bunga") return "Pembebasan Seluruh Bunga";
  return type || "Penyesuaian Bunga";
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

  const dateCell = Array.from(
    document.querySelectorAll<HTMLTableCellElement>("td"),
  ).find((cell) => cell.textContent?.trim() === dueDate);

  if (!dateCell) return null;

  const cells = Array.from(dateCell.closest("tr")?.children ?? []) as HTMLElement[];
  const dateIndex = cells.indexOf(dateCell);

  return dateIndex >= 0 ? cells[dateIndex + 3] ?? null : null;
}

function clearMarkers() {
  document.querySelectorAll(`.${markerClass}`).forEach((marker) => marker.remove());

  document
    .querySelectorAll(`.${markedCellClass}`)
    .forEach((cell) => cell.classList.remove(markedCellClass));
}

function isMarkerNode(node: Node) {
  if (!(node instanceof HTMLElement)) return true;

  return (
    node.classList.contains(markerClass) ||
    Boolean(node.closest(`.${markerClass}`))
  );
}

function onlyMarkerMutations(mutations: MutationRecord[]) {
  return mutations.every((mutation) => {
    const nodes = [
      ...Array.from(mutation.addedNodes),
      ...Array.from(mutation.removedNodes),
    ];

    return nodes.length > 0 && nodes.every(isMarkerNode);
  });
}

function TooltipRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-1">
      <div className="text-[11px] font-semibold leading-tight text-slate-500">
        {label}
      </div>
      <div className="text-[12px] font-extrabold leading-tight text-slate-900">
        {value || "0,00"}
      </div>
    </div>
  );
}

function AdjustmentTooltip({ state }: { state: TooltipState }) {
  const width = 320;
  const padding = 12;
  const left = Math.min(
    Math.max(
      padding,
      state.rect.left + state.rect.width / 2 - width / 2,
    ),
    window.innerWidth - width - padding,
  );
  const top =
    state.rect.top > 250
      ? state.rect.top - 230
      : state.rect.bottom + 8;

  return createPortal(
    <aside
      className="fixed z-[9999] w-[320px] rounded-[10px] border border-slate-200 bg-white p-4 text-left shadow-xl"
      style={{ left, top }}
      role="tooltip"
    >
      <div className="mb-3 text-[13px] font-extrabold text-black">
        Info Penyesuaian Bunga
      </div>

      <div className="grid gap-3">
        <TooltipRow
          label="Metode Penyesuaian"
          value={getMethodLabel(state.entry.adjustmentType)}
        />
        <TooltipRow
          label="Nominal Sebelum Penyesuaian"
          value={state.entry.interestBefore}
        />
        <TooltipRow
          label="Nominal Penyesuaian"
          value={state.entry.adjustmentAmount}
        />
        <TooltipRow
          label="Nominal Setelah Penyesuaian"
          value={state.entry.interestAfter}
        />
        <TooltipRow label="Disesuaikan oleh" value="Arya Dharma" />
      </div>
    </aside>,
    document.body,
  );
}

export default function InterestAdjustmentBillingMarkers({
  accountNo = "SMG260004",
}: {
  accountNo?: string;
}) {
  const [tooltip, setTooltip] = React.useState<TooltipState | null>(null);

  React.useEffect(() => {
    let timeoutId = 0;

    const clearTooltip = () => setTooltip(null);

    const syncMarkers = () => {
      clearMarkers();
      clearTooltip();

      getLoanInterestAdjustmentHistory(accountNo).forEach((entry) => {
        const dueDate = dueDatesByInstallment[entry.installmentNo - 1];
        if (!dueDate) return;

        const interestCell = findInterestCell(dueDate);
        if (!interestCell || interestCell.querySelector(`.${markerClass}`)) {
          return;
        }

        interestCell.classList.add(markedCellClass);

        const marker = document.createElement("button");
        marker.type = "button";
        marker.className = markerClass;
        marker.setAttribute("aria-label", "Lihat detail penyesuaian bunga");
        marker.innerHTML = '<span aria-hidden="true">i</span>';

        const openTooltip = () => {
          setTooltip({
            entry,
            rect: marker.getBoundingClientRect(),
          });
        };

        marker.addEventListener("mouseenter", openTooltip);
        marker.addEventListener("mouseleave", clearTooltip);
        marker.addEventListener("focus", openTooltip);
        marker.addEventListener("blur", clearTooltip);
        marker.addEventListener("click", openTooltip);

        interestCell.appendChild(marker);
      });
    };

    const scheduleSync = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(syncMarkers, 80);
    };

    const observer = new MutationObserver((mutations) => {
      if (onlyMarkerMutations(mutations)) return;
      scheduleSync();
    });

    syncMarkers();

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener(
      LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
      scheduleSync,
    );
    window.addEventListener("storage", scheduleSync);
    window.addEventListener("scroll", clearTooltip, true);
    window.addEventListener("resize", clearTooltip);

    return () => {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      clearMarkers();
      window.removeEventListener(
        LOAN_INTEREST_ADJUSTMENT_HISTORY_EVENT,
        scheduleSync,
      );
      window.removeEventListener("storage", scheduleSync);
      window.removeEventListener("scroll", clearTooltip, true);
      window.removeEventListener("resize", clearTooltip);
    };
  }, [accountNo]);

  return (
    <>
      {tooltip ? <AdjustmentTooltip state={tooltip} /> : null}

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
        `}
      </style>
    </>
  );
}