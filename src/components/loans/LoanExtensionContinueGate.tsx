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
  const textArea = wizard.querySelector<HTMLTextAreaElement>("textarea");

  return (
    inputs.length > 0 &&
    inputs.every((input) => input.value.trim().length > 0) &&
    Boolean(textArea?.value.trim())
  );
}

function syncContinueButton() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  if (!wizard || wizard.dataset.loanExtensionStep !== "1") return;

  const footer = wizard.querySelector<HTMLElement>("footer");
  const continueButton = footer?.querySelector<HTMLButtonElement>(
    "button:last-child",
  );

  if (!continueButton) return;

  const complete = isFormComplete(wizard);

  continueButton.disabled = !complete;
  continueButton.classList.toggle("cursor-not-allowed", !complete);
  continueButton.classList.toggle("bg-slate-300", !complete);
  continueButton.classList.toggle("text-slate-500", !complete);
  continueButton.classList.toggle("bg-[#2563EB]", complete);
  continueButton.classList.toggle("hover:bg-[#1D4ED8]", complete);
}

export default function LoanExtensionContinueGate() {
  useEffect(() => {
    const observer = new MutationObserver(syncContinueButton);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    document.addEventListener("input", syncContinueButton, true);
    document.addEventListener("change", syncContinueButton, true);
    document.addEventListener("click", syncContinueButton, true);

    syncContinueButton();

    return () => {
      observer.disconnect();
      document.removeEventListener("input", syncContinueButton, true);
      document.removeEventListener("change", syncContinueButton, true);
      document.removeEventListener("click", syncContinueButton, true);
    };
  }, []);

  return null;
}