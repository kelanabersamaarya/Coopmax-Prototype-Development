"use client";

import * as React from "react";

const wizardSelector = '[data-loan-interest-wizard="true"]';

function isSimulationStep(footer: HTMLElement) {
  return Array.from(footer.querySelectorAll("button")).some(
    (button) =>
      button.textContent?.trim().toLowerCase() === "simpan perubahan",
  );
}

function findButton(footer: HTMLElement, label: string) {
  return Array.from(footer.querySelectorAll<HTMLButtonElement>("button")).find(
    (button) => button.textContent?.trim().toLowerCase() === label,
  );
}

export default function LoanInterestChangeSuccessGate() {
  React.useEffect(() => {
    const syncCancelButton = () => {
      document.querySelectorAll<HTMLElement>(wizardSelector).forEach((wizard) => {
        const footer = wizard.querySelector<HTMLElement>("footer");
        if (!footer) return;

        const saveButton = findButton(footer, "simpan perubahan");
        const backButton = findButton(footer, "kembali");
        const existingCancel = footer.querySelector<HTMLButtonElement>(
          '[data-interest-wizard-cancel="true"]',
        );
        const existingActionGroup = footer.querySelector<HTMLElement>(
          '[data-interest-wizard-left-actions="true"]',
        );

        if (!isSimulationStep(footer) || !saveButton || !backButton) {
          existingCancel?.remove();
          existingActionGroup?.remove();
          return;
        }

        const actionGroup =
          existingActionGroup ??
          Object.assign(document.createElement("div"), {
            className: "flex items-center gap-3",
            dataset: { interestWizardLeftActions: "true" },
          });

        if (!existingActionGroup) {
          footer.insertBefore(actionGroup, saveButton);
        }

        actionGroup.appendChild(backButton);

        const cancelButton =
          existingCancel ??
          Object.assign(document.createElement("button"), {
            type: "button",
            textContent: "Batal",
            className:
              "inline-flex h-10 min-w-[72px] items-center justify-center rounded-[5px] px-4 text-[13px] font-semibold text-[#DC3545] transition hover:bg-rose-50",
            dataset: { interestWizardCancel: "true" },
          });

        if (!existingCancel) {
          cancelButton.addEventListener("click", () => {
            const closeButton = wizard.querySelector<HTMLButtonElement>(
              'button[aria-label="Tutup"]',
            );
            closeButton?.click();
          });
        }

        actionGroup.appendChild(cancelButton);
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