"use client";

import * as React from "react";
import { createPortal } from "react-dom";

const markerClass = "billing-interest-adjustment-marker";
const markedCellClass = "has-billing-interest-adjustment";
const tooltipWidth = 320;
const tooltipOffset = 10;

type TooltipState = {
  rect: DOMRect;
};

type TooltipPosition = {
  left: number;
  top: number;
};

const adjustmentInfo = {
  method: "Pengurangan Bunga",
  interestBefore: "83.333,00",
  adjustmentAmount: "25.000,00",
  interestAfter: "58.333,00",
  reason: "Penyesuaian bunga sesuai kebijakan koperasi.",
  adjustedBy: "Arya Dharma",
};

function findInterestCell() {
  const datePattern = /^\d{2}-\d{2}-\d{4}$/;
  const rowGrids = Array.from(
    document.querySelectorAll<HTMLElement>("div.grid.items-center"),
  );

  for (const rowGrid of rowGrids) {
    if (rowGrid.offsetParent === null) continue;

    const cells = Array.from(rowGrid.children) as HTMLElement[];
    const dueDateIndex = cells.findIndex((cell) =>
      datePattern.test(cell.textContent?.trim() ?? ""),
    );

    if (dueDateIndex < 0) continue;

    const interestCell = cells[dueDateIndex + 3];
    if (interestCell?.offsetParent !== null) return interestCell;
  }

  return null;
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
  const tooltipRef = React.useRef<HTMLElement | null>(null);
  const [position, setPosition] = React.useState<TooltipPosition | null>(null);

  React.useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    const margin = 12;
    const tooltipHeight = tooltip.offsetHeight;
    const left = Math.min(
      Math.max(
        margin,
        state.rect.left + state.rect.width / 2 - tooltipWidth / 2,
      ),
      window.innerWidth - tooltipWidth - margin,
    );

    const hasSpaceAbove = state.rect.top >= tooltipHeight + tooltipOffset + margin;
    const top = hasSpaceAbove
      ? state.rect.top - tooltipHeight - tooltipOffset
      : state.rect.bottom + tooltipOffset;

    setPosition({ left, top });
  }, [state.rect]);

  return createPortal(
    <aside
      ref={tooltipRef}
      data-interest-adjustment-tooltip="true"
      className="pointer-events-none fixed z-[9999] w-[320px] rounded-[10px] border border-slate-200 bg-white p-4 text-left shadow-xl"
      style={
        position
          ? { left: position.left, top: position.top }
          : { left: -9999, top: -9999, visibility: "hidden" }
      }
      role="tooltip"
    >
      <div className="mb-3 text-[13px] font-extrabold text-black">
        Info Penyesuaian Bunga
      </div>

      <div className="grid gap-3">
        <TooltipRow
          label="Metode Penyesuaian"
          value={adjustmentInfo.method}
        />
        <TooltipRow
          label="Nominal Bunga Sebelum Penyesuaian"
          value={adjustmentInfo.interestBefore}
        />
        <TooltipRow
          label="Nominal Penyesuaian"
          value={adjustmentInfo.adjustmentAmount}
        />
        <TooltipRow
          label="Nominal Bunga Setelah Penyesuaian"
          value={adjustmentInfo.interestAfter}
        />
        <TooltipRow
          label="Alasan Penyesuaian"
          value={adjustmentInfo.reason}
        />
        <TooltipRow
          label="Disesuaikan Oleh"
          value={adjustmentInfo.adjustedBy}
        />
      </div>
    </aside>,
    document.body,
  );
}

export default function InterestAdjustmentBillingMarkers() {
  const [tooltip, setTooltip] = React.useState<TooltipState | null>(null);

  React.useEffect(() => {
    let marker: HTMLButtonElement | null = null;

    const removeMarker = () => {
      marker?.remove();
      marker = null;

      document
        .querySelectorAll(`.${markedCellClass}`)
        .forEach((cell) => cell.classList.remove(markedCellClass));
    };

    const attachMarker = () => {
      const interestCell = findInterestCell();

      if (!interestCell) {
        removeMarker();
        return;
      }

      if (marker?.parentElement === interestCell) return;

      removeMarker();

      interestCell.classList.add(markedCellClass);

      marker = document.createElement("button");
      marker.type = "button";
      marker.className = markerClass;
      marker.setAttribute("aria-label", "Lihat informasi penyesuaian bunga");
      marker.setAttribute("title", "Informasi penyesuaian bunga");
      marker.innerHTML = '<span aria-hidden="true">i</span>';

      const showTooltip = () => {
        if (!marker) return;
        setTooltip({ rect: marker.getBoundingClientRect() });
      };

      const hideTooltip = () => setTooltip(null);

      marker.addEventListener("mouseenter", showTooltip);
      marker.addEventListener("mouseleave", hideTooltip);
      marker.addEventListener("focus", showTooltip);
      marker.addEventListener("blur", hideTooltip);
      marker.addEventListener("click", showTooltip);

      interestCell.appendChild(marker);
    };

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(attachMarker);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    attachMarker();

    return () => {
      observer.disconnect();
      removeMarker();
    };
  }, []);

  React.useEffect(() => {
    if (!tooltip) return;

    const closeTooltip = () => setTooltip(null);

    window.addEventListener("resize", closeTooltip);
    window.addEventListener("scroll", closeTooltip, true);

    return () => {
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
            cursor: pointer;
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