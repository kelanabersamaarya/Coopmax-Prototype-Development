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

function getFieldInput(wizard: HTMLElement, labelText: string) {
  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith(labelText),
  );

  return label?.parentElement?.querySelector<HTMLInputElement>("input") ?? null;
}

function getFieldTextarea(wizard: HTMLElement, labelText: string) {
  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith(labelText),
  );

  return label?.parentElement?.querySelector<HTMLTextAreaElement>("textarea") ?? null;
}

function formatDmy(date: Date) {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}-${date.getFullYear()}`;
}

function addMonths(date: Date, months: number) {
  const nextDate = new Date(date);
  const day = nextDate.getDate();

  nextDate.setMonth(nextDate.getMonth() + months);

  if (nextDate.getDate() !== day) {
    nextDate.setDate(0);
  }

  return nextDate;
}

function getSummaryFromForm(wizard: HTMLElement): ExtensionSummary | null {
  const method = wizard.querySelector<HTMLInputElement>(
    'input[name="loan-extension-method"]:checked',
  )?.value;

  const effectiveDate = getFieldInput(wizard, "Tanggal Efektif")?.value ?? "";
  const reason = getFieldTextarea(wizard, "Alasan Perpanjangan")?.value ?? "";

  if (!method || !effectiveDate || !reason.trim()) return null;

  let tenor = CURRENT_TENOR;
  let dueDate = CURRENT_DUE_DATE;

  if (method === "Tenor Tambahan") {
    const additionalTenor = Number.parseInt(
      getFieldInput(wizard, "Tenor Tambahan (Bulan)")?.value ?? "0",
      10,
    );

    if (!Number.isFinite(additionalTenor) || additionalTenor <= 0) return null;

    tenor = CURRENT_TENOR + additionalTenor;
    dueDate = addMonths(CURRENT_DUE_DATE, additionalTenor);
  }

  if (method === "Tenor Baru") {
    const newTenor = Number.parseInt(
      getFieldInput(wizard, "Tenor Baru (Bulan)")?.value ?? "0",
      10,
    );

    if (!Number.isFinite(newTenor) || newTenor <= 0) return null;

    tenor = newTenor;
    dueDate = addMonths(CURRENT_DUE_DATE, newTenor - CURRENT_TENOR);
  }

  if (method === "Jatuh Tempo Akhir Baru") {
    const field = Array.from(wizard.querySelectorAll("label"))
      .find((element) =>
        (element.textContent ?? "").trim().startsWith("Jatuh Tempo Akhir Baru"),
      )
      ?.parentElement;

    const selects = Array.from(field?.querySelectorAll("select") ?? []);
    const monthName = selects[0]?.value ?? "";
    const year = Number.parseInt(selects[1]?.value ?? "0", 10);
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

    const monthDifference =
      (dueDate.getFullYear() - CURRENT_DUE_DATE.getFullYear()) * 12 +
      dueDate.getMonth() -
      CURRENT_DUE_DATE.getMonth();

    tenor = Math.max(1, CURRENT_TENOR + monthDifference);
  }

  return {
    method,
    effectiveDate,
    tenor: `${tenor} Bulan`,
    dueDate: formatDmy(dueDate),
    reason: reason.trim(),
  };
}

function saveSummary(wizard: HTMLElement, summary: ExtensionSummary) {
  wizard.dataset.extensionSummary = JSON.stringify(summary);
}

function readSummary(wizard: HTMLElement) {
  try {
    return JSON.parse(wizard.dataset.extensionSummary ?? "") as ExtensionSummary;
  } catch {
    return null;
  }
}

function syncSummaryTable(wizard: HTMLElement) {
  if (wizard.dataset.loanExtensionStep !== "2") return;

  const summary = readSummary(wizard);
  if (!summary) return;

  const rows = Array.from(wizard.querySelectorAll("table tbody tr"));

  const valueByLabel: Record<string, string> = {
    "Metode Perpanjangan": summary.method,
    "Tanggal Efektif": summary.effectiveDate,
    Tenor: summary.tenor,
    "Tanggal Jatuh Tempo Akhir": summary.dueDate,
    "Alasan Perpanjangan": summary.reason,
  };

  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const label = cells[0]?.textContent?.trim();

    if (!label || !valueByLabel[label] || !cells[2]) return;

    cells[2].textContent = valueByLabel[label];
  });
}

export default function LoanExtensionStepTwoSummarySync() {
  React.useEffect(() => {
    function handleContinue(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("button");
      const wizard = button?.closest<HTMLElement>(WIZARD_SELECTOR);

      if (!button || !wizard || wizard.dataset.loanExtensionStep !== "1") return;

      if (!(button.textContent ?? "").trim().toLowerCase().includes("lanjutkan")) {
        return;
      }

      const summary = getSummaryFromForm(wizard);

      if (summary) {
        saveSummary(wizard, summary);
      }
    }

    const observer = new MutationObserver(() => {
      document
        .querySelectorAll<HTMLElement>(WIZARD_SELECTOR)
        .forEach(syncSummaryTable);
    });

    document.addEventListener("click", handleContinue, true);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-loan-extension-step"],
    });

    return () => {
      document.removeEventListener("click", handleContinue, true);
      observer.disconnect();
    };
  }, []);

  return null;
}