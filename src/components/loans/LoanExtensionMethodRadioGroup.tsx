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

  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith("Metode Perpanjangan"),
  );

  if (!label) return null;

  const field = label.parentElement;
  if (!field) return null;

  const trigger = field.querySelector<HTMLElement>(
    'button[role="combobox"], [data-slot="select-trigger"]',
  );

  if (!trigger) return null;

  return { field, trigger };
}

function selectMethod(trigger: HTMLElement, method: ExtensionMethod) {
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
    let intervalId = 0;
    let mutationObserver: MutationObserver | null = null;
    let mountedRadios: HTMLDivElement | null = null;
    let hiddenTrigger: HTMLElement | null = null;

    const syncRadioValue = () => {
      if (!hiddenTrigger) return;

      const value = (hiddenTrigger.textContent ?? "").trim();
      if (!methods.includes(value as ExtensionMethod)) return;

      setSelectedMethod(value as ExtensionMethod);
    };

    const mountRadioButtons = () => {
      const result = getMethodField();

      if (!result) return;

      const { field, trigger } = result;
      const existingRadios = field.querySelector<HTMLDivElement>(
        '[data-loan-extension-method-radios="true"]',
      );

      if (existingRadios) {
        mountedRadios = existingRadios;
        hiddenTrigger = trigger;
        trigger.style.display = "none";
        syncRadioValue();
        return;
      }

      const radios = document.createElement("div");
      radios.dataset.loanExtensionMethodRadios = "true";
      radios.className =
        "flex min-h-[31px] flex-wrap items-center gap-x-6 gap-y-3";

      methods.forEach((method) => {
        const radioLabel = document.createElement("label");
        radioLabel.className =
          "inline-flex cursor-pointer items-center gap-2 text-[14px] font-normal text-slate-900";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "loan-extension-method";
        radio.value = method;
        radio.className =
          "h-4 w-4 border-slate-300 accent-[#2563EB] text-[#2563EB]";

        radio.addEventListener("change", () => {
          if (!radio.checked) return;

          setSelectedMethod(method);
          selectMethod(trigger, method);
        });

        const text = document.createElement("span");
        text.textContent = method;

        radioLabel.append(radio, text);
        radios.appendChild(radioLabel);
      });

      field.appendChild(radios);

      mountedRadios = radios;
      hiddenTrigger = trigger;
      trigger.style.display = "none";

      syncRadioValue();

      mutationObserver?.disconnect();
      mutationObserver = new MutationObserver(syncRadioValue);
      mutationObserver.observe(trigger, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    };

    mountRadioButtons();
    intervalId = window.setInterval(mountRadioButtons, 300);

    return () => {
      window.clearInterval(intervalId);
      mutationObserver?.disconnect();
      mountedRadios?.remove();

      if (hiddenTrigger) {
        hiddenTrigger.style.display = "";
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