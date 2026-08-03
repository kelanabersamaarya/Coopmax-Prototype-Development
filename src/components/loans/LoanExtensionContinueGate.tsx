"use client";

import { useEffect } from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const CANCEL_BUTTON_CLASS = "loan-extension-wizard-step-two-cancel";

function isFormComplete(wizard: HTMLElement) {
  const methodTrigger = wizard.querySelector<HTMLElement>(
    'button[role="combobox"]',
  );
  const methodValue = methodTrigger?.textContent?.trim() ?? "";

  if (!methodValue || methodValue.includes("Pilih Metode")) {
    return false;
  }

  const inputs = Array.from(wizard.querySelectorAll<HTMLInputElement>("input"));
  const reason = wizard.querySelector<HTMLTextAreaElement>("textarea");

  return (
    inputs.length > 0 &&
    inputs.every((input) => input.value.trim().length > 0) &&
    Boolean(reason?.value.trim())
  );
}

function syncWizardButtons() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard) return;

  const footer = wizard.querySelector<HTMLElement>("footer");
  if (!footer) return;

  const buttons = Array.from(footer.querySelectorAll<HTMLButtonElement>("button"));
  const continueButton = buttons.find(
    (button) => button.textContent?.trim() === "Lanjutkan",
  );
  const backButton = buttons.find(
    (button) => button.textContent?.trim() === "Kembali",
  );
  const cancelButton = footer.querySelector<HTMLButtonElement>(
    `.${CANCEL_BUTTON_CLASS}`,
  );

  const isSimulationStep = Boolean(backButton && continueButton);

  if (!isSimulationStep) {
    cancelButton?.remove();

    if (continueButton) {
      continueButton.disabled = !isFormComplete(wizard);
    }

    return;
  }

  if (continueButton) {
    continueButton.disabled = false;
  }

  if (cancelButton || !backButton) return;

  const nextCancelButton = document.createElement("button");
  nextCancelButton.type = "button";
  nextCancelButton.className =
    `${CANCEL_BUTTON_CLASS} inline-flex h-10 min-w-[90px] items-center justify-center rounded-[5px] bg-transparent px-5 text-[12px] font-semibold text-[#DC3545] transition hover:text-[#B71C2B]`;
  nextCancelButton.textContent = "Batal";
  nextCancelButton.setAttribute("aria-label", "Batal perpanjangan pinjaman");

  nextCancelButton.addEventListener("click", () => {
    wizard.querySelector<HTMLButtonElement>('button[aria-label="Tutup"]')?.click();
  });

  backButton.insertAdjacentElement("afterend", nextCancelButton);
}

export default function LoanExtensionContinueGate() {
  useEffect(() => {
    const syncAfterRender = () => {
      window.setTimeout(syncWizardButtons, 0);
    };

    const observer = new MutationObserver(syncAfterRender);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("input", syncAfterRender, true);
    document.addEventListener("change", syncAfterRender, true);
    document.addEventListener("click", syncAfterRender, true);

    syncAfterRender();

    return () => {
      observer.disconnect();
      document.removeEventListener("input", syncAfterRender, true);
      document.removeEventListener("change", syncAfterRender, true);
      document.removeEventListener("click", syncAfterRender, true);
    };
  }, []);

  return (
    <style>
      {`
        [data-loan-extension-wizard="true"] footer > button.bg-\\[\\#77839A\\] {
          order: 0 !important;
        }

        [data-loan-extension-wizard="true"] .loan-extension-wizard-step-two-cancel {
          order: 1 !important;
          margin-left: 0 !important;
        }

        [data-loan-extension-wizard="true"] footer > button.bg-\\[\\#2fb300\\] {
          order: 2 !important;
          margin-left: auto !important;
        }
      `}
    </style>
  );
}