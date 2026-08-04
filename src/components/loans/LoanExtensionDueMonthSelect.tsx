"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const MONTH_SELECT_ID = "loan-extension-due-month-select";

const months = [
  { value: "1", label: "Januari" },
  { value: "2", label: "Februari" },
  { value: "3", label: "Maret" },
  { value: "4", label: "April" },
  { value: "5", label: "Mei" },
  { value: "6", label: "Juni" },
  { value: "7", label: "Juli" },
  { value: "8", label: "Agustus" },
  { value: "9", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

function setReactInputValue(input: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  )?.set;

  valueSetter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

function getMonthInput() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);

  if (!wizard) return null;

  return wizard.querySelector<HTMLInputElement>(
    'input[placeholder="Bulan (01-12)"]',
  );
}

function mountMonthSelect() {
  const monthInput = getMonthInput();

  if (!monthInput) return;

  const inputContainer = monthInput.parentElement;
  if (!inputContainer) return;

  const existingSelect = inputContainer.querySelector<HTMLSelectElement>(
    `#${MONTH_SELECT_ID}`,
  );

  if (existingSelect) {
    existingSelect.value = monthInput.value;
    return;
  }

  const selectWrapper = document.createElement("div");
  selectWrapper.className = "relative h-[31px] w-full";

  const select = document.createElement("select");
  select.id = MONTH_SELECT_ID;
  select.value = monthInput.value;
  select.className =
    "h-[31px] w-full appearance-none rounded-[5px] border border-[#CBD5E1] bg-white px-3 pr-10 text-[14px] font-normal text-slate-900 shadow-none outline-none";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Pilih Bulan";
  placeholder.disabled = true;
  select.appendChild(placeholder);

  months.forEach((month) => {
    const option = document.createElement("option");
    option.value = month.value;
    option.textContent = month.label;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    setReactInputValue(monthInput, select.value);
  });

  const icon = document.createElement("span");
  icon.className =
    "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500";
  icon.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m6 9 6 6 6-6"></path></svg>';

  monthInput.style.display = "none";
  selectWrapper.append(select, icon);
  inputContainer.appendChild(selectWrapper);
}

export default function LoanExtensionDueMonthSelect() {
  React.useEffect(() => {
    const observer = new MutationObserver(mountMonthSelect);
    const intervalId = window.setInterval(mountMonthSelect, 200);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    mountMonthSelect();

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
    };
  }, []);

  return null;
}