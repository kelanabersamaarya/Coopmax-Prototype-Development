"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-interest-wizard="true"]';
const PANEL_CLASS = "loan-interest-reason-section";

function syncReasonSection() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const existing = document.querySelector<HTMLElement>(`.${PANEL_CLASS}`);

  if (!wizard || wizard.dataset.loanInterestStep !== "2") {
    existing?.remove();
    return;
  }

  const table = wizard.querySelector<HTMLTableElement>(
    "table.loan-interest-summary",
  );
  const scrollWrapper = table?.parentElement;

  if (!table || !scrollWrapper) {
    existing?.remove();
    return;
  }

  const reasonRow = table.querySelector<HTMLTableRowElement>("tbody tr:last-child");
  const reasonCell = reasonRow?.querySelector<HTMLTableCellElement>("td:last-child");
  const reason = reasonCell?.textContent?.trim() || "-";

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
    scrollWrapper.insertAdjacentElement("afterend", panel);
  }

  const panel = document.querySelector<HTMLElement>(`.${PANEL_CLASS}`);
  const content = panel?.querySelector<HTMLElement>(
    ".loan-interest-reason-section-content",
  );

  if (content) content.textContent = reason;
  if (reasonRow) reasonRow.style.display = "none";
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
          width: 100%;
          margin-top: 16px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
        }

        .${PANEL_CLASS}-title {
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
          background: #f9faff;
          color: #000000;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.35;
        }

        .${PANEL_CLASS}-content {
          min-height: 48px;
          padding: 12px 16px;
          color: #000000;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.45;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
      `}
    </style>
  );
}