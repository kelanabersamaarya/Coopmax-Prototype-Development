"use client";

import * as React from "react";

const UPDATED_MESSAGE =
  "Perubahan hutang bunga tidak dapat dilakukan pada rekening pinjaman karena produk pinjaman yang digunakan tidak mendukung perubahan hutang bunga";

function updateUnsupportedDebtMessage() {
  const dialogs = Array.from(
    document.querySelectorAll<HTMLElement>(
      '[role="dialog"], [data-radix-dialog-content], [data-slot="dialog-content"]',
    ),
  );

  dialogs.forEach((dialog) => {
    const elements = Array.from(
      dialog.querySelectorAll<HTMLElement>("p, div"),
    );

    elements.forEach((element) => {
      const text = element.textContent?.trim().toLowerCase() ?? "";

      if (
        text.includes("perubahan nominal bunga") ||
        text.includes("perubahan hutang bunga")
      ) {
        element.textContent = UPDATED_MESSAGE;
      }
    });
  });
}

export default function LoanDebtUnsupportedAlertText() {
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(updateUnsupportedDebtMessage);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    updateUnsupportedDebtMessage();

    return () => observer.disconnect();
  }, []);

  return null;
}