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

function setButtonContent(button: HTMLButtonElement, expanded: boolean) {
  button.replaceChildren();

  const label = document.createElement("span");
  label.textContent = expanded
    ? "Tampilkan Lebih Sedikit"
    : "Tampilkan Lebih Banyak";
  label.style.whiteSpace = "nowrap";

  const chevron = document.createElement("span");
  chevron.setAttribute("aria-hidden", "true");
  chevron.style.display = "inline-flex";
  chevron.style.alignItems = "center";
  chevron.style.justifyContent = "center";
  chevron.style.width = "18px";
  chevron.style.height = "18px";
  chevron.style.flexShrink = "0";
  chevron.style.transition = "transform 180ms ease";
  chevron.style.transform = expanded ? "rotate(180deg)" : "rotate(0deg)";
  chevron.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  `;

  button.append(label, chevron);
}

function applyFieldVisibility(grid: HTMLElement, expanded: boolean) {
  const fields = Array.from(
    grid.querySelectorAll<HTMLElement>(".loan-extension-account-field"),
  );

  fields.forEach((field) => {
    const label = field.dataset.accountItemLabel?.trim() ?? "";
    const shouldShow = expanded || COMPACT_LABELS.has(label);

    field.style.setProperty(
      "display",
      shouldShow ? "block" : "none",
      "important",
    );
  });
}

function styleToggleButton(button: HTMLButtonElement) {
  Object.assign(button.style, {
    position: "absolute",
    right: "16px",
    bottom: "12px",
    zIndex: "100",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "max-content",
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
    userSelect: "none",
  });
}

function getAccountInfoGrid() {
  const wizard = document.querySelector<HTMLElement>(WIZARD_SELECTOR);
  const grid = wizard?.querySelector<HTMLElement>(GRID_SELECTOR);

  if (!wizard || !grid) return null;

  return { wizard, grid };
}

function syncAccountInfoToggle() {
  const result = getAccountInfoGrid();
  if (!result) return;

  const { grid } = result;
  const fields = grid.querySelectorAll(".loan-extension-account-field");

  if (fields.length <= COMPACT_LABELS.size) return;

  const section = grid.closest("section");
  if (!section) return;

  section.style.position = "relative";
  section.style.zIndex = "1";
  section.style.paddingBottom = "64px";

  let button = section.querySelector<HTMLButtonElement>(`.${TOGGLE_CLASS}`);

  if (!button) {
    button = document.createElement("button");
    button.type = "button";
    button.className = TOGGLE_CLASS;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute(
      "aria-label",
      "Tampilkan informasi rekening lainnya",
    );

    button.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
    });

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const expanded =
        button?.getAttribute("aria-expanded") === "true";
      const nextExpanded = !expanded;

      grid.dataset.accountInfoExpanded = String(nextExpanded);
      button?.setAttribute("aria-expanded", String(nextExpanded));
      button?.setAttribute(
        "aria-label",
        nextExpanded
          ? "Sembunyikan informasi rekening tambahan"
          : "Tampilkan informasi rekening lainnya",
      );

      applyFieldVisibility(grid, nextExpanded);

      if (button) {
        setButtonContent(button, nextExpanded);
      }
    });

    button.addEventListener("mouseenter", () => {
      button.style.textDecoration = "underline";
    });

    button.addEventListener("mouseleave", () => {
      button.style.textDecoration = "none";
    });

    section.appendChild(button);
  }

  styleToggleButton(button);

  const expanded = grid.dataset.accountInfoExpanded === "true";
  button.setAttribute("aria-expanded", String(expanded));
  applyFieldVisibility(grid, expanded);
  setButtonContent(button, expanded);
}

export default function LoanExtensionAccountInfoToggle() {
  React.useEffect(() => {
    let frameId = 0;
    let retryId = 0;
    let attempts = 0;

    const scheduleSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncAccountInfoToggle);
    };

    const retryMount = () => {
      attempts += 1;
      scheduleSync();

      if (attempts < 30) {
        retryId = window.setTimeout(retryMount, 120);
      }
    };

    const observer = new MutationObserver(scheduleSync);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    retryMount();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(retryId);
      observer.disconnect();

      document
        .querySelectorAll(`.${TOGGLE_CLASS}`)
        .forEach((button) => button.remove());
    };
  }, []);

  return null;
}