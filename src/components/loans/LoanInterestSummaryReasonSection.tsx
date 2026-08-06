"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-interest-wizard="true"]';
const PANEL_CLASS = "loan-interest-reason-section";

function findSummaryCard(wizard: HTMLElement) {
  const table = wizard.querySelector<HTMLTableElement>(
    "table.loan-interest-summary",
  );

  if (!table) return null;

  let current: HTMLElement | null = table.parentElement;

  while (current && current !== wizard) {
    const className = String(current.className ?? "");
    const hasCardShape =
      className.includes("rounded") && className.includes("border");

    if (hasCardShape) return current;

    current = current.parentElement;
  }

  return table.parentElement;
}

function syncReasonSection() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const existing = wizard?.querySelector<HTMLElement>(`.${PANEL_CLASS}`);

  if (!wizard || wizard.dataset.loanInterestStep !== "2") {
    existing?.remove();
    return;
  }

  const table = wizard.querySelector<HTMLTableElement>(
    "table.loan-interest-summary",
  );
  const summaryCard = findSummaryCard(wizard);

  if (!table || !summaryCard?.parentElement) {
    existing?.remove();
    return;
  }

  const reasonRow = table.querySelector<HTMLTableRowElement>("tbody tr:last-child");
  const reasonCell = reasonRow?.querySelector<HTMLTableCellElement>("td:last-child");
  const reason = reasonCell?.textContent?.trim() || "-";

  reasonRow?.style.setProperty("display", "none");

  if (!existing) {
    const panel = document.createElement("section");
    panel.className = PANEL_CLASS;
    panel.setAttribute("aria-label", "Alasan perubahan");

    const title = document.createElement("div");
    title.className = "loan-interest-reason-section-title";
    title.textContent = "ALASAN PERUBAHAN";

    const content = document.createElement("div");
    content.className = "loan-interest-reason-section-content";

    panel.append(title, content);
    summaryCard.insertAdjacentElement("afterend", panel);
  }

  const panel = wizard.querySelector<HTMLElement>(`.${PANEL_CLASS}`);
  const content = panel?.querySelector<HTMLElement>(
    ".loan-interest-reason-section-content",
  );

  if (content) content.textContent = reason;
}

export default function LoanInterestSummaryReasonSection() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncReasonSection);
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
      document.querySelector(`.${PANEL_CLASS}`)?.remove();
    };
  }, []);

  return (
    <style>
      {`
        .${PANEL_CLASS} {
          display: block;
          width: 100%;
          margin-top: 28px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          box-sizing: border-box;
        }

        .${PANEL_CLASS}-title {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          background: #f9faff;
          color: #000000;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }

        .${PANEL_CLASS}-content {
          min-height: 48px;
          padding: 14px 16px;
          background: #ffffff;
          color: #000000;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.45;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        @media (max-width: 640px) {
          .${PANEL_CLASS} {
            margin-top: 24px;
            border-radius: 10px;
          }

          .${PANEL_CLASS}-title,
          .${PANEL_CLASS}-content {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}
    </style>
  );
}