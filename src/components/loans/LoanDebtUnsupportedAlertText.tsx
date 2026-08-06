"use client";

import * as React from "react";

const UPDATED_MESSAGE =
  "Perubahan hutang bunga tidak dapat dilakukan pada rekening pinjaman karena produk pinjaman yang digunakan tidak mendukung perubahan hutang bunga";

export default function LoanDebtUnsupportedAlertText() {
  React.useEffect(() => {
    function updateMessage() {
      const paragraphs = Array.from(
        document.querySelectorAll<HTMLParagraphElement>(
          '[data-radix-dialog-content] p',
        ),
      );

      paragraphs.forEach((paragraph) => {
        const text = paragraph.textContent?.trim().toLowerCase() ?? "";

        if (text.includes("perubahan nominal bunga")) {
          paragraph.textContent = UPDATED_MESSAGE;
        }
      });
    }

    const observer = new MutationObserver(updateMessage);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    updateMessage();

    return () => observer.disconnect();
  }, []);

  return null;
}