"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const MARKER_CLASS = "loan-extension-account-info-layout-ready";

const accountValues: Record<string, string> = {
  "No. Rek. Pinjaman": "SMG260004",
  "Nama Anggota / Debitur": "Bapak Bagus",
  "Nama Anggota": "Bapak Bagus",
};

function getWizardGrid() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  return wizard?.querySelector<HTMLElement>(GRID_SELECTOR) ?? null;
}

function createField(label: string, value: string) {
  const field = document.createElement("div");
  field.className =
    "loan-extension-account-field min-w-0";
  field.dataset.accountItemLabel = label;

  const labelElement = document.createElement("div");
  labelElement.className =
    "loan-extension-account-label text-[12px] font-semibold text-white/85";
  labelElement.textContent = label;

  const valueElement = document.createElement("div");
  valueElement.className =
    "loan-extension-account-value mt-1.5 text-[14px] font-extrabold leading-snug text-white";
  valueElement.textContent = value;

  field.append(labelElement, valueElement);
  return field;
}

function normalizeField(field: HTMLElement) {
  const labelElement = field.querySelector<HTMLElement>(
    ":scope > div:first-child",
  );
  const valueElement = field.querySelector<HTMLElement>(
    ":scope > div:last-child",
  );

  if (!labelElement || !valueElement) return;

  const originalLabel = labelElement.textContent?.trim() ?? "";
  const normalizedLabel =
    originalLabel === "Nama Anggota / Debitur"
      ? "Nama Anggota"
      : originalLabel;

  labelElement.textContent = normalizedLabel;
  labelElement.className =
    "loan-extension-account-label text-[12px] font-semibold text-white/85";
  valueElement.className =
    "loan-extension-account-value mt-1.5 text-[14px] font-extrabold leading-snug text-white";

  field.dataset.accountItemLabel = normalizedLabel;

  const replacement = accountValues[originalLabel] ?? accountValues[normalizedLabel];
  if (replacement) valueElement.textContent = replacement;
}

function syncAccountFields(grid: HTMLElement) {
  if (grid.classList.contains(MARKER_CLASS)) return;

  grid.classList.add(MARKER_CLASS);
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";
  grid.style.columnGap = "2rem";
  grid.style.rowGap = "1.5rem";
  grid.style.marginTop = "1.75rem";

  const fields = Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  );

  fields.forEach(normalizeField);

  const hasRemainingTenor = fields.some(
    (field) => field.dataset.accountItemLabel === "Sisa Tenor",
  );

  if (!hasRemainingTenor) {
    const tenorField = createField("Sisa Tenor", "12 Bulan");
    const statusField = fields.find(
      (field) => field.dataset.accountItemLabel === "Status Pinjaman",
    );

    if (statusField) {
      grid.insertBefore(tenorField, statusField);
    } else {
      grid.appendChild(tenorField);
    }
  }
}

function resetGrid(grid: HTMLElement) {
  grid.classList.remove(MARKER_CLASS);
  grid.style.display = "";
  grid.style.gridTemplateColumns = "";
  grid.style.columnGap = "";
  grid.style.rowGap = "";
  grid.style.marginTop = "";
}

export default function LoanExtensionAccountInfoLayout() {
  React.useEffect(() => {
    let frameId = 0;

    const sync = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
        const grid = getWizardGrid();

        if (!wizard || !grid || wizard.dataset.loanExtensionStep !== "1") {
          if (grid) resetGrid(grid);
          return;
        }

        syncAccountFields(grid);
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

      const grid = getWizardGrid();
      if (grid) resetGrid(grid);
    };
  }, []);

  return (
    <style>
      {`
        [data-loan-extension-wizard="true"]
          .loan-extension-account-grid
          .loan-extension-account-field {
          min-width: 0;
        }

        [data-loan-extension-wizard="true"]
          .loan-extension-account-grid
          .loan-extension-account-label {
          color: rgba(255, 255, 255, 0.85);
          font-size: 12px;
          font-weight: 600;
          line-height: 1.25;
        }

        [data-loan-extension-wizard="true"]
          .loan-extension-account-grid
          .loan-extension-account-value {
          margin-top: 6px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }

        @media (max-width: 1023px) {
          [data-loan-extension-wizard="true"]
            .loan-extension-account-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 639px) {
          [data-loan-extension-wizard="true"]
            .loan-extension-account-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            column-gap: 0 !important;
            row-gap: 1rem !important;
          }
        }
      `}
    </style>
  );
}