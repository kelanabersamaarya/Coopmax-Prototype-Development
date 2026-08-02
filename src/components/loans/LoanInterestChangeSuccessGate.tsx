"use client";

import * as React from "react";

const wizardSelector = '[data-loan-interest-wizard="true"]';

function isSimulationStep(footer: HTMLElement) {
  return Array.from(footer.querySelectorAll("button")).some(
    (button) =>
      button.textContent?.trim().toLowerCase() === "simpan perubahan",
  );
}

export default function LoanInterestChangeSuccessGate() {
  React.useEffect(() => {
    const syncCancelButton = () => {
      document.querySelectorAll<HTMLElement>(wizardSelector).forEach((wizard) => {
        const footer = wizard.querySelector<HTMLElement>("footer");
        if (!footer) return;

        const existingButton = footer.querySelector<HTMLButtonElement>(
          '[data-interest-wizard-cancel="true"]',
        );

        if (!isSimulationStep(footer)) {
          existingButton?.remove();
          return;
        }

        if (existingButton) return;

        const saveButton = Array.from(footer.querySelectorAll("button")).find(
          (button) =>
            button.textContent?.trim().toLowerCase() === "simpan perubahan",
        );

        if (!saveButton) return;

        const cancelButton = document.createElement("button");
        cancelButton.type = "button";
        cancelButton.dataset.interestWizardCancel = "true";
        cancelButton.textContent = "Batal";
        cancelButton.className =
          "inline-flex h-10 min-w-[72px] items-center justify-center rounded-[5px] px-4 text-[13px] font-semibold text-[#DC3545] transition hover:bg-rose-50";

        cancelButton.addEventListener("click", () => {
          const closeButton = wizard.querySelector<HTMLButtonElement>(
            'button[aria-label="Tutup"]',
          );
          closeButton?.click();
        });

        footer.insertBefore(cancelButton, saveButton);
      });
    };

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