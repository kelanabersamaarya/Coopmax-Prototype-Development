"use client";

import * as React from "react";
import { createPortal } from "react";

const markerClass = "billing-interest-adjustment-marker";
const markedCellClass = "has-billing-interest-adjustment";

type TooltipState = {
  rect: DOMRect;
};

const staticAdjustmentInfo = {
  method: "Pengurangan Bunga",
  interestBefore: "83.333,00",
  adjustmentAmount: "25.000,00",
  interestAfter: "58.333,00",
  reason: "Penyesuaian bunga sesuai kebijakan koperasi.",
  adjustedBy: "Arya Dharma",
};

function findInterestCells() {
  const grids = Array.from(document.querySelectorAll<HTMLElement>("div")).filter(
    (element) => {
      const className =
        typeof element.className === "string" ? element.className : "";

      return (
        className.includes("grid") &&
        className.includes("items-center") &&
        Array.from(element.children).some((child) =>
          /^\d{2}-\d{2}-\d{4}$/.test(child.textContent?.trim() ?? ""),
        )
      );
    },
  );

  return grids
    .map((grid) => {
      const cells = Array.from(grid.children) as HTMLElement[];
      const dueDateCell = cells.find((cell) =>
        /^\d{2}-\d{2}-\d{4}$/.test(cell.textContent?.trim() ?? ""),
      );
      const dateIndex = dueDateCell ? cells.indexOf(dueDateCell) : -1;

      return {
        interestCell: dateIndex >= 0 ? cells[dateIndex + 3] ?? null : null,
      };
    })
    .filter(
      (item): item is { interestCell: HTMLElement } =>
        Boolean(item.interestCell),
    );
}

function clearMarkers() {
  document.querySelectorAll(`.${markerClass}`).forEach((marker) => marker.remove());

  document
    .querySelectorAll(`.${markedCellClass}`)
    .forEach((cell) => cell.classList.remove(markedCellClass));
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
        {value}
      </div>
    </div>
  );
}

function AdjustmentTooltip({ state }: { state: TooltipState }) {
  const width = 320;
  const padding = 12;
  const left = Math.min(
    Math.max(padding, state.rect.left + state.rect.width / 2 - width / 2),
    window.innerWidth - width - padding,
  );
  const top = state.rect.top > 250 ? state.rect.top - 215 : state.rect.bottom + 8;

  return createPortal(
    <aside
      data-interest-adjustment-tooltip="true"
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
          value={staticAdjustmentInfo.method}
        />
        <TooltipRow
          label="Nominal Bunga Sebelum Penyesuaian"
          value={staticAdjustmentInfo.interestBefore}
        />
        <TooltipRow
          label="Nominal Penyesuaian"
          value={staticAdjustmentInfo.adjustmentAmount}
        />
        <TooltipRow
          label="Nominal Bunga Setelah Penyesuaian"
          value={staticAdjustmentInfo.interestAfter}
        />
        <TooltipRow
          label="Alasan Penyesuaian"
          value={staticAdjustmentInfo.reason}
        />
        <TooltipRow
          label="Disesuaikan Oleh"
          value={staticAdjustmentInfo.adjustedBy}
        />
      </div>
    </aside>,
    document.body,
  );
}

export default function InterestAdjustmentBillingMarkers() {
  const [tooltip, setTooltip] = React.useState<TooltipState | null>(null);

  React.useEffect(() => {
    let timeoutId = 0;
    let observer: MutationObserver | null = null;

    const syncMarker = () => {
      const firstInterestCell = findInterestCells()[0];

      if (!firstInterestCell) return;

      clearMarkers();

      const { interestCell } = firstInterestCell;
      interestCell.classList.add(markedCellClass);

      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = markerClass;
      marker.setAttribute("aria-label", "Lihat informasi penyesuaian bunga");
      marker.innerHTML = '<span aria-hidden="true">i</span>';

      const openTooltip = () => {
        setTooltip({
          rect: marker.getBoundingClientRect(),
        });
      };

      marker.addEventListener("mouseenter", openTooltip);
      marker.addEventListener("focus", openTooltip);
      marker.addEventListener("click", openTooltip);

      interestCell.appendChild(marker);

      observer?.disconnect();
      observer = null;
    };

    const scheduleSync = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(syncMarker, 100);
    };

    observer = new MutationObserver(scheduleSync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    scheduleSync();

    return () => {
      window.clearTimeout(timeoutId);
      observer?.disconnect();
      clearMarkers();
    };
  }, []);

  React.useEffect(() => {
    if (!tooltip) return;

    const closeTooltip = () => setTooltip(null);

    const closeTooltipOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.closest(`.${markerClass}`) ||
        target?.closest('[data-interest-adjustment-tooltip="true"]')
      ) {
        return;
      }

      closeTooltip();
    };

    document.addEventListener("pointerdown", closeTooltipOnOutsideClick);
    window.addEventListener("resize", closeTooltip);
    window.addEventListener("scroll", closeTooltip, true);

    return () => {
      document.removeEventListener("pointerdown", closeTooltipOnOutsideClick);
      window.removeEventListener("resize", closeTooltip);
      window.removeEventListener("scroll", closeTooltip, true);
    };
  }, [tooltip]);

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