"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const METHOD_VALUE_SELECTOR = "[data-extension-method-value]";

export default function LoanExtensionWizardMethodSync() {
  React.useEffect(() => {
    let selectedMethod = "";

    function syncMethod() {
      const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
      if (!wizard) return;

      const checkedRadio = wizard.querySelector<HTMLInputElement>(
        'input[type="radio"][name="loan-extension-method"]:checked',
      );

      if (wizard.dataset.loanExtensionStep === "1" && checkedRadio?.value) {
        selectedMethod = checkedRadio.value;
      }

      if (wizard.dataset.loanExtensionStep !== "2" || !selectedMethod) return;

      wizard
        .querySelectorAll<HTMLElement>(METHOD_VALUE_SELECTOR)
        .forEach((element) => {
          element.textContent = selectedMethod;
        });
    }

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(syncMethod);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    syncMethod();

    return () => observer.disconnect();
  }, []);

  return null;
}