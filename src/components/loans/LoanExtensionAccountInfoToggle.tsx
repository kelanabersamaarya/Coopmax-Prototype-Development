"use client";

import * as React from "react";

const WIZARD_SELECTOR = '[data-loan-extension-wizard="true"]';
const GRID_SELECTOR = ".loan-extension-account-grid";
const TOGGLE_CLASS = "loan-extension-account-info-toggle";

const COMPACT_LABELS = new Set([
  "No. Rek. Pinjaman",
  "Nama Anggota",
  "Nama Anggota / Debitur",
  "Produk Pinjaman",
  "Status Pinjaman",
  "Baki Debet",
  "Baki Debet Pokok",
  "Nominal Angsuran",
  "Suku Bunga",
  "Suku Bunga Saat Ini",
  "Sisa Tenor",
]);

function getElements() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const grid = wizard?.querySelector<HTMLElement>(GRID_SELECTOR);
  const section = grid?.closest("section") as HTMLElement | null;

  if (!wizard || !grid || !section) return null;

  const fields = Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  );

  return { wizard, grid, section, fields };
}

function restoreFirstStep(
  fields: HTMLElement[],
  section: HTMLElement,
  grid: HTMLElement,
) {
  fields.forEach((field) => field.style.removeProperty("display"));
  grid.dataset.accountInfoExpanded = "false";
  section.style.removeProperty("position");
  section.style.removeProperty("z-index");
  section.style.removeProperty("padding-bottom");
  section.querySelector(`.${TOGGLE_CLASS}`)?.remove();
}

function applyCompactVisibility(
  fields: HTMLElement[],
  expanded: boolean,
) {
  fields.forEach((field) => {
    const labelText =
      field.dataset.accountItemLabel?.trim() ||
      field
        .querySelector<HTMLElement>(":scope > div:first-child")
        ?.textContent?.trim() ||
      "";

    field.style.setProperty(
      "display",
      expanded || COMPACT_LABELS.has(labelText) ? "block" : "none",
      "important",
    );
  });
}

function updateToggleButton(
  button: HTMLButtonElement,
  expanded: boolean,
) {
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
}

function sync() {
  const elements = getElements();
  if (!elements) return;

  const { wizard, grid, section, fields } = elements;

  // Langkah pertama tidak disentuh sama sekali.
  if (wizard.dataset.loanExtensionStep !== "2") {
    restoreFirstStep(fields, section, grid);
    return;
  }

  if (fields.length === 0) return;

  section.style.position = "relative";
  section.style.zIndex = "1";
  section.style.paddingBottom = "64px";

  let button = section.querySelector<HTMLButtonElement>(`.${TOGGLE_CLASS}`);

  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = TOGGLE_CLASS;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const expanded = grid.dataset.accountInfoExpanded === "true";
      const nextExpanded = !expanded;

      grid.dataset.accountInfoExpanded = String(nextExpanded);
      applyCompactVisibility(fields, nextExpanded);
      updateToggleButton(button!, nextExpanded);
    });

    section.appendChild(button);
  }

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

  const expanded = grid.dataset.accountInfoExpanded === "true";
  applyCompactVisibility(fields, expanded);
  updateToggleButton(button, expanded);
}

export default function LoanExtensionAccountInfoToggle() {
  React.useEffect(() => {
    let frameId = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(sync);
    };

    const observer = new MutationObserver(scheduleSync);
    const intervalId = window.setInterval(sync, 250);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearInterval(intervalId);
      observer.disconnect();

      document
        .querySelectorAll(`.${TOGGLE_CLASS}`)
        .forEach((button) => button.remove());
    };
  }, []);

  return null;
}