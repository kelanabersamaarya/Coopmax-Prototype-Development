"use client";

import * as React from "react";

const REPORT_INPUT_SELECTOR =
  'input[placeholder="Masukkan nama/no anggota.."]';

const DEFAULT_VALUES = new Set([
  "semua",
  "berdasarkan simpanan anggota",
]);

function syncDefaultFilterStyles() {
  const reportInput = document.querySelector(REPORT_INPUT_SELECTOR);
  const reportRoot = reportInput?.closest("main") ?? reportInput?.parentElement;

  if (!reportRoot) return;

  const triggers = reportRoot.querySelectorAll<HTMLElement>(
    '[data-slot="select-trigger"], button[role="combobox"]',
  );

  triggers.forEach((trigger) => {
    const valueElement =
      trigger.querySelector<HTMLElement>('[data-slot="select-value"]') ??
      trigger;

    const value = valueElement.textContent?.trim().toLowerCase() ?? "";
    trigger.classList.toggle(
      "member-report-filter-default",
      DEFAULT_VALUES.has(value),
    );
  });
}

export default function MemberReportFilterPlaceholderStyle() {
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(syncDefaultFilterStyles);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    syncDefaultFilterStyles();

    return () => observer.disconnect();
  }, []);

  return null;
}