"use client";

import * as React from "react";

const methods = [
  "Tenor Tambahan",
  "Tenor Baru",
  "Jatuh Tempo Akhir Baru",
] as const;

function getMethodField() {
  const wizard = document.querySelector<HTMLElement>(
    '[data-loan-extension-wizard="true"]',
  );

  if (!wizard) return null;

  const fields = Array.from(wizard.querySelectorAll<HTMLElement>("div"));
  const field = fields.find(
    (element) =>
      element.firstElementChild?.textContent?.trim() === "Metode Perpanjangan",
  );

  if (!field) return null;

  const trigger = field.querySelector<HTMLElement>(
    'button[role="combobox"]',
  );

  if (!trigger) return null;

  return { field, trigger };
}

function selectMethod(trigger: HTMLElement, method: string) {
  trigger.click();

  window.setTimeout(() => {
    const option = Array.from(
      document.querySelectorAll<HTMLElement>('[role="option"]'),
    ).find((element) => element.textContent?.trim() === method);

    option?.click();
  }, 0);
}

export default function LoanExtensionMethodRadioGroup() {
  const [selectedMethod, setSelectedMethod] = React.useState("");

  React.useEffect(() => {
    let radios: HTMLDivElement | null = null;

    const mount = () => {
      const methodField = getMethodField();

      if (!methodField) return;

      const { field, trigger } = methodField;
      const selectContainer = trigger.parentElement;

      if (!selectContainer) return;

      radios = field.querySelector<HTMLDivElement>(
        "[data-loan-extension-method-radios]",
      );

      if (!radios) {
        radios = document.createElement("div");
        radios.dataset.loanExtensionMethodRadios = "true";
        radios.className =
          "loan-extension-method-radios flex flex-wrap items-center gap-x-6 gap-y-3";

        methods.forEach((method) => {
          const label = document.createElement("label");
          label.className =
            "inline-flex cursor-pointer items-center gap-2 text-[14px] font-normal text-slate-900";

          const input = document.createElement("input");
          input.type = "radio";
          input.name = "loan-extension-method";
          input.value = method;
          input.className =
            "h-4 w-4 border-slate-300 text-[#2563EB] accent-[#2563EB]";

          input.addEventListener("change", () => {
            if (!input.checked) return;
            selectMethod(trigger, method);
            setSelectedMethod(method);
          });

          const text = document.createElement("span");
          text.textContent = method;

          label.append(input, text);
          radios?.appendChild(label);
        });

        selectContainer.style.display = "none";
        field.appendChild(radios);
      }

      const syncSelectedValue = () => {
        const currentValue = trigger.textContent?.trim() ?? "";

        if (methods.includes(currentValue as (typeof methods)[number])) {
          setSelectedMethod(currentValue);
        }
      };

      syncSelectedValue();

      const observer = new MutationObserver(syncSelectedValue);
      observer.observe(trigger, {
        childList: true,
        characterData: true,
        subtree: true,
      });

      return () => observer.disconnect();
    };

    const observer = new MutationObserver(() => {
      const cleanup = mount();

      if (cleanup) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const cleanup = mount();

    return () => {
      observer.disconnect();
      cleanup?.();

      if (radios) {
        radios.remove();
      }

      const methodField = getMethodField();
      const selectContainer = methodField?.trigger.parentElement;

      if (selectContainer) {
        selectContainer.style.display = "";
      }
    };
  }, []);

  React.useEffect(() => {
    const radios = document.querySelectorAll<HTMLInputElement>(
      '[data-loan-extension-method-radios] input[type="radio"]',
    );

    radios.forEach((radio) => {
      radio.checked = radio.value === selectedMethod;
    });
  }, [selectedMethod]);

  return (
    <style>
      {`
        [data-loan-extension-method-radios] {
          min-height: 31px;
        }

        [data-loan-extension-method-radios] input[type="radio"] {
          accent-color: #2563eb;
        }
      `}
    </style>
  );
}