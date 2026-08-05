"use client";

import * as React from "react";

const REPORT_INPUT_PLACEHOLDER = "Masukkan nama/no anggota..";
const SUCCESS_MESSAGE = "Berhasil mengunggah foto KTP anggota";

function isButtonWithLabel(element: Element | null, label: string) {
  return (
    element instanceof HTMLButtonElement &&
    (element.textContent ?? "").trim().toLowerCase() === label.toLowerCase()
  );
}

function updateKtpStatus(row: HTMLTableRowElement) {
  const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>("td"));
  const ktpCell = cells.find((cell) => {
    const text = cell.textContent?.trim().toLowerCase() ?? "";
    return text.includes("tersedia") || text.includes("belum tersedia");
  });

  if (!ktpCell) return;

  const badge = ktpCell.querySelector("span");
  if (!badge) return;

  badge.textContent = "Tersedia";
  badge.className =
    "inline-flex rounded-[3px] bg-[#27ae00] px-2 py-1 text-[9px] font-bold leading-none text-white";
}

export default function KtpReportStatusSync() {
  const selectedRowRef = React.useRef<HTMLTableRowElement | null>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Element | null;

      if (isButtonWithLabel(target?.closest("button"), "Lihat detail")) {
        const row = target?.closest("tr");
        if (row instanceof HTMLTableRowElement) {
          selectedRowRef.current = row;
        }
        return;
      }

      if (!isButtonWithLabel(target?.closest("button"), "OK")) return;

      const successModal = Array.from(
        document.querySelectorAll<HTMLElement>('[role="dialog"], body > div'),
      ).find((element) =>
        (element.textContent ?? "").includes(SUCCESS_MESSAGE),
      );

      if (!successModal) return;

      const reportInput = document.querySelector<HTMLInputElement>(
        `input[placeholder="${REPORT_INPUT_PLACEHOLDER}"]`,
      );

      if (reportInput && !selectedRowRef.current) {
        const searchButton = Array.from(
          document.querySelectorAll<HTMLButtonElement>("button"),
        ).find((button) => button.textContent?.trim() === "Cari");

        searchButton?.click();
      }

      window.setTimeout(() => {
        const row = selectedRowRef.current;
        if (row?.isConnected) updateKtpStatus(row);
        selectedRowRef.current = null;
      }, 100);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}