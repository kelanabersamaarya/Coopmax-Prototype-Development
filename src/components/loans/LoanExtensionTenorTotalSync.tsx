"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const CURRENT_TENOR = 12;

function findFieldInput(wizard: HTMLElement, labelText: string) {
  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith(labelText),
  );

  return label?.parentElement?.querySelector<HTMLInputElement>("input") ?? null;
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

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement | null;

      if (
        target?.placeholder === "Masukkan tenor tambahan" ||
        target?.value !== undefined
      ) {
        window.setTimeout(syncTotalTenor, 0);
      }
    };

    document.addEventListener("input", handleInput, true);
    syncTotalTenor();

    return () => {
      observer.disconnect();
      document.removeEventListener("input", handleInput, true);
    };
  }, []);

  return null;
}