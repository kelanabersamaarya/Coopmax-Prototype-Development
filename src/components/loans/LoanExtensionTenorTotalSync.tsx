"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const CURRENT_TENOR = 12;

function findFieldInput(wizard: HTMLElement, labelText: string) {
  const fieldLabel = Array.from(
    wizard.querySelectorAll<HTMLElement>("label, div"),
  ).find((element) => {
    const text = (element.textContent ?? "").trim();

    if (!text.startsWith(labelText)) return false;

    const parent = element.parentElement;
    return Boolean(parent?.querySelector<HTMLInputElement>("input"));
  });

  return fieldLabel?.parentElement?.querySelector<HTMLInputElement>("input") ?? null;
}

function syncTotalTenor() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard) return;

  const additionalTenorInput = findFieldInput(
    wizard,
    "Tenor Tambahan (Bulan)",
  );
  const totalTenorInput = findFieldInput(wizard, "Total Tenor Baru");

  if (!additionalTenorInput || !totalTenorInput) return;

  const additionalTenor = Number.parseInt(additionalTenorInput.value, 10) || 0;

  totalTenorInput.value =
    additionalTenor > 0 ? `${CURRENT_TENOR + additionalTenor} Bulan` : "0";
}

export default function LoanExtensionTenorTotalSync() {
  React.useEffect(() => {
    const observer = new MutationObserver(syncTotalTenor);
    const intervalId = window.setInterval(syncTotalTenor, 150);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("input", syncTotalTenor, true);
    syncTotalTenor();

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
      document.removeEventListener("input", syncTotalTenor, true);
    };
  }, []);

  return null;
}