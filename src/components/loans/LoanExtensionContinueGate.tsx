"use client";

import { useEffect } from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const CANCEL_BUTTON_CLASS = "loan-extension-wizard-step-two-cancel";
const SIMULATION_SAVE_ATTRIBUTE = "data-extension-simulation-save";

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
  const backButton = buttons.find(
    (button) => button.textContent?.trim().toLowerCase() === "kembali",
  );

  const primaryButton = buttons.find((button) => {
    const label = button.textContent?.trim().toLowerCase() ?? "";

    return (
      label === "lanjutkan" ||
      label === "simpan perubahan" ||
      label === "simpan perpanjangan"
    );
  });

  const cancelButton = footer.querySelector<HTMLButtonElement>(
    `.${CANCEL_BUTTON_CLASS}`,
  );

  const primaryLabel = primaryButton?.textContent?.trim() ?? "";
  const isSimulationStep =
    Boolean(backButton && primaryButton) &&
    (primaryLabel === "Lanjutkan" || primaryLabel === "Simpan Perubahan");

  if (!isSimulationStep) {
    cancelButton?.remove();

    if (primaryButton) {
      primaryButton.removeAttribute(SIMULATION_SAVE_ATTRIBUTE);

      if (primaryLabel === "Lanjutkan") {
        primaryButton.disabled = !isFormComplete(wizard);
      }
    }

    return;
  }

  if (!primaryButton || !backButton) return;

  primaryButton.disabled = false;
  primaryButton.setAttribute(SIMULATION_SAVE_ATTRIBUTE, "true");

  if (primaryLabel !== "Simpan Perubahan") {
    primaryButton.textContent = "Simpan Perubahan";
  }

  if (cancelButton) return;

  const nextCancelButton = document.createElement("button");
  nextCancelButton.type = "button";
  nextCancelButton.className = CANCEL_BUTTON_CLASS;
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
        [data-loan-extension-wizard="true"] footer {
          justify-content: flex-start !important;
          gap: 10px !important;
        }

        [data-loan-extension-wizard="true"] footer > button.bg-\\[\\#77839A\\] {
          order: 0 !important;
        }

        [data-loan-extension-wizard="true"] .loan-extension-wizard-step-two-cancel {
          order: 1 !important;
          display: inline-flex !important;
          height: 40px !important;
          min-width: 90px !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 !important;
          border: 0 !important;
          border-radius: 5px !important;
          background: transparent !important;
          color: #dc3545 !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          transition: color 150ms ease !important;
        }

        [data-loan-extension-wizard="true"] .loan-extension-wizard-step-two-cancel:hover {
          background: transparent !important;
          color: #b71c2b !important;
        }

        [data-loan-extension-wizard="true"]
          footer
          > button[data-extension-simulation-save="true"] {
          order: 2 !important;
          display: inline-flex !important;
          min-width: 172px !important;
          height: 40px !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          margin-left: auto !important;
          border: 0 !important;
          border-radius: 5px !important;
          background-color: #2fb300 !important;
          color: #ffffff !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          box-shadow: none !important;
        }

        [data-loan-extension-wizard="true"]
          footer
          > button[data-extension-simulation-save="true"]:hover {
          background-color: #279800 !important;
        }

        [data-loan-extension-wizard="true"]
          footer
          > button[data-extension-simulation-save="true"]
          svg {
          display: none !important;
        }

        [data-loan-extension-wizard="true"]
          footer
          > button[data-extension-simulation-save="true"]::after {
          content: "";
          display: inline-block;
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='3' width='26' height='26' rx='3.5' stroke='white' stroke-width='4'/%3E%3Cpath d='M8.5 15.5L14 21L25 9' stroke='white' stroke-width='4.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
        }
      `}
    </style>
  );
}