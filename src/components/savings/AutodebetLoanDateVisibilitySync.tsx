"use client";

import * as React from "react";

const DIALOG_SELECTOR = '[role="dialog"]';
const LOAN_PRODUCT_LABEL = "Produk Tujuan";
const LOAN_ACCOUNT_LABEL = "No. Rekening Tujuan";
const DATE_LABEL = "Tanggal Proses Autodebet";

function findField(dialog: HTMLElement, labelText: string) {
  return Array.from(dialog.querySelectorAll<HTMLElement>("label")).find(
    (label) => (label.textContent ?? "").trim() === labelText,
  )?.parentElement;
}

function syncDateField() {
  const dialog = Array.from(
    document.querySelectorAll<HTMLElement>(DIALOG_SELECTOR),
  ).find((item) => (item.textContent ?? "").includes("Jadwal Autodebet"));

  if (!dialog) return;

  const productField = findField(dialog, LOAN_PRODUCT_LABEL);
  const accountField = findField(dialog, LOAN_ACCOUNT_LABEL);
  const dateField = findField(dialog, DATE_LABEL);

  if (!productField || !accountField || !dateField) return;

  const productText = productField.textContent?.toLowerCase() ?? "";
  const isLoanProduct = productText.includes("produk pinjaman");
  const accountText = accountField.textContent?.trim().toLowerCase() ?? "";
  const hasSelectedLoanAccount =
    isLoanProduct &&
    accountText.length > 0 &&
    !accountText.includes("pilih rekening") &&
    !accountText.includes("tidak ada produk");

  dateField.style.display = isLoanProduct && !hasSelectedLoanAccount ? "none" : "";
}

export default function AutodebetLoanDateVisibilitySync() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncDateField);
    };

    const observer = new MutationObserver(scheduleSync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  return null;
}