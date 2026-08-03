"use client";

import * as React from "react";

const methods = [
  "Tenor Tambahan",
  "Tenor Baru",
  "Jatuh Tempo Akhir Baru",
] as const;

type ExtensionMethod = (typeof methods)[number];

const selectedMethodByWizard = new WeakMap<HTMLElement, ExtensionMethod>();

function getMethodField() {
  const wizard = document.querySelector<HTMLElement>(
    '[data-loan-extension-wizard="true"]',
  );

  if (!wizard) return null;

  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith("Metode Perpanjangan"),
  );

  const field = label?.parentElement;
  const trigger = field?.querySelector<HTMLElement>(
    'button[role="combobox"], [data-slot="select-trigger"]',
  );

  if (!wizard || !field || !trigger) return null;

  return { wizard, field, trigger };
}

function getSelectedMethodFromTrigger(trigger: HTMLElement) {
  const value = (trigger.textContent ?? "").trim();

  return methods.includes(value as ExtensionMethod)
    ? (value as ExtensionMethod)
    : null;
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

function syncRadioSelection(
  radios: HTMLDivElement,
  method: ExtensionMethod | null,
) {
  radios.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach(
    (radio) => {
      radio.checked = radio.value === method;
    },
  );
}

export default function LoanExtensionMethodRadioGroup() {
  React.useEffect(() => {
    let intervalId = 0;
    let observer: MutationObserver | null = null;
    let mountedRadios: HTMLDivElement | null = null;
    let hiddenTrigger: HTMLElement | null = null;

    const mountRadioButtons = () => {
      const result = getMethodField();

      if (!result) return;

      const { wizard, field, trigger } = result;
      const selectedFromState = getSelectedMethodFromTrigger(trigger);
      const rememberedMethod = selectedMethodByWizard.get(wizard);
      const activeMethod = selectedFromState ?? rememberedMethod ?? null;

      const existingRadios = field.querySelector<HTMLDivElement>(
        '[data-loan-extension-method-radios="true"]',
      );

      if (existingRadios) {
        mountedRadios = existingRadios;
        hiddenTrigger = trigger;
        trigger.style.display = "none";
        syncRadioSelection(existingRadios, activeMethod);
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
        radio.checked = method === activeMethod;
        radio.className =
          "h-4 w-4 border-slate-300 accent-[#2563EB] text-[#2563EB]";

        radio.addEventListener("change", () => {
          if (!radio.checked) return;

          selectedMethodByWizard.set(wizard, method);
          syncRadioSelection(radios, method);
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

      observer?.disconnect();
      observer = new MutationObserver(() => {
        const selectedMethod =
          getSelectedMethodFromTrigger(trigger) ??
          selectedMethodByWizard.get(wizard) ??
          null;

        if (selectedMethod) {
          selectedMethodByWizard.set(wizard, selectedMethod);
        }

        syncRadioSelection(radios, selectedMethod);
      });

      observer.observe(trigger, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    };

    mountRadioButtons();
    intervalId = window.setInterval(mountRadioButtons, 250);

    return () => {
      window.clearInterval(intervalId);
      observer?.disconnect();
      mountedRadios?.remove();

      if (hiddenTrigger) {
        hiddenTrigger.style.display = "";
      }
    };
  }, []);

  return null;
}