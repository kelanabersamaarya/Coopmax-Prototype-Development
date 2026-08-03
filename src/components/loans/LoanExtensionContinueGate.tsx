"use client";

import { useEffect } from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';

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

function syncContinueButton() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard) return;

  const footer = wizard.querySelector<HTMLElement>("footer");
  if (!footer) return;

  const buttons = Array.from(footer.querySelectorAll<HTMLButtonElement>("button"));
  const continueButton = buttons.find(
    (button) => button.textContent?.trim() === "Lanjutkan",
  );

  if (!continueButton) return;

  const isFirstStep = buttons.some(
    (button) => button.textContent?.trim() === "Batal",
  );

  if (!isFirstStep) return;

  continueButton.disabled = !isFormComplete(wizard);
}

export default function LoanExtensionContinueGate() {
  useEffect(() => {
    const syncAfterRender = () => {
      window.setTimeout(syncContinueButton, 0);
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

  return null;
}