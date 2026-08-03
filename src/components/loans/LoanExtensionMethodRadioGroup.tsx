"use client";

import * as React from "react";

const methods = [
  "Tenor Tambahan",
  "Tenor Baru",
  "Jatuh Tempo Akhir Baru",
] as const;

type ExtensionMethod = (typeof methods)[number];

function getMethodField() {
  const wizard = document.querySelector<HTMLElement>(
    '[data-loan-extension-wizard="true"]',
  );

  if (!wizard) return null;

  const triggers = Array.from(
    wizard.querySelectorAll<HTMLElement>(
      'button[role="combobox"], [data-slot="select-trigger"]',
    ),
  );

  for (const trigger of triggers) {
    let container: HTMLElement | null = trigger.parentElement;
    let depth = 0;

    while (container && container !== wizard && depth < 6) {
      const labels = Array.from(container.querySelectorAll("label"));

      const hasMethodLabel = labels.some((label) =>
        (label.textContent ?? "").trim().startsWith("Metode Perpanjangan"),
      );

      if (hasMethodLabel) {
        return {
          field: container,
          trigger,
          selectContainer: trigger.parentElement,
        };
      }

      container = container.parentElement;
      depth += 1;
    }
  }

  return null;
}

function chooseMethod(trigger: HTMLElement, method: ExtensionMethod) {
  trigger.click();

  window.setTimeout(() => {
    const option = Array.from(
      document.querySelectorAll<HTMLElement>('[role="option"]'),
    ).find((element) => (element.textContent ?? "").trim() === method);

    option?.click();
  }, 50);
}

export default function LoanExtensionMethodRadioGroup() {
  const [selectedMethod, setSelectedMethod] =
    React.useState<ExtensionMethod | "">("");

  React.useEffect(() => {
    let mutationObserver: MutationObserver | null = null;
    let retryId = 0;
    let mountedRadios: HTMLDivElement | null = null;
    let hiddenSelectContainer: HTMLElement | null = null;

    const mountRadioButtons = () => {
      const methodField = getMethodField();

      if (!methodField) {
        retryId = window.setTimeout(mountRadioButtons, 100);
        return;
      }

      const { field, trigger, selectContainer } = methodField;

      const existingRadios = field.querySelector<HTMLDivElement>(
        '[data-loan-extension-method-radios="true"]',
      );

      if (existingRadios) {
        mountedRadios = existingRadios;
        hiddenSelectContainer = selectContainer;
        return;
      }

      const radios = document.createElement("div");
      radios.dataset.loanExtensionMethodRadios = "true";
      radios.className =
        "flex min-h-[31px] flex-wrap items-center gap-x-6 gap-y-3";

      methods.forEach((method) => {
        const label = document.createElement("label");
        label.className =
          "inline-flex cursor-pointer items-center gap-2 text-[14px] font-normal text-slate-900";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "loan-extension-method";
        input.value = method;
        input.className =
          "h-4 w-4 border-slate-300 accent-[#2563EB] text-[#2563EB]";

        input.addEventListener("change", () => {
          if (!input.checked) return;

          setSelectedMethod(method);
          chooseMethod(trigger, method);
        });

        const text = document.createElement("span");
        text.textContent = method;

        label.append(input, text);
        radios.appendChild(label);
      });

      if (selectContainer) {
        selectContainer.style.display = "none";
        hiddenSelectContainer = selectContainer;
      }

      field.appendChild(radios);
      mountedRadios = radios;

      const syncFromSelect = () => {
        const value = (trigger.textContent ?? "").trim();

        if (methods.includes(value as ExtensionMethod)) {
          setSelectedMethod(value as ExtensionMethod);
        }
      };

      syncFromSelect();

      mutationObserver = new MutationObserver(syncFromSelect);
      mutationObserver.observe(trigger, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    };

    mountRadioButtons();

    return () => {
      window.clearTimeout(retryId);
      mutationObserver?.disconnect();
      mountedRadios?.remove();

      if (hiddenSelectContainer) {
        hiddenSelectContainer.style.display = "";
      }
    };
  }, []);

  React.useEffect(() => {
    const radios = document.querySelectorAll<HTMLInputElement>(
      '[data-loan-extension-method-radios="true"] input[type="radio"]',
    );

    radios.forEach((radio) => {
      radio.checked = radio.value === selectedMethod;
    });
  }, [selectedMethod]);

  return null;
}