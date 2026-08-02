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
        const actionGroup = footer.querySelector<HTMLElement>(
          '[data-interest-wizard-left-actions="true"]',
        );
        const cancelButton = footer.querySelector<HTMLButtonElement>(
          '[data-interest-wizard-cancel="true"]',
        );

        if (!isSimulationStep(footer) || !saveButton || !backButton) {
          actionGroup?.remove();
          cancelButton?.remove();
          return;
        }

        if (
          actionGroup &&
          actionGroup.contains(backButton) &&
          actionGroup.contains(cancelButton)
        ) {
          return;
        }

        const group = actionGroup ?? document.createElement("div");
        group.dataset.interestWizardLeftActions = "true";
        group.className = "flex items-center gap-3";

        if (!actionGroup) {
          footer.insertBefore(group, saveButton);
        }

        if (backButton.parentElement !== group) {
          group.appendChild(backButton);
        }

        const cancel =
          cancelButton ?? document.createElement("button");

        if (!cancelButton) {
          cancel.type = "button";
          cancel.dataset.interestWizardCancel = "true";
          cancel.textContent = "Batal";
          cancel.className =
            "inline-flex h-10 min-w-[72px] items-center justify-center rounded-[5px] px-4 text-[13px] font-semibold text-[#DC3545] transition hover:bg-rose-50";

          cancel.addEventListener("click", () => {
            const closeButton = wizard.querySelector<HTMLButtonElement>(
              'button[aria-label="Tutup"]',
            );
            closeButton?.click();
          });
        }

        if (cancel.parentElement !== group) {
          group.appendChild(cancel);
        }
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