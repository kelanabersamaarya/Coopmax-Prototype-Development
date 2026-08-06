"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const TOGGLE_CLASS = "loan-extension-account-info-toggle";

const COMPACT_LABELS = new Set([
  "Kode Pinjaman",
  "Nama Nasabah",
  "Sektor Pinjaman",
  "Tujuan Pinjaman",
  "Kolektor",
  "Tanggal Dibuat",
  "Tanggal Jatuh Tempo",
  "Tanggal Pinjaman Aktif",
  "Tanggal Transaksi Terakhir",
]);

function getElements() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const grid = wizard?.querySelector<HTMLElement>(GRID_SELECTOR);
  const section = grid?.closest("section") as HTMLElement | null;

  if (!wizard || !grid || !section) return null;

  const fields = Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  );

  return { grid, section, fields };
}

function applyVisibility(
  fields: HTMLElement[],
  expanded: boolean,
) {
  fields.forEach((field) => {
    const label = field.dataset.accountItemLabel?.trim() ?? "";
    const visible = expanded || COMPACT_LABELS.has(label);

    field.style.setProperty(
      "display",
      visible ? "block" : "none",
      "important",
    );
  });
}

function styleButton(button: HTMLButtonElement) {
  Object.assign(button.style, {
    position: "absolute",
    right: "16px",
    bottom: "12px",
    zIndex: "100",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    minWidth: "170px",
    minHeight: "38px",
    padding: "8px 10px",
    border: "0",
    borderRadius: "8px",
    background: "transparent",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "1",
    whiteSpace: "nowrap",
    pointerEvents: "auto",
    touchAction: "manipulation",
  });
}

function updateButton(button: HTMLButtonElement, expanded: boolean) {
  button.replaceChildren();

  const label = document.createElement("span");
  label.textContent = expanded
    ? "Tampilkan Lebih Sedikit"
    : "Tampilkan Lebih Banyak";

  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="display:block;transform:rotate(${expanded ? 180 : 0}deg);transition:transform 180ms ease"
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  `;

  button.append(label, icon);
  button.setAttribute("aria-expanded", String(expanded));
  button.setAttribute(
    "aria-label",
    expanded
      ? "Sembunyikan informasi rekening tambahan"
      : "Tampilkan informasi rekening tambahan",
  );
}

function sync() {
  const elements = getElements();
  if (!elements || elements.fields.length <= COMPACT_LABELS.size) return;

  const { grid, section, fields } = elements;
  section.style.position = "relative";
  section.style.zIndex = "1";
  section.style.paddingBottom = "64px";

  let button = section.querySelector<HTMLButtonElement>(
    `.${TOGGLE_CLASS}`,
  );

  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = TOGGLE_CLASS;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const expanded =
        grid.dataset.accountInfoExpanded === "true";
      const nextExpanded = !expanded;

      grid.dataset.accountInfoExpanded = String(nextExpanded);
      applyVisibility(fields, nextExpanded);
      updateButton(button!, nextExpanded);
    });

    section.appendChild(button);
  }

  styleButton(button);

  const expanded = grid.dataset.accountInfoExpanded === "true";
  applyVisibility(fields, expanded);
  updateButton(button, expanded);
}

export default function LoanExtensionAccountInfoToggle() {
  React.useEffect(() => {
    let frame = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(sync);
    };

    const observer = new MutationObserver(scheduleSync);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const interval = window.setInterval(sync, 250);
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
      observer.disconnect();

      document
        .querySelectorAll(`.${TOGGLE_CLASS}`)
        .forEach((button) => button.remove());
    };
  }, []);

  return null;
}