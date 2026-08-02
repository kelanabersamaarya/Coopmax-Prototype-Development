"use client";

import { useEffect } from "react";

const WIZARD_SELECTOR = '[data-loan-interest-wizard="true"]';
const CANCEL_BUTTON_CLASS = "loan-interest-wizard-step-two-cancel";

function syncCancelButton() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard) return;

  const footer = wizard.querySelector<HTMLElement>("footer");
  if (!footer) return;

  const footerText = footer.textContent?.toLowerCase() ?? "";
  const isSimulationStep =
    footerText.includes("kembali") && footerText.includes("simpan perubahan");

  const existingButton = footer.querySelector<HTMLButtonElement>(
    `.${CANCEL_BUTTON_CLASS}`,
  );

  if (!isSimulationStep) {
    existingButton?.remove();
    return;
  }

  if (existingButton) return;

  const backButton = Array.from(footer.querySelectorAll("button")).find(
    (button) => button.textContent?.trim().toLowerCase().includes("kembali"),
  );

  if (!backButton) return;

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.className = CANCEL_BUTTON_CLASS;
  cancelButton.textContent = "Batal";
  cancelButton.setAttribute("aria-label", "Batal perubahan suku bunga");

  cancelButton.addEventListener("click", () => {
    wizard.querySelector<HTMLButtonElement>('button[aria-label="Tutup"]')?.click();
  });

  backButton.insertAdjacentElement("afterend", cancelButton);
}

export default function LoanInterestWizardCancelButton() {
  useEffect(() => {
    const observer = new MutationObserver(syncCancelButton);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    syncCancelButton();

    return () => observer.disconnect();
  }, []);

  return null;
}