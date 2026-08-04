"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const FIELD_ID = "loan-extension-current-due-date-fields";
const CURRENT_DUE_MONTH = "April";
const CURRENT_DUE_YEAR = "2027";

function findNewDueDateField() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);

  if (!wizard) return null;

  const label = Array.from(wizard.querySelectorAll("label")).find((element) =>
    (element.textContent ?? "").trim().startsWith("Jatuh Tempo Akhir Baru"),
  );

  return label?.parentElement ?? null;
}

function createReadonlyInput(value: string) {
  const input = document.createElement("input");
  input.value = value;
  input.readOnly = true;
  input.setAttribute("aria-readonly", "true");
  input.className =
    "h-[31px] w-full cursor-not-allowed rounded-[5px] border border-[#CBD5E1] bg-slate-200/80 px-3 text-[14px] font-normal text-slate-700 shadow-none outline-none";

  return input;
}

function syncCurrentDueDateFields() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const newDueDateField = findNewDueDateField();
  const existing = document.getElementById(FIELD_ID);

  if (!wizard || !newDueDateField) {
    existing?.remove();
    return;
  }

  if (existing) return;

  const wrapper = document.createElement("div");
  wrapper.id = FIELD_ID;
  wrapper.className =
    "grid gap-2 sm:grid-cols-[210px_minmax(0,1fr)] sm:items-center";

  const label = document.createElement("label");
  label.className = "text-[14px] font-normal text-[#002060]";
  label.textContent = "Jatuh Tempo Saat Ini";

  const fields = document.createElement("div");
  fields.className = "grid grid-cols-2 gap-3";

  fields.append(
    createReadonlyInput(CURRENT_DUE_MONTH),
    createReadonlyInput(CURRENT_DUE_YEAR),
  );

  wrapper.append(label, fields);
  newDueDateField.insertAdjacentElement("beforebegin", wrapper);
}

export default function LoanExtensionCurrentDueDateFields() {
  React.useEffect(() => {
    const observer = new MutationObserver(syncCurrentDueDateFields);
    const intervalId = window.setInterval(syncCurrentDueDateFields, 250);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    syncCurrentDueDateFields();

    return () => {
      observer.disconnect();
      window.clearInterval(intervalId);
      document.getElementById(FIELD_ID)?.remove();
    };
  }, []);

  return null;
}