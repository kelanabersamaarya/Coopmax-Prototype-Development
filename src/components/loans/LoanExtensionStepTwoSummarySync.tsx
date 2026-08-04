"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const CURRENT_TENOR = 12;
const CURRENT_DUE_DATE = new Date(2027, 3, 7);

type ExtensionSummary = {
  method: string;
  effectiveDate: string;
  tenor: string;
  dueDate: string;
  reason: string;
};

function formatDmy(date: Date) {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  const day = result.getDate();

  result.setMonth(result.getMonth() + months);

  if (result.getDate() !== day) {
    result.setDate(0);
  }

  return result;
}

function getFieldContainer(wizard: HTMLElement, labelText: string) {
  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith(labelText),
  );

  return label?.parentElement ?? null;
}

function getInputValue(wizard: HTMLElement, labelText: string) {
  return (
    getFieldContainer(wizard, labelText)?.querySelector<HTMLInputElement>(
      "input",
    )?.value ?? ""
  );
}

function getTextareaValue(wizard: HTMLElement, labelText: string) {
  return (
    getFieldContainer(wizard, labelText)?.querySelector<HTMLTextAreaElement>(
      "textarea",
    )?.value ?? ""
  );
}

function getSummaryFromStepOne(wizard: HTMLElement): ExtensionSummary | null {
  const method = wizard.querySelector<HTMLInputElement>(
    'input[name="loan-extension-method"]:checked',
  )?.value;

  const effectiveDate = getInputValue(wizard, "Tanggal Efektif");
  const reason = getTextareaValue(wizard, "Alasan Perpanjangan").trim();

  if (!method || !effectiveDate || !reason) return null;

  let tenor = CURRENT_TENOR;
  let dueDate = CURRENT_DUE_DATE;

  if (method === "Tenor Tambahan") {
    const additionalTenor = Number.parseInt(
      getInputValue(wizard, "Tenor Tambahan (Bulan)"),
      10,
    );

    if (!Number.isFinite(additionalTenor) || additionalTenor <= 0) return null;

    tenor = CURRENT_TENOR + additionalTenor;
    dueDate = addMonths(CURRENT_DUE_DATE, additionalTenor);
  }

  if (method === "Tenor Baru") {
    const newTenor = Number.parseInt(getInputValue(wizard, "Tenor Baru (Bulan)"), 10);

    if (!Number.isFinite(newTenor) || newTenor <= 0) return null;

    tenor = newTenor;
    dueDate = addMonths(CURRENT_DUE_DATE, newTenor - CURRENT_TENOR);
  }

  if (method === "Jatuh Tempo Akhir Baru") {
    const field = getFieldContainer(wizard, "Jatuh Tempo Akhir Baru");
    const selects = Array.from(field?.querySelectorAll<HTMLSelectElement>("select") ?? []);
    const monthName = selects[0]?.value ?? "";
    const year = Number.parseInt(selects[1]?.value ?? "", 10);
    const monthIndex = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ].indexOf(monthName);

    if (monthIndex < 0 || !Number.isFinite(year)) return null;

    dueDate = new Date(year, monthIndex, CURRENT_DUE_DATE.getDate());

    if (dueDate.getMonth() !== monthIndex) {
      dueDate.setDate(0);
    }

    const monthsDifference =
      (dueDate.getFullYear() - CURRENT_DUE_DATE.getFullYear()) * 12 +
      dueDate.getMonth() -
      CURRENT_DUE_DATE.getMonth();

    tenor = Math.max(1, CURRENT_TENOR + monthsDifference);
  }

  return {
    method,
    effectiveDate,
    tenor: `${tenor} Bulan`,
    dueDate: formatDmy(dueDate),
    reason,
  };
}

function applySummaryToStepTwo(wizard: HTMLElement) {
  if (wizard.dataset.loanExtensionStep !== "2") return;

  const rawSummary = wizard.dataset.extensionSummary;
  if (!rawSummary) return;

  let summary: ExtensionSummary;

  try {
    summary = JSON.parse(rawSummary) as ExtensionSummary;
  } catch {
    return;
  }

  const summaryValues: Record<string, string> = {
    "Metode Perpanjangan": summary.method,
    "Tanggal Efektif": summary.effectiveDate,
    Tenor: summary.tenor,
    "Tanggal Jatuh Tempo Akhir": summary.dueDate,
    "Alasan Perpanjangan": summary.reason,
  };

  wizard.querySelectorAll<HTMLTableRowElement>("table tbody tr").forEach((row) => {
    const cells = row.querySelectorAll<HTMLTableCellElement>("td");
    const label = cells[0]?.textContent?.trim();

    if (!label || !cells[2] || !summaryValues[label]) return;

    cells[2].textContent = summaryValues[label];
  });
}

export default function LoanExtensionStepTwoSummarySync() {
  React.useEffect(() => {
    function captureStepOneValues(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("button");
      const wizard = button?.closest<HTMLElement>(WIZARD_SELECTOR);

      if (
        !button ||
        !wizard ||
        wizard.dataset.loanExtensionStep !== "1" ||
        button.disabled
      ) {
        return;
      }

      const isContinueButton = (button.textContent ?? "")
        .trim()
        .toLowerCase()
        .includes("lanjutkan");

      if (!isContinueButton) return;

      const summary = getSummaryFromStepOne(wizard);

      if (summary) {
        wizard.dataset.extensionSummary = JSON.stringify(summary);
      }
    }

    function syncVisibleWizard() {
      document
        .querySelectorAll<HTMLElement>(WIZARD_SELECTOR)
        .forEach(applySummaryToStepTwo);
    }

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(syncVisibleWizard);
    });

    document.addEventListener("click", captureStepOneValues, true);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-loan-extension-step"],
    });

    return () => {
      document.removeEventListener("click", captureStepOneValues, true);
      observer.disconnect();
    };
  }, []);

  return null;
}