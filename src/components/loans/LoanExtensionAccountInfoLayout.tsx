"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const MARKER_CLASS = "loan-extension-account-info-layout-ready";

function resetGrid(grid: HTMLElement) {
  grid.classList.remove(MARKER_CLASS);
  grid.style.display = "";
  grid.style.gridTemplateColumns = "";
  grid.style.columnGap = "";
  grid.style.rowGap = "";
  grid.style.marginTop = "";
}

function syncGrid(grid: HTMLElement) {
  if (grid.classList.contains(MARKER_CLASS)) return;
  grid.classList.add(MARKER_CLASS);
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
  grid.style.columnGap = "2rem";
  grid.style.rowGap = "1.5rem";
  grid.style.marginTop = "1.75rem";
}

export default function LoanExtensionAccountInfoLayout() {
  React.useEffect(() => {
    let frameId = 0;
    const sync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
        const grid = wizard?.querySelector<HTMLElement>(GRID_SELECTOR);
        if (!wizard || !grid || wizard.dataset.loanExtensionStep !== "1") {
          if (grid) resetGrid(grid);
          return;
        }
        syncGrid(grid);
      });
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    sync();
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return (
    <style>{`
      [data-loan-extension-wizard="true"] .loan-extension-account-grid { align-items: start; }
      [data-loan-extension-wizard="true"] .loan-extension-account-field { min-width: 0; }
      [data-loan-extension-wizard="true"] .loan-extension-account-label { color: rgba(255,255,255,.85); font-size: 12px; font-weight: 600; line-height: 1.25; }
      [data-loan-extension-wizard="true"] .loan-extension-account-value { color: #fff; font-size: 14px; font-weight: 800; line-height: 1.35; overflow-wrap: anywhere; }
      [data-loan-extension-wizard="true"] .loan-extension-account-heading { grid-column: 1 / -1; margin-top: .5rem; padding-bottom: .5rem; border-bottom: 1px solid rgba(255,255,255,.28); color: #fff; font-size: 13px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
      @media (max-width: 1023px) { [data-loan-extension-wizard="true"] .loan-extension-account-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      @media (max-width: 639px) { [data-loan-extension-wizard="true"] .loan-extension-account-grid { grid-template-columns: minmax(0, 1fr) !important; column-gap: 0 !important; row-gap: 1rem !important; } }
    `}</style>
  );
}
