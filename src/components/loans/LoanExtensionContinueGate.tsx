"use client";

import * as React from "react";
import { addLoanExtensionHistory } from "@/lib/loanExtensionHistoryStore";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';

function findTextAfterLabel(text: string, label: string) {
  const index = text.indexOf(label);
  if (index < 0) return "";

  const remaining = text.slice(index + label.length);
  const nextLabelIndex = remaining.search(
    /(?:Tenor Baru|Jatuh Tempo Baru|Tanggal Efektif|Alasan:|Simpan Perubahan)/,
  );

  return (nextLabelIndex >= 0 ? remaining.slice(0, nextLabelIndex) : remaining)
    .trim()
    .replace(/\s+/g, " ");
}

function getExtensionData(wizard: HTMLElement) {
  const text = (wizard.textContent ?? "").replace(/\s+/g, " ").trim();
  const accountNo =
    text.match(/Rekening Pinjaman\s+([A-Z0-9.]+)/i)?.[1] ?? "";
  const method = findTextAfterLabel(text, "Metode Perpanjangan");
  const newTenor = findTextAfterLabel(text, "Tenor Baru");
  const effectiveDate = findTextAfterLabel(text, "Tanggal Efektif");

  if (!accountNo || !method || !newTenor || !effectiveDate) return null;

  return {
    accountNo,
    method,
    effectiveDate,
    previousTenor: "12 Bulan",
    newTenor,
  };
}

export default function LoanExtensionContinueGate() {
  const savedWizardRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    function handleConfirm(event: MouseEvent) {
      const button = (event.target as HTMLElement | null)?.closest("button");
      if (!button || button.textContent?.trim().toLowerCase() !== "yes") return;

      const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
      if (!wizard || wizard.dataset.loanExtensionStep !== "3") return;
      if (savedWizardRef.current === wizard) return;

      const data = getExtensionData(wizard);
      if (!data) return;

      savedWizardRef.current = wizard;
      addLoanExtensionHistory(data.accountNo, {
        method: data.method,
        effectiveDate: data.effectiveDate,
        previousTenor: data.previousTenor,
        newTenor: data.newTenor,
      });
    }

    function resetOnClose() {
      if (!document.querySelector(WIZARD_SELECTOR)) {
        savedWizardRef.current = null;
      }
    }

    const observer = new MutationObserver(resetOnClose);

    document.addEventListener("click", handleConfirm, true);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("click", handleConfirm, true);
      observer.disconnect();
    };
  }, []);

  return null;
}