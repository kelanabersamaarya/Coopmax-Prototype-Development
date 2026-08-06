"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const MARKER_CLASS = "loan-extension-account-reference-mounted";

const accountValues: Record<string, string> = {
  "Kode Pinjaman": "SMG260004",
  "Nama Nasabah": "Bapak Bagus",
};

function getWizardGrid() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  return wizard?.querySelector<HTMLElement>(GRID_SELECTOR) ?? null;
}

function syncAccountFields(grid: HTMLElement) {
  grid.classList.add(MARKER_CLASS);

  const fields = Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  );

  fields.forEach((field) => {
    const labelElement = field.querySelector<HTMLElement>("> div:first-child");
    const valueElement = field.querySelector<HTMLElement>("> div:last-child");

    if (!labelElement || !valueElement) return;

    const label = labelElement.textContent?.trim() ?? "";
    const replacement = accountValues[label];

    if (replacement && valueElement.textContent?.trim() !== replacement) {
      valueElement.textContent = replacement;
    }
  });
}

export default function LoanExtensionAccountInfoLayout() {
  React.useEffect(() => {
    let frameId = 0;

    const sync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const grid = getWizardGrid();
        if (grid) syncAccountFields(grid);
      });
    };

    const observer = new MutationObserver(sync);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    sync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return null;
}