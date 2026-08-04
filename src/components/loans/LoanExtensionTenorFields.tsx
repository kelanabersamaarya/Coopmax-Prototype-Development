"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const CURRENT_TENOR = 12;
const FIELD_ID = "loan-extension-current-tenor-field";
const TOTAL_FIELD_ID = "loan-extension-total-tenor-field";

function createReadonlyField(
  id: string,
  label: string,
  value: string,
  description?: string,
) {
  const wrapper = document.createElement("div");
  wrapper.id = id;
  wrapper.className =
    "grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)] sm:items-center";

  const labelElement = document.createElement("label");
  labelElement.className = "text-[14px] font-normal text-[#002060]";
  labelElement.textContent = label;

  const input = document.createElement("input");
  input.value = value;
  input.readOnly = true;
  input.setAttribute("aria-readonly", "true");
  input.className =
    "h-[31px] w-full cursor-not-allowed rounded-[5px] border border-[#CBD5E1] bg-slate-200/80 px-3 text-[14px] font-normal text-slate-700 shadow-none outline-none";

  const content = document.createElement("div");
  content.appendChild(input);

  if (description) {
    const hint = document.createElement("div");
    hint.className = "mt-1 text-[12px] text-slate-500";
    hint.textContent = description;
    content.appendChild(hint);
  }

  wrapper.append(labelElement, content);

  return { wrapper, input };
}

function getExtensionAdditionalTenorInput() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);

  if (!wizard) return null;

  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith("Tenor Tambahan (Bulan)"),
  );

  return label?.parentElement?.querySelector<HTMLInputElement>("input") ?? null;
}

function syncTenorFields() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);

  if (!wizard) {
    document.getElementById(FIELD_ID)?.remove();
    document.getElementById(TOTAL_FIELD_ID)?.remove();
    return;
  }

  const additionalTenorInput = getExtensionAdditionalTenorInput();

  if (!additionalTenorInput) {
    document.getElementById(FIELD_ID)?.remove();
    document.getElementById(TOTAL_FIELD_ID)?.remove();
    return;
  }

  const additionalTenorField = additionalTenorInput.closest(
    ".grid",
  ) as HTMLElement | null;

  if (!additionalTenorField) return;

  let currentField = document.getElementById(FIELD_ID);
  let totalField = document.getElementById(TOTAL_FIELD_ID);

  if (!currentField) {
    const created = createReadonlyField(
      FIELD_ID,
      "Tenor Saat Ini",
      `${CURRENT_TENOR} Bulan`,
    );
    additionalTenorField.insertAdjacentElement("beforebegin", created.wrapper);
    currentField = created.wrapper;
  }

  if (!totalField) {
    const created = createReadonlyField(
      TOTAL_FIELD_ID,
      "Total Tenor Baru",
      `${CURRENT_TENOR} Bulan`,
    );
    additionalTenorField.insertAdjacentElement("afterend", created.wrapper);
    totalField = created.wrapper;
  }

  const totalInput = totalField.querySelector<HTMLInputElement>("input");
  const additionalTenor = Number.parseInt(additionalTenorInput.value, 10) || 0;

  if (totalInput) {
    totalInput.value = `${CURRENT_TENOR + additionalTenor} Bulan`;
  }
}

export default function LoanExtensionTenorFields() {
  React.useEffect(() => {
    const observer = new MutationObserver(syncTenorFields);
    const intervalId = window.setInterval(syncTenorFields, 250);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    syncTenorFields();

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
      document.getElementById(FIELD_ID)?.remove();
      document.getElementById(TOTAL_FIELD_ID)?.remove();
    };
  }, []);

  return null;
}